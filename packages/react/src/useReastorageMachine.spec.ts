import { reastorage, reastorageMachine } from "@reastorage/core";
import { act, renderHook } from "@testing-library/react";
import { useReastorageMachine } from "./useReastorageMachine";
import { useReastorageValue } from "./useReastorageValue";

describe("useReastorageMachine", () => {
  it("should send to proper state", () => {
    const initialValue = 1;
    const store = reastorageMachine("test1", initialValue, {
      initial: "a",
      states: (prev) => ({
        a: {
          SEND_B: "b",
        },
        b: {
          SEND_C: { key: "c", updater: (v: number) => prev + v },
        },
        c: {
          SEND_D: { key: "d", updater: (v: number) => prev + v },
          HANGING_C: { key: "c", updater: (v: number) => prev + v },
        },
        d: {},
      }),
    });
    const { result } = renderHook(() => useReastorageMachine(store));
    const { result: value } = renderHook(() => useReastorageValue(store));

    expect(result.current[0]).toBe("a");
    act(() => {
      result.current[1]("SEND_B");
    });
    expect(result.current[0]).toBe("b");
    expect(value.current).toBe(initialValue);
  });

  it("should throw error", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const store = reastorage("test2", 1);
    // @ts-expect-error
    expect(() => renderHook(() => useReastorageMachine(store))).toThrowError();
  });
});
