import { reastorage } from "@reastorage/core";
import { useReastorageValue } from "./useReastorageValue";
import { useReastorageActions } from "./useReastorageActions";

describe("useReastorageActions", () => {
  it("should call actions", () => {
    const initialValue = 1;
    const store = reastorage("test", initialValue, {
      actions: (v) => ({
        add: (n: number) => v + n,
        increase: () => v + 1,
      }),
    });
    const actions = useReastorageActions(store);
    const value = useReastorageValue(store);
    actions.add(2);
    expect(value.value).toEqual(3);
    actions.increase();
    expect(value.value).toEqual(4);
  });

  it("should throw an error", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const initialValue = 1;
    const store = reastorage("test2", initialValue);
    // @ts-expect-error
    expect(() => useReastorageActions(store)).toThrowError();
  });
});
