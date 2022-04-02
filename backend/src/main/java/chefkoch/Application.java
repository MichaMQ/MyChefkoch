package chefkoch;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;

import chefkoch.service.iface.RecipeService;

@SpringBootApplication(exclude = {ErrorMvcAutoConfiguration.class})
public class Application {
	private static final Logger log = LoggerFactory.getLogger(Application.class);
	 
	public static void main(String[] args) {
		Date initTime = new Date();
		SpringApplication application = new SpringApplication(Application.class);
    addInitHooks(application);
    application.run(args);
		Date startTime = new Date();
		log.info("Server start in " + ((startTime.getTime()-initTime.getTime())) + " milisec");
	}
	
	static void addInitHooks(SpringApplication application) {
	   application.addListeners((ApplicationListener<?>) event -> {
	  	 if(event.getClass().equals(ApplicationStartedEvent.class)) {
	  		 ApplicationStartedEvent myEvent = (ApplicationStartedEvent) event;
		  	 RecipeService recipeService = myEvent.getApplicationContext().getBean(RecipeService.class);
		  	 log.debug("Initialize Uuids");
		  	 recipeService.initUuids();
	  	 } else {
	  		 log.error("event: " + event);
	  	 }
   });
	}
}