import { reastorage } from "@reastorage/core";
import { useReastorageValue } from "./useReastorageValue";
import { useSetReastorage } from "./useSetReastorage";

describe("useSetReastorage", () => {
  it("should update value", () => {
    const initialValue = 1;
    const store = reastorage("test", initialValue);
    const setValue = useSetReastorage(store);
    const value = useReastorageValue(store);
    expect(value.value).toEqual(initialValue);
    setValue(2);
    expect(value.value).toEqual(2);
  });

  it("should update value with update function", () => {
    const initialValue = 1;
    const store = reastorage("test2", initialValue);
    const setValue = useSetReastorage(store);
    const value = useReastorageValue(store);
    expect(value.value).toEqual(initialValue);
    setValue((v) => v + 10);
    expect(value.value).toEqual(11);
  });
});
