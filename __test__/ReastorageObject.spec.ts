import { ReastorageObject } from "../src/ReastorageObject";

type NumberRecord = Record<string, number>;

describe("ReastorageObject", () => {
  it("should append value", () => {
    const initialValue = { a: 1, b: 2 };
    const reastorage = new ReastorageObject<NumberRecord>("test", initialValue);
    reastorage.append("c", 3);
    expect(reastorage.get()).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should append value with function", () => {
    const initialValue = { a: 1, b: 2 };
    const reastorage = new ReastorageObject<NumberRecord>(
      "test2",
      initialValue
    );
    reastorage.append("a", (prev) => prev * 2);
    expect(reastorage.get()).toEqual({ a: 2, b: 2 });
  });

  it("should remove value", () => {
    const initialValue = { a: 1, b: 2 };
    const reastorage = new ReastorageObject<NumberRecord>(
      "test3",
      initialValue
    );
    reastorage.remove("a");
    expect(reastorage.get()).toEqual({ b: 2 });
  });
});
