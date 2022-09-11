import { useSetExtendedReastorage } from "../src/useSetExtendedReastorage";
import { renderHook, act } from "@testing-library/react";
import { reastorageArray } from "../src/reastorageArray";
import { reastorageObject } from "../src/reastorageObject";

type NumberRecord = Record<string, number>;

describe("useSetExtendedReastorage", () => {
  describe("array", () => {
    it("should append value", () => {
      const initialValue = [1, 2, 3, 4];
      const store = reastorageArray("test", initialValue);
      const { result } = renderHook(() => useSetExtendedReastorage(store));
      result.current.append(5);
      expect(store.get()).toEqual([1, 2, 3, 4, 5]);
    });

    it("should remove value", () => {
      const initialValue = [1, 2, 3, 4];
      const store = reastorageArray("test2", initialValue);
      const { result } = renderHook(() => useSetExtendedReastorage(store));
      result.current.remove(3);
      expect(store.get()).toEqual([1, 2, 4]);
    });

    it("should remove value with function", () => {
      const initialValue = [1, 2, 3, 4];
      const store = reastorageArray("test3", initialValue);
      const { result } = renderHook(() => useSetExtendedReastorage(store));
      result.current.remove((v) => v % 2 === 0);
      expect(store.get()).toEqual([2, 4]);
    });
  });

  describe("object", () => {
    it("should append value", () => {
      const initialValue = { a: 1, b: 2, c: 3, d: 4 };
      const store = reastorageObject<NumberRecord>("test4", initialValue);
      const { result } = renderHook(() => useSetExtendedReastorage(store));
      result.current.append("e", 5);
      expect(store.get()).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 });
    });

    it("should append value with function", () => {
      const initialValue = { a: 1, b: 2, c: 3, d: 4 };
      const store = reastorageObject<NumberRecord>("test5", initialValue);
      const { result } = renderHook(() => useSetExtendedReastorage(store));
      result.current.append("c", (v) => (v ? 6 : 1));
      expect(store.get()).toEqual({ a: 1, b: 2, c: 6, d: 4 });
    });

    it("should remove value", () => {
      const initialValue = { a: 1, b: 2, c: 3, d: 4 };
      const store = reastorageObject<NumberRecord>("test6", initialValue);
      const { result } = renderHook(() => useSetExtendedReastorage(store));
      result.current.remove("c");
      expect(store.get()).toEqual({ a: 1, b: 2, d: 4 });
    });
  });
});
