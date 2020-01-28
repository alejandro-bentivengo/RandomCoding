package org.benti.common.json;

import org.benti.common.json.implementations.JsonBParser;

public abstract class JsonFactory {

    private static JsonTypes defaultJson = JsonTypes.JSONB;

    public static IJsonParser getJsonImpl() {
        return getJsonImpl(defaultJson);
    }

    public static IJsonParser getJsonImpl(JsonTypes jsonType) {
        switch (defaultJson) {
            case JSONB:
                return new JsonBParser();
            default:
                return JsonFactory.getJsonImpl(defaultJson);
        }
    }

}
