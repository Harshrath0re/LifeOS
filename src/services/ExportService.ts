export class ExportService {
  public static async exportUserDataAsJson(): Promise<string> {
    return JSON.stringify({});
  }

  public static async importUserData(_jsonData: string): Promise<boolean> {
    return true;
  }
}
