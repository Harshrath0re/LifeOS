import React from 'react';
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS } from '../../../theme/radius';
import { rw, rh } from '../../../theme/responsive';
import { Text } from '../../atoms/Text';

export interface ModalProps extends RNModalProps {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly title?: string;
  readonly children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  ...props
}) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      {...props}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {title ? (
                <Text variant="h3" style={styles.title}>
                  {title}
                </Text>
              ) : null}
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: rw(24),
  },
  container: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.card,
    padding: rw(20),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    marginBottom: rh(16),
  },
});
