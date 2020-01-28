package org.benti.authentication.services;

import org.benti.common.model.User;
import org.benti.common.security.jwt.JwtUtils;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Alejandro Bentivengo
 * @name AuthenticationController
 * @date 1/28/2020
 */
@Path("/authentication/")
public class AuthenticationController {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String getJsonToken(User user) {
        // User validation should be done here
        return JwtUtils.newToken(user.getUsername());
    }

    @GET
    @Path("ping")
    public String ping() {
        // User validation should be done here
        return "Server is active!";
    }

}
