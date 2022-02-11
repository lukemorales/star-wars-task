import { useEffect, useLayoutEffect, useRef } from 'react';

export const useTimeout = (cb: () => void, ms = 350, isEnabled = true) => {
  const cbRef = useRef(cb);

  useLayoutEffect(() => {
    cbRef.current = cb;
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isEnabled) {
      timeout = setTimeout(cbRef.current, ms);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [ms, isEnabled]);
};
