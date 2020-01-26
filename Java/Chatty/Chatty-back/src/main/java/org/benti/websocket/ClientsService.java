package org.benti.websocket;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.benti.common.message.Message;
import org.benti.websocket.authentication.AuthenticationService;

import javax.websocket.CloseReason;
import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class ClientsService {

    private static final Logger LOG = LogManager.getLogger(ClientsService.class);

    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());

    private AuthenticationService authenticationService = new AuthenticationService();

    public Session getClient(String id) {
        synchronized (clients) {
            for (Session session : clients) {
                if (session.getId().equals(id)) {
                    return session;
                }
            }
        }
        return null;
    }

    public void addClient(Session session) throws IOException {
        LOG.info("Client " + session.getId() + " attempting connection...");
        if (authenticationService.isSessionValid(session)) {
            LOG.info("Client " + session.getId() + " connected...");
            // Only this part needs to be synchronized so it doesn't mess up the Set on other requests
            synchronized (clients) {
                if (!clients.contains(session))
                    clients.add(session);
            }
        } else {
            LOG.info("Session attempt failed by unauthenticated user " + session.getId());
            session.close(new CloseReason(CloseReason.CloseCodes.CANNOT_ACCEPT, "Invalid authentication token"));
        }
    }

    public void removeClient(Session session) {
        synchronized (clients) {
            if (clients.contains(session))
                clients.remove(session);
        }
    }

    public void broadcastToAllClients(Message message, Session sender) throws IOException, EncodeException {
        synchronized (clients) {
            for (Session session : clients) {
                if (!session.equals(sender)) {
                    session.getBasicRemote().sendObject(message);
                }
            }
        }
    }

}
