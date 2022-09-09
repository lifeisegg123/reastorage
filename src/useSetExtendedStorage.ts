import { StorageArray } from "./StorageArray";
import { StorageObject } from "./StorageObject";

export const useSetExtendedStorage = <
  T extends StorageArray<any> | StorageObject<any>
>(
  storage: T
) => {
  return {
    append: storage.append.bind(storage),
    remove: storage.remove.bind(storage),
  };
};
