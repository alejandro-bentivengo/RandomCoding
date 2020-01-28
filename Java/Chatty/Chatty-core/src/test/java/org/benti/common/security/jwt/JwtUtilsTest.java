package org.benti.common.security.jwt;

import io.jsonwebtoken.Claims;
import org.junit.Assert;
import org.junit.Test;

/**
 * @author Alejandro Bentivengo
 * @name JwtUtilsTest
 * @date 1/28/2020
 */
public class JwtUtilsTest {

    @Test
    public void newTokenTest() {
        this.getToken("SubjectForTest");
    }

    @Test
    public void getClaimsTest() {
        Claims claims = JwtUtils.getClaims(this.getToken("SubjetForTest"));
        Assert.assertNotNull(claims);
        Assert.assertEquals("Claims subject did not match JWT", claims.getSubject(), "SubjetForTest");
    }

    private String getToken(String subject) {
        String token = JwtUtils.newToken(subject);
        Assert.assertNotNull(token);
        Assert.assertFalse(token.isBlank());
        return token;
    }

}
