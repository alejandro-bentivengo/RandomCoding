package org.benti.websocket.message.translators;

import org.benti.common.exceptions.InvalidMessageException;
import org.benti.websocket.message.Message;

public interface IMessageParser {

    Message read(String message) throws InvalidMessageException;

    String write(Message message);

}
