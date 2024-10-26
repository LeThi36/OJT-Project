package ojt.lm_backend.service;

import ojt.lm_backend.entity.EmailDetail;

public interface EmailService {
    void sendSimpleEmail(EmailDetail detail);
}
