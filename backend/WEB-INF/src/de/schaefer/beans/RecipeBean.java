package de.schaefer.beans;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;

import org.apache.log4j.Logger;

import de.schaefer.core.DBHandlerListener;
import de.schaefer.objects.RecipeDto;
import de.schaefer.objects.SourceDto;
import de.schaefer.objects.TagDto;
import de.schaefer.objects.TagTypeDto;
import de.schaefer.objects.UnitDto;
import de.schaefer.persistence.entities.Ingredient;
import de.schaefer.persistence.entities.Recipe;
import de.schaefer.persistence.entities.Recipe_Tag;
import de.schaefer.persistence.entities.Source;
import de.schaefer.persistence.entities.Tag;
import de.schaefer.persistence.entities.Tag_Type;
import de.schaefer.persistence.entities.Todo;
import de.schaefer.persistence.entities.Unit;

public class RecipeBean {
	private static Logger logger = Logger.getLogger(RecipeBean.class);

	public void clearCache() {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
		em.clear();
	}
	
	public List<UnitDto> getAllUnits() {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
		List<UnitDto> list = new LinkedList<UnitDto>();
  	List<Unit> tempList = em.createNamedQuery(Unit.QUERY_GETALL, Unit.class).getResultList();
  	for(Unit u : tempList) {
  		list.add(new UnitDto(u));
  	}
  	//em.getTransaction().commit();
  	return list;
	}
	
	public List<SourceDto> getAllSources() {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
		List<SourceDto> list = new LinkedList<SourceDto>();
  	List<Source> tempList = em.createNamedQuery(Source.QUERY_GETALL, Source.class).getResultList();
  	for(Source t : tempList) {
  		list.add(new SourceDto(t));
  	}
  	
  	//em.getTransaction().commit();
  	return list;
	}
	
	public List<TagDto> getAllTags() {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
		List<TagDto> list = new LinkedList<TagDto>();
  	List<Tag> tempList = em.createNamedQuery(Tag.QUERY_GETALL, Tag.class).getResultList();
  	for(Tag t : tempList) {
  		list.add(new TagDto(t));
  	}
  	//em.getTransaction().commit();
  	return list;
	}
	
	public List<TagTypeDto> getAllTagTypeDtos() {
		EntityManager em = DBHandlerListener.getDBHandler();
		
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
		List<TagTypeDto> list = new LinkedList<TagTypeDto>();
  	List<Tag_Type> tempList = em.createNamedQuery(Tag_Type.QUERY_GETALL, Tag_Type.class).getResultList();
	  
  	for(Tag_Type tt : tempList) {
  		TagTypeDto ttDto = new TagTypeDto(tt);
  		
  		List<Tag> tagList = em.createNamedQuery(Tag.QUERY_GET_BY_TAGTYPEID, Tag.class)
  				.setParameter("tagTypeId", tt.getId())
  				.getResultList();

  		for(Tag t : tagList) {
  			ttDto.getTagList().add(t);
  		}
  		
  		list.add(ttDto);
  	}
  	
  	//em.getTransaction().commit();
	  return list;
		
	}

	public List<RecipeDto> getAllRecipeByTag(Long tagId, boolean withMeta) {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
		List<RecipeDto> list = new LinkedList<RecipeDto>();
  	List<Recipe> tempList = em.createNamedQuery(Recipe.QUERY_GET_BY_TAG, Recipe.class)
  			.setParameter("tagId", tagId)
  			.getResultList();
		for(Recipe r : tempList) {
			RecipeDto rDto = new RecipeDto(r, false);
	  	if(withMeta == false) {
				rDto.setImage(null);
				rDto.setIngredients(null);
				rDto.setTodos(null);
				rDto.setTags(null);
			}
			list.add(rDto);
  	}
  	//em.getTransaction().commit();
	  return list;
	}

	public List<RecipeDto> getAllRecipes() {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
		List<RecipeDto> list = new LinkedList<RecipeDto>();
		List<Recipe> tempList = em.createNamedQuery(Recipe.QUERY_GETALL, Recipe.class)
  			.getResultList();
		
		for(Recipe r : tempList) {
			list.add(new RecipeDto(r, false));
		}
		
	  //em.getTransaction().commit();
	  return list;
	}
	
	public RecipeDto getRecipeById(Long recipeId) {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
	  Recipe r = em.find(Recipe.class, recipeId);
	  //em.getTransaction().commit();
	  return new RecipeDto(r, false);
	}
	
	public List<RecipeDto> findRecipeByName(String name, boolean withMeta) {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
		List<RecipeDto> list = new LinkedList<RecipeDto>();
		
		CriteriaBuilder builder = em.getCriteriaBuilder();
    CriteriaQuery<Recipe> criteria = builder.createQuery(Recipe.class);
    Root<Recipe> recipeRoot = criteria.from(Recipe.class);
    Expression<String> path = recipeRoot.get("name");
    Expression<String> lower = builder.lower(path);
    criteria.where(builder.and(builder.like(lower, "%"+name.toLowerCase()+"%")));
    List<Recipe> tempList = em.createQuery(criteria).getResultList();
		
  	for(Recipe r : tempList) {
  		RecipeDto rDto = new RecipeDto(r, false);
    	if(withMeta == false) {
  			rDto.setImage(null);
  			rDto.setIngredients(null);
  			rDto.setTodos(null);
  			rDto.setTags(null);
    	}
  		list.add(rDto);
  	}
		
	  //em.getTransaction().commit();
	  return list;
	}
	
