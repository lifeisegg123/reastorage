import { Reastorage } from "../src/Reastorage";
import { useSetReastorage } from "../src/useSetReastorage";
import { renderHook, act } from "@testing-library/react";

describe("useSetReastorage", () => {
  it("should update value", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test", initialValue);
    const { result } = renderHook(() => useSetReastorage(reastorage));
    expect(reastorage.get()).toEqual(initialValue);
    act(() => {
      result.current(2);
    });
    expect(reastorage.get()).toEqual(2);
  });

  it("should update value with update function", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test2", initialValue);
    const { result } = renderHook(() => useSetReastorage(reastorage));
    expect(reastorage.get()).toEqual(initialValue);
    act(() => {
      result.current((v) => v + 10);
    });
    expect(reastorage.get()).toEqual(11);
  });
});
