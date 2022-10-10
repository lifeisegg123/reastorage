import { UnionToIntersection } from "./internal";
import { ReastorageInterface } from "./reastorage";

export type MachineMap<S, T> = {
  [k: string]: { [k: string]: S | { key: S; updater: (...args: any[]) => T } };
};
export type MachineState<T> = keyof T;
export type MachineEvent<T> = keyof UnionToIntersection<T[keyof T]>;

export interface Machine<T, M> {
  initial: MachineState<M>;
  states: (prev: T) => M & MachineMap<MachineState<M>, T>;
}

export interface ReastorageMachine<T, A, M> extends ReastorageInterface<T, A> {
  getMachineState: () => MachineState<M>;
  send: <
    TEvent extends MachineEvent<M>,
    TState extends UnionToIntersection<M[keyof M]>
  >(
    event: TEvent,
    ...args: TState[TEvent] extends { updater: (...args: infer Arg) => T }
      ? Arg
      : never
  ) => void;
  subscribeMachineState(listen: (value: MachineState<M>) => void): VoidFunction;
}
