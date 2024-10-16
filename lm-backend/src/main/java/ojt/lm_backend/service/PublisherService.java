package ojt.lm_backend.service;

import ojt.lm_backend.dto.PublisherDto;

import java.util.List;

public interface PublisherService {
    List<PublisherDto> getAllPublisher();

    PublisherDto addNewPublisher(PublisherDto publisherDto);

    PublisherDto getPublisherById(int id);

    String deletePublisher(int id);
}
