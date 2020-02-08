package org.benti.core.exceptions;

public class InvalidMessageException extends BasicException {
    public InvalidMessageException(String message) {
        super("Unable to parse message: " + message);
    }
}
