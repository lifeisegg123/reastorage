# Reastorage

[![codecov](https://codecov.io/gh/lifeisegg123/reastorage/branch/main/graph/badge.svg?token=YQ37N8E2R3)](https://codecov.io/gh/lifeisegg123/reastorage)
[![](https://img.shields.io/bundlephobia/minzip/@reastorage/core)](https://bundlephobia.com/package/@reastorage/core)

## introduction

This library will help you use local & session storage in your application.
It provides a global state management for local or session storage, utils for Object, Array.
And also provides text compression to store more data in your storage!

## Installation

It provides 3 packages, core, react, vue.
If you use react or vue, you just need to install the corresponding package.
If you use other framework or vanilla js, you can install core package.

```bash
# npm
npm install @reastorage/react
# yarn
yarn add @reastorage/react
# pnpm
pnpm add @reastorage/react
```

## Core Apis

Core apis will be provided in all packages(core, react and vue).

### reastorage

This is a function that provides global access to local or session storage.

#### parameters

- key
  - **Required** `string`
  - Must be unique to prevent unintended data overwrite.
- initialValue
  - **Required** `T`
  - Initial value of the storage. If data has not found in storage, it will be set to this value.
- options
  - storage
    - **Optional** `'local'` | `'session'`
    - Default is `local`
    - This will determine which storage to use.
  - compress
    - **Optional** `'default'` | `'utf-16'` | `false`
    - Default is `default`
    - Use `lz-string` to compress data.
    - This will determine the strategy of compression.
      - `'default'`: use `invalid utf-16` to compress data. this will only work in webkit browsers(Android, Chrome, Safari).
      - `'utf-16'`: use `utf-16` to compress the data. this will work on every browsers, but slightly larger then `default`.
      - `false`: do not compress the data.
    - for more information, please refer to [lz-string](https://pieroxy.net/blog/pages/lz-string/index.html)
  - actions
    - **Optional** `ActionCreator`
    - Default is `undefined`
    - It takes function that update value with predefined actions.

#### return

- get
  - `() => T`
  - Get the value of the storage.
- getInitialValue
  - `() => T`
  - Get initial value which is set when creating the storage.
- set
  - `(dataOrUpdater: DataOrUpdaterFn<T>) => void`
  - Set the value of the storage.
  - It can take a value or a updater function like `setState` in `react`.
- reset
  - `() => void`
  - set value to initial value.
- subscribe
  - `(listener: (data: T) => void) => () => void`
  - Takes listener function and return a function to unsubscribe the listener.
- actions
  - `ReastorageAction`
  - Actions that has given through `options.actions`.

#### Example

```ts
const example = reastorage('example', 1, {
  actions: (prev) => {
    add: (value) => prev + value,
    subtract: (value) => prev - value,
  },
});

example.get(); // 1
example.set(10);
example.get(); // 10
example.actions.add(10);
example.get(); // 20
example.actions.subtract(10);
example.get(); // 10
example.reset();
example.get(); // 1
```

### reastorageArray

This function is similar to `reastorage`, but it provides some utils for array.

#### parameters

same as `reastorage`

#### return

- append
  - `T`
  - Add value to the end of the array.
- remove
  - `T | (T) => boolean`
  - Remove value from the array.
  - If `T` is given, it will remove the value that is equal to `T`.
  - If `(T) => boolean` is given, it will remove the value that returns `true`.

### reastorageObject

This function is also similar to `reastorage`, but it provides some utils for object.

#### parameters

same as `reastorage`

#### return

- append
  - `key: keyof T, value: T[key] | ((prev: T[key]) => T[key])`
  - It will add or update value to the object with provided key.
- remove
  - `key: keyof T`
  - It will remove value from the object with provided key.

### reastorageMachine

This function implements a finite state machine.

#### parameters

It takes key, initial state, machine, and options.
key, initial state and options are same as `reastorage`.

- machine
  - **Required** `Machine`
  - It takes a machine object that describes the state machine.

#### example

```ts
const example = reastorageMachine(`machine-example`, 1, {
  initial: "a",
  states: (prev) =>
    ({
      a: {
        SEND_B: "b",
      },
      b: {
        SEND_C: { key: "c", updater: (v: number) => prev + v },
      },
      c: {
        SEND_D: { key: "d", updater: (v: number) => prev + v },
        HANGING_C: { key: "c", updater: (v: number) => prev + v },
      },
      d: {},
    } as const),
});
example.get(); // 1
example.getMachineState(); // a;
// this will not work because current state is 'a', and a can only move to state 'b'
example.send("SEND_C", 10);
// send state to 'b'
example.send("SEND_B");
example.get(); // 1
example.getMachineState(); // b;
// send state to 'c' with update value of storage
example.send("SEND_C", 10);
example.get(); // 11
example.getMachineState(); // c;
// keep staying in 'c' with update value
example.send("HANGING_C", 1);
example.get(); // 12
example.getMachineState(); // c;
// send state to 'd'
example.send("SEND_D", 1);
example.get(); // 13
example.getMachineState(); // d;
// this will not work because current state is 'd', but 'd' does not have any transition
example.send("SEND_C", 10);
```

## Framework Apis

Framework apis will be provided in react and vue packages.

### useReastorage

This hook lets you use global storage in your application.
It will return as the same type as `useState` hook from `react`

#### parameters

- storage
  - **Required** `Reastorage`
  - Instance of `Reastorage`

#### Example

```tsx
const example = reastorage("example", 0);

function ExampleComponent() {
  const [exampleValue, setExampleValue] = useReastorage(example);
  return (
    <div>
      <button onClick={() => setExampleValue(example + 1)}>increment</button>
      <p>{exampleValue}</p>
    </div>
  );
}
```

### useReastorageValue

If you want to subscribe value of the `Reastorage`, this hook will help you.

#### parameters

- storage
  - **Required** `Reastorage`
  - Instance of `Reastorage`

#### Example

```tsx
const example = reastorage("example", 0);

function ExampleComponent() {
  const exampleValue = useReastorageValue(example);
  return (
    <div>
      <p>{exampleValue}</p>
    </div>
  );
}
```

### useSetReastorage

If you want to set value of the `Reastorage` without subscribing it, this is the hook you want.

#### parameters

- storage
  - **Required** `Reastorage`
  - Instance of `Reastorage`

#### Example

```tsx
const example = reastorage("example", 0);

function ExampleComponent() {
  const setExampleValue = useSetReastorage(example);
  return (
    <div>
      <button onClick={() => setExampleValue((prev) => prev + 1)}>
        increment
      </button>
    </div>
  );
}
```

### useResetReastorage

You can reset `Reastorage` value to initial value(declared on creation) with this hook.

#### parameters

- storage
  - **Required** `Reastorage`
  - Instance of `Reastorage`

#### Example

```tsx
const example = reastorage("example", 0);

function ExampleComponent() {
  const resetExampleValue = useResetReastorage(example);
  return (
    <div>
      <button onClick={() => resetExampleValue()}>reset</button>
    </div>
  );
}
```

### useResetReastorage

If you just want to reset value of the `Reastorage` to initialValue, this hook will help you.

#### parameters

- storage
  - **Required** `Reastorage`
  - Instance of `Reastorage`

#### Example

```tsx
const example = reastorage("example", 0);

function ExampleComponent() {
  const resetExampleValue = useResetReastorage(example);
  return (
    <div>
      <button onClick={() => resetExampleValue()}>reset</button>
    </div>
  );
}
```

### useReastorageCallback

If you need value only in specific callback, you can use this hook.

#### parameters

- callback function
  - **Required** `{ get: (storage: Reastorage) => T; set: (storage: Reastorage, DataOrUpdaterFn: T | (prev:T)=>T); actions: (storage: Reastorage) => ReastorageAction } `
  - Instance of `Reastorage`
- deps
  - **Optional** `any[]`
  - Default is `[]`
  - deps for `useCallback`

#### Example

```tsx
const example = reastorage("example", 0);
const example2 = reastorage("example2", 0);

function ExampleComponent() {
  const syncTwoExamples = useReastorageCallback(({ get, set }) => {
    const exampleValue = get(example);
    set(example2, exampleValue);
  });
  return (
    <div>
      <button onClick={syncTwoExamples}>reset</button>
    </div>
  );
}
```

### useReastorageMachine

If you want to use `ReastorageMachine`, this hook will help you.

#### parameters

- storage
  - **Required** `ReastorageMachine`
  - Instance of `ReastorageMachine`

#### Example

```tsx
const example = reastorageMachine(`machine-example`, 1, {
  initial: "a",
  states: (prev) =>
    ({
      a: {
        SEND_B: "b",
      },
      b: {
        SEND_C: { key: "c", updater: (v: number) => prev + v },
      },
      c: {
        SEND_D: { key: "d", updater: (v: number) => prev + v },
        HANGING_C: { key: "c", updater: (v: number) => prev + v },
      },
      d: {},
    } as const),
});

function ExampleComponent() {
  const [machineState, send] = useReastorageMachine(example);
  const value = useReastorageValue(example);
  return (
    <div>
      <button onClick={() => send("SEND_B")}>send b</button>
      <button onClick={() => send("SEND_C", 10)}>send c</button>
      <button onClick={() => send("HANGING_C", 1)}>hanging c</button>
      <button onClick={() => send("SEND_D", 5)}>send d</button>
      <div>current state: {machineState}</div>
      <div>current value: {value}</div>
    </div>
  );
}
```
