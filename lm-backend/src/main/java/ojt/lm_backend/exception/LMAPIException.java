package ojt.lm_backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class LMAPIException extends RuntimeException {
    private HttpStatus status;
    private String message;
}
