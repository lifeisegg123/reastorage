import { ReactorageArray } from "./ReactorageArray";
import { ReactorageObject } from "./ReactorageObject";

export const useSetExtendedReactorage = <
  T extends ReactorageArray<any> | ReactorageObject<any>
>(
  storage: T
) => {
  return {
    append: storage.append.bind(storage),
    remove: storage.remove.bind(storage),
  };
};
