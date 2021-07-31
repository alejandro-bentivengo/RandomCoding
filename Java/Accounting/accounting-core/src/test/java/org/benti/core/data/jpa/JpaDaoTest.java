package org.benti.core.data.jpa;

import org.benti.core.exceptions.BasicException;
import org.benti.core.model.ownership.User;
import org.junit.Assert;
import org.junit.Test;

public class JpaDaoTest {

    /**
     * Very raw and un-proper way of checking if the JPA DAO is working
     */
    @Test()
    public void jpaDaoTest() throws BasicException {
        Assert.assertNotNull(new JpaDao(User.class).entityManager);
    }
}
