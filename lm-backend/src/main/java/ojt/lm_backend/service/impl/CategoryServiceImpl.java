package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.CategoryDto;
import ojt.lm_backend.entity.Book;
import ojt.lm_backend.entity.BookReview;
import ojt.lm_backend.entity.BorrowRecord;
import ojt.lm_backend.entity.Category;
import ojt.lm_backend.exception.ResourceNotFoundException;
import ojt.lm_backend.repository.BookRepository;
import ojt.lm_backend.repository.BookReviewRepository;
import ojt.lm_backend.repository.BorrowRecordRepository;
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

    private BookRepository bookRepository;

    private BookReviewRepository bookReviewRepository;

    private BorrowRecordRepository borrowRecordRepository;

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

    @Override
    public String delectCategoryById(int id) {
        List<Book> books = bookRepository.findBookByCategoryId(id);
        if (!books.isEmpty()) {
            for (Book b : books) {
                List<BookReview> bookReviews = bookReviewRepository.findByBookId(b.getBookId());
                if (!bookReviews.isEmpty()) {
                    bookReviewRepository.deleteAll(bookReviews);
                }
                List<BorrowRecord> borrowRecords = borrowRecordRepository.findByBookId(b.getBookId());
                if(!borrowRecords.isEmpty()){
                    borrowRecordRepository.deleteAll(borrowRecords);
                }
            }
            bookRepository.deleteAll(books);
        }
        List<BookReview> bookReviews = bookReviewRepository.findByBookId(id);
        if (!bookReviews.isEmpty()) {
            bookReviewRepository.deleteAll(bookReviews);
        }
        Category category = categoryRepository.findById(id).orElseThrow(() -> {
            throw new ResourceNotFoundException("can not find category Id: " + id);
        });
        categoryRepository.delete(category);
        return "delete category successfully";
    }

    @Override
    public CategoryDto updateCategoryName(CategoryDto categoryDto) {
        Category category = categoryRepository.findById(categoryDto.getCategoryId()).orElseThrow(() -> {throw new ResourceNotFoundException("cannot find this category");});
        category.setCategoryName(categoryDto.getCategoryName());
        return modelMapper.map(categoryRepository.save(category),CategoryDto.class);
    }

    @Override
    public List<String> findAllCategoryName() {
        return categoryRepository.findAllCategoryNames().stream().collect(Collectors.toList());
    }
}
