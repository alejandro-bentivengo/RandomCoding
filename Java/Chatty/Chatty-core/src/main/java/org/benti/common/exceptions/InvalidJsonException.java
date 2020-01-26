package org.benti.common.exceptions;

public class InvalidJsonException extends Exception {
    public InvalidJsonException(String message) {
        super("Unable to parse json: " + message);
    }
}
