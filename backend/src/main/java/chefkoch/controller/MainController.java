package chefkoch.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
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
	
	private final String timeoutMsg = "Timeout der Authentifizierung!";
	
	@PostMapping("/saveSource")
	SourceDto saveSource(HttpServletRequest request, HttpServletResponse response, @RequestBody SourceDto source) throws IOException {
		Boolean tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid.booleanValue()) {
			return this.recipeService.saveSource(source);
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return null;
		}
	}
	
	@PostMapping("/saveRecipe")
	RecipeDto saveRecipe(HttpServletRequest request, HttpServletResponse response, @RequestBody RecipeDto recipe) throws IOException {
		Boolean tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid.booleanValue()) {
			return this.recipeService.saveRecipe(recipe);
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return null;
		}
	}
	
	@GetMapping(path = "/savePassword")
	public @ResponseBody Boolean savePassword(HttpServletRequest request, HttpServletResponse response, @RequestParam String username, @RequestParam String password) throws IOException {
		Boolean tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid.booleanValue()) {
			return this.recipeService.savePassword(username, password);
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return Boolean.FALSE;
		}
	}

	@GetMapping(path = "/login")
	public @ResponseBody String login(HttpServletResponse response, @RequestParam String username, @RequestParam String password) {
		String token = this.recipeService.login(username, password);
		if(token != null) {
			response.setHeader("token", token);
			System.out.println(token);
			return token;
		} else {
			return "";
		}
	}

	@GetMapping(path = "/printBookInline")
	public @ResponseBody ResponseEntity<byte[]> printBookInline(HttpServletRequest request) {
		this.recipeService.isTokenValid(request);
		return this.recipeService.printBook(BookPrintType.INLINE);
	}

	@GetMapping(path = "/printBookDownload")
	public @ResponseBody ResponseEntity<byte[]> printBookDownload(HttpServletRequest request) {
		this.recipeService.isTokenValid(request);
		return this.recipeService.printBook(BookPrintType.ATTACHMENT);
	}
	
	@GetMapping(path = "/findRecipeByName")
	public @ResponseBody List<RecipeDto> findRecipeByName(HttpServletRequest request, @RequestParam String name) {
		this.recipeService.isTokenValid(request);
		return this.recipeService.findRecipeByName(name, false);
	}

	@GetMapping(path = "/getAllRecipeByTagWithoutMeta")
	public @ResponseBody List<RecipeDto> getAllRecipeByTagWithoutMeta(HttpServletRequest request, @RequestParam Integer id) {
		this.recipeService.isTokenValid(request);
		return recipeService.getAllRecipeByTag(id, false);
	}

	@GetMapping(path = "/removeRecipeById")
	public @ResponseBody Boolean removeRecipeById(HttpServletRequest request, HttpServletResponse response, @RequestParam Integer id) throws IOException {
		Boolean tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid.booleanValue()) {
			return recipeService.deleteRecipe(id);
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return null;
		}
	}

	@GetMapping(path = "/getRecipeById")
	public @ResponseBody RecipeDto getRecipeById(HttpServletRequest request, @RequestParam Integer id) {
		this.recipeService.isTokenValid(request);
		return recipeService.getRecipeById(id);
	}

	@GetMapping(path = "/getAllSources")
	public @ResponseBody Iterable<SourceDto> getAllSources(HttpServletRequest request) {
		this.recipeService.isTokenValid(request);
		return recipeService.getAllSources(Boolean.FALSE);
	}
	
	@GetMapping(path = "/getAllSourcesSorted")
	public @ResponseBody Iterable<SourceDto> getAllSourcesSorted(HttpServletRequest request) {
		this.recipeService.isTokenValid(request);
		return recipeService.getAllSources(Boolean.TRUE);
	}
	
	@GetMapping(path = "/getAllTags")
	public @ResponseBody Iterable<TagDto> getAllTags(HttpServletRequest request) {
		this.recipeService.isTokenValid(request);
		return recipeService.getAllTags(Boolean.FALSE);
	}
	
	@GetMapping(path = "/getAllTagsSorted")
	public @ResponseBody Iterable<TagDto> getAllTagsSorted(HttpServletRequest request) {
		this.recipeService.isTokenValid(request);
		return recipeService.getAllTags(Boolean.TRUE);
	}
	
	@GetMapping(path = "/getAllTagTypes")
	public @ResponseBody Iterable<TagtypeDto> getAllTagtypes(HttpServletRequest request) {
		this.recipeService.isTokenValid(request);
		return recipeService.getAllTagtypes(Boolean.FALSE);
	}
	
	@GetMapping(path = "/getAllTagTypesSorted")
	public @ResponseBody Iterable<TagtypeDto> getAllTagtypesSorted(HttpServletRequest request) {
		this.recipeService.isTokenValid(request);
		return recipeService.getAllTagtypes(Boolean.TRUE);
	}
	
	@GetMapping(path = "/getAllUnits")
	public @ResponseBody Iterable<UnitDto> getAllUnits(HttpServletRequest request) {
		this.recipeService.isTokenValid(request);
		return recipeService.getAllUnits(Boolean.FALSE);
	}
	
	@GetMapping(path = "/getAllUnitsSorted")
	public @ResponseBody Iterable<UnitDto> getAllUnitsSorted(HttpServletRequest request) {
		this.recipeService.isTokenValid(request);
		return recipeService.getAllUnits(Boolean.TRUE);
	}
	
	@GetMapping(path = "/getAllParts")
	public @ResponseBody Iterable<PartDto> getAllParts(HttpServletRequest request) {
		this.recipeService.isTokenValid(request);
		return recipeService.getAllParts(Boolean.FALSE);
	}

	@ExceptionHandler
	void handleIllegalArgumentException(IllegalArgumentException e, HttpServletResponse response) throws IOException {
		response.sendError(HttpStatus.BAD_REQUEST.value());
	}
}
