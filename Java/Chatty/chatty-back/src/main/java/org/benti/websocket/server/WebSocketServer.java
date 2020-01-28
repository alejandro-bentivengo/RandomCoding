package org.benti.websocket.server;

import org.benti.websocket.authentication.AuthenticationService;
import org.benti.websocket.chatty.ChattyWebSocket;
import org.benti.websocket.filters.implementations.WebSocketAuthenticationFilter;
import org.glassfish.tyrus.server.Server;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;

public class WebSocketServer {

    public static void main(String[] args) {
        runServer();
    }

    public static void runServer() {
        Server server = new Server("localhost", 8025, "/websockets", new HashMap<>(), ChattyWebSocket.class);
        // Pass the authentication interface to the authentication filter to make it cooler
        AuthenticationService.addFilter(new WebSocketAuthenticationFilter());
        try {
            server.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            System.out.println("Please press a key to stop the server.");
            reader.readLine();
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            server.stop();
        }
    }
}
