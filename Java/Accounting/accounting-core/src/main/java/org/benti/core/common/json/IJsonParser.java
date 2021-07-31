package org.benti.core.common.json;


import org.benti.core.exceptions.InvalidJsonException;

import java.util.Map;

/**
 * Cool interface to allow the creation of new Json parsers in the future
 */
public interface IJsonParser {

    <T> T readAsObject(String json, Class<T> t) throws InvalidJsonException;

    Map readAsMap(String json);

    boolean isJson(String tentativeJson);

    <T> String write(T object);

}
