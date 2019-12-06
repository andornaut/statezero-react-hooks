# statezero-react-hooks

[React hooks](https://reactjs.org/docs/hooks-intro.html) for [statezero](https://github.com/andornaut/statezero).

## Getting Started

Install from [npm](https://www.npmjs.com/package/statezero-react-hooks).

```bash
# Install peer dependencies
npm install react --save
npm install statezero --save

npm install statezero-react-hooks --save
```

### ES6 Module

```javascript
import { useStatezero } from 'statezero-react-hooks';
```

### ES6 Module with tree shaking (not transpiled)

```javascript
// Note that the import path ends with '/src'
import { useStatezero } from 'statezero-react-hooks/src';
```

## Usage

Provides the following functions:

```javascript
import { useStatezero, useStatezeroPath, useStatezeroPathSync, useStatezeroSync } from 'statezero-react-hooks';

let state, setState;
state = useStatezero(selector);
state = useStatezeroSync(selector);
[state, setState] = useStatezeroPath(path);
[state, setState] = useStatezeroPathSync(path);
```

### Example React components

```javascript
import { useStatezero, useStatezeroPath } from 'statezero-react-hooks/src';

export const component = ({ selector }) => {
  const state = useStatezero(selector);
  // ...
}

export const component = () => {
  const [z, setZ] = useStatezeroPath('x.y.z');
}
```
