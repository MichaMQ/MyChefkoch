package chefkoch.service.iface;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;

import chefkoch.dto.IngredientDto;
import chefkoch.dto.PartDto;
import chefkoch.dto.PersonDto;
import chefkoch.dto.RecipeDto;
import chefkoch.dto.SessionDto;
import chefkoch.dto.SourceDto;
import chefkoch.dto.TagDto;
import chefkoch.dto.TagtypeDto;
import chefkoch.dto.TodoDto;
import chefkoch.dto.UnitDto;
import chefkoch.entity.Person;
import chefkoch.service.enums.BookPrintType;

public interface RecipeService {

	public SourceDto saveSource(SourceDto sourceDto) throws IllegalArgumentException;

	public RecipeDto saveRecipe(RecipeDto recipe) throws IllegalArgumentException;

	public Boolean deleteRecipe(Integer id) throws IllegalArgumentException;

	public RecipeDto getRecipeById(Integer id) throws IllegalArgumentException;

	public Iterable<SourceDto> getAllSources(Boolean sortedByName);

	public Iterable<TagDto> getAllTags(Boolean sortedByName);

	public Iterable<TagtypeDto> getAllTagtypes(Boolean sortedByName);

	public Iterable<UnitDto> getAllUnits(Boolean sortedByName);

	public List<RecipeDto> getAllRecipeByTag(Integer tagId, boolean withMeta);

	public List<RecipeDto> findRecipeByName(String name, boolean withMeta);

	public ResponseEntity<byte[]> printBook(BookPrintType bookPrintType);

	public Iterable<PartDto> getAllParts(Boolean sortedByName);

	public Boolean savePassword(String username, String password);

	public SessionDto login(String username, String password);

	public Person isTokenValid(HttpServletRequest request);

	public void initUuids();

	public Boolean savePerson(String firstname, String surname, String username, String password, Boolean isAdmin);

	public RecipeDto addRecipe(Person person, RecipeDto recipeDto) throws IllegalArgumentException;

	public Boolean addSource(Integer recipeId, SourceDto sourceDto) throws IllegalArgumentException;

	public Boolean updateSource(SourceDto eleDto);

	public Boolean deleteSource(Integer sourceId);

	public Boolean addTag(Integer recipeId, TagDto tagDto) throws IllegalArgumentException;

	public Boolean updateTag(TagDto eleDto);

	public Boolean deleteTag(Integer tagId);

	public Boolean addTodo(Integer recipeId, TodoDto todoDto) throws IllegalArgumentException;

	public Boolean updateTodo(TodoDto eleDto);

	public Boolean deleteTodo(Integer todoId);

	public Boolean addIngredient(Integer recipeId, IngredientDto ingredientDto) throws IllegalArgumentException;

	public Boolean updateIngredient(IngredientDto eleDto);

	public Boolean deleteIngredient(Integer ingredientId);

	public List<PersonDto> getAllPerson(Boolean sortedByName);
}
