import { createCustomReastorage } from "./createCustomReastorage";

const mockStore: Record<string, any> = {};

const customReastorage = createCustomReastorage(
  (key) => mockStore[key],
  (key, value) => (mockStore[key] = value),
  (key) => delete mockStore[key]
);

describe("ReastorageArray", () => {
  it("should work with number", () => {
    const initialValue = 1;
    const store = customReastorage("test", initialValue);
    expect(store.get()).toEqual(1);
    store.set(2);
    expect(store.get()).toEqual(2);
  });

  it("should work with object", () => {
    const initialValue = { a: 1 };
    const store = customReastorage("test2", initialValue);
    expect(store.get()).toEqual({ a: 1 });
    store.set({ a: 2 });
    expect(store.get()).toEqual({ a: 2 });
    store.set((prev) => ({ ...prev, b: 3 }));
    expect(store.get()).toEqual({ a: 2, b: 3 });
  });

  it("should work with array", () => {
    const initialValue = [1, 2, 3];
    const store = customReastorage("test3", initialValue);
    expect(store.get()).toEqual([1, 2, 3]);
    store.set([4, 5, 6]);
    expect(store.get()).toEqual([4, 5, 6]);
    store.set((prev) => [...prev, 7]);
    expect(store.get()).toEqual([4, 5, 6, 7]);
  });

  it("should handle actions", () => {
    const initialValue = 1;
    const store = customReastorage("test4", initialValue, {
      actions: (initialValue) => ({
        increment: (value: number) => initialValue + value,
      }),
    });
    expect(store.get()).toEqual(1);
    store.actions.increment(2);
    expect(store.get()).toEqual(3);
  });

  it("should call subscribe", () => {
    const initialValue = 1;
    const store = customReastorage("test5", initialValue);
    const spy = jest.fn();
    store.subscribe(spy);
    store.set(2);
    store.set(4);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should work without compress", () => {
    const initialValue = 1;
    const store = customReastorage("test6", initialValue, {
      compress: false,
    });
    expect(store.get()).toEqual(1);
    store.set(2);
    expect(store.get()).toEqual(2);
  });

  it("should work with compress utf-16 option", () => {
    const initialValue = 1;
    const store = customReastorage("test7", initialValue, {
      compress: "utf-16",
    });
    expect(store.get()).toEqual(1);
    store.set(2);
    expect(store.get()).toEqual(2);
  });

  it("should remove storage item", () => {
    const initialValue = 1;
    const store = customReastorage("test8", initialValue, {
      compress: "utf-16",
    });
    expect(store.get()).toEqual(1);
    store.set(2);
    expect(store.get()).toEqual(2);

    store.removeItem();
    expect(store.get()).toEqual(undefined);
  });
});
