package org.benti.accounting.controllers.filters.providers;

import org.benti.accounting.controllers.filters.annotations.Authenticated;
import org.benti.core.common.security.jwt.JwtUtils;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

/**
 * @author Alejandro Bentivengo
 * @name AuthenticatedFilter
 * @date 1/28/2020
 */
@Provider
@Authenticated
public class AuthenticatedFilter implements ContainerRequestFilter {
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        if (!requestContext.getHeaders().containsKey("Authorization") || !JwtUtils.isValid(requestContext.getHeaders().getFirst("Authorization").replace("Bearer ", ""))) {
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }
}
