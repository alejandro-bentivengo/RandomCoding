package org.benti.websocket.translators;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.benti.common.exceptions.InvalidMessageException;
import org.benti.common.message.Message;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class JsonMessageDecoder extends JsonMessageTranslators implements Decoder.Text<Message> {

    private final static Logger LOG = LogManager.getLogger(JsonMessageDecoder.class);

    @Override
    public Message decode(String s) throws DecodeException {
        try {
            return getParser().read(s);
        } catch (InvalidMessageException e) {
            LOG.error(e);
            throw new DecodeException(s, s);
        }
    }

    @Override
    public boolean willDecode(String s) {
        return (s != null);
    }

    @Override
    public void init(EndpointConfig endpointConfig) {
    }

    @Override
    public void destroy() {
    }
}