	public RecipeDto saveRecipe(Recipe r) {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			em.getTransaction().begin();
		}
	  em = DBHandlerListener.getDBHandler();
	  
	  Recipe nr = new Recipe();
	  nr.setId(r.getId());
	  nr.setAikz(r.getAikz());
	  nr.setImage(r.getImage());
	  nr.setName(r.getName());
	  nr.setNumber(r.getNumber());
	  nr.setNv_carbohydrates(r.getNv_carbohydrates());
	  nr.setNv_energy(r.getNv_energy());
	  nr.setNv_fat(r.getNv_fat());
	  nr.setNv_protein(r.getNv_protein());
	  nr.setNv_size(r.getNv_size());
	  nr.setSource(r.getSource());
	  nr.setTags(r.getTags());
	  nr.setSource_page(r.getSource_page());
	  nr.setTranslate(r.getTranslate());
	  nr.setTags(r.getTags());
	  nr.setTodos(new HashSet<Todo>());
	  nr.setIngredients(new HashSet<Ingredient>());
	  Recipe newRecipe = em.merge(nr);
		em.persist(newRecipe);

		Set<Ingredient> iSet = new HashSet<Ingredient>();
		Set<Todo> tSet = new HashSet<Todo>();
	  for (Ingredient i : r.getIngredients()) {
	  	i.setRecipe(newRecipe);
	  	Ingredient ni = em.merge(i);
	  	em.persist(ni);
	  	iSet.add(ni);
	  }
	  for (Todo t : r.getTodos()) {
	  	t.setRecipe(newRecipe);
	  	Todo nt = em.merge(t);
	  	em.persist(nt);
	  	tSet.add(nt);
	  }
		
		em.getTransaction().commit();
		newRecipe.setTodos(tSet);
		newRecipe.setIngredients(iSet);
	  logger.debug("Rezept mit id " + r.getId() + " gespeichert.");
		return new RecipeDto(newRecipe, false);
	}
	
	public Boolean deleteRecipeById(Long id) {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
		Query q = em.createNamedQuery(Recipe.QUERY_DELETE_BY_ID);
		q.setParameter("recipeId", id);
		q.executeUpdate();

		q = em.createNamedQuery(Todo.QUERY_DELETE_BY_RECIPEID);
		q.setParameter("recipeId", id);
		q.executeUpdate();

		q = em.createNamedQuery(Ingredient.QUERY_DELETE_BY_RECIPEID);
		q.setParameter("recipeId", id);
		q.executeUpdate();

		q = em.createNamedQuery(Recipe_Tag.QUERY_DELETE_BY_RECIPEID);
		q.setParameter("recipeId", id);
		q.executeUpdate();

		//em.getTransaction().commit();
		return Boolean.TRUE;
	}

	public SourceDto saveSource(Source s) {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			em.getTransaction().begin();
		}
	  em = DBHandlerListener.getDBHandler();
	  Source newSource = em.merge(s);
		em.persist(newSource);
		em.getTransaction().commit();
	  logger.debug("Quelle mit id " + s.getId() + " gespeichert.");
		return new SourceDto(s);
	}


	/*
	public List<Video> getAllVideos() {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
  	List<Video> list = em.createNamedQuery(Video.QUERY_GETALL, Video.class)
				.getResultList();
	  //em.getTransaction().commit();
	  return list;
	}
	
	public List<Actor> getAllActors() {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
  	List<Actor> list = em.createNamedQuery(Actor.QUERY_GETALL, Actor.class)
				.getResultList();
	  //em.getTransaction().commit();
	  return list;
	}
	
	public List<Tag> getAllTags() {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
  	List<Tag> list = em.createNamedQuery(Tag.QUERY_GETALL, Tag.class)
				.getResultList();
  	//em.getTransaction().commit();
	  return list;
	}
	
	public Video getVideoById(Long id) {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
	  Video v = em.find(Video.class, id);
	  //em.getTransaction().commit();
	  return v;
	}
	
	public List<Video> getAllVideoOfActorId(Long id) {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
  	List<Video> list = em.createNamedQuery(Video.QUERY_GET_BY_ACTOR, Video.class)
				.setParameter("actorId", id)
				.getResultList();
  	//em.getTransaction().commit();
	  return list;
	}

	public List<Video> getAllVideoOfTagId(Long id) {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
  	List<Video> list = em.createNamedQuery(Video.QUERY_GET_BY_TAG, Video.class)
				.setParameter("tagId", id)
				.getResultList();
  	//em.getTransaction().commit();
	  return list;
	}
	
	public void deleteVideoById(Long id) {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			//em.getTransaction().begin();
		}
		Query q = em.createNamedQuery(Video.QUERY_DELETE_BY_ID);
		q.setParameter("videoId", id);
		q.executeUpdate();
		//em.getTransaction().commit();
	}

	public Video saveVideo(Video v) {
		EntityManager em = DBHandlerListener.getDBHandler();
		if(!em.getTransaction().isActive()) {
			em.getTransaction().begin();
		}
	  em = DBHandlerListener.getDBHandler();
	  Video newVideo = em.merge(v);
		em.persist(newVideo);
		em.getTransaction().commit();
	  logger.debug("Video mit id " + v.getId() + " gespeichert.");
		return newVideo;
	}
	*/

}
