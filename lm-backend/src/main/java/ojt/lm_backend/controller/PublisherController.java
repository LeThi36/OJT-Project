package ojt.lm_backend.controller;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.PublisherDto;
import ojt.lm_backend.service.PublisherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/publisher")
@CrossOrigin("*")
public class PublisherController {
    private PublisherService publisherService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<PublisherDto>> getAllPublisher() {
        return new ResponseEntity<>(publisherService.getAllPublisher(), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PublisherDto> addNewPublisher(@RequestBody PublisherDto publisherDto){
        return new ResponseEntity<>(publisherService.addNewPublisher(publisherDto),HttpStatus.OK);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<PublisherDto> getPublisherById(@PathVariable int id){
        return new ResponseEntity<>(publisherService.getPublisherById(id),HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN','USER')")
    public ResponseEntity<String> deletePublisherById(@PathVariable int id){
        return new ResponseEntity<>(publisherService.deletePublisher(id),HttpStatus.OK);
    }
}
