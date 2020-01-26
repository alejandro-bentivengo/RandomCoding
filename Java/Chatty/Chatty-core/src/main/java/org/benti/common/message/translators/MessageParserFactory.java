package org.benti.common.message.translators;

import org.benti.common.message.MessageTypes;
import org.benti.common.message.translators.implementations.JsonMessageParser;

public abstract class MessageParserFactory {

    private final static MessageTypes defaultMessageType = MessageTypes.JSON;

    public static IMessageParser getMessageImpl() {
        return getMessageImpl(defaultMessageType);
    }

    public static IMessageParser getMessageImpl(MessageTypes defaultMessageType) {
        switch (defaultMessageType) {
            case JSON:
                return new JsonMessageParser();
            default:
                return getMessageImpl(defaultMessageType);
        }
    }

}
