import { reastorage } from "@reastorage/core";
import { useReastorageSelector } from "./useReastorageSelector";
import { renderHook, act } from "@testing-library/react";

describe("useReastorageSelector", () => {
  it("should select properValue", () => {
    const initialValue = { a: 1, b: "string", c: { d: 2 } };
    const store = reastorage("test", initialValue);
    const { result } = renderHook(() =>
      useReastorageSelector(store, ({ c }) => c.d)
    );

    expect(result.current).toEqual(2);
  });
});
