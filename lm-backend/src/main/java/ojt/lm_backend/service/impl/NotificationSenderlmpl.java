package ojt.lm_backend.service.impl;

import ojt.lm_backend.LMenum.NotificationType;
import ojt.lm_backend.entity.BorrowRecord;
import ojt.lm_backend.entity.User;
import ojt.lm_backend.repository.BorrowRecordRepository;
import ojt.lm_backend.repository.UserRepository;
import ojt.lm_backend.service.NotificationSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class NotificationSenderlmpl implements NotificationSender {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private BorrowRecordRepository borrowRecordRepository;

    @Autowired
    private UserRepository userRepository;

    @Scheduled(cron = "0 0 9 * * ?") // Chạy mỗi ngày vào 9 giờ sáng
    @Override
    public void sendDueDateNotifications() {
        LocalDate today = LocalDate.now();
        LocalDate threeDaysLater = today.plusDays(3);

        // Lấy danh sách các bản ghi liên quan
        List<BorrowRecord> upcomingDueRecords = borrowRecordRepository.findDueSoon(threeDaysLater);
        List<BorrowRecord> overdueRecords = borrowRecordRepository.findOverdue(today);

        System.out.println("Upcoming due records: " + upcomingDueRecords.size());
        System.out.println("Overdue records: " + overdueRecords.size());

        // Gửi thông báo cho từng loại
        sendNotificationsForRecords(upcomingDueRecords, NotificationType.UPCOMING_DUE, today);
        sendNotificationsForRecords(overdueRecords, NotificationType.OVERDUE, today);
    }

    /**
     * Gửi thông báo dựa trên danh sách bản ghi và loại thông báo
     */
    private void sendNotificationsForRecords(List<BorrowRecord> records, NotificationType type, LocalDate currentDate) {
        for (BorrowRecord record : records) {
            User user = record.getUser();

            if (isEmailValid(user.getEmail())) {
                String subject;
                String message;

                if (type == NotificationType.UPCOMING_DUE) {
                    subject = "Sắp đến hạn trả sách";
                    message = generateUpcomingDueMessage(record);
                } else { // OVERDUE
                    subject = "Quá hạn trả sách";
                    message = generateOverdueMessage(record, currentDate);
                }

                sendNotification(user, subject, message);
            } else {
                // Log email không hợp lệ
                System.out.println("Email không hợp lệ: " + user.getEmail());
            }
        }
    }

    /**
     * Kiểm tra email có hợp lệ hay không
     */
    private boolean isEmailValid(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return email != null && email.matches(emailRegex);
    }


    /**
     * Gửi thông báo qua email
     */
    @Override
    public void sendNotification(User user, String subject, String message) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(user.getEmail());
            mailMessage.setSubject(subject);
            mailMessage.setText(message);

            // Gửi email
            mailSender.send(mailMessage);

            // Log thông báo thành công
            System.out.println("Gửi thành công đến email: " + user.getEmail());
        } catch (Exception e) {
            // Ghi log khi gửi thất bại
            System.err.println("Không thể gửi email đến: " + user.getEmail());
            e.printStackTrace();
        }
    }

    @Override
    public void sendNotificationByEmail(String email, String subject, String message) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User with email " + email + " not found."));

        // Gửi thông báo cho user
        sendNotification(user, subject, message);
    }

    /**
     * Tạo thông báo cho trường hợp sắp đến hạn
     */
    private String generateUpcomingDueMessage(BorrowRecord record) {
        return "Xin chào " + record.getUser().getUsername() + ",\n\n" +
                "Cuốn sách bạn mượn '" + record.getBook().getTitle() + "' sẽ đến hạn trả vào ngày " + record.getDueDate() + ".\n" +
                "Vui lòng trả sách đúng hạn để tránh bị phạt.";
    }

    /**
     * Tạo thông báo cho trường hợp quá hạn
     */
    private String generateOverdueMessage(BorrowRecord record, LocalDate currentDate) {
        BigDecimal fine = calculateFine(record.getDueDate(), currentDate);

        return "Xin chào " + record.getUser().getUsername() + ",\n\n" +
                "Cuốn sách bạn mượn '" + record.getBook().getTitle() + "' đã quá hạn trả vào ngày " + record.getDueDate() + ".\n" +
                "Phí phạt hiện tại là: " + fine + " VND.\n" +
                "Vui lòng trả sách và thanh toán phí phạt." +
                "\n\nChi tiết phí phạt:\n" + generateFineDetails(record.getDueDate(), currentDate);
    }

    /**
     * Tính phí phạt dựa trên số ngày quá hạn
     */
    private BigDecimal calculateFine(LocalDate dueDate, LocalDate currentDate) {
        long daysLate = java.time.temporal.ChronoUnit.DAYS.between(dueDate, currentDate);
        if (daysLate <= 0) return BigDecimal.ZERO;

        if (daysLate <= 7) return BigDecimal.valueOf(10000);
        if (daysLate <= 30) return BigDecimal.valueOf(30000);
        if (daysLate <= 90) return BigDecimal.valueOf(50000);

        long periodsOfThreeMonths = daysLate / 90;
        return BigDecimal.valueOf(50000 + periodsOfThreeMonths * 150000);
    }

    /**
     * Chi tiết phí phạt
     */
    private String generateFineDetails(LocalDate dueDate, LocalDate currentDate) {
        long daysLate = java.time.temporal.ChronoUnit.DAYS.between(dueDate, currentDate);
        if (daysLate <= 0) {
            return "Bạn chưa bị tính phí phạt.";
        } else if (daysLate <= 7) {
            return "Bạn đã quá hạn " + daysLate + " ngày. Phí phạt hiện tại là 10,000 VND.";
        } else if (daysLate <= 30) {
            return "Bạn đã quá hạn " + daysLate + " ngày. Phí phạt hiện tại là 30,000 VND.";
        } else if (daysLate <= 90) {
            return "Bạn đã quá hạn " + daysLate + " ngày. Phí phạt hiện tại là 50,000 VND.";
        } else {
            long periodsOfThreeMonths = daysLate / 90;
            BigDecimal fine = BigDecimal.valueOf(50000 + periodsOfThreeMonths * 150000);
            return "Bạn đã quá hạn " + daysLate + " ngày. Phí phạt hiện tại là " + fine + " VND.";
        }
    }


}
