package org.benti.websocket.translators;

import org.benti.common.message.translators.IMessageParser;
import org.benti.common.message.translators.MessageParserFactory;

public abstract class JsonMessageTranslators {

    private IMessageParser parser;

    IMessageParser getParser() {
        if (parser == null) {
            parser = MessageParserFactory.getMessageImpl();
        }
        return parser;
    }

}
