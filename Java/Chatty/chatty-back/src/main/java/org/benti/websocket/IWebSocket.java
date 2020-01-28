package org.benti.websocket;

import org.benti.websocket.message.Message;

import javax.websocket.Session;
import java.io.IOException;

// We want to be able to create multiple web sockets and have them have the same behaviour
public interface IWebSocket {

    void onOpen(Session session) throws IOException;

    void onMessage(Message message, Session session) throws IOException;

    void onClose(Session session) throws IOException;

    void onError(Throwable someError, Session session) throws IOException;
}
