package org.benti.core.data;

import javax.persistence.criteria.CriteriaQuery;
import java.util.List;
import java.util.Optional;

public interface IDao<T> {

    void save(T t);

    void update(T t);

    void delete(T t);

    T findById(long id);

    Optional<T> getSingle(CriteriaQuery<T> query);

    Optional<List<T>> getList(CriteriaQuery<T> query);
}
