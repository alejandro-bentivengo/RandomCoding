package org.benti.core.model.ownership;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.benti.core.model.Audit;
import org.benti.core.model.accounting.Account;

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
@Entity(name = "companies")
public class Company extends Audit {

    @Id
    @Column(name = "company_pk", nullable = false, unique = true)
    @GeneratedValue
    private long companyPk;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String code;

    @OneToMany(mappedBy = "company")
    private Set<Account> accounts = new HashSet<>(0);
}
