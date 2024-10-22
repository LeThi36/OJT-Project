package ojt.lm_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "book_image")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BookImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private Book book;
    @Column(name = "position")
    private Long position;
    @Column(name = "url")
    private String url;
}
