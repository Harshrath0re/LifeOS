export interface User {
  readonly id: string;
  readonly name: string;
  readonly email?: string;
  readonly avatarUrl?: string;
  readonly isBiometricEnabled: boolean;
  readonly createdAt: string;
}
