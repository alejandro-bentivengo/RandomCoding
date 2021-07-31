package org.benti.authentication.controllers;

import org.benti.common.json.JsonFactory;
import org.benti.common.model.User;
import org.benti.common.security.jwt.JwtUtils;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Date;
import java.util.Map;

/**
 * @author Alejandro Bentivengo
 * @name AuthenticationController
 * @date 1/28/2020
 */
@Path("/authentication")
public class AuthenticationController {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String getJsonToken(User user) {
        // User validation should be done here
        return JsonFactory.getJsonImpl().write(Map.of("token", JwtUtils.newToken(user.getUsername()), "issuer", "Chatty Software", "issue_date", new Date().toString()));
    }



}
