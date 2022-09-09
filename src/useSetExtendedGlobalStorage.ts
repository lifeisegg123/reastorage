import { GlobalStorageArray } from "./GlobalStorageArray";
import { GlobalStorageObject } from "./GlobalStorageObject";

export const useSetExtendedGlobalStorage = <
  T extends GlobalStorageArray<any> | GlobalStorageObject<any>
>(
  storage: T
) => {
  return {
    append: storage.append.bind(storage),
    remove: storage.remove.bind(storage),
  };
};
