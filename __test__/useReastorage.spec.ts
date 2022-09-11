import { reastorage } from "../src/reastorage";
import { useReastorage } from "../src/useReastorage";
import { renderHook, act } from "@testing-library/react";

describe("useReastorage", () => {
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
