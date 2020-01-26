package org.benti.websocket;

import org.benti.common.message.Message;

import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class ClientsService {

    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());

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

    public void addClient(Session session) {
        synchronized (clients) {
            if (!clients.contains(session))
                clients.add(session);
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
