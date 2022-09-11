import { reastorage } from "../src/reastorage";
import { useSetReastorage } from "../src/useSetReastorage";
import { renderHook, act } from "@testing-library/react";

describe("useSetReastorage", () => {
  it("should update value", () => {
    const initialValue = 1;
    const store = reastorage("test", initialValue);
    const { result } = renderHook(() => useSetReastorage(store));
    expect(store.get()).toEqual(initialValue);
    act(() => {
      result.current(2);
    });
    expect(store.get()).toEqual(2);
  });

  it("should update value with update function", () => {
    const initialValue = 1;
    const store = reastorage("test2", initialValue);
    const { result } = renderHook(() => useSetReastorage(store));
    expect(store.get()).toEqual(initialValue);
    act(() => {
      result.current((v) => v + 10);
    });
    expect(store.get()).toEqual(11);
  });
});
