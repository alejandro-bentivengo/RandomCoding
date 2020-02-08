package org.benti.core.common.security.encryption;


import org.benti.core.exceptions.BasicException;

public interface IEncryptor {

    String encrypt(String value) throws BasicException;

    String decrypt(String value) throws BasicException;

    boolean verify(String value, String hashed) throws BasicException;

}
