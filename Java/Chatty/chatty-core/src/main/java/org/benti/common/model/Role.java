package org.benti.common.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long role_pk;

    private String name;

    private boolean canSendMessages;
    private boolean canEditMessages;
    private boolean canDeleteMessages;
    private boolean canUpdateLogo;
    private boolean canUpdateName;
    private boolean canChangeRoles;

    @OneToMany(mappedBy = "role")
    private Set<UserRoom> userRooms;

}
