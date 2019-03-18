package de.schaefer.core;

import java.util.Enumeration;
import java.util.Iterator;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;

import org.jdom.Element;

import de.schaefer.util.XMLUtil;

public class SystemPropertiesHelper implements javax.servlet.ServletContextListener {
	private ServletContext context = null;
	private final String catalinaHome = System.getProperty("catalina.home"); //C:\Tomcats\hochschulappBackend
	private String realPath;
	private String confPath;
	private String logPath;
	private String pubPath;
	private String confFile = "config.xml";

	public void contextInitialized(ServletContextEvent event) {
		context = event.getServletContext();

		this.realPath = context.getRealPath("/"); //C:\Tomcats\hochschulappBackend\webapps\HSAppBackEnd\
		this.confPath = this.realPath  + "WEB-INF/conf/";
		this.logPath = this.realPath  + "WEB-INF/log/";
		this.pubPath = this.realPath  + "pub/";
		System.setProperty("catalinaHome", this.catalinaHome);
		System.setProperty("applicationPath", this.realPath);
		System.setProperty("confPath", this.confPath);
		System.setProperty("pubPath", this.pubPath);
		System.setProperty("logPath", this.logPath);
		
		System.setProperty("default.log", this.logPath + "logdatei.log");
		System.setProperty("error.log", this.logPath + "error.log");
		
		this.loadConfigs();
		
		Enumeration<String> params = context.getInitParameterNames();
		while (params.hasMoreElements()) {
			String param = (String) params.nextElement();
			String value = context.getInitParameter(param);
			if (param.startsWith("myContextParam.")) {
				param = param.substring(param.indexOf(".") + 1);
				System.setProperty(param, value);
			}
		}
		
	}

	private void loadConfigs() {
		Element confEle = XMLUtil.getElementFromFile(confPath + this.confFile);
		Iterator<?> itr = confEle.getChildren().iterator();
		while(itr.hasNext()) {
			Element conf = (Element) itr.next();
			String confName = conf.getName();
			String confValue = conf.getTextTrim();
			System.setProperty(confName, confValue);
		}
	}
	
	public void contextDestroyed(ServletContextEvent event) {
	}

}