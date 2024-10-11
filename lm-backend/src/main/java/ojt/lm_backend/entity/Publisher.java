package ojt.lm_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "publishers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Publisher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "publisher_id")
    private Integer publisherId;

    @Column(name = "publisher_name", nullable = false, length = 100)
    private String publisherName;

    @Column(name = "address")
    private String address;

    @Column(name = "phone_number", length = 15)
    private String phoneNumber;
}
