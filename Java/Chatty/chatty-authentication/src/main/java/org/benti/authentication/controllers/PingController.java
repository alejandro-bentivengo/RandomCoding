package org.benti.authentication.controllers;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.container.PreMatching;

/**
 * @author Alejandro Bentivengo
 * @name PingController
 * @date 1/28/2020
 */
@Path("/ping")
public class PingController {

    @GET
    public String ping() {
        // User validation should be done here
        return "Server is active!";
    }

}
