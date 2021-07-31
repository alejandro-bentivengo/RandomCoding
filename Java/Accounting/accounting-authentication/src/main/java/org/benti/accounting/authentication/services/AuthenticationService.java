package org.benti.accounting.authentication.services;

import org.benti.core.common.security.encryption.EncryptorFactory;
import org.benti.core.common.security.jwt.JwtResponse;
import org.benti.core.common.security.jwt.JwtUtils;
import org.benti.core.data.jpa.JpaDao;
import org.benti.core.exceptions.BasicException;
import org.benti.core.exceptions.UserNotFoundException;
import org.benti.core.model.ownership.User;

/**
 * @author Alejandro Bentivengo
 * @name AuthenticationService
 * @date 1/28/2020
 */
public class AuthenticationService {


    public boolean authenticateUser(User user) throws BasicException {
        JpaDao<User> dao = new JpaDao(User.class);
        return EncryptorFactory.getEncryptor()
                .verify(
                        user.getPassword(),
                        dao.getSingleWithNamedQuery(
                                "User.findByUser",
                                user.getUser()
                        ).orElseThrow(
                                () -> new UserNotFoundException(user.getUser())
                        ).getUser());
    }


    public JwtResponse generateJsonToken(User user) {
        // No other claims to add at this moment :/
        return JwtUtils.newToken(user.getUser(), null);
    }
}
