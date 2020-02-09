package org.benti.core.data;

import java.util.List;
import java.util.Optional;

public interface IDao<T> {

    void save(T t);

    void update(T t);

    void delete(T t);

    T findById(long id);

    Optional<T> getSingleWithNamedQuery(String query, String... parameters);

    Optional<List<T>> getListWithNamedQuery(String query, String... parameters);
}
