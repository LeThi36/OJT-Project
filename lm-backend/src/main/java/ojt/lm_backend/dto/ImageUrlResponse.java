package ojt.lm_backend.dto;

import lombok.Data;

@Data
public class ImageUrlResponse {
    private int status;
    private String message;
    private String url;
}
