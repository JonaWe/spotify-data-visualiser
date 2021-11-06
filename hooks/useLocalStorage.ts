import { useEffect, useState } from 'react';

const KEY_PREFIX = 'VISUALISIFY-';

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const prefixedKey = KEY_PREFIX + key;

  const [value, setValue] = useState(initialValue);

  // loads the saved value from localStorage on the initial load
  useEffect(() => {
    const stringValue = localStorage.getItem(prefixedKey);
    setValue(stringValue == null ? initialValue : JSON.parse(stringValue));
  }, []);

  // whenever the state is switched the localStorage gets updated
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
