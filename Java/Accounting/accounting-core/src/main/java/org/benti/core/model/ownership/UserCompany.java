package org.benti.core.model.ownership;

import org.benti.core.model.Audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "user_companies")
public class UserCompany extends Audit {

    @Id
    @Column(name = "user_company_pk", nullable = false, unique = true)
    @GeneratedValue
    private long userCompanyPk;
    @ManyToOne
    @JoinColumn(name = "user_pk")
    private User user;
    @ManyToOne
    @JoinColumn(name = "company_pk")
    private Company company;
    @ManyToOne
    @JoinColumn(name = "role_pk")
    private Role role;

}
