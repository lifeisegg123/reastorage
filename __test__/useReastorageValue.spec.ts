import { Reastorage } from "../src/Reastorage";
import { useReastorageValue } from "../src/useReastorageValue";
import { renderHook, act } from "@testing-library/react";

describe("useReastorageValue", () => {
  it("should get value", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test", initialValue);
    const { result } = renderHook(() => useReastorageValue(reastorage));

    expect(result.current).toEqual(initialValue);
  });
});
