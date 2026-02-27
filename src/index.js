import { useEffect, useState } from "react";
import { getState, setState, subscribe, unsubscribe } from "statezero";

export const useStatezero = (selector, isSync = false) => {
  const initialState = getState(selector);
  const [value, setValue] = useState(initialState);
  useEffect(() => {
    const subscription = subscribe(setValue, selector, isSync);
    return () => {
      unsubscribe(subscription);
    };
  }, [selector, isSync]);
  return value;
};

export const useStatezeroPath = (path, isSync = false) => {
  if (typeof path !== "string" && !(path instanceof String)) {
    const msg = `statezero-react-hooks: useStatezeroPath() must be called with a String "path" argument, not: ${path}`;
    throw new Error(msg);
  }

  const value = useStatezero(path, isSync);
  const setPathValue = (newValue) => {
    setState(path, newValue);
  };
  return [value, setPathValue];
};

export const useStatezeroSync = (selector) => useStatezero(selector, true);

export const useStatezeroPathSync = (path) => useStatezeroPath(path, true);
