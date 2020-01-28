package org.benti.common.security.encryption.implementations;

import at.favre.lib.crypto.bcrypt.BCrypt;
import org.benti.common.exceptions.ChattyException;
import org.benti.common.exceptions.EncryptionException;
import org.benti.common.exceptions.MethodNotImplementedException;
import org.benti.common.security.encryption.IEncryptor;

import java.nio.charset.StandardCharsets;

public class BCryptEncryptor implements IEncryptor {

    private final BCrypt.Hasher hasher = BCrypt.withDefaults();
    private static final int DEFAULT_COST = 12;

    @Override
    public String encrypt(String value) throws ChattyException {
        String hashed = new String(hasher.hash(DEFAULT_COST, value.getBytes(StandardCharsets.UTF_8)), StandardCharsets.UTF_8);
        if (this.verify(value, hashed)) {
            return hashed;
        } else {
            throw new EncryptionException("An error occurred while attempting to hash the requested value with BCrypt. The result hash is not verified.");
        }
    }

    @Override
    public String decrypt(String value) throws ChattyException {
        throw new MethodNotImplementedException("decrypt");
    }

    @Override
    public boolean verify(String value, String hashed) throws ChattyException {
        return BCrypt.verifyer().verify(value.getBytes(StandardCharsets.UTF_8), hashed.getBytes(StandardCharsets.UTF_8)).verified;
    }
}
