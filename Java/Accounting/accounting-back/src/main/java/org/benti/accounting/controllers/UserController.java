package org.benti.accounting.controllers;

import org.benti.accounting.controllers.filters.annotations.Authenticated;
import org.benti.accounting.dto.UserDTO;
import org.benti.accounting.services.UserService;
import org.benti.core.common.utils.TimerType;
import org.benti.core.common.utils.TimerUtil;
import org.benti.core.common.web.ResponseObject;
import org.benti.core.exceptions.BasicException;
import org.benti.core.model.ownership.User;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/user")
public class UserController {
    private static UserService userService;

    private UserService getUserService() {
        if (userService == null) {
            userService = new UserService();
        }
        return userService;
    }

    @Path("/{username}")
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Authenticated
    public ResponseObject getUser(@PathParam("username") String username, HttpServletRequest request) throws BasicException {
        TimerUtil timer = new TimerUtil(TimerType.MS).startTimer();
        return ResponseObject.builder()
                .time(timer.stopTimer())
                .code(200)
                .data(UserDTO.fromUser(
                        userService.getUser(username, request)))
                .service("GET:/user")
                .build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseObject postUser(User username) throws BasicException {
        TimerUtil timer = new TimerUtil(TimerType.MS).startTimer();
        return ResponseObject.builder()
                .time(timer.stopTimer())
                .code(200)
                .data(UserDTO.fromUser(
                        userService.newUser(username)))
                .service("GET:/user")
                .build();
    }

}
