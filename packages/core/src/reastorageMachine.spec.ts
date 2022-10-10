import { ReastorageMachine } from "types";
import { reastorageMachine } from "./reastorageMachine";

describe("ReastorageMachine", () => {
  const initialValue = 1;
  let counter = 1;
  let store: ReastorageMachine<
    number,
    unknown,
    {
      a: {
        SEND_B: "b";
      };
      b: {
        SEND_C: {
          key: "c";
          updater: (v: number) => number;
        };
      };
      c: {
        SEND_D: {
          key: "d";
          updater: (v: number) => number;
        };
        HANGING_C: {
          key: "c";
          updater: (v: number) => number;
        };
      };
      d: {};
    }
  >;
  beforeEach(() => {
    store = reastorageMachine(`machine-test${counter++}`, initialValue, {
      initial: "a",
      states: (prev) =>
        ({
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
        } as const),
    });
  });

  it("should send to proper state", () => {
    expect(store.getMachineState()).toEqual("a");
    store.send("SEND_B");
    expect(store.getMachineState()).toEqual("b");
    expect(store.get()).toEqual(initialValue);
    store.send("SEND_C", 2);
    expect(store.getMachineState()).toEqual("c");
    expect(store.get()).toEqual(initialValue + 2);
    store.send("SEND_D", 4);
    expect(store.getMachineState()).toEqual("d");
    expect(store.get()).toEqual(initialValue + 2 + 4);
  });

  it("should not send to unintended state", () => {
    expect(store.getMachineState()).toEqual("a");
    store.send("SEND_C", 2);
    expect(store.getMachineState()).toEqual("a");
    expect(store.get()).toEqual(initialValue);
  });

  it("should hanging in c for three times", () => {
    expect(store.getMachineState()).toEqual("a");
    store.send("SEND_B");
    store.send("SEND_C", 2);
    expect(store.getMachineState()).toEqual("c");
    expect(store.get()).toEqual(initialValue + 2);
    store.send("HANGING_C", 2);
    expect(store.getMachineState()).toEqual("c");
    expect(store.get()).toEqual(initialValue + 2 * 2);
    store.send("HANGING_C", 2);
    expect(store.getMachineState()).toEqual("c");
    expect(store.get()).toEqual(initialValue + 2 * 3);
  });
});
