package org.benti.websocket.filters;

import javax.websocket.Session;

public interface IWebSocketFilter {
    boolean filter(Session session);
}
