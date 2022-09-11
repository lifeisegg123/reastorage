import { reastorageObject } from "../src/reastorageObject";

type NumberRecord = Record<string, number>;

describe("ReastorageObject", () => {
  it("should append value", () => {
    const initialValue = { a: 1, b: 2 };
    const store = reastorageObject<NumberRecord>("test", initialValue);
    store.append("c", 3);
    expect(store.get()).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should append value with function", () => {
    const initialValue = { a: 1, b: 2 };
    const store = reastorageObject<NumberRecord>("test2", initialValue);
    store.append("a", (prev) => prev * 2);
    expect(store.get()).toEqual({ a: 2, b: 2 });
  });

  it("should remove value", () => {
    const initialValue = { a: 1, b: 2 };
    const store = reastorageObject<NumberRecord>("test3", initialValue);
    store.remove("a");
    expect(store.get()).toEqual({ b: 2 });
  });
});
