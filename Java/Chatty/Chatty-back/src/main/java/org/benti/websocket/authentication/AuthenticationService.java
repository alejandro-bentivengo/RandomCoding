package org.benti.websocket.authentication;

import org.benti.websocket.filters.IWebSocketFilter;

import javax.websocket.Session;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class AuthenticationService {

    private static Set<IWebSocketFilter> filters = Collections.synchronizedSet(new HashSet<>());

    public static void addFilter(IWebSocketFilter filter) {
        synchronized (filters) {
            filters.add(filter);
        }
    }

    public boolean isSessionValid(Session session) {
        synchronized (filters) {
            for (IWebSocketFilter filter : filters) {
                if (!filter.filter(session)) {
                    return false;
                }
            }
        }
        return true;
    }

}
