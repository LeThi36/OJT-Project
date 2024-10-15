package ojt.lm_backend.controller;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.PublisherDto;
import ojt.lm_backend.service.PublisherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
