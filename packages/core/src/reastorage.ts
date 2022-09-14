import { Compress, Options, ReastorageInterface } from "./ReastorageInterface";
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

export const reastorage = <T>(
  key: string,
  initialValue: T,
  options: Options = { storage: "local", compress: "default" }
): ReastorageInterface<T> => {
  const { storage, compress } = options;
  let data = initialValue;
  let getInitial = false;
  let listeners = new Set<VoidFunction>();

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
    listeners.forEach((cb) => cb());
  };
  const reset = () => set(initialValue);

  const subscribe = (listen: VoidFunction) => {
    listeners.add(listen);
    return () => {
      listeners.delete(listen);
    };
  };

  return {
    get,
    getInitialValue,
    reset,
    set,
    subscribe,
  };
};
