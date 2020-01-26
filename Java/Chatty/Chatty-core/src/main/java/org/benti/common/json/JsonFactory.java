package org.benti.common.json;

import org.benti.common.json.implementations.JsonBParser;

public abstract class JsonFactory {

    private static JsonTypes defaultJson = JsonTypes.JSONB;

    private static IJsonParser getJsonImpl() {
        return getJsonImpl(defaultJson);
    }

    private static IJsonParser getJsonImpl(JsonTypes defaultJson) {
        switch (defaultJson) {
            case JSONB:
                return new JsonBParser();
            default:
                return JsonFactory.getJsonImpl(defaultJson);
        }
    }

}
