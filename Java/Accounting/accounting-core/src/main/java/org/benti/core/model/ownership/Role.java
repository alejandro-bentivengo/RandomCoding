package org.benti.core.model.ownership;

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
import java.io.Serializable;
import java.util.Set;

/**
 * @author Alejandro Bentivengo
 * @name Role
 * @date 1/29/2020
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Role extends Audit implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "role_pk", nullable = false, unique = true)
    private long rolePk;

    @Column(nullable = false, unique = true)
    private String name;

    /**
     * This permissions could be simplified with numbers
     * based on the entity
     */
    // Add Permissions
    @Column(nullable = false)
    private boolean canAddTransactions;
    @Column(nullable = false)
    private boolean canAddAccounts;
    @Column(nullable = false)
    private boolean canAdd3PartyCompanies;
    @Column(nullable = false)
    private boolean canAddOwnCompanies;

    // Edit Permissions
    @Column(nullable = false)
    private boolean canEditTransaction;
    @Column(nullable = false)
    private boolean canEditAccounts;
    @Column(nullable = false)
    private boolean canEdit3PartyCompanies;
    @Column(nullable = false)
    private boolean canEditOwnCompanies;

    // Delete Permissions
    @Column(nullable = false)
    private boolean canDeleteTransaction;
    @Column(nullable = false)
    private boolean canDeleteAccounts;
    @Column(nullable = false)
    private boolean canDelete3PartyCompanies;
    @Column(nullable = false)
    private boolean canDeleteOwnCompanies;

    @OneToMany(mappedBy = "role")
    private Set<UserCompany> userCompanies;

}
