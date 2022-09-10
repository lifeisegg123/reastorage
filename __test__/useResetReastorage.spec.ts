import { Reastorage } from "../src/Reastorage";
import { useResetReastorage } from "../src/useResetReastorage";
import { renderHook, act } from "@testing-library/react";

describe("useResetReastorage", () => {
  it("should get value", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test", initialValue);
    const { result } = renderHook(() => useResetReastorage(reastorage));
    reastorage.set(2);
    expect(reastorage.get()).toEqual(2);
    act(() => {
      result.current();
    });
    expect(reastorage.get()).toEqual(initialValue);
  });
});
