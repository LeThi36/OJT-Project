package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.UserDto;
import ojt.lm_backend.entity.User;
import ojt.lm_backend.exception.ResourceNotFoundException;
import ojt.lm_backend.repository.UserRepository;
import ojt.lm_backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private ModelMapper modelMapper;

    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> getAllUser() {
        List<User> users = userRepository.findAll();
        return users.stream().map((u) -> modelMapper.map(u, UserDto.class)).collect(Collectors.toList());
    }

    @Override
    public String deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("user not exists with id: "+id));
        userRepository.deleteById(id);
        return "Delete User successfully";
    }

    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("user not exists with id: "+id));
        user.setAddress(userDto.getAddress());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setRole(user.getRole());
        user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        User updatedUser = userRepository.save(user);
        return modelMapper.map(updatedUser,UserDto.class);
    }
}
