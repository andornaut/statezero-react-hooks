import { useEffect, useState } from 'react';
import {
  getState, setState, subscribe, unsubscribe,
} from 'statezero';

export const useStatezero = (selector, isSync = false) => {
  const initialState = getState(selector);
  // eslint-disable-next-line no-shadow
  const [value, setValue] = useState(initialState);
  const effect = () => {
    const subscription = subscribe(setValue, selector, isSync);
    return () => {
      unsubscribe(subscription);
    };
  };
  useEffect(effect, value);
  return value;
};

export const useStatezeroPath = (path, isSync = false) => {
  if (typeof path !== 'string' && !(path instanceof String)) {
    const msg = `statezero-react-hooks: useStatezeroPath() must be called with a String "path" argument, not: ${path}`;
    throw new Error(msg);
  }

  const value = useStatezero(path, isSync);
  const setValue = (newValue) => {
    setState(path, newValue);
  };
  return [value, setValue];
};

export const useStatezeroSync = filter => useStatezero(filter, true);

export const useStatezeroPathSync = path => useStatezeroPath(path, true);
