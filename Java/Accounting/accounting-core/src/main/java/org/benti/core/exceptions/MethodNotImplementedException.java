package org.benti.core.exceptions;

/**
 * @author Alejandro Bentivengo
 * @name MethodNotImplementedException
 * @date 1/28/2020
 */
public class MethodNotImplementedException extends BasicException {
    public MethodNotImplementedException(String methodName) {
        super("The method " + methodName + " has not (and might not ever) been implemented");
    }
}
