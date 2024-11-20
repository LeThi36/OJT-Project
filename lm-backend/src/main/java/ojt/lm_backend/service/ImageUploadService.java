package ojt.lm_backend.service;

import ojt.lm_backend.dto.ImageUrlResponse;

import java.io.File;

public interface ImageUploadService {
    ImageUrlResponse uploadImageToDrive (File file, Long id);
    String bookImageUrl(File file);
    String updateBookImageUrl(File file, int id);
}
