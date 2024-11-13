package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.CategoryDto;
import ojt.lm_backend.entity.Category;
import ojt.lm_backend.repository.CategoryRepository;
import ojt.lm_backend.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;

    private ModelMapper modelMapper;

    @Override
    public CategoryDto addCategory(CategoryDto categoryDto) {
        Category category = modelMapper.map(categoryDto,Category.class);
        Category savedCategory = categoryRepository.save(category);
        return modelMapper.map(savedCategory,CategoryDto.class);
    }

    @Override
    public List<CategoryDto> getAllCategory(int pageNo,int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Category> categories = categoryRepository.findAll(pageable);
        List<Category> categories1 = categories.getContent();
        return categories1.stream().map(c->modelMapper.map(c,CategoryDto.class)).collect(Collectors.toList());
    }

    @Override
    public CategoryDto getCategoryById(int id) {
        Category category = categoryRepository.findById(id).orElse(null);
        return modelMapper.map(category,CategoryDto.class);
    }

    @Override
    public Long countCategory() {
        return categoryRepository.count();
    }
}
