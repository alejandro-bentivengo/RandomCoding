package org.benti.core.common.security.password.implementations;

import org.benti.core.common.security.password.IPasswordValidator;

import java.util.regex.Pattern;

public class PasswordSpecialCharacterValidator implements IPasswordValidator {

    private static final Pattern SPECIAL_CHARACTERS_PATTERN = Pattern.compile("[^A-Za-z0-9]");

    @Override
    public boolean validate(String password) {
        return SPECIAL_CHARACTERS_PATTERN.matcher(password).find();
    }
}
