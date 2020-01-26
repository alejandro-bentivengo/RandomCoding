package org.benti.common.message.handlers;

import org.benti.common.message.Message;
import org.benti.common.message.handlers.implementations.FileMessageHandler;
import org.benti.common.message.handlers.implementations.ImageMessageHandler;
import org.benti.common.message.handlers.implementations.TextMessageHandler;

public class MessageHandlerFactory {

    private static final int DEFAULT_HANDLER = Message.TEXT;

    private static IMessageHandler getHandler(int messageType) {
        switch (messageType) {
            case Message.TEXT:
                return new TextMessageHandler();
            case Message.IMAGE:
                return new ImageMessageHandler();
            case Message.FILE:
                return new FileMessageHandler();
            default:
                return getHandler(DEFAULT_HANDLER);
        }
    }

    private static IMessageHandler getHandler(Message message) {
        return getHandler(message.getType());
    }

}
