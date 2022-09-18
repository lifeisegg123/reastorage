import { reastorage } from "@reastorage/core";
import { useReastorageValue } from "./useReastorageValue";

describe("useReastorageValue", () => {
  it("should get value", () => {
    const initialValue = 1;
    const store = reastorage("test", initialValue);
    const value = useReastorageValue(store);

    expect(value.value).toEqual(initialValue);
  });
});
