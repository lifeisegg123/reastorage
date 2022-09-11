import { reastorage } from "../src/reastorage";

describe("reastorage", () => {
  it("should get initialValue", () => {
    const initialValue = 1;
    const store = reastorage("test", initialValue);
    expect(store.getInitialValue()).toEqual(initialValue);
    expect(store.get()).toEqual(initialValue);
  });

  it("should update value", () => {
    const initialValue = 1;
    const store = reastorage("test2", initialValue);
    store.set(2);
    expect(store.get()).toEqual(2);
  });

  it("should update value with updater function", () => {
    const initialValue = 2;
    const store = reastorage("test2", initialValue);
    store.set((v) => v * 2);
    expect(store.get()).toEqual(4);
  });

  it("should reset value", () => {
    const initialValue = 1;
    const store = reastorage("test2", initialValue);
    store.set(2);
    expect(store.get()).toEqual(2);
    store.reset();
    expect(store.get()).toEqual(initialValue);
  });

  it("should call subscribe", () => {
    const initialValue = 1;
    const store = reastorage("test2", initialValue);
    const spy = jest.fn();
    store.subscribe(spy);
    store.set(2);
    store.set(4);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should call unsubscribe", () => {
    const initialValue = 1;
    const store = reastorage("test2", initialValue);
    const spy = jest.fn();
    const unsubscribe = store.subscribe(spy);
    unsubscribe();
    store.set(2);
    expect(spy).not.toHaveBeenCalled();
  });
});
