package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.UserDto;
import ojt.lm_backend.entity.Role;
import ojt.lm_backend.entity.User;
import ojt.lm_backend.exception.ResourceNotFoundException;
import ojt.lm_backend.repository.RoleRepository;
import ojt.lm_backend.repository.UserRepository;
import ojt.lm_backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;

    private ModelMapper modelMapper;

    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> getAllUser(int pageNo,int pageSize) {
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<User> users = userRepository.findAll(pageable);
        List<User> users1 = users.getContent();
        return users1.stream().map((u) -> modelMapper.map(u, UserDto.class)).collect(Collectors.toList());
    }

    @Override
    public String deleteUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if(user == null){
            return "can find this user to delete";
        }else {
            userRepository.deleteById(id);
            return "Delete User successfully";
        }
    }

    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id).orElse(null);
        if(user == null){
            return null;
        } else {
            user.setAddress(userDto.getAddress());
            user.setPhoneNumber(userDto.getPhoneNumber());
            user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            User updatedUser = userRepository.save(user);
            return modelMapper.map(updatedUser, UserDto.class);
        }
    }

    @Override
    public List<UserDto> findByNameContaining(String username) {
        List<User> users = userRepository.findByUsernameContaining(username);
        return users.stream().map(u -> modelMapper.map(u, UserDto.class)).collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(Long id){
        User user = userRepository.findById(id).orElse(null);
        if(user == null){
            return null;
        } else {
            return modelMapper.map(user,UserDto.class);
        }
    }

    @Override
    public Long userCount() {
        return userRepository.count();
    }

    @Override
    public UserDto updateRoleLib(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null){
            Role role1 = roleRepository.findByRoleName("ROLE_LIBRARIAN");
            user.setRole(role1);
            userRepository.save(user);
            return modelMapper.map(user,UserDto.class);
        }
        return null;
    }

    @Override
    public UserDto updateRoleUse(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if(user != null){
            Role role1 = roleRepository.findByRoleName("ROLE_USER");
            user.setRole(role1);
            userRepository.save(user);
            return modelMapper.map(user,UserDto.class);
        }
        return null;
    }

    @Override
    public List<UserDto> getUserByEmailOrUsername(String emailOrUsername) {
        List<User> list = userRepository.findByContent(emailOrUsername,emailOrUsername);
        return list.stream().map(u -> modelMapper.map(u,UserDto.class)).collect(Collectors.toList());
    }

}
