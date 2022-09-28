import {
  ActionCreator,
  Compress,
  Listener,
  Options,
  ReastorageInterface,
} from "./ReastorageInterface";
import { handleCompress } from "./utils/handleCompress";
import { DataOrUpdaterFn, isUpdaterFn } from "./utils/isUpdaterFn";

export const createCustomReastorage = (
  getItem: <T>(key: string) => T | undefined,
  setItem: <T>(key: string, value: T) => void
) => {
  const getStorageItem = <T>(key: string, compress: Compress) => {
    const item = getItem<T>(key);
    if (item) {
      return compress
        ? JSON.parse(handleCompress(compress, true)(item as string) as string)
        : item;
    }
    return null;
  };
  const setStorageItem = <T>(key: string, value: T, compress: Compress) => {
    const item = JSON.stringify(value);
    setItem(key, compress ? handleCompress(compress)(item) : item);
  };
  return <U, A>(
    key: string,
    initialValue: U,
    options?: Omit<Options<U, A>, "storage">
  ): ReastorageInterface<U, A> => {
    const { compress = "default", actions: storageActions } = options || {};
    let data = initialValue;
    let getInitial = false;
    let listeners = new Set<Listener<U>>();
    const get = () => {
      if (!getInitial) {
        getInitial = true;
        const targetValue = getStorageItem<U>(key, compress);
        if (!targetValue) {
          setStorageItem(key, targetValue, compress);
        } else {
          data = targetValue;
        }
      }
      return data;
    };

    const getInitialValue = () => initialValue;

    const set = (dataOrUpdater: DataOrUpdaterFn<U>) => {
      const value = isUpdaterFn(dataOrUpdater)
        ? dataOrUpdater(data)
        : dataOrUpdater;

      setStorageItem(key, value, compress);
      data = value;
      listeners.forEach((cb) => cb(value));
    };

    const reset = () => set(initialValue);

    const subscribe = (listen: Listener<U>) => {
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
      actions: actions as ReturnType<ActionCreator<U, A>>,
    };
  };
};
