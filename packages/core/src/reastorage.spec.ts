import { reastorage } from "./reastorage";

const context = describe;

describe("reastorage", () => {
  context("basic usage", () => {
    it("should get initialValue", () => {
      const initialValue = 1;
      const store = reastorage("test", initialValue);
      expect(store.getInitialValue()).toEqual(initialValue);
      expect(store.get()).toEqual(initialValue);
    });

    it("should update value", () => {
      const initialValue = 1;
      const store = reastorage("test2", initialValue);
      store.set(2);
      expect(store.get()).toEqual(2);
    });

    it("should update value with updater function", () => {
      const initialValue = 2;
      const store = reastorage("test3", initialValue);
      store.set((v) => v * 2);
      expect(store.get()).toEqual(4);
    });

    it("should reset value", () => {
      const initialValue = 1;
      const store = reastorage("test4", initialValue);
      store.set(2);
      expect(store.get()).toEqual(2);
      store.reset();
      expect(store.get()).toEqual(initialValue);
    });

    it("should call subscribe", () => {
      const initialValue = 1;
      const store = reastorage("test5", initialValue);
      const spy = jest.fn();
      store.subscribe(spy);
      store.set(2);
      store.set(4);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it("should call unsubscribe", () => {
      const initialValue = 1;
      const store = reastorage("test6", initialValue);
      const spy = jest.fn();
      const unsubscribe = store.subscribe(spy);
      unsubscribe();
      store.set(2);
      expect(spy).not.toHaveBeenCalled();
    });

    it("should have priority to stored value", () => {
      const initialValue = 1;
      window.localStorage.setItem("test7", JSON.stringify(2));
      const store = reastorage("test7", initialValue, { compress: false });
      store.set((v) => v * 2);
      expect(store.get()).toEqual(4);
    });

    it("should work with utf-16", () => {
      const initialValue = 1;
      const store = reastorage("test8", initialValue, { compress: "utf-16" });
      expect(store.get()).toEqual(initialValue);
      store.set((v) => v * 2);
      expect(store.get()).toEqual(initialValue * 2);
    });

    it("should work with custom serializer", () => {
      const initialValue = 1;
      const store = reastorage("test9", initialValue, { serializer:{ serialize: (v) => `test@@${v}`, deserialize: (v) => {console.log(v);return Number(v.replace('test@@',''))} } });
      expect(store.get()).toEqual(initialValue);
      store.set((v) => v * 2);
      expect(store.get()).toEqual(initialValue * 2);
    });
  });

  context("usage with actions", () => {
    it("should call actions", () => {
      const initialValue = 1;
      const store = reastorage("actions-test1", initialValue, {
        actions: (v) => ({
          add: (n: number) => v + n,
          increase: () => v + 1,
        }),
      });
      store.actions.add(2);
      expect(store.get()).toEqual(3);
      store.actions.increase();
      expect(store.get()).toEqual(4);
    });

    it("should call actions with object", () => {
      const initialValue: { a: number; b: number[] } = { a: 1, b: [] };
      const store = reastorage("actions-test2", initialValue, {
        actions: (v) => ({
          addA: (n: number) => ({ ...v, a: v.a + n }),
          pushB: (item: number) => ({ ...v, b: [...v.b, item] }),
        }),
      });

      store.actions.addA(2);
      expect(store.get()).toEqual({ a: 3, b: [] });
      store.actions.pushB(1);
      expect(store.get()).toEqual({ a: 3, b: [1] });
    });
  });
});
