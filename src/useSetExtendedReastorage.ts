import { ReastorageArray } from "./ReastorageArray";
import { ReastorageObject } from "./ReastorageObject";

export const useSetExtendedReastorage = <
  T extends ReastorageArray<any> | ReastorageObject<any>
>(
  storage: T
) => {
  return {
    append: storage.append.bind(storage),
    remove: storage.remove.bind(storage),
  };
};
