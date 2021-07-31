package org.benti.core.model.accounting;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.benti.core.model.Audit;
import org.benti.core.model.ownership.Company;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "accounts")
public class Account extends Audit {

    @Id
    @Column(name = "account_pk", nullable = false, unique = true)
    @GeneratedValue
    private long accountPk;

    @Column(nullable = false, unique = true)
    private int code;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToOne
    @JoinColumn(name = "account_type_pk")
    private AccountType accountType;

    @ManyToOne
    @JoinColumn(name = "company_pk")
    private Company company;

    @OneToMany(mappedBy = "account")
    private Set<Transaction> transactions = new HashSet<>(0);

}
