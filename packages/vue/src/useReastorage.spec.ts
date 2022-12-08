import {
  reastorage,
  reastorageArray,
  reastorageObject,
} from "@reastorage/core";
import { useReastorage } from "./useReastorage";

describe("useReastorage", () => {
  describe("with reastorage", () => {
    it("should get value", () => {
      const initialValue = 1;
      const store = reastorage("test", initialValue);
      const [value] = useReastorage(store);
      expect(value.value).toEqual(initialValue);
    });

    it("should update value", () => {
      const initialValue = 1;
      const store = reastorage("test2", initialValue);
      const [value, setValue] = useReastorage(store);
      expect(value.value).toEqual(initialValue);

      setValue(2);
      expect(value.value).toEqual(2);
    });

    it("should update value with update function", () => {
      const initialValue = 1;
      const store = reastorage("test3", initialValue);
      const [value, setValue] = useReastorage(store);
      expect(value.value).toEqual(initialValue);
      setValue((v) => v + 10);
      expect(value.value).toEqual(11);
    });
  });

  describe("with reastorageArray", () => {
    it("should get value", () => {
      const initialValue = [1, 2, 3];
      const store = reastorageArray("test-arr", initialValue);
      const [value] = useReastorage(store);
      expect(value.value).toEqual(initialValue);
    });

    it("should update value", () => {
      const initialValue = [1, 2, 3];
      const store = reastorageArray("test-arr2", initialValue);
      const [value, setValue] = useReastorage(store);
      expect(value.value).toEqual(initialValue);
      setValue([2, 3, 4]);
      expect(value.value).toEqual([2, 3, 4]);
    });

    it("should update value with update function", () => {
      const initialValue = [1, 2, 3];
      const store = reastorageArray("test-arr3", initialValue);
      const [value, setValue] = useReastorage(store);
      expect(value.value).toEqual(initialValue);
      setValue((v) => v.map((vv) => vv + 10));
      expect(value.value).toEqual([11, 12, 13]);
    });
  });

  describe("with reastorageObject", () => {
    it("should get value", () => {
      const initialValue = { a: 1, b: 2, c: 3 };
      const store = reastorageObject("test-obj", initialValue);
      const [value, setValue] = useReastorage(store);
      expect(value.value).toEqual(initialValue);
    });

    it("should update value", () => {
      const initialValue = { a: 1, b: 2, c: 3 };
      const store = reastorageObject("test-obj2", initialValue);
      const [value, setValue] = useReastorage(store);
      expect(value.value).toEqual(initialValue);
      setValue({ a: 4, b: 5, c: 6 });
      expect(value.value).toEqual({ a: 4, b: 5, c: 6 });
    });

    it("should update value with update function", () => {
      const initialValue = { a: 1, b: 2, c: 3 };
      const store = reastorageObject("test-obj3", initialValue);
      const [value, setValue] = useReastorage(store);
      expect(value.value).toEqual(initialValue);
      setValue(
        (v) =>
          Object.fromEntries(
            Object.entries(v).map(([key, value]) => [key, value + 10] as const)
          ) as typeof initialValue
      );
      expect(value.value).toEqual({ a: 11, b: 12, c: 13 });
    });
  });
});
