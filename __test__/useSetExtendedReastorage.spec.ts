import { Reastorage } from "../src/Reastorage";
import { useSetExtendedReastorage } from "../src/useSetExtendedReastorage";
import { renderHook, act } from "@testing-library/react";
import { ReastorageArray } from "../src/ReastorageArray";
import { ReastorageObject } from "../src/ReastorageObject";

describe("useSetExtendedReastorage", () => {
  describe("array", () => {
    it("should append value", () => {
      const initialValue = [1, 2, 3, 4];
      const reastorage = new ReastorageArray("test", initialValue);
      const { result } = renderHook(() => useSetExtendedReastorage(reastorage));
      result.current.append(5);
      expect(reastorage.get()).toEqual([1, 2, 3, 4, 5]);
    });

    it("should remove value", () => {
      const initialValue = [1, 2, 3, 4];
      const reastorage = new ReastorageArray("test2", initialValue);
      const { result } = renderHook(() => useSetExtendedReastorage(reastorage));
      result.current.remove(3);
      expect(reastorage.get()).toEqual([1, 2, 4]);
    });

    it("should remove value with function", () => {
      const initialValue = [1, 2, 3, 4];
      const reastorage = new ReastorageArray("test3", initialValue);
      const { result } = renderHook(() => useSetExtendedReastorage(reastorage));
      result.current.remove((v) => v % 2 === 0);
      expect(reastorage.get()).toEqual([2, 4]);
    });
  });

  describe("object", () => {
    it("should append value", () => {
      const initialValue = { a: 1, b: 2, c: 3, d: 4 };
      const reastorage = new ReastorageObject("test4", initialValue);
      const { result } = renderHook(() => useSetExtendedReastorage(reastorage));
      result.current.append("e", 5);
      expect(reastorage.get()).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 });
    });

    it("should append value with function", () => {
      const initialValue = { a: 1, b: 2, c: 3, d: 4 };
      const reastorage = new ReastorageObject("test5", initialValue);
      const { result } = renderHook(() => useSetExtendedReastorage(reastorage));
      result.current.append("c", (v) => (v ? 6 : 1));
      expect(reastorage.get()).toEqual({ a: 1, b: 2, c: 6, d: 4 });
    });

    it("should remove value", () => {
      const initialValue = { a: 1, b: 2, c: 3, d: 4 };
      const reastorage = new ReastorageObject("test6", initialValue);
      const { result } = renderHook(() => useSetExtendedReastorage(reastorage));
      result.current.remove("c");
      expect(reastorage.get()).toEqual({ a: 1, b: 2, d: 4 });
    });
  });
});
