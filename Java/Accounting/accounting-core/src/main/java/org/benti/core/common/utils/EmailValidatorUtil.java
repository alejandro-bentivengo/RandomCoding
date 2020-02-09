package org.benti.core.common.utils;

public class EmailValidatorUtil {
    public static final String EMAIL_REGEX = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$";

    public static boolean validateEmail(String email) {
        return email.matches(EMAIL_REGEX);
    }
}
