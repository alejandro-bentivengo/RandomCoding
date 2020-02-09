package org.benti.core.model.ownership;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.benti.core.model.Audit;
import org.benti.core.model.accounting.Transaction;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "users")
@NamedQueries({
        @NamedQuery(name = "User.findByUser", query = "SELECT u FROM Users WHERE u.user = :user")
})
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
    private String phone;

    @OneToMany(mappedBy = "user")
    private Set<UserCompany> companies = new HashSet(0);
    @OneToMany(mappedBy = "user")
    private Set<Transaction> transactions = new HashSet(0);

    // Self checking method to make sure the user is ready to be saved
    public boolean validate() {
        return (name != null && user != null && password != null && email != null);
    }

}
