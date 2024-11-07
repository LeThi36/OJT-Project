package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.entity.EmailDetail;
import ojt.lm_backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public void sendSimpleEmail(EmailDetail detail) {
        try {

            // Creating a simple mail message
            SimpleMailMessage mailMessage
                    = new SimpleMailMessage();

            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setTo(detail.getRecipient());
            mailMessage.setText(detail.getMsgBody());
            mailMessage.setSubject(detail.getSubject());

            // Sending the mail
            mailSender.send(mailMessage);
        }

        // Catch block to handle the exceptions
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
