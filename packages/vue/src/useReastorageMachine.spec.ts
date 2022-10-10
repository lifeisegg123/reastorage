import { reastorage, reastorageMachine } from "@reastorage/core";
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
    const [state, send] = useReastorageMachine(store);
    const value = useReastorageValue(store);

    expect(state.value).toBe("a");
    send("SEND_B");
    expect(state.value).toBe("b");
    expect(value.value).toBe(initialValue);
  });

  it("should throw error", () => {
    const store = reastorage("test2", 1);
    // @ts-expect-error
    expect(() => useReastorageMachine(store)).toThrowError();
  });
});
