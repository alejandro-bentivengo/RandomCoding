package org.benti.common.security.encryption;

import org.benti.common.exceptions.ChattyException;
import org.junit.Assert;
import org.junit.Test;

public class EncryptionTest {

    @Test
    public void defaultEncryptorTest() {
        try {
            String hashed = EncryptorFactory.getEncryptor().encrypt("password");
            Assert.assertTrue(EncryptorFactory.getEncryptor().verify("password", hashed));
        } catch (ChattyException e) {
            e.printStackTrace();
        }
    }

}
