import { reastorage } from "@reastorage/core";
import { useRemoveReastorage } from "./useRemoveReastorage";
import { renderHook, act } from "@testing-library/react";

describe("useRemoveReastorage", () => {
  it("should remove storage item", () => {
    const initialValue = 1;
    const store = reastorage("remove_test", initialValue);
    const { result } = renderHook(() => useRemoveReastorage(store));
    expect(store.get()).toEqual(1);
    act(() => {
      result.current();
    });
    expect(store.get()).toEqual(undefined);
  });
});
