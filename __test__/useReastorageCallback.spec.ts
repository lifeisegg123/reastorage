import { Reastorage } from "../src/Reastorage";
import { useReastorageCallback } from "../src/useReastorageCallback";
import { renderHook, act } from "@testing-library/react";

describe("useReastorageCallback", () => {
  it("should get value", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test", initialValue);
    const { result } = renderHook(() =>
      useReastorageCallback(({ get }) => {
        expect(get(reastorage)).toEqual(initialValue);
      })
    );
    act(() => {
      result.current();
    });
  });

  it("should update value", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test2", initialValue);
    const { result } = renderHook(() =>
      useReastorageCallback(({ set }) => {
        set(reastorage, 2);
      })
    );
    act(() => {
      result.current();
    });

    expect(reastorage.get()).toEqual(2);
  });

  it("should update value with function", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test3", initialValue);
    const { result } = renderHook(() =>
      useReastorageCallback(({ set }) => {
        set(reastorage, (prev) => prev + 20);
      })
    );
    act(() => {
      result.current();
    });

    expect(reastorage.get()).toEqual(21);
  });
});
