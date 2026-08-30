import ReactNativeBiometrics, {
  BiometryTypes,
} from 'react-native-biometrics';

class BiometricService {
  private rnBiometrics = new ReactNativeBiometrics();

  async isAvailable(): Promise<boolean> {
    const { available } =
      await this.rnBiometrics.isSensorAvailable();

    return available;
  }

  async biometricType(): Promise<
    string | null
  > {
    const { available, biometryType } =
      await this.rnBiometrics.isSensorAvailable();

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
  }

  async authenticate(): Promise<boolean> {
    const { success } =
      await this.rnBiometrics.simplePrompt({
        promptMessage: 'Unlock LifeOS',
        cancelButtonText: 'Use PIN',
      });

    return success;
  }
}

export default new BiometricService();