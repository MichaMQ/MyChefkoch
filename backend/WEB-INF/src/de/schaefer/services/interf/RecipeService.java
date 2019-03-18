package de.schaefer.services.interf;

import java.io.IOException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import de.schaefer.objects.ImageDataDto;
import de.schaefer.objects.RecipeDto;
import de.schaefer.objects.SourceDto;
import de.schaefer.objects.TagDto;
import de.schaefer.objects.TagTypeDto;
import de.schaefer.objects.UnitDto;
import de.schaefer.persistence.entities.Recipe;
import de.schaefer.persistence.entities.Source;

public interface RecipeService {
	@POST
	@Path("uploadImage")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Boolean uploadImage( ImageDataDto imgData ) throws IOException;

	@GET
	@Path("clearCache")
	@Produces(MediaType.APPLICATION_JSON)
	public void clearCache();

	@GET
	@Path("getAllUnits")
	@Produces(MediaType.APPLICATION_JSON)
	public List<UnitDto> getAllUnits();

	@GET
	@Path("printBookInline")
	@Produces({"application/pdf"})
	public Response printBookInline();
	
	@GET
	@Path("printBookDownload")
	@Produces({"application/pdf"})
	public Response printBookDownload();

	@GET
	@Path("getAllSources")
	@Produces(MediaType.APPLICATION_JSON)
	public List<SourceDto> getAllSources();

	@GET
	@Path("getAllTags")
	@Produces(MediaType.APPLICATION_JSON)
	public List<TagDto> getAllTags();

	@GET
	@Path("getAllTagTypes")
	@Produces(MediaType.APPLICATION_JSON)
	public List<TagTypeDto> getAllTagTypes();

	@GET
	@Path("getAllRecipeByTagWithoutMeta")
	@Produces(MediaType.APPLICATION_JSON)
	public List<RecipeDto> getAllRecipeByTagWithoutMeta(@QueryParam("id") Long tagId);

	@GET
	@Path("getRecipeById")
	@Produces(MediaType.APPLICATION_JSON)
	public RecipeDto getRecipeById(@QueryParam("id") Long recipeId);

	@GET
	@Path("findRecipeByName")
	@Produces(MediaType.APPLICATION_JSON)
	public List<RecipeDto> findRecipeByName(@QueryParam("name") String name);

	@GET
	@Path("deleteRecipeById")
	@Produces(MediaType.APPLICATION_JSON)
	public Boolean deleteRecipeById(@QueryParam("id") Long recipeId);

	@POST
	@Path("/saveRecipe")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public RecipeDto saveRecipe(Recipe r);

	@POST
	@Path("/saveSource")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public SourceDto saveSource(Source s);
}
