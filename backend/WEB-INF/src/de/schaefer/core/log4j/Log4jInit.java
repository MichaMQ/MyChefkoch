package de.schaefer.core.log4j;

import javax.servlet.http.HttpServlet;

import org.apache.log4j.PropertyConfigurator;

import de.schaefer.beans.InitializationBean;
import de.schaefer.core.spring.SpringApplicationContext;

public class Log4jInit extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String confPath = System.getProperty("confPath");

	public void init() {
		// String prefix = getServletContext().getRealPath("/");
		String file = getInitParameter("log4j-init-file");
		// if the log4j-init-file is not set, then no point in trying
		if (file != null) {
			PropertyConfigurator.configure(confPath + file);
		}
		InitializationBean initializationBean = (InitializationBean) SpringApplicationContext.getBean("initializationBean");
		System.out.println("0--- " + initializationBean);
		initializationBean.init();
	}
}
