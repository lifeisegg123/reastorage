import { reastorageArray } from "../src/reastorageArray";

describe("ReastorageArray", () => {
  it("should append array item", () => {
    const initialValue = [1, 2, 3];
    const store = reastorageArray("test", initialValue);
    store.append(4);
    expect(store.get()).toEqual([1, 2, 3, 4]);
  });

  it("should remove array item", () => {
    const initialValue = [1, 2, 3];
    const store = reastorageArray("test2", initialValue);
    store.remove(1);
    expect(store.get()).toEqual([2, 3]);
  });

  it("should remove array item by function", () => {
    const initialValue = [1, 2, 3];
    const store = reastorageArray("test3", initialValue);
    store.remove((v) => v % 2 === 0);
    expect(store.get()).toEqual([2]);
  });
});
