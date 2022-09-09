# Reactorage

## introduction

This library will help you use local & session storage in your application.
it provides a global state management for local or session storage, classes for Object, Array and even custom classes.

## apis

### Reactorage
This is a singleton class that provides global access to local or session storage.

#### parameters
- key
  - **Required** `string`
  - Must be unique to prevent unintended data overwrite.
- initialValue
  - **Required** `T`
  - Initial value of the storage. If data has not found in storage, it will be set to this value.
- storage
  - **Optional** `local` | `session`
  - Default is `local`
  - This will determine which storage to use.

#### Example
```ts
const example = new Reactorage('example','initialValue');
const example2 = new Reactorage('example2', 2);
```

### useReactorage
This hook lets you use global storage in your application.
It will return as the same type as `useState` hook from `react`

#### parameters
- storage
  - **Required** `Reactorage`
  - Instance of `Reactorage`

#### Example
```tsx
const example = new Reactorage('example', 0);

function ExampleComponent() {
  const [example, setExample] = useReactorage(example);
  return (
    <div>
      <button onClick={() => setExample(example + 1)}>
        increment
      </button>
      <p>{example}</p>
    </div>
  );
}
```