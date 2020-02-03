package org.benti.websocket;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.benti.common.model.Message;
import org.benti.common.model.User;
import org.benti.websocket.authentication.AuthenticationService;

import javax.websocket.CloseReason;
import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class ClientsService {

    private static final Logger LOG = LogManager.getLogger(ClientsService.class);

    // This allows the connection of a user to multiple sessions (phone, PC, tablet, etc)
    private static Map<User, Set<Session>> clients = Collections.synchronizedMap(new HashMap<>());

    private AuthenticationService authenticationService = new AuthenticationService();

    public Map.Entry<User, Set<Session>> getClient(String id) {
        synchronized (clients) {
            for (Map.Entry<User, Set<Session>> connectedUser : clients.entrySet()) {
                synchronized (connectedUser.getValue()) {
                    for (Session session : connectedUser.getValue()) {
                        if (session.getId().equals(id)) {
                            return connectedUser;
                        }
                    }
                }
            }
        }
        return null;
    }

    // Add the client if it is authorized AND if the session is not already connected
    public void addClient(Session session) throws IOException {
        LOG.info("Client " + session.getId() + " attempting connection...");
        if (authenticationService.isSessionValid(session)) {
            LOG.info("Client " + session.getId() + " connected...");
            // Only this part needs to be synchronized so it doesn't mess up the Set on other requests
            synchronized (clients) {
                User user = authenticationService.getUser(session);
                if (!clients.containsKey(user))
                    clients.put(user, Collections.synchronizedSet(new HashSet<>()));
                Set<Session> sessionsOfUser = clients.get(user);
                synchronized (sessionsOfUser) {
                    boolean shouldAdd = true;
                    for (Session userSession : sessionsOfUser) {
                        if (userSession.equals(session)) {
                            shouldAdd = false;
                            break;
                        }
                    }
                    if (shouldAdd)
                        sessionsOfUser.add(session);

                }
            }
        } else {
            LOG.info("Session attempt failed by unauthenticated user " + session.getId());
            session.close(new CloseReason(CloseReason.CloseCodes.CANNOT_ACCEPT, "Invalid authentication token"));
        }
    }


    public void removeClient(Session session) {
        synchronized (clients) {
            for (Map.Entry<User, Set<Session>> userSessions : clients.entrySet()) {
                synchronized (userSessions.getValue()) {
                    if (userSessions.getValue().contains(session)) {
                        userSessions.getValue().remove(session);
                    }
                }
            }
        }
    }

    public void broadcastToAllClients(Message message, Session sender) throws IOException, EncodeException {
        synchronized (clients) {
            for (Map.Entry<User, Set<Session>> userSessions : clients.entrySet()) {
                synchronized (userSessions.getValue()) {
                    for (Session userSession : userSessions.getValue()) {
                        if (!userSession.equals(sender)) {
                            userSession.getBasicRemote().sendText(message.getData());
                        }
                    }
                }
            }
        }
    }
}
