import { reastorage } from "@reastorage/core";
import { useReastorageValue } from "./useReastorageValue";
import { useResetReastorage } from "./useResetReastorage";

describe("useResetReastorage", () => {
  it("should reset value", () => {
    const initialValue = 1;
    const store = reastorage("test", initialValue);
    const reset = useResetReastorage(store);
    const value = useReastorageValue(store);
    store.set(2);
    expect(value.value).toEqual(2);
    reset();
    expect(value.value).toEqual(initialValue);
  });
});
