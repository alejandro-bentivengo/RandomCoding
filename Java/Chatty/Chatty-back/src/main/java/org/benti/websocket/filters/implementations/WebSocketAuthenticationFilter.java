package org.benti.websocket.filters.implementations;

import org.benti.websocket.filters.IWebSocketFilter;

import javax.websocket.Session;

public class WebSocketAuthenticationFilter implements IWebSocketFilter {


    @Override
    public boolean filter(Session session) {
        // Validate session token
        return true;
    }
}
