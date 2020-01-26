package org.benti.common.json.implementations;


import org.benti.common.exceptions.InvalidJsonException;
import org.benti.common.json.IJsonParser;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.json.bind.JsonbException;
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
    public <T> T readAsObject(String json, Class<T> t) throws InvalidJsonException {
        try {
            return getJsonb().fromJson(json, t);
        } catch (JsonbException e) {
            throw new InvalidJsonException("Unable to read json object " + t.getCanonicalName() + " from:\n" + json);
        }
    }

    @Override
    public Map readAsMap(String json) {
        return getJsonb().fromJson(json, Map.class);
    }

    @Override
    public boolean isJson(String tentativeJson) {
        try {
            getJsonb().fromJson(tentativeJson, Map.class);
        } catch (JsonbException e) {
            return false;
        }
        return true;
    }

    @Override
    public <T> String write(T object) {
        return getJsonb().toJson(object);
    }
}
