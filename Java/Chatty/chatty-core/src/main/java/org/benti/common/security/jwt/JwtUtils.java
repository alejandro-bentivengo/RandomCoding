package org.benti.common.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.JWTVerifier;

import java.util.Date;
import java.util.Map;

/**
 * @author Alejandro Bentivengo
 * @name JwtUtils
 * @date 1/28/2020
 */
public class JwtUtils {

    private static final String JWT_ISSUER = "Chatty";
    private static final String JWT_KEY = "This is the security key for chatty";
    private static final Algorithm JWT_ALGORITHM = Algorithm.HMAC512(JWT_KEY);
    private static final JWTVerifier JWT_VERIFIER = JWT.require(JWT_ALGORITHM).withIssuer(JWT_ISSUER).build();


    public static String newToken(String subject) {
        return JWT.create()
                .withIssuer(JWT_ISSUER)
                .withSubject(subject)
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .sign(JWT_ALGORITHM);
    }

    public static Map<String, Claim> getClaims(String token) {
        return JWT_VERIFIER.verify(token).getClaims();
    }

    public static boolean isValid(String token) {
        try {
            JWT_VERIFIER.verify(token);
        } catch (JWTVerificationException e) {
            return false;
        }
        return true;
    }
}
