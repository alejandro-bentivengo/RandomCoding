package org.benti.accounting.authentication.controllers;

import org.benti.accounting.authentication.filters.annotations.Authenticated;
import org.benti.core.model.ownership.User;

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

    // This will be a simple service to check the user details
    // Some other methods need to be added to modify the user details
    // Another method should be also added to delete the user if needed
    @Path("")
    @GET
    @Authenticated
    @Produces(MediaType.APPLICATION_JSON)
    public User getUserDetails(@PathParam("username") String username) {
        return User.builder().user(username).build();
    }

}
