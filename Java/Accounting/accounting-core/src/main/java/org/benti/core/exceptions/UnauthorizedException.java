package org.benti.core.exceptions;

public class UnauthorizedException extends BasicException {
    public UnauthorizedException(String operation, String username) {
        super("The operation " + operation + " is not authorized for the user " + username);
    }
}
