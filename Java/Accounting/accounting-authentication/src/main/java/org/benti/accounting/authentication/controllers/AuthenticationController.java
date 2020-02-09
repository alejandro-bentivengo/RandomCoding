package org.benti.accounting.authentication.controllers;

import org.benti.accounting.authentication.services.AuthenticationService;
import org.benti.core.common.utils.TimerType;
import org.benti.core.common.utils.TimerUtil;
import org.benti.core.common.web.ResponseObject;
import org.benti.core.model.ownership.User;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 * @author Alejandro Bentivengo
 * @name AuthenticationController
 * @date 1/28/2020
 */
@Path("/authentication")
public class AuthenticationController {

    private static AuthenticationService authenticationService;

    private AuthenticationService getAuthenticationService() {
        if (authenticationService == null) {
            authenticationService = new AuthenticationService();
        }
        return authenticationService;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseObject getJsonToken(User user, @Context HttpServletResponse response) {
        TimerUtil timer = new TimerUtil(TimerType.MS).startTimer();
        if (authenticationService.authenticateUser(user)) {
            return ResponseObject.builder().code(200).data(authenticationService.generateJsonToken(user)).service("/authentication").time(timer.stopTimer()).build();
        } else {
            return ResponseObject.builder().code(401).time(timer.stopTimer()).service("/authentication").build();
        }
    }


}
