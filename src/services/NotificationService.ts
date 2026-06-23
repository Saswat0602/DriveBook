import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export class NotificationService {
  static async requestPermissions(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    
    return finalStatus === 'granted';
  }

  static async scheduleReminder(reminderId: string, title: string, body: string, dateStr: string): Promise<string[]> {
    // We cancel any existing notifications for this reminder first
    await this.cancelReminder(reminderId);

    const hasPermission = await this.requestPermissions();
    if (!hasPermission) return [];

    const dueDate = new Date(dateStr);
    const scheduledIds: string[] = [];

    // Schedule 30, 15, 7, and 1 days before
    const triggerOffsets = [30, 15, 7, 1];
    
    for (const offset of triggerOffsets) {
      const triggerDate = new Date(dueDate);
      triggerDate.setDate(triggerDate.getDate() - offset);
      // Set time to 9 AM
      triggerDate.setHours(9, 0, 0, 0);

      // Only schedule if the date is in the future
      if (triggerDate > new Date()) {
        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: `Reminder: ${title}`,
            body: `Due in ${offset} day(s): ${body}`,
            data: { reminderId },
          },
          trigger: { 
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: triggerDate 
          },
        });
        scheduledIds.push(id);
      }
    }

    return scheduledIds;
  }

  static async cancelReminder(reminderId: string): Promise<void> {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    const toCancel = scheduled.filter(n => n.content.data?.reminderId === reminderId);
    
    for (const notification of toCancel) {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
  }
}
