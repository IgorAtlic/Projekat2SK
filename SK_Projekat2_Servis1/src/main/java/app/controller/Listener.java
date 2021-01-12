package app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import app.entities.User;
import app.repository.UserRepository;

@Component
public class Listener {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private EmailController emailController;
	
	@JmsListener(destination = "obrisanLetS1Queue")
	public void consume(String email, int milje) {
		
		User user = userRepo.findByEmail(email);
		
		int tem = user.getMilje();
		
		user.setMilje(tem - milje);
		
		userRepo.saveAndFlush(user);
		
		emailController.sendEmail(user.getEmail(), "Servis1", "Refundacija");
		
		
	}

}
