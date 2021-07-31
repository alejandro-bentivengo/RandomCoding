package org.benti.websocket.message.translators.implementations;

import org.benti.common.exceptions.InvalidJsonException;
import org.benti.common.exceptions.InvalidMessageException;
import org.benti.common.json.IJsonParser;
import org.benti.common.json.JsonFactory;
import org.benti.common.model.Message;
import org.benti.websocket.message.translators.IMessageParser;

public class JsonMessageParser implements IMessageParser {

    private static IJsonParser parser;

    private IJsonParser getParser() {
        if (parser == null) {
            parser = JsonFactory.getJsonImpl();
        }
        return parser;
    }

    @Override
    public Message read(String message) throws InvalidMessageException {
        try {
            return getParser().readAsObject(message, Message.class);
        } catch (InvalidJsonException e) {
            throw new InvalidMessageException(message);
        }
    }

    @Override
    public String write(Message message) {
        return getParser().write(message);
    }
}
