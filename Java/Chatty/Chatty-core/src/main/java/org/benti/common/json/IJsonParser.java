package org.benti.common.json;

import java.util.Map;

/**
 * Cool interface to allow the creation of new Json parsers in the future
 */
public interface IJsonParser {

    <T> T readAsObject(String json, Class<T> t);

    Map readAsMap(String json);

    <T> String write(T object);

}
