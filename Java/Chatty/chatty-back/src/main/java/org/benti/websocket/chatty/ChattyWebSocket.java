package org.benti.websocket.chatty;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.benti.common.model.Message;
import org.benti.websocket.ClientsService;
import org.benti.websocket.IWebSocket;
import org.benti.websocket.translators.JsonMessageDecoder;
import org.benti.websocket.translators.JsonMessageEncoder;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

@ServerEndpoint(
        value = "/message",
        decoders = JsonMessageDecoder.class,
        encoders = JsonMessageEncoder.class
)
public class ChattyWebSocket implements IWebSocket {

    private static final int MAX_SIZE_MB = 5;
    private static final Logger LOG = LogManager.getLogger(ChattyWebSocket.class);

    private ClientsService clientsService = new ClientsService();

    @OnOpen
    public void onOpen(Session session) throws IOException {
        // Client service will be in charge of session authentication via url parameter
        session.getUserPrincipal();
        clientsService.addClient(session);
    }

    @OnMessage(maxMessageSize = 1024 * 1024 * 1)
    public void onMessage(Message message, Session session) throws IOException {
        try {
            // At this point it is assumed that a client added is allowed to be here
            // No need to re-check his permissions
            clientsService.broadcastToAllClients(message, session);
        } catch (EncodeException e) {
            LOG.error(e);
        }
    }

    @OnClose
    public void onClose(Session session) throws IOException {
        LOG.info("Client " + session.getId() + " disconnected...");
        clientsService.removeClient(session);
    }

    @OnError
    public void onError(Throwable someError, Session session) throws IOException {
        LOG.error("Something messed up! Woops!", someError);
        if (session.isOpen())
            session.getBasicRemote().sendText("Something went wrong when processing the last request");
    }

}
