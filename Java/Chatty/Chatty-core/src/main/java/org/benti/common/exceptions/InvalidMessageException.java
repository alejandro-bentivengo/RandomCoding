package org.benti.common.exceptions;

public class InvalidMessageException extends ChattyException {
    public InvalidMessageException(String message) {
        super("Unable to parse message: " + message);
    }
}
