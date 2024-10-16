package ojt.lm_backend.service;

import ojt.lm_backend.dto.AuthorDto;

import java.util.List;

public interface AuthorService {
    List<AuthorDto> getAllAuthor();

    Long countAuthor();

    AuthorDto addAuthor(AuthorDto authorDto);

    String deleteAuthor(int id);

    AuthorDto updateAuthor(AuthorDto authorDto,int id);

    AuthorDto getAuthorById(int id);
}
