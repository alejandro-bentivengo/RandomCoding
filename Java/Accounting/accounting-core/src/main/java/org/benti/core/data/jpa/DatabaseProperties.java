package org.benti.core.data.jpa;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public final class DatabaseProperties extends Properties implements AutoCloseable {

    private InputStream inputStream;

    public static final String DB_HOST = "database.host";
    public static final String DB_NAME = "database.name";
    public static final String DB_DRIVER = "database.driver";
    public static final String DB_USER = "database.user";
    public static final String DB_PASSWORD = "database.password";
    public static final String DB_TIMEZONE = "database.timezone";


    public DatabaseProperties(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    // Hide constructor with no arguments
    private DatabaseProperties() {
    }

    public void load() throws IOException {
        super.load(inputStream);
    }

    @Override
    public void close() throws Exception {
        inputStream.close();
    }
}
