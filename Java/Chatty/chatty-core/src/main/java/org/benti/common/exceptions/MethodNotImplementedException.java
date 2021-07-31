package org.benti.common.exceptions;

/**
 * @author Alejandro Bentivengo
 * @name MethodNotImplementedException
 * @date 1/28/2020
 */
public class MethodNotImplementedException extends ChattyException {
    public MethodNotImplementedException(String methodName) {
        super("The method " + methodName + " has not (and might not ever) been implemented");
    }
}
