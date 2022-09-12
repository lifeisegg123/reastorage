import { reastorage } from "../src/reastorage";
import { reastorageArray } from "../src/reastorageArray";
import { reastorageObject } from "../src/reastorageObject";
import { useReastorage } from "../src/useReastorage";
import { renderHook, act } from "@testing-library/react";

describe("useReastorage", () => {
  describe("with reastorage", () => {
    it("should get value", () => {
      const initialValue = 1;
      const store = reastorage("test", initialValue);
      const { result } = renderHook(() => useReastorage(store));
      expect(result.current[0]).toEqual(initialValue);
    });

    it("should update value", () => {
      const initialValue = 1;
      const store = reastorage("test2", initialValue);
      const { result } = renderHook(() => useReastorage(store));
      expect(result.current[0]).toEqual(initialValue);
      act(() => {
        result.current[1](2);
      });
      expect(result.current[0]).toEqual(2);
    });

    it("should update value with update function", () => {
      const initialValue = 1;
      const store = reastorage("test3", initialValue);
      const { result } = renderHook(() => useReastorage(store));
      expect(result.current[0]).toEqual(initialValue);
      act(() => {
        result.current[1]((v) => v + 10);
      });
      expect(result.current[0]).toEqual(11);
    });
  });

  describe("with reastorageArray", () => {
    it("should get value", () => {
      const initialValue = [1, 2, 3];
      const store = reastorageArray("test-arr", initialValue);
      const { result } = renderHook(() => useReastorage(store));
      expect(result.current[0]).toEqual(initialValue);
    });

    it("should update value", () => {
      const initialValue = [1, 2, 3];
      const store = reastorageArray("test-arr2", initialValue);
      const { result } = renderHook(() => useReastorage(store));
      expect(result.current[0]).toEqual(initialValue);
      act(() => {
        result.current[1]([2, 3, 4]);
      });
      expect(result.current[0]).toEqual([2, 3, 4]);
    });

    it("should update value with update function", () => {
      const initialValue = [1, 2, 3];
      const store = reastorageArray("test-arr3", initialValue);
      const { result } = renderHook(() => useReastorage(store));
      expect(result.current[0]).toEqual(initialValue);
      act(() => {
        result.current[1]((v) => v.map((vv) => vv + 10));
      });
      expect(result.current[0]).toEqual([11, 12, 13]);
    });
  });

  describe("with reastorageObject", () => {
    it("should get value", () => {
      const initialValue = { a: 1, b: 2, c: 3 };
      const store = reastorageObject("test-obj", initialValue);
      const { result } = renderHook(() => useReastorage(store));
      expect(result.current[0]).toEqual(initialValue);
    });

    it("should update value", () => {
      const initialValue = { a: 1, b: 2, c: 3 };
      const store = reastorageObject("test-obj2", initialValue);
      const { result } = renderHook(() => useReastorage(store));
      expect(result.current[0]).toEqual(initialValue);
      act(() => {
        result.current[1]({ a: 4, b: 5, c: 6 });
      });
      expect(result.current[0]).toEqual({ a: 4, b: 5, c: 6 });
    });

    it("should update value with update function", () => {
      const initialValue = { a: 1, b: 2, c: 3 };
      const store = reastorageObject("test-obj3", initialValue);
      const { result } = renderHook(() => useReastorage(store));
      expect(result.current[0]).toEqual(initialValue);
      act(() => {
        result.current[1](
          (v) =>
            Object.fromEntries(
              Object.entries(v).map(
                ([key, value]) => [key, value + 10] as const
              )
            ) as typeof initialValue
        );
      });
      expect(result.current[0]).toEqual({ a: 11, b: 12, c: 13 });
    });
  });
});
