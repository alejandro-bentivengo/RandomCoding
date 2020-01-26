package org.benti.websocket.filters.implementations;

import org.benti.websocket.filters.IWebSocketFilter;

import javax.websocket.Session;

public class WebSocketAuthenticationFilter implements IWebSocketFilter {


    @Override
    public boolean filter(Session session) {
        if (session.getPathParameters().containsKey("auth")) {
            String auth = session.getPathParameters().get("auth");
            if (auth != null && !auth.isBlank()) {
                // Validate token
                return true;
            }
        }
        // Validate session token
        return false;
    }
}
