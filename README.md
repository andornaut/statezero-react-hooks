# statezero-react-hooks

[![npm version](https://badge.fury.io/js/statezero-react-hooks.svg)](https://www.npmjs.com/package/statezero-react-hooks)
[![CI](https://github.com/andornaut/statezero-react-hooks/workflows/Release/badge.svg)](https://github.com/andornaut/statezero-react-hooks/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[React hooks](https://react.dev/reference/react/hooks) for [statezero](https://github.com/andornaut/statezero).

## Getting Started

Install from [npm](https://www.npmjs.com/package/statezero-react-hooks).

```bash
npm install react statezero statezero-react-hooks --save
```

statezero-react-hooks is packaged as both ESM and UMD bundles:

### ES6 Module (Recommended)

```javascript
import { useStatezero, useStatezeroPath } from "statezero-react-hooks";
```

### ES6 Module from Source

Import directly from unbundled source files for maximum flexibility:

```javascript
// Note that the import path ends with '/src'
import { useStatezero, useStatezeroPath } from "statezero-react-hooks/src";
```

This gives your bundler complete control over transpilation and tree-shaking.

### Browser Global

```html
<script src="./node_modules/statezero/dist/statezero.js"></script>
<script src="./node_modules/statezero-react-hooks/dist/statezero-react-hooks.js"></script>
<script>
  const { useStatezero } = window.statezeroReactHooks;
</script>
```

## Usage

### useStatezero(selector, isSync)

Subscribe to state changes matching the selector. Returns the current selected state value.

- `selector` - Optional. A string path, array of paths, or selector function (see [statezero selectors](https://github.com/andornaut/statezero#subscribing-to-state-change-notifications))
- `isSync` - Optional. If true, updates are synchronous; otherwise debounced (default: false)

```javascript
import { useStatezero } from "statezero-react-hooks";

function Counter() {
  const count = useStatezero("count");
  return <div>Count: {count}</div>;
}

function UserProfile() {
  const user = useStatezero((state) => state.user);
  return <div>Hello, {user?.name}</div>;
}
```

### useStatezeroPath(path, isSync)

Subscribe to a specific path in state. Returns a `[value, setValue]` tuple similar to React's `useState`.

- `path` - Required. A dot notation string path (e.g., `"count"`, `"user.name"`, `"deeply.nested.value"`). Unlike `useStatezero`, this hook does **not** accept function or array selectors.
- `isSync` - Optional. If true, updates are synchronous; otherwise debounced (default: false)

```javascript
import { useStatezeroPath } from "statezero-react-hooks";

function Counter() {
  const [count, setCount] = useStatezeroPath("count");
  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function NestedValue() {
  const [value, setValue] = useStatezeroPath("deeply.nested.value");
  return (
    <input value={value || ""} onChange={(e) => setValue(e.target.value)} />
  );
}
```

### Sync Variants

By default, state change notifications are debounced to the next tick. Use the sync variants for immediate updates:

```javascript
import { useStatezeroSync, useStatezeroPathSync } from "statezero-react-hooks";

const count = useStatezeroSync("count");
const [value, setValue] = useStatezeroPathSync("path.to.value");
```

### Selector Stability

When using function or array selectors, define them outside the component or memoize them to avoid resubscribing on every render:

```javascript
// Good: selector defined outside component
const selectUser = (state) => state.user;

function UserProfile() {
  const user = useStatezero(selectUser);
  return <div>{user?.name}</div>;
}

// Good: memoized selector
function FilteredItems({ category }) {
  const selector = useMemo(
    () => (state) => state.items.filter((i) => i.category === category),
    [category],
  );
  const items = useStatezero(selector);
  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>{i.name}</li>
      ))}
    </ul>
  );
}
```

String path selectors (e.g., `"user.name"`) don't have this issue since strings are primitives.

## API Reference

| Hook                   | Arguments              | Returns           | Description                                       |
| ---------------------- | ---------------------- | ----------------- | ------------------------------------------------- |
| `useStatezero`         | `(selector?, isSync?)` | `value`           | Subscribe to state, return selected value         |
| `useStatezeroSync`     | `(selector?)`          | `value`           | Synchronous version of useStatezero               |
| `useStatezeroPath`     | `(path, isSync?)`      | `[value, setter]` | Subscribe to string path, return value and setter |
| `useStatezeroPathSync` | `(path)`               | `[value, setter]` | Synchronous version of useStatezeroPath           |

## Developing

```bash
npm install
npm run build        # Development build (UMD + ESM)
npm run format       # Format code with prettier
npm run lint         # ESLint with zero-warning policy
npm run test         # Run tests with Jest
npm run test:watch   # Run tests in watch mode
npm run size         # Check bundle size limits
```

## Related Projects

- [statezero](https://github.com/andornaut/statezero) - The core state management library
