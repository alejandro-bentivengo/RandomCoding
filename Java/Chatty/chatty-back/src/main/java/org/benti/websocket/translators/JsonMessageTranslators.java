package org.benti.websocket.translators;

import org.benti.websocket.message.translators.IMessageParser;
import org.benti.websocket.message.translators.MessageParserFactory;

public abstract class JsonMessageTranslators {

    private IMessageParser parser;

    IMessageParser getParser() {
        if (parser == null) {
            parser = MessageParserFactory.getMessageImpl();
        }
        return parser;
    }

}
