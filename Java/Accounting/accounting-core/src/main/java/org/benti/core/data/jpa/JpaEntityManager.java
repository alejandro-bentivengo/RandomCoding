package org.benti.core.data.jpa;

import org.benti.core.exceptions.BasicException;
import org.benti.core.exceptions.EntityManagerException;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;

public final class JpaEntityManager {
    private EntityManagerFactory emFactoryObj;
    private final String PERSISTENCE_UNIT_NAME = "accounting-jpa";
    private final Map<String, String> properties = new HashMap<>();
    @PersistenceContext(name = PERSISTENCE_UNIT_NAME)
    private EntityManager entityManager;

    public EntityManager getEntityManager() throws BasicException {
        // Just a few lines of code can solve JNDI problems for the future! :D
        if (entityManager != null) {
            return entityManager;
        }
        try (DatabaseProperties prop = new DatabaseProperties(JpaEntityManager.class.getResourceAsStream("/db.properties"))) {
            prop.load();
            String url = String.format("%s/%s", prop.getProperty(DatabaseProperties.DB_HOST), prop.getProperty(DatabaseProperties.DB_NAME));
            properties.put("javax.persistence.jdbc.driver", prop.getProperty(DatabaseProperties.DB_DRIVER));
            properties.put("javax.persistence.jdbc.url", url);
            properties.put("javax.persistence.jdbc.user", prop.getProperty(DatabaseProperties.DB_USER));
            properties.put("javax.persistence.jdbc.password", prop.getProperty(DatabaseProperties.DB_PASSWORD));
            /*
            properties.put("useSSL", DBConstants.DB_USE_SSL);
            properties.put("requireSSL", DBConstants.DB_REQUIRED_SSL);
            */
            properties.put("serverTimezone", prop.getProperty(DatabaseProperties.DB_TIMEZONE));
            emFactoryObj = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME, properties);
            return emFactoryObj.createEntityManager();
        } catch (Exception e) {
            throw new EntityManagerException("Error creating the Entity Manager", e);
        }
    }
}