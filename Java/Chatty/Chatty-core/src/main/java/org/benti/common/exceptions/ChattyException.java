package org.benti.common.exceptions;

/**
 * @author Alejandro Bentivengo
 * @name ChattyException
 * @date 1/28/2020
 */
public abstract class ChattyException extends Exception {
    public ChattyException(String message) {
        super(message);
    }
}
