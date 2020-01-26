package org.benti.common.exceptions;

public class InvalidMessageException extends Exception {
    public InvalidMessageException(String message) {
        super("Unable to parse message: " + message);
    }
}
