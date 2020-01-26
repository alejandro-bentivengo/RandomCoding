package org.benti.common.message.handlers;

import org.benti.common.message.Message;

public interface IMessageHandler {
    void handle(Message message);
}
