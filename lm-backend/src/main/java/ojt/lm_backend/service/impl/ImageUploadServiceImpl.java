package ojt.lm_backend.service.impl;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.ImageUrlResponse;
import ojt.lm_backend.entity.Book;
import ojt.lm_backend.entity.User;
import ojt.lm_backend.exception.ResourceNotFoundException;
import ojt.lm_backend.repository.BookRepository;
import ojt.lm_backend.repository.UserRepository;
import ojt.lm_backend.service.ImageUploadService;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
@AllArgsConstructor
public class ImageUploadServiceImpl implements ImageUploadService {
    private UserRepository userRepository;
    private BookRepository bookRepository;

    private static final String SERVICE_ACCOUNT_KEY_PATH = getPathToGoogleCredentials();

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();


    private static String getPathToGoogleCredentials() {
        String currentDirectory = System.getProperty("user.dir");
        Path filePath = Paths.get(currentDirectory, "cred.json");
        return filePath.toString();
    }

    @Override
    public ImageUrlResponse uploadImageToDrive(File file, Long id) {

        ImageUrlResponse imageUrlResponse = new ImageUrlResponse();
        try {
            String folderId = "1ovsrBW5SEmUr6VlQ2vnN_YtC4oqT_40x";
            Drive drive = createDriveService();
            com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
            fileMetaData.setName(file.getName());
            fileMetaData.setParents(Collections.singletonList(folderId));
            FileContent mediaContent = new FileContent("image/jpeg", file);
            com.google.api.services.drive.model.File uploadedFile = drive.files().create(fileMetaData, mediaContent)
                    .setFields("id").execute();
            String imageUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFile.getId();
            System.out.println("IMGAE URL: " + imageUrl);
            file.delete();
            imageUrlResponse.setStatus(200);
            imageUrlResponse.setMessage("image Successfully uploaded To drive");
            imageUrlResponse.setUrl(imageUrl);
            User user = userRepository.findById(id).orElse(null);
            user.setImageUrl(imageUrl);
            userRepository.save(user);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            imageUrlResponse.setStatus(500);
            imageUrlResponse.setMessage(e.getMessage());
        }
        return imageUrlResponse;
    }

    @Override
    public String bookImageUrl(File file) {
        try {
            String folderId = "1ovsrBW5SEmUr6VlQ2vnN_YtC4oqT_40x";
            Drive drive = createDriveService();
            com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
            fileMetaData.setName(file.getName());
            fileMetaData.setParents(Collections.singletonList(folderId));
            FileContent mediaContent = new FileContent("image/jpeg", file);
            com.google.api.services.drive.model.File uploadedFile = drive.files().create(fileMetaData, mediaContent)
                    .setFields("id").execute();
            String imageUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFile.getId();
            System.out.println("IMGAE URL: " + imageUrl);
            file.delete();
            return imageUrl;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @Override
    public String updateBookImageUrl(File file, int id) {
        try {
            String folderId = "1ovsrBW5SEmUr6VlQ2vnN_YtC4oqT_40x";
            Drive drive = createDriveService();
            com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
            fileMetaData.setName(file.getName());
            fileMetaData.setParents(Collections.singletonList(folderId));
            FileContent mediaContent = new FileContent("image/jpeg", file);
            com.google.api.services.drive.model.File uploadedFile = drive.files().create(fileMetaData, mediaContent)
                    .setFields("id").execute();
            String imageUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFile.getId();
            System.out.println("IMGAE URL: " + imageUrl);
            file.delete();
            Book book = bookRepository.findById(id).orElse(null);
            book.setImageUrl(imageUrl);
            bookRepository.save(book);
            return imageUrl;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    private Drive createDriveService() throws GeneralSecurityException, IOException {
        GoogleCredential credential = GoogleCredential.fromStream(new FileInputStream(SERVICE_ACCOUNT_KEY_PATH))
                .createScoped(Collections.singleton(DriveScopes.DRIVE));

        return new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                credential)
                .build();
    }

}
