package org.benti.core.common.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Map;

/**
 * @author Alejandro Bentivengo
 * @name JwtUtils
 * @date 1/28/2020
 */
public class JwtUtils {

    private static final String JWT_ISSUER = "Accounting!";
    private static final String JWT_KEY = "This is the security key for chatty";
    // This JWT Algorithm might be a bit overkill for my needs, but oh well... better safe than sorry right?
    private static final Algorithm JWT_ALGORITHM = Algorithm.HMAC512(JWT_KEY);
    private static final JWTVerifier JWT_VERIFIER = JWT.require(JWT_ALGORITHM).withIssuer(JWT_ISSUER).build();

    public static JwtResponse newToken(String subject, Map<String, String> claims) {
        JWTCreator.Builder jwt = JWT.create()
                .withIssuer(JWT_ISSUER)
                .withSubject(subject)
                .withIssuedAt(new Date(System.currentTimeMillis()));

        if (claims != null) {
            for (Map.Entry<String, String> entry : claims.entrySet()) {
                jwt.withClaim(entry.getKey(), entry.getValue());
            }
        }

        return JwtResponse.builder()
                .issuer(JWT_ISSUER)
                .token(jwt.sign(JWT_ALGORITHM))
                .issueTime(LocalDateTime.now())
                .build();
    }

    public static boolean isValid(String token) {
        try {
            JWT_VERIFIER.verify(token);
        } catch (JWTVerificationException e) {
            return false;
        }
        return true;
    }

    public static String getSubject(String token) {
        return getJwt(token).getSubject();
    }


    public static Map<String, Claim> getClaims(String token) {
        return getJwt(token).getClaims();
    }

    private static DecodedJWT getJwt(String token) {
        return JWT_VERIFIER.verify(token);
    }

}
