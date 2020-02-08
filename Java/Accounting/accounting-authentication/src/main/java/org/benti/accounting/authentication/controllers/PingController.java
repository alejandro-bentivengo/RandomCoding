package org.benti.accounting.authentication.controllers;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

/**
 * @author Alejandro Bentivengo
 * @name PingController
 * @date 1/28/2020
 */
@Path("/ping")
public class PingController {

    // Just a simple check to validate that the authentication service is actually working
    @GET
    public String ping() {
        return "Server is active!";
    }

}
