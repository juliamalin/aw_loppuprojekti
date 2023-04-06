package net.projekti.serverapplication.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Message {
	@Autowired
	WebSocketServer server;
	
	String message = "Moikka serveristä!";
	
	@Scheduled(fixedRate=1000)
	public void test() {
		server.sendToAll("Terve "+ message);
	}
}
