package org.benti.websocket.message.handlers;

import org.benti.websocket.message.Message;

public interface IMessageHandler {
    void handle(Message message);
}
