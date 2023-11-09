import {useEffect, useState} from 'react';

export const eraseKeyOnLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

const getStorageValue = (
    key: string, defaultValue: any, factory?: Function) => {
  // getting stored value
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (saved) {
      const savedObj = JSON.parse(saved);
      return factory ? factory(savedObj) : savedObj;
    }
  }
  return defaultValue;
};

export const useLocalStorage = (
    key: string, defaultValue: any, factory?: Function) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue, factory);
  });
  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
