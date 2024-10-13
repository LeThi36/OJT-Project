package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.AuthorDto;
import ojt.lm_backend.entity.Author;
import ojt.lm_backend.repository.AuthorRepository;
import ojt.lm_backend.service.AuthorService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthorServiceImpl implements AuthorService {
    private AuthorRepository authorRepository;
    private ModelMapper modelMapper;

    @Override
    public List<AuthorDto> getAllAuthor() {
        List<Author> authors =  authorRepository.findAll();
        return authors.stream().map(a -> modelMapper.map(a,AuthorDto.class)).collect(Collectors.toList());
    }

    @Override
    public Long countAuthor() {
        return authorRepository.count();
    }
}
