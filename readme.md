# Reastorage
[![codecov](https://codecov.io/gh/lifeisegg123/reastorage/branch/main/graph/badge.svg?token=YQ37N8E2R3)](https://codecov.io/gh/lifeisegg123/reastorage)
[![](https://img.shields.io/bundlephobia/minzip/reastorage)](https://bundlephobia.com/package/reastorage)

## introduction

This library will help you use local & session storage in your application.
It provides a global state management for local or session storage, utils for Object, Array.
And also provides text compression to store more data in your storage!

## apis

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
    - use `lz-string` to compress data.
    - This will determine the strategy of compression.
      - `'default'`: use `invalid utf-16` to compress data. this will only work in webkit browsers(Android, Chrome, Safari).
      - `'utf-16'`: use `utf-16` to compress the data. this will work on every browsers, but slightly larger then `default`.
      - `false`: do not compress the data.
    - for more information, please refer to [lz-string](https://pieroxy.net/blog/pages/lz-string/index.html)

#### Example
```ts
const example = reastorage('example', 'initialValue');
example.get(); // 'initialValue'
example.set('newValue');
example.get(); // 'newValue'
```

### useReastorage
This hook lets you use global storage in your application.
It will return as the same type as `useState` hook from `react`

#### parameters
- storage
  - **Required** `Reastorage`
  - Instance of `Reastorage`

#### Example
```tsx
const example = reastorage('example', 0);

function ExampleComponent() {
  const [exampleValue, setExampleValue] = useReactorage(example);
  return (
    <div>
      <button onClick={() => setExampleValue(example + 1)}>
        increment
      </button>
      <p>{exampleValue}</p>
    </div>
  );
}
```

### useReastorageValue
If you just want to subscribe value of the `Reastorage`, this hook will help you.

#### parameters
- storage
  - **Required** `Reastorage`
  - Instance of `Reastorage`

#### Example
```tsx
const example = reastorage('example', 0);

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
If you just want to update value of the `Reastorage`, this hook will help you.

#### parameters
- storage
  - **Required** `Reastorage`
  - Instance of `Reastorage`

#### Example
```tsx
const example = reastorage('example', 0);

function ExampleComponent() {
  const setExampleValue = useSetReastorage(example);
  return (
    <div>
      <button onClick={() => setExampleValue(prev => prev + 1)}>
        increment
      </button>
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
const example = reastorage('example', 0);

function ExampleComponent() {
  const resetExampleValue = useResetReastorage(example);
  return (
    <div>
      <button onClick={() => resetExampleValue()}>
        reset
      </button>
    </div>
  );
}
```

