package ojt.lm_backend.service;

import ojt.lm_backend.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    CategoryDto addCategory(CategoryDto categoryDto);
    List<CategoryDto> getAllCategory();
}
