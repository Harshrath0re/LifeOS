import { useCallback, useState } from 'react';

export const useBiometric = () => {
  const [isSupported] = useState<boolean>(true);
  const [isEnrolled] = useState<boolean>(true);

  const authenticate = useCallback(async (): Promise<boolean> => {
    return true;
  }, []);

  return { isSupported, isEnrolled, authenticate };
};
