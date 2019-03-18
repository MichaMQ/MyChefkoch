package de.schaefer.core.spring;
/*
 * Quelle: http://sujitpal.blogspot.com/2007/03/accessing-spring-beans-from-legacy-code.html
 */

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactoryUtils;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.core.io.Resource;

/**
 * Wrapper to always return a reference to the Spring Application Context from
 * within non-Spring enabled beans. Unlike Spring MVC's WebApplicationContextUtils
 * we do not need a reference to the Servlet context for this. All we need is
 * for this bean to be initialized during application startup.
 */
public class SpringApplicationContext implements ApplicationContextAware {

    private static ApplicationContext CONTEXT;

    /** Logger. */
    private static final Logger logger = Logger.getLogger(SpringApplicationContext.class);


    /**
     * This method is called from within the ApplicationContext once it is
     * done starting up, it will stick a reference to itself into this bean.
     * @param context a reference to the ApplicationContext.
     */
    @Override
    public void setApplicationContext(ApplicationContext context) throws BeansException {
        if (context != CONTEXT) {
            CONTEXT = context;
        }
    }

    /**
     * Liefert den ApplicationContext zurück.
     * @return ApplicationContext
     */
    private static ApplicationContext getApplicationContext() {
        return CONTEXT;
    }

    /**
     * Stop using the current ApplicationContext / Allow replacement by another one
     * To be used in TestCases
     */
    public static void unbind() {
        new SpringApplicationContext().setApplicationContext(null);
    }

    /**
     *
     * @return is the singleton application context already set?
     */
    public static boolean isApplicationContextAvailable() {
        return getApplicationContext() != null;
    }

    /**
     *
     * @param other
     * @return is the given application context equal to the singleton
     */
    public static boolean equals(ApplicationContext other) {
        return getApplicationContext() == other;
    }

    /**
     * This is about the same as context.getBean("beanName"), except it has its
     * own static handle to the Spring context, so calling this method statically
     * will give access to the beans by name in the Spring application context.
     * As in the context.getBean("beanName") call, the caller must cast to the
     * appropriate target class. If the bean does not exist, then a Runtime error
     * will be thrown.
     *
     * @param beanIdentifier the identifier of the bean to get.
     * @return an Object reference to the named bean.
     * @throws NoSuchBeanDefinitionException
     */
    /*
    public static Object getBean(BeanIdentifier beanIdentifier) {
        return getBean(beanIdentifier.getBeanName());
    }
*/
    /**
     * @param beanIdentifier the identifier of the bean to get.
     * @return an Object reference to the named Singleton bean if it has already been initialized, e.g. by calling 'getBean(...)'. null otherwise
     * @throws NoSuchBeanDefinitionException
     */
    /*
    public static Object getSingletonBeanIfAlreadyInitialized(BeanIdentifier beanIdentifier) {
        if (isSingletonBeanInitialized(beanIdentifier.getBeanName())) {
            return getBean(beanIdentifier.getBeanName());
        }

        return null;
    }
*/

    private static boolean isSingletonBeanInitialized(String beanName) {
        if (getApplicationContext() instanceof AbstractApplicationContext) {
            ConfigurableListableBeanFactory factory = ((AbstractApplicationContext) getApplicationContext()).getBeanFactory();
            return factory.containsSingleton(beanName);
        }

        // wir können es nicht ermitteln - sicherheitshalber true zurückgeben, damit die Bean im Zweifel herausgegeben wird und nicht unterdrückt.
        return true;
    }

    /**
     * This is about the same as context.getBean("beanName"), except it has its
     * own static handle to the Spring context, so calling this method statically
     * will give access to the beans by name in the Spring application context.
     * As in the context.getBean("beanName") call, the caller must cast to the
     * appropriate target class. If the bean does not exist, then a Runtime error
     * will be thrown.
     *
     * @param beanName the name of the bean to get.
     * @return an Object reference to the named bean.
     * @throws NoSuchBeanDefinitionException
     */
    public static Object getBean(String beanName) {
        return doGetBean(getApplicationContext(), beanName);
    }

    /**
     *
     *
     * @param beanName the name of the bean to get.
     * @return true, if bean exists.
     * @throws NoSuchBeanDefinitionException
     */
    public static boolean hasBean(String beanName) {
        try {
            getApplicationContext().getBean(beanName);
            return true;
        } catch (NoSuchBeanDefinitionException e) {
            //
        }
        return false;
    }

    /**
     * This is about the same as context.getBean("beanName"), except it has its
     * own static handle to the Spring context, so calling this method statically
     * will give access to the beans by name in the Spring application context.
     * As in the context.getBean("beanName") call, the caller must cast to the
     * appropriate target class. If the bean does not exist, then a Runtime error
     * will be thrown.
     *
     * @param beanName the name of the bean to get.
     * @param args
     * @return an Object reference to the named bean.
     * @throws NoSuchBeanDefinitionException
     */
    public static Object getBean(String beanName, Object... args) {
        return doGetBean(getApplicationContext(), beanName, args);
    }

