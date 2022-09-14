import { reastorage } from "@reastorage/core";
import { useResetReastorage } from "./useResetReastorage";
import { renderHook, act } from "@testing-library/react";

describe("useResetReastorage", () => {
  it("should reset value", () => {
    const initialValue = 1;
    const store = reastorage("test", initialValue);
    const { result } = renderHook(() => useResetReastorage(store));
    store.set(2);
    expect(store.get()).toEqual(2);
    act(() => {
      result.current();
    });
    expect(store.get()).toEqual(initialValue);
  });
});
