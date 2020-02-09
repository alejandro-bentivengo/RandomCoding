package org.benti.core.common.security.password.implementations;

import org.benti.core.common.security.password.IPasswordValidator;

import java.util.regex.Pattern;

public class PasswordNumericValidator implements IPasswordValidator {

    private static final Pattern NUMERIC_PATTERN = Pattern.compile("[0-9]");

    @Override
    public boolean validate(String password) {
        return NUMERIC_PATTERN.matcher(password).find();
    }
}
