package org.benti.authentication.controllers;

import org.benti.authentication.controllers.filters.annotations.Authenticated;
import org.benti.common.model.User;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Alejandro Bentivengo
 * @name UserController
 * @date 1/28/2020
 */
@Path("/users/{username}")
public class UserController {

    @Path("")
    @GET
    @Authenticated
    @Produces(MediaType.APPLICATION_JSON)
    public User getUser(@PathParam("username") String username) {
        return User.builder().username(username).build();
    }

}
