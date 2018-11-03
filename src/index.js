import isString from 'lodash-es/isString';
import set from 'lodash-es/set';
import { useEffect, useState } from 'react';
import {
  action, getState, subscribe, subscribeSync, unsubscribe,
} from 'statezero';

const PACKAGE_NAME = 'statezero-react-hooks';

const setStateByPath = action(({ commit, state }, path, value) => {
  set(state, path, value);
  commit(state);
});

export const useStatezero = (filter, isSync = false) => {
  const initialState = getState(filter);
  const [state, setState] = useState(initialState);
  const subscribeFn = isSync ? subscribeSync : subscribe;
  const effect = () => {
    const subscription = subscribeFn(setState, filter);
    return () => {
      unsubscribe(subscription);
    };
  };
  useEffect(effect, state);
  return state;
};

export const useStatezeroPath = (path, isSync = false) => {
  if (!isString(path)) {
    throw new Error(`${PACKAGE_NAME}: useStatezeroPath() must be called with a String "path" argument, not: ${path}`);
  }

  const state = useStatezero(path, isSync);
  const setState = (value) => {
    setStateByPath(path, value);
  };
  return [state, setState];
};

export const useStatezeroSync = filter => useStatezero(filter, true);

export const useStatezeroPathSync = path => useStatezeroPath(path, true);
