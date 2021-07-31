package org.benti.core.common.security.password.implementations;

import org.benti.core.common.security.password.IPasswordValidator;

public class PasswordNotAllowedCharactersValidator implements IPasswordValidator {

    // Some characters that will be not allowed in password (for now)
    private static final String[] NOT_ALLOWED_CHARS = {
            "\\", "_", ":", ",",
            ".", "|", "/", "(",
            ")", "`", "~", "[",
            "]"
    };

    @Override
    public boolean validate(String password) {
        for (String c : NOT_ALLOWED_CHARS) {
            if (password.contains(c)) {
                return false;
            }
        }
        return true;
    }
}
