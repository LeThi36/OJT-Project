package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.PublisherDto;
import ojt.lm_backend.entity.Publisher;
import ojt.lm_backend.repository.PublisherRepository;
import ojt.lm_backend.service.PublisherService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PublisherImpl implements PublisherService {

    private PublisherRepository publisherRepository;

    private ModelMapper modelMapper;


    @Override
    public List<PublisherDto> getAllPublisher() {
        List<Publisher> publishers = publisherRepository.findAll();
        return publishers.stream().map(p -> modelMapper.map(p,PublisherDto.class)).collect(Collectors.toList());
    }

    @Override
    public PublisherDto addNewPublisher(PublisherDto publisherDto) {
        Publisher publisher = new Publisher();
        publisher.setPublisherName(publisherDto.getPublisherName());
        publisher.setAddress(publisherDto.getAddress());
        publisher.setPhoneNumber(publisherDto.getPhoneNumber());
        publisherRepository.save(publisher);
        return modelMapper.map(publisher,PublisherDto.class);
    }

    @Override
    public PublisherDto getPublisherById(int id) {
        Publisher publisher = publisherRepository.findById(id).orElse(null);
        return modelMapper.map(publisher,PublisherDto.class);
    }

    @Override
    public String deletePublisher(int id) {
        Publisher publisher = publisherRepository.findById(id).orElse(null);
        if(publisher == null){
            return "cannot delete this publisher";
        }
        publisherRepository.deleteById(id);
        return "deleted publisher successfully";
    }
}
