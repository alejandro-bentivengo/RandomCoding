package org.benti.core.data.jpa;


import org.benti.core.data.IDao;
import org.benti.core.exceptions.BasicException;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;
import java.util.Optional;

/**
 * As per JPA
 *
 * @param <T>
 */
public class JpaDao<T> implements IDao<T>, AutoCloseable {
    private final Class<T> typeParameterClass;
    protected EntityManager entityManager;

    public JpaDao(Class<T> typeParameterClass) throws BasicException {
        this.typeParameterClass = typeParameterClass;
        JpaEntityManager jpaEntityManager = new JpaEntityManager();
        entityManager = jpaEntityManager.getEntityManager();
    }

    // Be responsible kids!
    // Commit your transactions!
    // Otherwise the thing under your keyboard will chew your fingers!
    // Spooky!
    public void begin() {
        this.entityManager.getTransaction().begin();
    }

    public void commit() {
        this.entityManager.getTransaction().commit();
    }

    @Override
    public void save(T t) {
        this.entityManager.persist(t);
    }

    @Override
    public void update(T t) {
        this.entityManager.merge(t);
    }

    @Override
    public void delete(T t) {
        this.entityManager.remove(t);
    }

    @Override
    public T findById(long id) {
        return this.entityManager.find(this.typeParameterClass, id);
    }

    @Override
    public Optional<T> getSingle(CriteriaQuery<T> query) {
        try {
            return Optional.ofNullable(entityManager.createQuery(query).getSingleResult());
        } catch (RuntimeException e) {
            return Optional.empty();
        }
    }

    @Override
    public Optional<List<T>> getList(CriteriaQuery<T> query) {
        try {
            return Optional.ofNullable(entityManager.createQuery(query).getResultList());
        } catch (RuntimeException e) {
            return Optional.empty();
        }
    }

    @Override
    public void close() throws Exception {
        this.entityManager.clear();
        this.entityManager.close();
    }
}
