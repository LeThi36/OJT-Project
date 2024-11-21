package ojt.lm_backend.service;

import ojt.lm_backend.entity.User;

public interface NotificationSender {
    void sendDueDateNotifications();
    void sendNotification(User user, String subject, String message);
     void sendNotificationByEmail(String email, String subject, String message);
}
