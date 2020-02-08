package org.benti.core.model.accounting;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.benti.core.model.Audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "transaction_types")
public class TransactionType extends Audit {

    @Id
    @Column(name = "transaction_pk", nullable = false, unique = true)
    @GeneratedValue
    private long transactionPk;

    @Column(nullable = false, unique = true)
    private String code;
    @Column(nullable = false, unique = true)
    private String name;
    private String description;

    @OneToMany(mappedBy = "transactionType")
    private Set<Transaction> transactions = new HashSet<>(0);

}
