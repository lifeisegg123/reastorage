import { ActionCreator, Compress, Options, ReastorageInterface } from "./types";
import { Listener } from "./types/internal";
import { handleCompress } from "./utils/handleCompress";
import { DataOrUpdaterFn, isUpdaterFn } from "./utils/isUpdaterFn";

const getDeserializedValue = <T>(value:string,compress: Compress):T => {
  return JSON.parse(
    compress ? (handleCompress(compress, true)(value) as string) || value : value
  );
}

const getStorageItem = <T>(storage: Storage, key: string, compress: Compress): T | null => {
  const item = storage.getItem(key);
  if (item) {
    return getDeserializedValue(item, compress)
  }
  return null;
};

const setStorageItem = <T>(
  storage: Storage,
  key: string,
  value: T,
  compress: Compress
) => {
  const item = JSON.stringify(value);
  storage.setItem(
    key,
    compress ? (handleCompress(compress)(item) as string) : item
  );
};

export const reastorage = <T, A>(
  key: string,
  initialValue: T,
  options?: Options<T, A>
): ReastorageInterface<T, A> => {
  const {
    storage = "local",
    compress = "default",
    actions: storageActions,
  } = options || {};
  let data = initialValue;
  let getInitial = false;
  let listeners = new Set<Listener<T>>();

  const get = () => {
    if (getInitial) return data;
    if (typeof window === "undefined") return initialValue;
    getInitial = true;

    const targetValue = getStorageItem<T>(
      window[`${storage}Storage`],
      key,
      compress
    );
    if (targetValue === null) {
      setStorageItem(window[`${storage}Storage`], key, initialValue, compress);
    } else {
      data = targetValue;
    }
    return data;
  };

  const getInitialValue = () => initialValue;

  const set = (dataOrUpdater: DataOrUpdaterFn<T>) => {
    if (!getInitial) get();
    const value = isUpdaterFn(dataOrUpdater)
      ? dataOrUpdater(data)
      : dataOrUpdater;

    setStorageItem(window[`${storage}Storage`], key, value, compress);
    data = value;
    listeners.forEach((cb) => cb(value));
  };
  const reset = () => set(initialValue);


  const storageEventHandler  = (e:StorageEvent) => {
    if(key !== e.key || e.newValue === null) return;
    data = getDeserializedValue(e.newValue, compress);
    listeners.forEach((cb) => cb(data));
  }

  const subscribe = (listen: Listener<T>) => {
    listeners.add(listen);
    if(listeners.size === 1) {
      window.addEventListener("storage", storageEventHandler);
    }
    return () => {
      if(listeners.size === 1) {
        window.removeEventListener("storage", storageEventHandler);
      }
      listeners.delete(listen);
    };
  };

  const actions = (() => {
    if (!storageActions) return undefined;
    return Object.fromEntries(
      Object.entries(storageActions(initialValue)).map(([key]) => {
        return [
          key,
          (...args: any[]) =>
            set((prev) => {
              return storageActions(prev)[key](...args);
            }),
        ];
      })
    );
  })();

  return {
    get,
    getInitialValue,
    reset,
    set,
    subscribe,
    actions: actions as ReturnType<ActionCreator<T, A>>,
    key,
  };
};
