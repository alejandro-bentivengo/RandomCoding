package org.benti.websocket.translators;

import org.benti.common.message.Message;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class JsonMessageEncoder extends JsonMessageTranslators implements Encoder.Text<Message> {
    @Override
    public String encode(Message message) throws EncodeException {
        return getParser().write(message);
    }

    @Override
    public void init(EndpointConfig endpointConfig) {
    }

    @Override
    public void destroy() {
    }
}
