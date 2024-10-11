package ojt.lm_backend.controller;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.UserDto;
import ojt.lm_backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {
    private UserService userService;

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
    public ResponseEntity<?> getUserById(@PathVariable Long id){
        UserDto userDto = userService.getUserById(id);
        if(userDto == null){
            return new ResponseEntity<>("can not find this user",HttpStatus.OK);
        } else {
            return new ResponseEntity<>(userDto,HttpStatus.OK);
        }
    }

}
