export class BiometricService {
  public static async isBiometricAvailable(): Promise<boolean> {
    return true;
  }

  public static async authenticate(): Promise<boolean> {
    return true;
  }
}
