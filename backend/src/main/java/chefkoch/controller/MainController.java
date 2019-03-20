package chefkoch.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import chefkoch.dto.PartDto;
import chefkoch.dto.RecipeDto;
import chefkoch.dto.SourceDto;
import chefkoch.dto.TagDto;
import chefkoch.dto.TagtypeDto;
import chefkoch.dto.UnitDto;
import chefkoch.service.enums.BookPrintType;
import chefkoch.service.iface.RecipeService;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/RecipeServer/api/v1") // This means URL's start with /demo (after Application path)

public class MainController {
	@Autowired
	private RecipeService recipeService;
	
	@PostMapping("/saveSource")
	SourceDto saveSource(@RequestBody SourceDto source) {
		return this.recipeService.saveSource(source);
	}
	
	@PostMapping("/saveRecipe")
	RecipeDto saveRecipe(@RequestBody RecipeDto recipe) {
		return this.recipeService.saveRecipe(recipe);
	}
	
	@GetMapping(path = "/savePassword")
	public @ResponseBody Boolean savePassword(@RequestParam String username, @RequestParam String password) {
		return this.recipeService.savePassword(username, password);
	}

	@GetMapping(path = "/login")
	public @ResponseBody Boolean login(@RequestParam String username, @RequestParam String password) {
		return this.recipeService.login(username, password);
	}

	@GetMapping(path = "/printBookInline")
	public @ResponseBody ResponseEntity<byte[]> printBookInline() {
		return this.recipeService.printBook(BookPrintType.INLINE);
	}

	@GetMapping(path = "/printBookDownload")
	public @ResponseBody ResponseEntity<byte[]> printBookDownload() {
		return this.recipeService.printBook(BookPrintType.ATTACHMENT);
	}
	
	@GetMapping(path = "/findRecipeByName")
	public @ResponseBody List<RecipeDto> findRecipeByName(@RequestParam String name) {
		return this.recipeService.findRecipeByName(name, false);
	}

	@GetMapping(path = "/getAllRecipeByTagWithoutMeta")
	public @ResponseBody List<RecipeDto> getAllRecipeByTagWithoutMeta(@RequestParam Integer id) {
		return recipeService.getAllRecipeByTag(id, false);
	}

	@GetMapping(path = "/removeRecipeById")
	public @ResponseBody Boolean removeRecipeById(@RequestParam Integer id) {
		return recipeService.deleteRecipe(id);
	}

	@GetMapping(path = "/getRecipeById")
	public @ResponseBody RecipeDto getRecipeById(@RequestParam Integer id) {
		return recipeService.getRecipeById(id);
	}

	@GetMapping(path = "/getAllSources")
	public @ResponseBody Iterable<SourceDto> getAllSources() {
		return recipeService.getAllSources(Boolean.FALSE);
	}
	
	@GetMapping(path = "/getAllSourcesSorted")
	public @ResponseBody Iterable<SourceDto> getAllSourcesSorted() {
		return recipeService.getAllSources(Boolean.TRUE);
	}
	
	@GetMapping(path = "/getAllTags")
	public @ResponseBody Iterable<TagDto> getAllTags() {
		return recipeService.getAllTags(Boolean.FALSE);
	}
	
	@GetMapping(path = "/getAllTagsSorted")
	public @ResponseBody Iterable<TagDto> getAllTagsSorted() {
		return recipeService.getAllTags(Boolean.TRUE);
	}
	
	@GetMapping(path = "/getAllTagTypes")
	public @ResponseBody Iterable<TagtypeDto> getAllTagtypes() {
		return recipeService.getAllTagtypes(Boolean.FALSE);
	}
	
	@GetMapping(path = "/getAllTagTypesSorted")
	public @ResponseBody Iterable<TagtypeDto> getAllTagtypesSorted() {
		return recipeService.getAllTagtypes(Boolean.TRUE);
	}
	
	@GetMapping(path = "/getAllUnits")
	public @ResponseBody Iterable<UnitDto> getAllUnits() {
		return recipeService.getAllUnits(Boolean.FALSE);
	}
	
	@GetMapping(path = "/getAllUnitsSorted")
	public @ResponseBody Iterable<UnitDto> getAllUnitsSorted() {
		return recipeService.getAllUnits(Boolean.TRUE);
	}
	
	@GetMapping(path = "/getAllParts")
	public @ResponseBody Iterable<PartDto> getAllParts() {
		return recipeService.getAllParts(Boolean.FALSE);
	}
	
	@ExceptionHandler
	void handleIllegalArgumentException(IllegalArgumentException e, HttpServletResponse response) throws IOException {
		response.sendError(HttpStatus.BAD_REQUEST.value());
	}
}
