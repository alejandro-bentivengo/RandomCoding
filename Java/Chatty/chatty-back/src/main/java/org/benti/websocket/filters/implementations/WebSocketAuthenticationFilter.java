package org.benti.websocket.filters.implementations;

import org.benti.common.security.jwt.JwtUtils;
import org.benti.websocket.filters.IWebSocketFilter;

import javax.websocket.Session;

import static org.benti.websocket.server.WebSocketConstants.AUTH_PARAM;

public class WebSocketAuthenticationFilter implements IWebSocketFilter {

    @Override
    public boolean filter(Session session) {
        if (session.getPathParameters().containsKey(AUTH_PARAM)) {
            String auth = session.getPathParameters().get(AUTH_PARAM);
            if (auth != null && !auth.isBlank()) {
                return JwtUtils.isValid(auth);
            }
        }
        return false;
    }
}
