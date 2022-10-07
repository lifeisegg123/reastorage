import {
  ActionCreator,
  Compress,
  Listener,
  Options,
  ReastorageInterface,
} from "./ReastorageInterface";
import { DataOrUpdaterFn, isUpdaterFn } from "./utils/isUpdaterFn";
import { handleCompress } from "./utils/handleCompress";

const getStorageItem = (storage: Storage, key: string, compress: Compress) => {
  const item = storage.getItem(key);
  if (item) {
    return JSON.parse(
      compress ? (handleCompress(compress, true)(item) as string) || item : item
    );
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

export const reastorage = <T, A = never>(
  key: string,
  initialValue: T,
  options?: Options<T, A>
): ReastorageInterface<T, A> => {
  const {
    storage = "local",
    compress = "default",
    actions: storageActions,
  } = options || {};
  let data = (() => {
    if (typeof window === "undefined") return initialValue;
    const targetValue = getStorageItem(
      window[`${storage}Storage`],
      key,
      compress
    );
    if (targetValue === null) {
      setStorageItem(window[`${storage}Storage`], key, initialValue, compress);
      return initialValue;
    }
    return targetValue;
  })();
  let listeners = new Set<Listener<T>>();

  const get = () => {
    if (typeof window === "undefined") return initialValue;
    return data;
  };

  const getInitialValue = () => initialValue;

  const set = (dataOrUpdater: DataOrUpdaterFn<T>) => {
    const value = isUpdaterFn(dataOrUpdater)
      ? dataOrUpdater(data)
      : dataOrUpdater;

    setStorageItem(window[`${storage}Storage`], key, value, compress);
    data = value;
    listeners.forEach((cb) => cb(value));
  };
  const reset = () => set(initialValue);

  const subscribe = (listen: Listener<T>) => {
    listeners.add(listen);
    return () => {
      listeners.delete(listen);
    };
  };

  const actions = (() => {
    if (!storageActions) return undefined;
    return Object.fromEntries(
      Object.entries(storageActions(initialValue)).map(([key, fn]) => {
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
  };
};
