import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export interface ProvidersProps {
  readonly children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
};
