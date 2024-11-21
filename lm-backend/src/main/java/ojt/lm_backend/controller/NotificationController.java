package ojt.lm_backend.controller;


import ojt.lm_backend.entity.User;
import ojt.lm_backend.service.NotificationSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationSender notificationSender;

    @PostMapping("/send")
    public ResponseEntity<String> sendNotifications() {
        try {
            notificationSender.sendDueDateNotifications();
            return ResponseEntity.ok("Notifications sent successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send notifications: " + e.getMessage());
        }
    }

    /**
     * API kiểm tra hoạt động của hệ thống thông báo
     */
    @GetMapping("/health-check")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Notification service is running.");
    }

    /**
     * API để gửi thông báo cụ thể tới một người dùng
     */

//    @PostMapping("/send-to-user")
//    public ResponseEntity<String> sendNotificationToUser(
//            @RequestParam String email,
//            @RequestParam String subject,
//            @RequestParam String message
//    ) {
//        try {
//            // Chuyển logic đến Service
//            notificationSender.sendNotificationByEmail(email, subject, message);
//            return ResponseEntity.ok("Notification sent to user: " + email);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(404).body(e.getMessage()); // Xử lý nếu không tìm thấy User
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body("Failed to send notification: " + e.getMessage());
//        }
//    }

}
