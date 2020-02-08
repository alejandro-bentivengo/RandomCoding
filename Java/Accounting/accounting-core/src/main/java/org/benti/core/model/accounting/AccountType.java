package org.benti.core.model.accounting;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.benti.core.model.Audit;
import org.benti.core.model.ownership.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "account_types")
public class AccountType extends Audit {

    @Id
    @Column(name = "account_type_pk", nullable = false, unique = true)
    @GeneratedValue
    private long accountTypePk;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_pk")
    private User user;

}
