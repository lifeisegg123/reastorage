import { reastorage } from "@reastorage/core";
import { useReastorageCallback } from "./useReastorageCallback";
import { renderHook, act } from "@testing-library/react";

describe("useReastorageCallback", () => {
  it("should get value", () => {
    const initialValue = 1;
    const store = reastorage("test", initialValue);
    const { result } = renderHook(() =>
      useReastorageCallback(({ get }) => {
        expect(get(store)).toEqual(initialValue);
      })
    );
    act(() => {
      result.current();
    });
  });

  it("should update value", () => {
    const initialValue = 1;
    const store = reastorage("test2", initialValue);
    const { result } = renderHook(() =>
      useReastorageCallback(({ set }) => {
        set(store, 2);
      })
    );
    act(() => {
      result.current();
    });

    expect(store.get()).toEqual(2);
  });

  it("should update value with function", () => {
    const initialValue = 1;
    const store = reastorage("test3", initialValue);
    const { result } = renderHook(() =>
      useReastorageCallback(({ set }) => {
        set(store, (prev) => prev + 20);
      })
    );
    act(() => {
      result.current();
    });

    expect(store.get()).toEqual(21);
  });
});
