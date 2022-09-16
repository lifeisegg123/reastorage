import { ReastorageArray, ReastorageObject } from "@reastorage/core";

type AnyRecord = Record<string, any>;

type Append<
  T extends ReastorageArray<Array<any>> | ReastorageObject<AnyRecord>
> = T extends ReastorageArray<Array<any>> | ReastorageObject<AnyRecord>
  ? T["append"]
  : never;

type Remove<
  T extends ReastorageArray<Array<any>> | ReastorageObject<AnyRecord>
> = T extends ReastorageArray<Array<any>> | ReastorageObject<AnyRecord>
  ? T["remove"]
  : never;

export const useSetExtendedReastorage = <
  T extends ReastorageArray<Array<any>> | ReastorageObject<AnyRecord>
>(
  storage: T
) => {
  return {
    append: storage.append as Append<T>,
    remove: storage.remove as Remove<T>,
  };
};