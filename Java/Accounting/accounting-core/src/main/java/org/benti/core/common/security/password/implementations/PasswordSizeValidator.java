package org.benti.core.common.security.password.implementations;

import org.benti.core.common.security.password.IPasswordValidator;

public class PasswordSizeValidator implements IPasswordValidator {

    private static final int MINIMUM_SIZE = 6;
    private static final int MAXIMUM_SIZE = 18;

    @Override
    public boolean validate(String password) {
        return password.length() >= MINIMUM_SIZE && password.length() <= MAXIMUM_SIZE;
    }
}
