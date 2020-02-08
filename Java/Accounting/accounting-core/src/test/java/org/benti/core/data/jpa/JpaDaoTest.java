package org.benti.core.data.jpa;

import org.benti.core.model.ownership.User;
import org.junit.Assert;
import org.junit.Test;

public class JpaDaoTest {

    @Test
    public void jpaDaoTest() {
        try {
            Assert.assertNotNull(new JpaDao(User.class).entityManager);
        } catch (Exception e) {
            e.printStackTrace();
            Assert.fail(e.getMessage());
        }
    }
}
