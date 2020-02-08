package org.benti.core.common.security.encryption;


import org.benti.core.common.security.encryption.implementations.BCryptEncryptor;

public class EncryptorFactory {

    private static EncryptorTypes defaultEncryptor = EncryptorTypes.BCRYPT;

    public static IEncryptor getEncryptor() {
        return getEncryptor(defaultEncryptor);
    }

    public static IEncryptor getEncryptor(EncryptorTypes encryptorInstance) {
        switch (encryptorInstance) {
            case BCRYPT:
                return new BCryptEncryptor();
            default:
                return getEncryptor(defaultEncryptor);
        }
    }
}
