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

    @Override
    public AuthorDto addAuthor(AuthorDto authorDto) {
        Author author = new Author();
        author.setAuthorName(authorDto.getAuthorName());
        authorRepository.save(author);
        return modelMapper.map(author,AuthorDto.class);
    }

    @Override
    public String deleteAuthor(int id) {
        Author author = authorRepository.findById(id).orElse(null);
        if(author == null){
            return "cannot delete author";
        }
        return "author deleted successfully";
    }

    @Override
    public AuthorDto updateAuthor(AuthorDto authorDto,int id) {
        Author author = authorRepository.findById(id).orElse(null);
        if(author == null){
            return null;
        }
        author.setAuthorName(authorDto.getAuthorName());
        return modelMapper.map(author,AuthorDto.class);
    }

    @Override
    public AuthorDto getAuthorById(int id) {
        Author author = authorRepository.findById(id).orElse(null);
        return modelMapper.map(author,AuthorDto.class);
    }
}
