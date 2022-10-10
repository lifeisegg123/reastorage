export type ReastoreageActions<T> = {
  [key: string]: (...args: any[]) => T;
};

export type ActionCreator<T, A> = (
  prev: T
) => A extends ReastoreageActions<T> ? A : never;
