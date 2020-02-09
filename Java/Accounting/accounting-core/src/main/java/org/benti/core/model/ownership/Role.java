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
@Entity(name = "roles")
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
    @Column(name = "can_add_transactions", nullable = false)
    private boolean canAddTransactions;
    @Column(name = "can_add_accounts", nullable = false)
    private boolean canAddAccounts;
    @Column(name = "can_add_3_party_companies", nullable = false)
    private boolean canAdd3PartyCompanies;
    @Column(name = "can_add_own_companies", nullable = false)
    private boolean canAddOwnCompanies;

    @Column(name = "can_invite_users_to_company", nullable = false)
    private boolean canInviteUsersToCompany;

    // Edit Permissions
    @Column(name = "can_edit_transactions", nullable = false)
    private boolean canEditTransactions;
    @Column(name = "can_edit_accounts", nullable = false)
    private boolean canEditAccounts;
    @Column(name = "can_edit_3_party_companies", nullable = false)
    private boolean canEdit3PartyCompanies;
    @Column(name = "can_edit_own_companies", nullable = false)
    private boolean canEditOwnCompanies;

    @Column(name = "can_edit_user_roles", nullable = false)
    private boolean canEditUserRoles;

    // Delete Permissions
    @Column(name = "can_delete_transaction", nullable = false)
    private boolean canDeleteTransaction;
    @Column(name = "can_delete_accounts", nullable = false)
    private boolean canDeleteAccounts;
    @Column(name = "can_delete_3_party_companies", nullable = false)
    private boolean canDelete3PartyCompanies;
    @Column(name = "can_delete_own_companies", nullable = false)
    private boolean canDeleteOwnCompanies;

    @Column(name = "can_remove_users_from_companies", nullable = false)
    private boolean canRemoveUsersFromCompanies;

    @OneToMany(mappedBy = "role")
    private Set<UserCompany> userCompanies;

}
