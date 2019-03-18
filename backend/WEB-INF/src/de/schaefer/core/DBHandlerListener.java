package de.schaefer.core;

import java.util.Properties;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.apache.log4j.Logger;
import org.jdom.Element;

import de.schaefer.util.XMLUtil;

@WebListener
public class DBHandlerListener implements ServletContextListener {
	private static Logger logger = Logger.getLogger(DBHandlerListener.class);
	private String persistenceUnitName = "PersistanceName";
	EntityManagerFactory fac = null;
	static EntityManager em = null;
	private final String confFile = "databases.xml";

	@Override
	public void contextDestroyed(ServletContextEvent servletContextEvent) {
		em.getTransaction().commit();
		em.close();
		fac.close();
	}

	@Override
	public void contextInitialized(ServletContextEvent servletContextEvent) {
		fac = Persistence.createEntityManagerFactory(persistenceUnitName, getDBConnectionPropertiesFromConf());
		logger.debug(fac.getProperties().get("hibernate.connection.url"));
		ServletContext ctx = servletContextEvent.getServletContext();
		em = fac.createEntityManager();
	  ctx.setAttribute("DBConnection", em);
	  em.getTransaction().begin();
	}

	public static EntityManager getDBHandler() {
		return em;
	}

	private Properties getDBConnectionPropertiesFromConf() {
		String confPath = System.getProperty("confPath");

		Properties dbProps = new Properties();
		Element dbEle = XMLUtil.getElementFromFile(confPath + this.confFile);
		
		this.persistenceUnitName = dbEle.getAttributeValue("name", this.persistenceUnitName);
		
		String protocol = dbEle.getChildText("protocol");
		if(protocol == null) {
			protocol = "jdbc:postgresql";
		}
		String driver = dbEle.getChildText("driver");
		if(driver == null) {
			driver = "org.postgresql.Driver";
		}
		String hibernateDialect = dbEle.getChildText("hibernateDialect");
		if(hibernateDialect == null) {
			hibernateDialect = "org.hibernate.dialect.PostgreSQLDialect";
		}
		String host = dbEle.getChildText("host");
		if(host == null) {
			host = "localhost";
		}
		String port = dbEle.getChildText("port");
		if(port == null) {
			port = "5432";
		}
		String dbName = dbEle.getChildText("dbName");
		if(dbName == null) {
			dbName = "xxx";
		}
		String username = dbEle.getChildText("username");
		if(username == null) {
			username = "xxx";
		}
		String password = dbEle.getChildText("password");
		if(password == null) {
			password = "xxx";
		}
		String url = protocol+"://"+host+":"+port+"/"+dbName;
		dbProps.put("hibernate.connection.driver_class", driver);
		dbProps.put("hibernate.connection.url", url);
		dbProps.put("hibernate.connection.username", username);
		dbProps.put("hibernate.connection.password", password);
		dbProps.put("hibernate.dialect",  hibernateDialect);
		dbProps.put("hibernate.hbm2ddl.auto",  "update");
		dbProps.put("hibernate.show_sql",  "false");
//		dbProps.put("hibernate.c3p0.min_size", "5");
//		dbProps.put("hibernate.c3p0.max_size", "5");
		return dbProps;
	}
}