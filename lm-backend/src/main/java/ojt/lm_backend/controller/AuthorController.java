package ojt.lm_backend.controller;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.AuthorDto;
import ojt.lm_backend.service.AuthorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/author")
@CrossOrigin("*")
public class AuthorController {

    private AuthorService authorService;

    public ResponseEntity<List<AuthorDto>> getAllAuthor(){
        List<AuthorDto> authorDtos = authorService.getAllAuthor();
        return new ResponseEntity<>(authorDtos, HttpStatus.OK);
    }
}
