package org.benti.common.json.implementations;


import org.benti.common.json.IJsonParser;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import java.util.Map;

public class JsonBParser implements IJsonParser {

    private static Jsonb jsonb;

    private Jsonb getJsonb() {
        if (jsonb == null) {
            jsonb = JsonbBuilder.create();
        }
        return jsonb;
    }

    @Override
    public <T> T readAsObject(String json, Class<T> t) {
        return getJsonb().fromJson(json, t);
    }

    @Override
    public Map readAsMap(String json) {
        return getJsonb().fromJson(json, Map.class);
    }

    @Override
    public <T> String write(T object) {
        return getJsonb().toJson(object);
    }
}
