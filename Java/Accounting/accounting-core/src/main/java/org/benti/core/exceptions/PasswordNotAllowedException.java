package org.benti.core.exceptions;

public class PasswordNotAllowedException extends BasicException {
    public PasswordNotAllowedException(String message) {
        super("Password failed to validate: " + message);
    }
}
