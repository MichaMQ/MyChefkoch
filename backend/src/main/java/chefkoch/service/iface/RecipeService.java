package chefkoch.service.iface;

import java.util.List;

import org.springframework.http.ResponseEntity;

import chefkoch.dto.PartDto;
import chefkoch.dto.RecipeDto;
import chefkoch.dto.SourceDto;
import chefkoch.dto.TagDto;
import chefkoch.dto.TagtypeDto;
import chefkoch.dto.UnitDto;
import chefkoch.entity.Recipe;
import chefkoch.service.enums.BookPrintType;

public interface RecipeService {
	public Boolean saveRecipe(Recipe recipe) throws IllegalArgumentException;

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

	public Boolean login(String username, String password);
}
