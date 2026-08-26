import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSQLite } from '../hooks/useSQLite';
import { Loader } from '../components/atoms/Loader';
import { COLORS } from '../theme/colors';

export interface BootstrapProps {
  readonly children: React.ReactNode;
}

export const Bootstrap: React.FC<BootstrapProps> = ({ children }) => {
  const { isReady } = useSQLite();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (isReady) {
      setIsAppReady(true);
    }
  }, [isReady]);

  if (!isAppReady) {
    return (
      <View style={styles.loadingContainer}>
        <Loader size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
