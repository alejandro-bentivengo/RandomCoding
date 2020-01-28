package org.benti.common.security.jwt;

import com.auth0.jwt.interfaces.Claim;
import org.junit.Assert;
import org.junit.Test;

import java.util.Map;

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
        Map<String, Claim> claims = JwtUtils.getClaims(this.getToken("SubjetForTest"));
        Assert.assertNotNull(claims);
        Assert.assertEquals("Claims subject did not match JWT", "SubjetForTest", claims.get("sub").asString());
    }

    private String getToken(String subject) {
        String token = JwtUtils.newToken(subject);
        Assert.assertNotNull(token);
        Assert.assertFalse(token.isBlank());
        return token;
    }

}
