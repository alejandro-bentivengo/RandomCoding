package org.benti.core.common.security.encryption.implementations;


import at.favre.lib.crypto.bcrypt.BCrypt;
import org.benti.core.common.security.encryption.IEncryptor;
import org.benti.core.exceptions.BasicException;
import org.benti.core.exceptions.EncryptionException;
import org.benti.core.exceptions.MethodNotImplementedException;

import java.nio.charset.StandardCharsets;

public class BCryptEncryptor implements IEncryptor {

    private final BCrypt.Hasher hasher = BCrypt.withDefaults();
    private static final int DEFAULT_COST = 12;

    @Override
    public String encrypt(String value) throws BasicException {
        String hashed = new String(hasher.hash(DEFAULT_COST, value.getBytes(StandardCharsets.UTF_8)), StandardCharsets.UTF_8);
        if (this.verify(value, hashed)) {
            return hashed;
        } else {
            throw new EncryptionException("An error occurred while attempting to hash the requested value with BCrypt. The result hash is not verified.");
        }
    }

    @Override
    public String decrypt(String value) throws BasicException {
        throw new MethodNotImplementedException("decrypt");
    }

    @Override
    public boolean verify(String value, String hashed) {
        return BCrypt.verifyer().verify(value.getBytes(StandardCharsets.UTF_8), hashed.getBytes(StandardCharsets.UTF_8)).verified;
    }
}
