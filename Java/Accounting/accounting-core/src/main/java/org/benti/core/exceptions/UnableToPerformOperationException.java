package org.benti.core.exceptions;

public class UnableToPerformOperationException extends BasicException {
    public UnableToPerformOperationException(String operation, Throwable e) {
        super("Unexpected error during operation " + operation, e);
    }
}