    private static Object doGetBean(ApplicationContext context, String beanName) {
        if (context != null) {
            try {
                return context.getBean(beanName);
            } catch (NoSuchBeanDefinitionException e) {
                logger.error("Spring-Bean mit dem Alias '" + beanName + "' wurde nicht gefunden!");
            }
        } else {
            logger.error("no springApplicationContext found!", new Throwable());
        }
        return null;
    }

    private static Object doGetBean(ApplicationContext context, String beanName, Object... args) {
        if (context != null) {
            try {
                return context.getBean(beanName, args);
            } catch (NoSuchBeanDefinitionException e) {
                logger.error("Spring-Bean mit dem Alias " + beanName + " wurde nicht gefunden");
            }
        } else {
            logger.error("no springApplicationContext found!", new Throwable());
        }
        return null;
    }

    /**
     * {@link ApplicationContext#getBeansOfType(Class)}
     *
     * TODO: möglichst entfernen und durch eine Variante ersetzen, die nur Singletons ansieht (viel billiger!)
     *
     * @param type
     * @param <T>
     * @return all beans of the given type, including non singletons and results of factory beans (expensive!!)
     */
    public static <T> Map<String, T> getBeansOfType(Class<T> type) {
        return getBeansOfType(type, false);
    }

    /**
     * {@link ApplicationContext#getBeansOfType(Class)}
     *
     * @param type
     * @param singletonsOnly if true, return only singleton beans, if false return also non singletons and results of factory beans (more expensive!!)
     * @param <T>
     * @return all beans of the given type
     */
    public static <T> Map<String, T> getBeansOfType(Class<T> type, boolean singletonsOnly) {
        ApplicationContext context = getApplicationContext();
        if (context != null) {
            // context.getBeansOfType(type) inspect the whole application context an crashes on any error
            Map<String, T> beans = BeanFactoryUtils.beansOfTypeIncludingAncestors(context, type, !singletonsOnly, !singletonsOnly);
            return beans;
        } else {
            logger.error("no springApplicationContext found!", new Throwable());
        }
        return Collections.emptyMap();
    }

    /**
     * @param beanName
     * @return the scope of the bean with the given name
     */
    public static String getScope(String beanName) {
        ConfigurableListableBeanFactory beanFactory = ((ConfigurableApplicationContext) getApplicationContext()).getBeanFactory();
        BeanDefinition beanDef = beanFactory.getBeanDefinition(beanName);
        return getScope(beanDef);
    }

    /**
     * @param def
     * @return the scope of the given bean
     */
    public static String getScope(BeanDefinition def) {
        // wenn in der Definition kein Scope angegeben ist, dann ist der Scope leer und die Bean ein Singleton
        String currentScope = def.isSingleton() ? ConfigurableBeanFactory.SCOPE_SINGLETON : def.getScope();
        return currentScope;
    }

    /**
     * The Method supplies a File object for a given resource
     * @param path servlet-relative or absolut path to a given resource
     * @return the file object for the resource
     * @throws IOException
     */
    public static File getFileResource(String path) throws IOException {
        Resource resource = CONTEXT.getResource(path);
        return resource.getFile();
    }

    /**
     * The Method supplies a File object for a given resource
     * @param path servlet-relative or absolut path to a given resource
     * @return the filepath for the resource
     *
     */
    public static String getFileName(String path) {
        Resource resource = CONTEXT.getResource(path);
        try {
            File file = resource.getFile();
            return file.getCanonicalPath();
        } catch (IOException e) {
            logger.error("unable to get filename", e);
        }
        return null;

    }

    /**
     * The Method supplies a URI object for a given resource
     * @param path servlet-relative or absolut path to a given resource
     * @return the URI-String for the resource
     */
    public static String getURI(String path) {
        Resource resource = CONTEXT.getResource(path);
        try {
            URI uri = resource.getURI();
            return uri.toString();
        } catch (IOException e) {
            logger.error("unable to get URI", e);
        }
        return null;

    }

    /**
     * The Method supplies a URL object for a given resource
     * @param path servlet-relative or absolut path to a given resource
     * @return the URL-String for the resource
     */
    public static String getURL(String path) {
        Resource resource = CONTEXT.getResource(path);
        try {
            URL uri = resource.getURL();
            return uri.toString();
        } catch (IOException e) {
            logger.error("unable to get URL", e);
        }
        return null;
    }

    /**
     * Provide a map of all bean definitions with bean name as key and bean class name as value
     * @return bean defintion map with key bean name and value bean class name
     */
    public static Map<String, String> getBeanDefinitions() {
        Map<String, String> result = new HashMap<String, String>();
        ConfigurableApplicationContext c = (ConfigurableApplicationContext) getApplicationContext();
        if (c != null) {
            ConfigurableListableBeanFactory f = c.getBeanFactory();
            String[] names = c.getBeanDefinitionNames();
            for (String name : names) {
                BeanDefinition beanDefinition = f.getBeanDefinition(name);
                result.put(name, beanDefinition.getBeanClassName());
            }
        }
        return result;
    }
}
