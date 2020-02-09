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
@Entity(name = "transactions")
public class Transaction extends Audit {

    @Id
    @Column(name = "transaction_pk", nullable = false, unique = true)
    @GeneratedValue
    private long transactionPk;

    @Column(nullable = false)
    private String detail;

    @Column(nullable = false)
    private double amount;

    private String comments;

    @ManyToOne
    @JoinColumn(name = "account_pk")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "user_pk")
    private User user;

    @ManyToOne
    @JoinColumn(name = "transaction_type_pk")
    private TransactionType transactionType;

}
