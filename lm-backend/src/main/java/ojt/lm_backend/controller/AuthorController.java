package ojt.lm_backend.controller;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.AuthorDto;
import ojt.lm_backend.service.AuthorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/author")
@CrossOrigin("*")
public class AuthorController {

    private AuthorService authorService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<AuthorDto>> getAllAuthor(@RequestParam(value = "pageNo",required = false,defaultValue = "0") int pageNo,
                                                        @RequestParam(value = "pageSize",required = false,defaultValue = "100")int pageSize){
        List<AuthorDto> authorDtos = authorService.getAllAuthor(pageNo,pageSize);
        return new ResponseEntity<>(authorDtos, HttpStatus.OK);
    }

    @GetMapping("/count")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Long> countAuthor(){
        Long count = authorService.countAuthor();
        return new ResponseEntity<>(count,HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuthorDto> addNewAuthor(@RequestBody AuthorDto authorDto){
        AuthorDto authorDto1 = authorService.addAuthor(authorDto);
        return new ResponseEntity<>(authorDto1,HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteAuthor(int id){
        String message = authorService.deleteAuthor(id);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuthorDto> updateAuthor(@RequestBody AuthorDto authorDto,
                                                  @PathVariable int id){
        AuthorDto authorDto1 = authorService.updateAuthor(authorDto,id);
        return new ResponseEntity<>(authorDto1,HttpStatus.OK);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<?> getAuthorById(@PathVariable int id){
        AuthorDto authorDto = authorService.getAuthorById(id);
        if (authorDto == null){
            return new ResponseEntity<>("author not found",HttpStatus.OK);
        }
        return new ResponseEntity<>(authorDto,HttpStatus.OK);
    }
}
