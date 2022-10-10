import { Machine, MachineState, Options, ReastorageMachine } from "./types";
import { Listener } from "./types/internal";
import { reastorage } from "./reastorage";

export const reastorageMachine = <T, A, M>(
  key: string,
  initialValue: T,
  machine: Machine<T, M>,
  options?: Options<T, A>
): ReastorageMachine<T, A, M> => {
  type TReturn = ReastorageMachine<T, A, M>;
  const storage = reastorage(key, initialValue, options);
  const listeners = new Set<Listener<MachineState<M>>>();
  let state: MachineState<M> = machine.initial;

  const send = ((event, ...args) => {
    const machineMap = machine.states(storage.get())[state];
    const nextState = machineMap[event as keyof typeof machineMap];
    if (!nextState) return;
    if (typeof nextState === "object") {
      state = nextState.key;
      storage.set(nextState.updater(...args));
    } else {
      state = nextState as keyof M;
    }
    listeners.forEach((listener) => listener(state));
  }) as TReturn["send"];

  const getMachineState = (() => {
    return state;
  }) as TReturn["getMachineState"];

  const subscribeMachineState = (listen: (value: MachineState<M>) => void) => {
    listeners.add(listen);
    return () => {
      listeners.delete(listen);
    };
  };

  return {
    ...storage,
    send,
    getMachineState,
    subscribeMachineState,
  };
};
