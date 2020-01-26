package org.benti.websocket.chatty;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.benti.common.message.Message;
import org.benti.websocket.ClientsService;
import org.benti.websocket.IWebSocket;
import org.benti.websocket.authentication.AuthenticationService;
import org.benti.websocket.translators.JsonMessageDecoder;
import org.benti.websocket.translators.JsonMessageEncoder;

import javax.websocket.CloseReason;
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

    private final static Logger LOG = LogManager.getLogger(ChattyWebSocket.class);

    private ClientsService clientsService = new ClientsService();
    private AuthenticationService authenticationService = new AuthenticationService();

    // Not optimal to validate user session here, but its better than nothing
    @OnOpen
    public void onOpen(Session session) throws IOException {
        LOG.info("Client " + session.getId() + " attempting connection...");
        if (authenticationService.isSessionValid(session)) {
            LOG.info("Client " + session.getId() + " connected...");
            clientsService.addClient(session);
        } else {
            session.close(new CloseReason(CloseReason.CloseCodes.CANNOT_ACCEPT, "Invalid authentication token"));
        }
    }

    @OnMessage
    public void onMessage(Message message, Session session) throws IOException {
        try {
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
        session.getBasicRemote().sendText("Something went wrong when processing the last request");
    }

}
