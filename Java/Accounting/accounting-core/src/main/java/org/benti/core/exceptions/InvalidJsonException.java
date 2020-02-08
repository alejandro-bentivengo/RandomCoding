package org.benti.core.exceptions;

public class InvalidJsonException extends BasicException {
    public InvalidJsonException(String message) {
        super("Unable to parse json: " + message);
    }
}
