import { Reastorage } from "../src/Reastorage";
import { useReastorage } from "../src/useReastorage";
import { renderHook, act } from "@testing-library/react";

describe("useReastorage", () => {
  it("should get value", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test", initialValue);
    const { result } = renderHook(() => useReastorage(reastorage));
    expect(result.current[0]).toEqual(initialValue);
  });

  it("should update value", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test2", initialValue);
    const { result } = renderHook(() => useReastorage(reastorage));
    expect(result.current[0]).toEqual(initialValue);
    act(() => {
      result.current[1](2);
    });
    expect(result.current[0]).toEqual(2);
  });

  it("should update value with update function", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test3", initialValue);
    const { result } = renderHook(() => useReastorage(reastorage));
    expect(result.current[0]).toEqual(initialValue);
    act(() => {
      result.current[1]((v) => v + 10);
    });
    expect(result.current[0]).toEqual(11);
  });
});
