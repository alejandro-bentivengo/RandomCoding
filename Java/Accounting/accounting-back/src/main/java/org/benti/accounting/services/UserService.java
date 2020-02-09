package org.benti.accounting.services;

import org.benti.accounting.AuthorizationConstants;
import org.benti.core.common.security.jwt.JwtUtils;
import org.benti.core.common.security.password.PasswordValidator;
import org.benti.core.data.jpa.JpaDao;
import org.benti.core.exceptions.BasicException;
import org.benti.core.exceptions.MissingFieldsException;
import org.benti.core.exceptions.UnableToPerformOperationException;
import org.benti.core.exceptions.UnauthorizedException;
import org.benti.core.exceptions.UserNotFoundException;
import org.benti.core.model.ownership.User;

import javax.servlet.http.HttpServletRequest;

public class UserService {

    public User getUser(String user, HttpServletRequest request) throws BasicException {
        try {
            if (JwtUtils.getSubject(request
                    .getHeader(AuthorizationConstants.AUTHORIZATION_HEADER)
                    .replace(AuthorizationConstants.TOKEN_PRE_MAP, ""))
                    .equals(user)) {
                try (JpaDao<User> dao = new JpaDao<>(User.class)) {
                    return dao.getSingleWithNamedQuery("User.findByUser", user)
                            .orElseThrow(Exception::new);
                }
            }
        } catch (Throwable throwable) {
            throw new UserNotFoundException(user);
        }
        throw new UnauthorizedException("getUser", JwtUtils.getSubject(request
                .getHeader(AuthorizationConstants.AUTHORIZATION_HEADER)
                .replace(AuthorizationConstants.TOKEN_PRE_MAP, "")));
    }

    public User newUser(User user) throws BasicException {
        if (user.validate() && PasswordValidator.getInstance().validate(user.getPassword())) {
            try (JpaDao<User> dao = new JpaDao<>(User.class)) {
                dao.begin();
                dao.save(user);
                dao.commit();
                return user;
            } catch (Exception e) {
                throw new UnableToPerformOperationException("newUser", e);
            }
        } else {
            throw new MissingFieldsException();
        }
    }
}
