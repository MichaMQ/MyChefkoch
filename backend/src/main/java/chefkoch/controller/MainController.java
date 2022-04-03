package chefkoch.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
import chefkoch.requestObj.AddIngredient;
import chefkoch.requestObj.AddTodo;
import chefkoch.service.enums.BookPrintType;
import chefkoch.service.iface.RecipeService;
import chefkoch.util.XMLUtil;

@RestController // This means that this class is a Controller
@RequestMapping(path = "/RecipeServer/api/v1") // This means URL's start with /demo (after Application path)

public class MainController {
	@Autowired
	private RecipeService recipeService;
	
	private final String timeoutMsg = "Timeout der Authentifizierung!";
	private final String successMsg = "Request processed successful!";
	private final Boolean isLocalTest = Boolean.TRUE;
	
	@RequestMapping(value = "/saveSource",
			method = RequestMethod.POST,
      consumes = {MediaType.APPLICATION_JSON},
      produces = {MediaType.APPLICATION_JSON})
	@ResponseBody
	public ResponseEntity<SourceDto> saveSource(HttpServletRequest request, HttpServletResponse response, @RequestBody SourceDto source) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			response.setStatus(HttpServletResponse.SC_OK);
			SourceDto savedSource = this.recipeService.saveSource(source);
			System.out.println(XMLUtil.dumpElement(savedSource.toXml()));
			final HttpHeaders httpHeaders= new HttpHeaders();
	    httpHeaders.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
	    return new ResponseEntity<SourceDto>(savedSource, httpHeaders, HttpStatus.OK);
			//return savedSource;
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return null;
		}
	}

	@GetMapping(path = "/deleteIngredient")
	public @ResponseBody Boolean deleteIngredient(HttpServletRequest request, HttpServletResponse response, @RequestParam Integer ingredientId) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			if(this.recipeService.deleteIngredient(ingredientId)) {
				response.setStatus(HttpServletResponse.SC_OK);
				return Boolean.TRUE;
			} else {
				response.sendError(HttpServletResponse.SC_NOT_MODIFIED, "Fehler beim Löschen einer Zutat");
				return Boolean.FALSE;
			}
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return Boolean.FALSE;
		}
	}
	@PostMapping("/updateIngredient")
	public @ResponseBody Boolean updateIngredient(HttpServletRequest request, HttpServletResponse response, @RequestBody IngredientDto eleDto) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			if(this.recipeService.updateIngredient(eleDto)) {
				response.setStatus(HttpServletResponse.SC_OK);
				return Boolean.TRUE;
			} else {
				response.sendError(HttpServletResponse.SC_NOT_MODIFIED, "Fehler beim Ändern einer Zutat");
				return Boolean.FALSE;
			}
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return Boolean.FALSE;
		}
	}
	@PostMapping("/addIngredient")
	public @ResponseBody IngredientDto addIngredient(HttpServletRequest request, HttpServletResponse response, @RequestBody AddIngredient ele) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			IngredientDto newIngre = this.recipeService.addIngredient(ele.getRecipeId(), ele.getIngredientDto());
			if(newIngre != null) {
				response.setStatus(HttpServletResponse.SC_OK);
				return newIngre;
			} else {
				response.sendError(HttpServletResponse.SC_NOT_MODIFIED, "Fehler beim Hinzufügen einer Zutat");
				return null;
			}
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return null;
		}
	}

	@GetMapping(path = "/deleteTodo")
	public @ResponseBody Boolean deleteTodo(HttpServletRequest request, HttpServletResponse response, @RequestParam Integer todoId) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			if(this.recipeService.deleteTodo(todoId)) {
				response.setStatus(HttpServletResponse.SC_OK);
				return Boolean.TRUE;
			} else {
				response.sendError(HttpServletResponse.SC_NOT_MODIFIED, "Fehler beim Löschen einer Aufgabe");
				return Boolean.FALSE;
			}
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return Boolean.FALSE;
		}
	}
	@PostMapping("/updateTodo")
	public @ResponseBody Boolean updateTodo(HttpServletRequest request, HttpServletResponse response, @RequestBody TodoDto eleDto) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			if(this.recipeService.updateTodo(eleDto)) {
				response.setStatus(HttpServletResponse.SC_OK);
				return Boolean.TRUE;
			} else {
				response.sendError(HttpServletResponse.SC_NOT_MODIFIED, "Fehler beim Ändern einer Aufgabe");
				return Boolean.FALSE;
			}
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return Boolean.FALSE;
		}
	}
	@PostMapping("/addTodo")
	public @ResponseBody TodoDto addTodo(HttpServletRequest request, HttpServletResponse response, @RequestBody AddTodo eleDto) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			TodoDto todo = this.recipeService.addTodo(eleDto.getRecipeId(), eleDto.getTodoDto());
			if(todo != null) {
				response.setStatus(HttpServletResponse.SC_OK);
				return todo;
			} else {
				response.sendError(HttpServletResponse.SC_NOT_MODIFIED, "Fehler beim Hinzufügen eines Arbeitsschritts");
				return null;
			}
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return null;
		}
	}

	@GetMapping(path = "/removeTagFromRecipe")
	public @ResponseBody Boolean removeTagFromRecipe(HttpServletRequest request, HttpServletResponse response, @RequestParam Integer recipeId, @RequestParam Integer tagId) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			if(this.recipeService.removeTagFromRecipe(recipeId, tagId)) {
				response.setStatus(HttpServletResponse.SC_OK);
				return Boolean.TRUE;
			} else {
				response.sendError(HttpServletResponse.SC_NOT_MODIFIED, "Fehler beim Löschen einer Aufgabe");
				return Boolean.FALSE;
			}
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return Boolean.FALSE;
		}
	}
	@PostMapping("/updateTag")
	public @ResponseBody Boolean updateTag(HttpServletRequest request, HttpServletResponse response, @RequestBody TagDto eleDto) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			if(this.recipeService.updateTag(eleDto)) {
				response.setStatus(HttpServletResponse.SC_OK);
				return Boolean.TRUE;
			} else {
				response.sendError(HttpServletResponse.SC_NOT_MODIFIED, "Fehler beim Ändern einer Aufgabe");
				return Boolean.FALSE;
			}
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return Boolean.FALSE;
		}
	}

	@GetMapping(path = "/addTagToRecipe")
	public @ResponseBody Boolean addTagToRecipe(HttpServletRequest request, HttpServletResponse response, @RequestParam Integer recipeId, @RequestParam Integer tagId) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			if(this.recipeService.addTagToRecipe(recipeId, tagId)) {
				response.setStatus(HttpServletResponse.SC_OK);
				return Boolean.TRUE;
			} else {
				response.sendError(HttpServletResponse.SC_NOT_MODIFIED, "Fehler beim Hinzufügen eines Tags");
				return Boolean.FALSE;
			}
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return Boolean.FALSE;
		}
	}

	@GetMapping(path = "/updateSource")
	public @ResponseBody Boolean updateSource(HttpServletRequest request, HttpServletResponse response, @RequestBody Integer recipeId, @RequestBody Integer eleId) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			if(this.recipeService.updateSource(recipeId, eleId)) {
				response.setStatus(HttpServletResponse.SC_OK);
				return Boolean.TRUE;
			} else {
				response.sendError(HttpServletResponse.SC_NOT_MODIFIED, "Fehler beim Ändern einer Aufgabe");
				return Boolean.FALSE;
			}
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return Boolean.FALSE;
		}
	}

	@PostMapping("/addRecipe")
	public @ResponseBody RecipeDto addRecipe(HttpServletRequest request, HttpServletResponse response, @RequestBody RecipeDto recipe) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		RecipeDto savedRecipe = null;
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			savedRecipe = this.recipeService.addRecipe(tokenIsValid, recipe);
			response.setStatus(HttpServletResponse.SC_OK);
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			savedRecipe = null;
		}
		return savedRecipe;
	}
	
	@PostMapping("/saveRecipe")
	public @ResponseBody RecipeDto saveRecipe(HttpServletRequest request, HttpServletResponse response, @RequestBody RecipeDto recipe) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		RecipeDto savedRecipe = null;
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			savedRecipe = this.recipeService.saveRecipe(recipe);
			response.setStatus(HttpServletResponse.SC_OK);
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			savedRecipe = null;
		}
		return savedRecipe;
	}
	
	@GetMapping(path = "/savePerson")
	public @ResponseBody Boolean savePerson(HttpServletRequest request, HttpServletResponse response, @RequestParam String firstname, @RequestParam String surname, @RequestParam String username, @RequestParam String password, @RequestParam Boolean isAdmin) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			response.setStatus(HttpServletResponse.SC_OK);
			return this.recipeService.savePerson(firstname, surname, username, password, isAdmin);
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return Boolean.FALSE;
		}
	}

	@GetMapping(path = "/savePassword")
	public @ResponseBody Boolean savePassword(HttpServletRequest request, HttpServletResponse response, @RequestParam String username, @RequestParam String password) throws IOException {
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			response.setStatus(HttpServletResponse.SC_OK);
			return this.recipeService.savePassword(username, password);
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return Boolean.FALSE;
		}
	}

	@GetMapping(path = "/login")
	public @ResponseBody SessionDto login(HttpServletResponse response, @RequestParam String username, @RequestParam String password) throws IOException {
		SessionDto token = this.recipeService.login(username, password);
		if(token != null) {
			response.setHeader("token", token.getAccount().getToken());
			response.setStatus(HttpServletResponse.SC_OK);
			System.out.println(token);
			return token;
		} else {
			//response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Fehlerhafter Login");
			return SessionDto.getStateCode(HttpServletResponse.SC_UNAUTHORIZED, "Fehlerhafter Login") ;
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
		Person tokenIsValid = this.recipeService.isTokenValid(request);
		if(tokenIsValid != null || this.isLocalTest.booleanValue()) {
			response.setStatus(HttpServletResponse.SC_OK);
			return recipeService.deleteRecipe(id);
		} else {
			response.sendError(HttpServletResponse.SC_REQUEST_TIMEOUT, this.timeoutMsg);
			return null;
		}
	}

	@GetMapping(path = "/getRecipeById")
	public @ResponseBody RecipeDto getRecipeById(HttpServletRequest request, HttpServletResponse response, @RequestParam Integer id) {
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

	@GetMapping(path = "/getAllPerson")
	public @ResponseBody Iterable<PersonDto> getAllPerson(HttpServletRequest request) {
		this.recipeService.isTokenValid(request);
		return recipeService.getAllPerson(Boolean.FALSE);
	}

	@GetMapping(path = "/initUuids")
	public @ResponseBody Boolean initUuids(HttpServletRequest request) {
		this.recipeService.isTokenValid(request);
		recipeService.initUuids();
		return Boolean.TRUE;
	}

	@ExceptionHandler
	void handleIllegalArgumentException(IllegalArgumentException e, HttpServletResponse response) throws IOException {
		response.sendError(HttpStatus.BAD_REQUEST.value());
	}
}
