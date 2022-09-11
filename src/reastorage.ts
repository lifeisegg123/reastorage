import { ReastorageInterface } from "./ReastorageInterface";
import { DataOrUpdaterFn } from "./utils";
import { isUpdaterFn } from "./utils";

export const reastorage = <T>(
  key: string,
  initialValue: T,
  storage: "local" | "session" = "local"
): ReastorageInterface<T> => {
  let data = initialValue;
  let getInitial = false;
  let listeners = new Set<VoidFunction>();

  const get = () => {
    if (!getInitial) {
      getInitial = true;
      const targetValue = window[`${storage}Storage`].getItem(key);
      if (!targetValue) {
        window[`${storage}Storage`].setItem(key, JSON.stringify(initialValue));
      } else {
        data = JSON.parse(targetValue);
      }
    }
    return data;
  };

  const getInitialValue = () => initialValue;

  const set = (dataOrUpdater: DataOrUpdaterFn<T>) => {
    const value = isUpdaterFn(dataOrUpdater)
      ? dataOrUpdater(data)
      : dataOrUpdater;

    window[`${storage}Storage`].setItem(key, JSON.stringify(value));
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
