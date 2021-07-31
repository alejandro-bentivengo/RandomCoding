package org.benti.core.common.security.password;

import org.benti.core.common.security.password.implementations.PasswordNotAllowedCharactersValidator;
import org.benti.core.common.security.password.implementations.PasswordNumericValidator;
import org.benti.core.common.security.password.implementations.PasswordSizeValidator;
import org.benti.core.common.security.password.implementations.PasswordSpecialCharacterValidator;
import org.benti.core.exceptions.PasswordNotAllowedException;

import java.util.Arrays;
import java.util.List;

public final class PasswordValidator {

    private static PasswordValidator passwordValidator;

    private static List<IPasswordValidator> validators = Arrays.asList(
            new PasswordNotAllowedCharactersValidator(),
            new PasswordNumericValidator(),
            new PasswordSizeValidator(),
            new PasswordSpecialCharacterValidator());

    private PasswordValidator() {
    }

    public static void addValidator(IPasswordValidator validator) {
        validators.add(validator);
    }

    public static PasswordValidator getInstance() {
        if (passwordValidator == null) {
            passwordValidator = new PasswordValidator();
        }
        return passwordValidator;
    }

    public boolean validate(String password) throws PasswordNotAllowedException {
        for (IPasswordValidator validator : validators) {
            if (!validator.validate(password)) {
                throw new PasswordNotAllowedException(validator.getClass().getSimpleName());
            }
        }
        return true;
    }
}
