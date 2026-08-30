import ReactNativeBiometrics, {
  BiometryTypes,
} from 'react-native-biometrics';

class BiometricService {
  private rnBiometrics = new ReactNativeBiometrics();

  async isAvailable(): Promise<boolean> {
    try {
      const { available } = await this.rnBiometrics.isSensorAvailable();
      return Boolean(available);
    } catch {
      return false;
    }
  }

  async biometricType(): Promise<string | null> {
    try {
      const { available, biometryType } = await this.rnBiometrics.isSensorAvailable();

      if (!available) {
        return null;
      }

      switch (biometryType) {
        case BiometryTypes.TouchID:
          return 'TouchID';

        case BiometryTypes.FaceID:
          return 'FaceID';

        case BiometryTypes.Biometrics:
          return 'Fingerprint';

        default:
          return null;
      }
    } catch {
      return null;
    }
  }

  async authenticate(promptMessage: string = 'Unlock LifeOS'): Promise<boolean> {
    try {
      const { success } = await this.rnBiometrics.simplePrompt({
        promptMessage,
        cancelButtonText: 'Use Master Password',
      });

      return Boolean(success);
    } catch {
      return false;
    }
  }
}

export default new BiometricService();