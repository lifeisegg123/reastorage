import { reastorage } from "@reastorage/core";
import { useReastorageActions } from "./useReastorageActions";
import { renderHook, act } from "@testing-library/react";

describe("useReastorageActions", () => {
  it("should call actions", () => {
    const initialValue = 1;
    const store = reastorage("test", initialValue, {
      actions: (v) => ({
        add: (n: number) => v + n,
        increase: () => v + 1,
      }),
    });
    const { result } = renderHook(() => useReastorageActions(store));
    act(() => {
      result.current.add(2);
    });
    expect(store.get()).toEqual(3);
    act(() => {
      result.current.increase();
    });
    expect(store.get()).toEqual(4);
  });
});
