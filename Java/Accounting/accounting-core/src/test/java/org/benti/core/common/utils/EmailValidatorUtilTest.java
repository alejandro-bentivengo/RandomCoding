package org.benti.core.common.utils;

import org.junit.Assert;
import org.junit.Test;

public class EmailValidatorUtilTest {

    @Test
    public void validEmail() {
        Assert.assertTrue(EmailValidatorUtil.validateEmail("abc-abc@nnnn.com"));
    }

    @Test
    public void invalidEmail() {
        Assert.assertFalse(EmailValidatorUtil.validateEmail("random_random.random.ra@rarara"));
    }

}
