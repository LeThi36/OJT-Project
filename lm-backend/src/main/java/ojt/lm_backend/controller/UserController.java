package ojt.lm_backend.controller;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.ImageUrlResponse;
import ojt.lm_backend.dto.UserDto;
import ojt.lm_backend.service.ImageUploadService;
import ojt.lm_backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
    private UserService userService;
    private ImageUploadService imageUploadService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUser() {
        List<UserDto> userDtoList = userService.getAllUser();
        return new ResponseEntity<>(userDtoList, HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id) {
        String message = userService.deleteUser(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<UserDto> updateUserById(@PathVariable Long id,
                                                  @RequestBody UserDto userDto) {
        UserDto userDto1 = userService.updateUser(id, userDto);
        return new ResponseEntity<>(userDto1, HttpStatus.OK);
    }

    @GetMapping("/username/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> findByUsernameContain(@PathVariable String username) {
        List<UserDto> userDtoList = userService.findByNameContaining(username);
        return new ResponseEntity<>(userDtoList, HttpStatus.OK);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        UserDto userDto = userService.getUserById(id);
        if (userDto == null) {
            return new ResponseEntity<>("can not find this user", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        }
    }

    @GetMapping("/count")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Long> userCount(){
        Long count = userService.userCount();
        return new ResponseEntity<>(count,HttpStatus.OK);
    }

    @PatchMapping("{id}/librarian")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> updateRoleLib(@PathVariable Long id){
        return new ResponseEntity<>(userService.updateRoleLib(id),HttpStatus.OK);
    }

    @PatchMapping("{id}/user")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> updateRoleUse(@PathVariable Long id){
        return new ResponseEntity<>(userService.updateRoleUse(id),HttpStatus.OK);
    }

    @PostMapping("/uploadToGoogleDrive/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public Object handleFileUpload(@RequestParam("image") MultipartFile file,@PathVariable Long id) throws IOException {
        if (file.isEmpty()) {
            return "file is empty";
        }
        File tempFile = File.createTempFile("temp", null);
        file.transferTo(tempFile);
        ImageUrlResponse res = imageUploadService.uploadImageToDrive(tempFile,id);
        System.out.println(res);
        return res;
    }
}
