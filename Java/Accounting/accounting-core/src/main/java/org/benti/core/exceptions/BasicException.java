package org.benti.core.exceptions;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * @author Alejandro Bentivengo
 * @name ChattyException
 * @date 1/28/2020
 */
public abstract class BasicException extends Exception {
    private static final Logger LOG = LogManager.getLogger(BasicException.class);

    public BasicException(String message) {
        super(message);
        LOG.error(message);
    }

    public BasicException(String message, Throwable e) {
        super(message, e);
        LOG.error(message, e);
    }

}
