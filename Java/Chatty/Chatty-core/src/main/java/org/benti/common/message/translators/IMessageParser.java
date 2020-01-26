package org.benti.common.message.translators;

import org.benti.common.exceptions.InvalidMessageException;
import org.benti.common.message.Message;

public interface IMessageParser {

    Message read(String message) throws InvalidMessageException;

    String write(Message message);

}
