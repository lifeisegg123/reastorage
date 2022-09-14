import { reastorage } from "@reastorage/core";
import { useReastorageValue } from "./useReastorageValue";
import { renderHook } from "@testing-library/react";

describe("useReastorageValue", () => {
  it("should get value", () => {
    const initialValue = 1;
    const store = reastorage("test", initialValue);
    const { result } = renderHook(() => useReastorageValue(store));

    expect(result.current).toEqual(initialValue);
  });
});
