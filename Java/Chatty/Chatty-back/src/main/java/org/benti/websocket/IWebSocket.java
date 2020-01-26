package org.benti.websocket;

import org.benti.common.message.Message;

import javax.websocket.Session;
import java.io.IOException;

public interface IWebSocket {

    void onOpen(Session session) throws IOException;

    void onMessage(Message message, Session session) throws IOException;

    void onClose(Session session) throws IOException;

    void onError(Throwable someError, Session session) throws IOException;
}
