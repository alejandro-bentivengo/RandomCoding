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
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User extends Audit {

    @Id
    @Column(name = "user_pk", nullable = false, unique = true)
    @GeneratedValue
    private long userPk;
    @Column(nullable = false)
    private String name;
    @Column(unique = true)
    private String user;
    @Column(nullable = false)
    private String password;
    @Column(unique = true, nullable = false)
    private String email;

    @OneToMany(mappedBy = "user")
    private Set<UserCompany> companies = new HashSet(0);
}
