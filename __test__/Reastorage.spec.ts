import { Reastorage } from "../src/Reastorage";

describe("Reastorage", () => {
  it("should get initialValue", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test", initialValue);
    expect(reastorage.getInitialValue()).toEqual(initialValue);
    expect(reastorage.get()).toEqual(initialValue);
  });

  it("should update value", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test2", initialValue);
    reastorage.set(2);
    expect(reastorage.get()).toEqual(2);
  });

  it("should update value with updater function", () => {
    const initialValue = 2;
    const reastorage = new Reastorage("test2", initialValue);
    reastorage.set((v) => v * 2);
    expect(reastorage.get()).toEqual(4);
  });

  it("should reset value", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test2", initialValue);
    reastorage.set(2);
    expect(reastorage.get()).toEqual(2);
    reastorage.reset();
    expect(reastorage.get()).toEqual(initialValue);
  });

  it("should call subscribe", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test2", initialValue);
    const spy = jest.fn();
    reastorage.subscribe(spy);
    reastorage.set(2);
    reastorage.set(4);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should call unsubscribe", () => {
    const initialValue = 1;
    const reastorage = new Reastorage("test2", initialValue);
    const spy = jest.fn();
    const unsubscribe = reastorage.subscribe(spy);
    unsubscribe();
    reastorage.set(2);
    expect(spy).not.toHaveBeenCalled();
  });
});
