import { ActionCreator, Compress, Options, ReastorageInterface, Serializer } from "./types";
import { Listener } from "./types/internal";
import { handleCompress } from "./utils/handleCompress";
import { DataOrUpdaterFn, isUpdaterFn } from "./utils/isUpdaterFn";

const DEFAULT_SERIALIZER = {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
}

const createAccessor = <T>(compress: Compress, serializer: Serializer<T>) => {
  const getDeserializedValue = (value:string):T => {
    return serializer.deserialize(
      compress ? (handleCompress(compress, true)(value) as string) || value : value
    );
  }
  
  const getStorageItem = (storage: Storage, key: string): T | null => {
    const item = storage.getItem(key);
    if (item) {
      return getDeserializedValue(item)
    }
    return null;
  };
  
  const setStorageItem = (
    storage: Storage,
    key: string,
    value: T
  ) => {
    const item = serializer.serialize(value);
    storage.setItem(
      key,
      compress ? (handleCompress(compress)(item) as string) : item
    );
  };
  return {
    getDeserializedValue,
    getStorageItem,
    setStorageItem,
  }
}

const removeStorageItem = (storage: Storage, key: string) => {
  storage.removeItem(key);
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
    serializer = DEFAULT_SERIALIZER
  } = options || {};
  const accessor = createAccessor(compress, serializer)
  let data = initialValue;
  let getInitial = false;
  let listeners = new Set<Listener<T>>();

  const get = () => {
    if (getInitial) return data;
    if (typeof window === "undefined") return initialValue;
    getInitial = true;

    const targetValue = accessor.getStorageItem(
      window[`${storage}Storage`],
      key,
    );
    if (targetValue === null) {
      accessor.setStorageItem(window[`${storage}Storage`], key, initialValue);
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

    accessor.setStorageItem(window[`${storage}Storage`], key, value);
    data = value;
    listeners.forEach((cb) => cb(value));
  };
  const reset = () => set(initialValue);


  const storageEventHandler  = (e:StorageEvent) => {
    if(key !== e.key || e.newValue === null) return;
    data = accessor.getDeserializedValue(e.newValue);
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

  const removeItem = () => {
    removeStorageItem(window[`${storage}Storage`], key);
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
    removeItem,
    actions: actions as ReturnType<ActionCreator<T, A>>,
    key,
  };
};
