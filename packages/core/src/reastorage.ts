import {
  ActionCreator,
  Compress,
  Options,
  ReastorageInterface,
  ReastoreageActions,
} from "./ReastorageInterface";
import { DataOrUpdaterFn, isUpdaterFn } from "./utils";
import {
  compress as lzCompress,
  decompress as lzDecompress,
  compressToUTF16,
  decompressFromUTF16,
} from "lz-string";

const handleCompressMethod = (compress: Compress, isDecompress?: boolean) => {
  switch (compress) {
    case "utf-16":
      return isDecompress ? decompressFromUTF16 : compressToUTF16;
    case "default":
      return isDecompress ? lzDecompress : lzCompress;
    default:
      throw new Error("Invalid compress method");
  }
};

const getStorageItem = (storage: Storage, key: string, compress: Compress) => {
  const item = storage.getItem(key);
  if (item) {
    return JSON.parse(
      compress
        ? (handleCompressMethod(compress, true)(item) as string) || item
        : item
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
    compress ? (handleCompressMethod(compress)(item) as string) : item
  );
};

type Listeners<T> = (value: T) => void;

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
  let data = initialValue;
  let getInitial = false;
  let listeners = new Set<Listeners<T>>();

  const get = () => {
    if (getInitial) return data;
    if (typeof window === "undefined") return initialValue;
    getInitial = true;

    const targetValue = getStorageItem(
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
    const value = isUpdaterFn(dataOrUpdater)
      ? dataOrUpdater(data)
      : dataOrUpdater;

    setStorageItem(window[`${storage}Storage`], key, value, compress);
    data = value;
    listeners.forEach((cb) => cb(value));
  };
  const reset = () => set(initialValue);

  const subscribe = (listen: Listeners<T>) => {
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
