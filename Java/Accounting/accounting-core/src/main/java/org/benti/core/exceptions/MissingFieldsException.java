package org.benti.core.exceptions;

public class MissingFieldsException extends BasicException {
    public MissingFieldsException() {
        super("One or more fields are missing to complete this request");
    }
}
