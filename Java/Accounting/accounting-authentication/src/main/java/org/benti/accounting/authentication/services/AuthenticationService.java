package org.benti.accounting.authentication.services;

import org.benti.core.common.security.jwt.JwtResponse;
import org.benti.core.model.ownership.User;

/**
 * @author Alejandro Bentivengo
 * @name AuthenticationService
 * @date 1/28/2020
 */
public class AuthenticationService {


    public boolean authenticateUser(User user) {
        return false;
    }

    public JwtResponse generateJsonToken(User user) {
        return null;
    }
}
