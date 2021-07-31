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
 * @name User
 * @date 1/28/2020
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User extends Audit implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userPk;
    private String username;
    private String password;
    private String email;
    private String phone;
    @OneToMany(mappedBy = "user")
    private Set<UserRoom> rooms;
    @OneToMany(mappedBy = "user")
    private Set<Message> messages;
}
