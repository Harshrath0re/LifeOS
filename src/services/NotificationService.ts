import { NotificationChannel } from '../constants/notification';

export class NotificationService {
  public static async requestPermission(): Promise<boolean> {
    return true;
  }

  public static async scheduleNotification(
    _title: string,
    _body: string,
    _date: Date,
    _channel: NotificationChannel,
  ): Promise<string> {
    return 'notification_id';
  }

  public static async cancelNotification(_id: string): Promise<void> {}
}
