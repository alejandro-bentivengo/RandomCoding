package org.benti.websocket.authentication;

import org.benti.common.model.User;
import org.benti.common.security.jwt.JwtUtils;
import org.benti.websocket.filters.IWebSocketFilter;

import javax.websocket.Session;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static org.benti.websocket.server.WebSocketConstants.AUTH_PARAM;

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

    public User getUser(Session session) {
        // TODO: UserDao.getByName();
        JwtUtils.getClaims(session.getPathParameters().get(AUTH_PARAM)).get("sub");
        return null;
    }
}
