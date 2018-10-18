package com.moodtracker;

import android.app.Activity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.NotificationManagerCompat;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import static com.moodtracker.MainActivity.AlarmActivityDelegate.INITIAL_PAGE_ARG;

public class CustomNotificationModule extends ReactContextBaseJavaModule {

  public CustomNotificationModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "CustomNotification";
  }

  @ReactMethod
  public void showReminderNotification(String title, String message) {
    createNotificationChannel();

    Intent intent = new Intent(getReactApplicationContext(), MainActivity.class);
    intent.putExtra(INITIAL_PAGE_ARG, "MoodEntry");
    PendingIntent pendingIntent = PendingIntent.getActivity(getReactApplicationContext(), 0, intent, 0);
    NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(getReactApplicationContext(), CHANNEL_ID)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentTitle(title)
            .setContentText(message)
            .setContentIntent(pendingIntent)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT);

    NotificationManagerCompat notificationManager = NotificationManagerCompat.from(getReactApplicationContext());
    notificationManager.notify(REMINDER_NOTIFICATION_ID, mBuilder.build());
  }

  private static final String CHANNEL_ID = "REMINDER_NOTIFICATION_CHANNEL";
  private static final int REMINDER_NOTIFICATION_ID = 3;

  private void createNotificationChannel() {
    // Create the NotificationChannel, but only on API 26+ because
    // the NotificationChannel class is new and not in the support library
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      Context context = getReactApplicationContext();
      CharSequence name = context.getString(R.string.reminder_notification_channel);
      String description = context.getString(R.string.reminder_notification_description);
      int importance = NotificationManager.IMPORTANCE_DEFAULT;
      NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
      channel.setDescription(description);
      // Register the channel with the system; you can't change the importance
      // or other notification behaviors after this
      NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
      notificationManager.createNotificationChannel(channel);
    }
  }

}