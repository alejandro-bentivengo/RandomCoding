package org.benti.websocket.message.handlers;

import org.benti.common.model.Message;

public interface IMessageHandler {
    void handle(Message message);
}
