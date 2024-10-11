package ojt.lm_backend.service;

import ojt.lm_backend.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAllUser();
    String deleteUser(Long id);
    UserDto updateUser(Long id, UserDto userDto);
}