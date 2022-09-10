import { ReastorageArray } from "../src/ReastorageArray";

describe("ReastorageArray", () => {
  it("should append array item", () => {
    const initialValue = [1, 2, 3];
    const reastorage = new ReastorageArray("test", initialValue);
    reastorage.append(4);
    expect(reastorage.get()).toEqual([1, 2, 3, 4]);
  });

  it("should remove array item", () => {
    const initialValue = [1, 2, 3];
    const reastorage = new ReastorageArray("test2", initialValue);
    reastorage.remove(1);
    expect(reastorage.get()).toEqual([2, 3]);
  });

  it("should remove array item by function", () => {
    const initialValue = [1, 2, 3];
    const reastorage = new ReastorageArray("test3", initialValue);
    reastorage.remove((v) => v % 2 === 0);
    expect(reastorage.get()).toEqual([2]);
  });

  it("should throws an error with non-array value", () => {
    const initialValue = 1;
    // @ts-ignore
    const reastorage = new ReastorageArray("test4", initialValue);
    expect(reastorage.get).toThrowError();
  });
});
