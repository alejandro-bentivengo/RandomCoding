package org.benti.common.security.encryption;

import org.benti.common.exceptions.ChattyException;

public interface IEncryptor {

    String encrypt(String value) throws ChattyException;

    String decrypt(String value) throws ChattyException;

    boolean verify(String value, String hashed) throws ChattyException;

}
