import { useEffect, useState } from 'react';

const KEY_PREFIX = 'VISUALISIFY-';

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = KEY_PREFIX + key;

  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return;
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === 'function') return initialValue();
    else return initialValue;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
