package chefkoch.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.jdom2.Element;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import chefkoch.dto.IngredientDto;
import chefkoch.dto.PartDto;
import chefkoch.dto.PersonDto;
import chefkoch.dto.RecipeDto;
import chefkoch.dto.SourceDto;
import chefkoch.dto.TagDto;
import chefkoch.dto.TagtypeDto;
import chefkoch.dto.TodoDto;
import chefkoch.dto.UnitDto;
import chefkoch.entity.Account;
import chefkoch.entity.Ingredient;
import chefkoch.entity.Part;
import chefkoch.entity.Person;
import chefkoch.entity.Recipe;
import chefkoch.entity.Recipe_Tag;
import chefkoch.entity.Source;
import chefkoch.entity.Tag;
import chefkoch.entity.Tag_Type;
import chefkoch.entity.Todo;
import chefkoch.entity.Unit;
import chefkoch.entity.Unit_Category;
import chefkoch.fop.FopInterface;
import chefkoch.repo.iface.AccountRepository;
import chefkoch.repo.iface.IngredientRepository;
import chefkoch.repo.iface.PartRepository;
import chefkoch.repo.iface.PersonRepository;
import chefkoch.repo.iface.RecipeRepository;
import chefkoch.repo.iface.RecipeTagRepository;
import chefkoch.repo.iface.SourceRepository;
import chefkoch.repo.iface.TagRepository;
import chefkoch.repo.iface.TagtypeRepository;
import chefkoch.repo.iface.TodoRepository;
import chefkoch.repo.iface.UnitCategoryRepository;
import chefkoch.repo.iface.UnitRepository;
import chefkoch.service.enums.AccountType;
import chefkoch.service.enums.BookPrintType;
import chefkoch.service.enums.Role;
import chefkoch.service.iface.RecipeService;
import chefkoch.util.StringUtil;
import chefkoch.util.TimeUtil;
import chefkoch.util.XMLUtil;

@Service
public class RecipeServiceImpl implements RecipeService {
	private static Logger logger = LoggerFactory.getLogger(RecipeServiceImpl.class);

	@Value("${my.dumpXMLToLog}")
	private String dumpXMLToLog;
	@Value("${my.xslPath}")
	private String xslPath;
	@Value("${my.imgPath}")
	private String imgPath;
	@Value("${logging.path}")
	private String loggingPath;
	
	@PersistenceContext
    private EntityManager em;
	
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private SourceRepository sourceRepository;
	@Autowired
	private TodoRepository todoRepository;
	@Autowired
	private IngredientRepository ingredientRepository;
	@Autowired
	private TagRepository tagRepository;
	@Autowired
	private TagtypeRepository tagtypeRepository;
	@Autowired
	private UnitRepository unitRepository;
	@Autowired
	private PartRepository partRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private RecipeTagRepository recipeTagRepository;
	@Autowired
	private UnitCategoryRepository unitCategoryRepository;
	@Autowired
	private PersonRepository personRepository;

	@Override
	public void initUuids() {
		Iterable<Recipe> list1 = recipeRepository.findAllWhereUuisIsNull();
		boolean toSave = false;
		for(Recipe e : list1) {
			if(e.getUuid() == null) {
				e.setUuid(UUID.randomUUID().toString());
				toSave = true;
			}
		}
		if(toSave) {
			recipeRepository.saveAll(list1);
		}
		Iterable<Account> list2 = accountRepository.findAllWhereUuisIsNull();
		toSave = false;
		for(Account e : list2) {
			if(e.getUuid() == null) {
				e.setUuid(UUID.randomUUID().toString());
				toSave = true;
			}
		}
		if(toSave) {
			accountRepository.saveAll(list2);
		}
		Iterable<Ingredient> list3 = ingredientRepository.findAllWhereUuisIsNull();
		toSave = false;
		for(Ingredient e : list3) {
			if(e.getUuid() == null) {
				e.setUuid(UUID.randomUUID().toString());
				toSave = true;
			}
		}
		if(toSave) {
			ingredientRepository.saveAll(list3);
		}
		Iterable<Part> list4 = partRepository.findAllWhereUuisIsNull();
		toSave = false;
		for(Part e : list4) {
			if(e.getUuid() == null) {
				e.setUuid(UUID.randomUUID().toString());
				toSave = true;
			}
		}
		if(toSave) {
			partRepository.saveAll(list4);
		}
		Iterable<Recipe_Tag> list5 = recipeTagRepository.findAllWhereUuisIsNull();
		toSave = false;
		for(Recipe_Tag e : list5) {
			if(e.getUuid() == null) {
				e.setUuid(UUID.randomUUID().toString());
				toSave = true;
			}
		}
		if(toSave) {
			recipeTagRepository.saveAll(list5);
		}
		Iterable<Source> list6 = sourceRepository.findAllWhereUuisIsNull();
		toSave = false;
		for(Source e : list6) {
			if(e.getUuid() == null) {
				e.setUuid(UUID.randomUUID().toString());
				toSave = true;
			}
		}
		if(toSave) {
			sourceRepository.saveAll(list6);
		}
		Iterable<Tag_Type> list7 = tagtypeRepository.findAllWhereUuisIsNull();
		toSave = false;
		for(Tag_Type e : list7) {
			if(e.getUuid() == null) {
				e.setUuid(UUID.randomUUID().toString());
				toSave = true;
			}
		}
		if(toSave) {
			tagtypeRepository.saveAll(list7);
		}
		Iterable<Tag> list8 = tagRepository.findAllWhereUuisIsNull();
		toSave = false;
		for(Tag e : list8) {
			if(e.getUuid() == null) {
				e.setUuid(UUID.randomUUID().toString());
				toSave = true;
			}
		}
		if(toSave) {
			tagRepository.saveAll(list8);
		}
		Iterable<Todo> list9 = todoRepository.findAllWhereUuisIsNull();
		toSave = false;
		for(Todo e : list9) {
			if(e.getUuid() == null) {
				e.setUuid(UUID.randomUUID().toString());
				toSave = true;
			}
		}
		if(toSave) {
			todoRepository.saveAll(list9);
		}
		Iterable<Unit_Category> list10 = unitCategoryRepository.findAllWhereUuisIsNull();
		toSave = false;
		for(Unit_Category e : list10) {
			if(e.getUuid() == null) {
				e.setUuid(UUID.randomUUID().toString());
				toSave = true;
			}
		}
		if(toSave) {
			unitCategoryRepository.saveAll(list10);
		}
		Iterable<Unit> list11 = unitRepository.findAllWhereUuisIsNull();
		toSave = false;
		for(Unit e : list11) {
			if(e.getUuid() == null) {
				e.setUuid(UUID.randomUUID().toString());
				toSave = true;
			}
		}
		if(toSave) {
			unitRepository.saveAll(list11);
		}
		Iterable<Person> list12 = personRepository.findAllWhereUuisIsNull();
		toSave = false;
		for(Person e : list12) {
			if(e.getUuid() == null) {
				e.setUuid(UUID.randomUUID().toString());
				toSave = true;
			}
		}
		if(toSave) {
			personRepository.saveAll(list12);
		}
	}
	
	@Override
	public Person isTokenValid(HttpServletRequest request) {
		Person tokenIsValid = null;
		String token = request.getHeader("token");
		System.out.println("----------- Refresh token!");
		if(token != null) {
			Account acc = this.accountRepository.findAccountByToken(token);
			if(acc != null && acc.getExpirationdate() != null && acc.getExpirationdate().getTime() >= (new Date()).getTime()) {
				System.out.println(token);
				Date expirationdate = TimeUtil.addMinutesToDate(30, new Date());
				acc.setExpirationdate(expirationdate);
				this.accountRepository.save(acc);
				tokenIsValid = this.personRepository.findPersonByAccountId(acc.getId());
			} else { System.out.println("----------- Token or date isn't valid!"); }
		} else { System.out.println("----------- No token given!"); }
		return tokenIsValid;
	}

	@Override
	public Boolean savePerson(String firstname, String surname, String username, String password, Boolean isAdmin) {
		Account acc = this.accountRepository.findAccountByUsername(username);
		if(acc == null) {
			acc = new Account();
			acc.setUsername(username);
			acc.setType(AccountType.HASH);
			String hashedPassword = StringUtil.hashPasswordWithSalt(password);
			acc.setPasswordhash(hashedPassword);
			acc = accountRepository.save(acc);
		}
		Role role = Role.USER;
		if(isAdmin) {
			role = Role.ADMIN;
		}
		Person person = new Person();
		person.setFirstname(firstname);
		person.setSurname(surname);
		person.setRole(role);
		person.setAccount(acc);
		personRepository.save(person);
		
		return Boolean.TRUE;
	}

	@Override
	public Boolean savePassword(String username, String password) {
		Account acc = this.accountRepository.findAccountByUsername(username);
		if(acc == null) {
			acc = new Account();
			acc.setUsername(username);
		}
		acc.setType(AccountType.HASH);
		
		String hashedPassword = StringUtil.hashPasswordWithSalt(password);
		acc.setPasswordhash(hashedPassword);
		
		accountRepository.save(acc);
		return Boolean.TRUE;
	}

	@Override
	public String login(String username, String password) {
		String token = null;
		Boolean loggedIn = Boolean.FALSE;
		Account acc = this.accountRepository.findAccountByUsername(username);
		if(acc != null) {
			String passwordFromAccount = acc.getPasswordhash();
			if(acc.getType().equals(AccountType.HASH)) {
				if(StringUtil.verify(password, passwordFromAccount)) {
					loggedIn = Boolean.TRUE;
				}
			} else {
				if(passwordFromAccount.equals(password)) {
					loggedIn = Boolean.TRUE;
					acc.setType(AccountType.HASH);
					String hashedPassword = StringUtil.hashPasswordWithSalt(password);
					acc.setPasswordhash(hashedPassword);
				}
			}
		}
		if(loggedIn.booleanValue()) {
			String un = acc.getUsername();
			Date expirationdate = TimeUtil.addMinutesToDate(30, new Date());

			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			String expirationdateStr = simpleDateFormat.format(expirationdate);
			System.out.println(expirationdateStr);
			
			token = StringUtil.hashPasswordWithSalt(un + "-" + expirationdateStr);
			
			acc.setExpirationdate(expirationdate);
			acc.setToken(token);
			
			this.accountRepository.save(acc);
			
		}
		return token;
	}

	@Override
	public ResponseEntity<byte[]> printBook(BookPrintType bookPrintType) {
		ClassLoader classLoader = getClass().getClassLoader();
		File file = new File(classLoader.getResource("book.xsl").getFile());
		if(!file.exists()) {
			file = new File(this.xslPath + "/book.xsl");
		}
		
		ResponseEntity<byte[]> res = ResponseEntity.status(401).build();
		List<Recipe> recipes = (List<Recipe>) recipeRepository.findAll();
		List<TagtypeDto> tagtypes = (List<TagtypeDto>) this.getAllTagtypes(Boolean.TRUE);

		logger.debug("loggingPath: " + loggingPath);
		logger.debug("dumpXMLToLog: " + dumpXMLToLog);
		System.out.println("loggingPath: " + loggingPath);
		System.out.println("dumpXMLToLog: " + dumpXMLToLog);

		Element bookEle = XMLUtil.getRecipeBookXML(recipes, tagtypes, classLoader, this.recipeRepository, this.tagRepository, this.imgPath);
		logger.debug(XMLUtil.dumpElement(bookEle));
		System.out.println(XMLUtil.dumpElement(bookEle));
		System.out.println("xsl-File: " + file.getAbsolutePath());
		
		try {
			byte[] data = FopInterface.transform(bookEle, file);
			int strlen = data.length;
			String pdfFileName = "Micha's Kochbuch.pdf";

			if(this.dumpXMLToLog != null && this.dumpXMLToLog.equalsIgnoreCase("y")) {
				File fileLocation = new File(loggingPath + "book.xml");
				XMLOutputter xmlOut = new XMLOutputter(Format.getPrettyFormat());
				FileOutputStream fos = new FileOutputStream(fileLocation);
				xmlOut.output(bookEle, fos);

				File tmpPdfFile = new File(loggingPath + "/" + pdfFileName);
				FileOutputStream fop = new FileOutputStream(tmpPdfFile);
				fop.write(data);
				fop.flush();
				fop.close();
			}
			
			HttpHeaders headers = new HttpHeaders();
			headers.setContentLength(strlen);
			headers.setContentType(MediaType.APPLICATION_PDF);
			ContentDisposition cd = ContentDisposition.builder(bookPrintType.toString().toLowerCase())
			          .filename(pdfFileName)
			          .build();
			headers.setContentDisposition(cd);
			res = new ResponseEntity<byte[]>(data, headers, HttpStatus.OK);
		} catch (ServletException e) {
			logger.error("Transformation fehlgeschlagen!", e);
		} catch (IOException e) {
			logger.error("Outputstream konnte nicht erzeugt werden!", e);
		}
		return res;
	}

	@Override
	public List<RecipeDto> findRecipeByName(String name, boolean withMeta) {
		List<RecipeDto> list = new LinkedList<RecipeDto>();

		CriteriaBuilder builder = em.getCriteriaBuilder();
	    CriteriaQuery<Recipe> criteria = builder.createQuery(Recipe.class);
	    Root<Recipe> recipeRoot = criteria.from(Recipe.class);
	    Expression<String> path = recipeRoot.get("name");
	    Expression<String> lower = builder.lower(path);
	    criteria.where(builder.and(builder.like(lower, "%"+name.toLowerCase()+"%")));
	    List<Recipe> recipeList = em.createQuery(criteria).getResultList();
		for(Recipe r : recipeList) {
			RecipeDto rDto = new RecipeDto(r, this.imgPath);
			if(withMeta == false) {
				rDto.setImage(null, this.imgPath);
				rDto.setParts(null);
				rDto.setTodos(null);
				rDto.setTags(null);
			}
			list.add(rDto);
		}
		return list;
	}

	@Override
	public List<RecipeDto> getAllRecipeByTag(Integer tagId, boolean withMeta) {
		List<RecipeDto> list = new LinkedList<RecipeDto>();
		List<Recipe> recipeList = recipeRepository.findRecipeByTagId(tagId);
		for(Recipe r : recipeList) {
			RecipeDto rDto = new RecipeDto(r, this.imgPath);
			if(withMeta == false) {
				rDto.setImage(null, this.imgPath);
				rDto.setParts(null);
				rDto.setTodos(null);
				rDto.setTags(null);
			}
			list.add(rDto);
		}
		return list;
	}

	@Override
	public RecipeDto getRecipeById(Integer id) throws IllegalArgumentException {
		Optional<Recipe> recipe = this.recipeRepository.findById(id);
		if (recipe.isPresent()) {
			return new RecipeDto(recipe.get(), this.imgPath);
		} else {
			throw new IllegalArgumentException("kein Rezeot mit der ID " + id.toString() + " gefunden!");
		}
	}

	@Override
	public Boolean deleteRecipe(Integer id) throws IllegalArgumentException {
		boolean isDeleted = false;
		Optional<Recipe> recipe = this.recipeRepository.findById(id);
		if (recipe.isPresent()) {
			this.recipeRepository.delete(recipe.get());
			isDeleted = true;
		} else {
			throw new IllegalArgumentException("kein Rezeot mit der ID " + id.toString() + " gefunden!");
		}
		return Boolean.valueOf(isDeleted);
	}

	@Override
	public SourceDto saveSource(SourceDto sourceDto) throws IllegalArgumentException {
		if (sourceDto == null) {
			throw new IllegalArgumentException("error.recipe");
		} else {
			Source source = new Source();
			if(sourceDto.getId() != null) {
				Optional<Source> srcOpt= this.sourceRepository.findById(sourceDto.getId());
				if (srcOpt.isPresent()) {
					source = srcOpt.get();
				}
			}
			if(source.getUuid() == null) {
				source.setUuid(sourceDto.getUuid());
			}
			source.setName(sourceDto.getName());
			source.setIsbn(sourceDto.getIsbn());
			source.setYear(sourceDto.getYear());
			return new SourceDto(sourceRepository.save(source));
		}		
	}

	@Override
	public Boolean addIngredient(Integer recipeId, IngredientDto ingredientDto) throws IllegalArgumentException {
		if (recipeId == null || ingredientDto == null) {
			throw new IllegalArgumentException("error.source");
		} else {
			Ingredient ele = null;
			if(ingredientDto.getId() != null) {
				Optional<Ingredient> eleOpt = ingredientRepository.findById(ingredientDto.getId());
				if (eleOpt.isPresent()) {
					ele = eleOpt.get();
				}
			}
			if(ele != null) {
				Optional<Recipe> recipeOptional = this.recipeRepository.findById(recipeId);
				if (recipeOptional.isPresent()) {
					Recipe recipe = recipeOptional.get();
					recipe.getIngredients().add(ele);
					recipeRepository.save(recipe);
					return Boolean.TRUE;
				}
			}
		}
		return Boolean.FALSE;
	}
	
	@Override
	public Boolean addTodo(Integer recipeId, TodoDto todoDto) throws IllegalArgumentException {
		if (recipeId == null || todoDto == null) {
			throw new IllegalArgumentException("error.source");
		} else {
			Todo ele = null;
			if(todoDto.getId() != null) {
				Optional<Todo> eleOpt = todoRepository.findById(todoDto.getId());
				if (eleOpt.isPresent()) {
					ele = eleOpt.get();
				}
			}
			if(ele != null) {
				Optional<Recipe> recipeOptional = this.recipeRepository.findById(recipeId);
				if (recipeOptional.isPresent()) {
					Recipe recipe = recipeOptional.get();
					recipe.getTodos().add(ele);
					recipeRepository.save(recipe);
					return Boolean.TRUE;
				}
			}
		}
		return Boolean.FALSE;
	}

	@Override
	public Boolean addTag(Integer recipeId, TagDto tagDto) throws IllegalArgumentException {
		if (recipeId == null || tagDto == null) {
			throw new IllegalArgumentException("error.source");
		} else {
			Tag ele = null;
			if(tagDto.getId() != null) {
				Optional<Tag> eleOpt = tagRepository.findById(tagDto.getId());
				if (eleOpt.isPresent()) {
					ele = eleOpt.get();
				}
			}
			if(ele != null) {
				Optional<Recipe> recipeOptional = this.recipeRepository.findById(recipeId);
				if (recipeOptional.isPresent()) {
					Recipe recipe = recipeOptional.get();
					recipe.getTags().add(ele);
					recipeRepository.save(recipe);
					return Boolean.TRUE;
				}
			}
		}
		return Boolean.FALSE;
	}

	@Override
	public Boolean addSource(Integer recipeId, SourceDto sourceDto) throws IllegalArgumentException {
		if (recipeId == null || sourceDto == null) {
			throw new IllegalArgumentException("error.source");
		} else {
			Source ele = null;
			if(sourceDto.getId() != null) {
				Optional<Source> eleOpt = sourceRepository.findById(sourceDto.getId());
				if (eleOpt.isPresent()) {
					ele = eleOpt.get();
				}
			}
			if(ele != null) {
				Optional<Recipe> recipeOptional = this.recipeRepository.findById(recipeId);
				if (recipeOptional.isPresent()) {
					Recipe recipe = recipeOptional.get();
					recipe.setSource(ele);
					recipeRepository.save(recipe);
					return Boolean.TRUE;
				}
			}
		}
		return Boolean.FALSE;
	}
	
	@Override
	public RecipeDto addRecipe(Person person, RecipeDto recipeDto) throws IllegalArgumentException {
		if (recipeDto == null) {
			throw new IllegalArgumentException("error.recipe");
		} else {
			Recipe recipe = new Recipe();
			if(recipeDto.getId() != null) {
				Optional<Recipe> recipeOptional = this.recipeRepository.findById(recipeDto.getId());
				if (recipeOptional.isPresent()) {
					recipe = recipeOptional.get();
				}
			}
			recipe.setName(recipeDto.getName());
			recipe.setAikz(recipeDto.getAikz());
			recipe.setImage(recipeDto.getImage());
			recipe.setNumber(recipeDto.getNumber());
			recipe.setNumber_comment(recipeDto.getNumber_comment());
			recipe.setNv_carbohydrates(recipeDto.getNv_carbohydrates());
			recipe.setNv_energy(recipeDto.getNv_energy());
			recipe.setNv_fat(recipeDto.getNv_fat());
			recipe.setNv_protein(recipeDto.getNv_protein());
			recipe.setNv_size(recipeDto.getNv_size());
			recipe.setSource_page(recipeDto.getSource_page());
			recipe.setTranslate(recipeDto.getTranslate());
			recipe.setPerson(person);
			return new RecipeDto(recipeRepository.save(recipe), this.imgPath);
		}
	}
	
	@Override
	public RecipeDto saveRecipe(RecipeDto recipeDto) throws IllegalArgumentException {
		if (recipeDto == null) {
			throw new IllegalArgumentException("error.recipe");
		} else {
			Recipe recipe = new Recipe();
			if(recipeDto.getId() != null) {
				Optional<Recipe> recipeOptional = this.recipeRepository.findById(recipeDto.getId());
				if (recipeOptional.isPresent()) {
					recipe = recipeOptional.get();
				}
			}
			recipe.setName(recipeDto.getName());
			recipe.setAikz(recipeDto.getAikz());
			recipe.setImage(recipeDto.getImage());
			recipe.setNumber(recipeDto.getNumber());
			recipe.setNumber_comment(recipeDto.getNumber_comment());
			recipe.setNv_carbohydrates(recipeDto.getNv_carbohydrates());
			recipe.setNv_energy(recipeDto.getNv_energy());
			recipe.setNv_fat(recipeDto.getNv_fat());
			recipe.setNv_protein(recipeDto.getNv_protein());
			recipe.setNv_size(recipeDto.getNv_size());
			recipe.setSource_page(recipeDto.getSource_page());
			recipe.setTranslate(recipeDto.getTranslate());
			
			SourceDto srcDto = recipeDto.getSource();
			Source src = new Source();
			if(srcDto.getId() != null) {
				Optional<Source> srcOpt = sourceRepository.findById(srcDto.getId());
				if (srcOpt.isPresent()) {
					src = srcOpt.get();
				}
			}
			src.setName(srcDto.getName());
			src.setIsbn(srcDto.getIsbn());
			src.setYear(srcDto.getYear());
			recipe.setSource(src);
			
			recipe.setTags(new HashSet<>());
			for(TagDto tagDto : recipeDto.getTags()) {
				Tag tag = new Tag();
				if(tagDto.getId() != null) {
					Optional<Tag> tagOpt = tagRepository.findById(tagDto.getId());
					Optional<Tag_Type> tagtypeOpt = tagtypeRepository.findById(tagDto.getTagtype().getId());
					if (tagOpt.isPresent()) {
						tag = tagOpt.get();
					}
					tag.setTagType(tagtypeOpt.get());
				}
				tag.setName(tagDto.getName());
				recipe.getTags().add(tag);
			}
			
			recipe.setTodos(new HashSet<>());
			for(TodoDto todoDto : recipeDto.getTodos()) {
				Todo todo = new Todo();
				if(todoDto.getId() != null) {
					Optional<Todo> todoOpt = todoRepository.findById(todoDto.getId());
					if (todoOpt.isPresent()) {
						todo = todoOpt.get();
					}
				}
				todo.setImage(todoDto.getImage());
				todo.setImage_comment(todoDto.getImage_comment());
				todo.setNumber(todoDto.getNumber());
				todo.setRecipe(recipe);
				todo.setText(todoDto.getText());
				recipe.getTodos().add(todo);
			}
			
			recipe.setIngredients(new HashSet<>());
			for(IngredientDto ingreDto : recipeDto.getIngredients()) {
				Ingredient ingre = new Ingredient();
				if(ingreDto.getId() != null) {
					Optional<Ingredient> ingreOpt = ingredientRepository.findById(ingreDto.getId());
					if (ingreOpt.isPresent()) {
						ingre = ingreOpt.get();
					}
				}
				ingre.setComment(ingreDto.getComment());
				ingre.setName(ingreDto.getName());
				ingre.setQuantity(ingreDto.getQuantity());
				ingre.setSortorder(ingreDto.getSortorder());
				ingre.setRecipe(recipe);
				if(ingreDto.getPart() != null && ingreDto.getPart().getId() != null) {
					Optional<Part> partOpt = partRepository.findById(ingreDto.getPart().getId());
					ingre.setPart(partOpt.get());
				}
				if(ingreDto.getUnit() != null && ingreDto.getUnit().getId() != null) {
					Optional<Unit> unitOpt = unitRepository.findById(ingreDto.getUnit().getId());
					ingre.setUnit(unitOpt.get());
				}
				recipe.getIngredients().add(ingre);
			}
			
			return new RecipeDto(recipeRepository.save(recipe), this.imgPath);
		}
	}

	@Override
	public Iterable<SourceDto> getAllSources(Boolean sortedByName) {
		List<Source> allSources = (List<Source>) sourceRepository.findAll();
		List<SourceDto> allSourceDto = new LinkedList<SourceDto>();
		for (Source source : allSources) {
			allSourceDto.add(new SourceDto(source));
		}
		if (sortedByName.booleanValue()) {
			Collections.sort(allSourceDto);
		}
		return allSourceDto;
	}

	@Override
	public Iterable<TagDto> getAllTags(Boolean sortedByName) {
		List<Tag> allTags = (List<Tag>) tagRepository.findAll();
		List<TagDto> allTagDto = new LinkedList<TagDto>();
		for (Tag tag : allTags) {
			allTagDto.add(new TagDto(tag));
		}
		if (sortedByName.booleanValue()) {
			Collections.sort(allTagDto);
		}
		return allTagDto;
	}

	@Override
	public Iterable<TagtypeDto> getAllTagtypes(Boolean sortedByName) {
		List<Tag_Type> allTagtypes = (List<Tag_Type>) tagtypeRepository.findAll();
		List<TagtypeDto> allTagtypeDto = new LinkedList<TagtypeDto>();
		for (Tag_Type tagtype : allTagtypes) {
			List<Tag> tagList = tagRepository.findTagByTagtypeId(tagtype.getId());
			allTagtypeDto.add(new TagtypeDto(tagtype, tagList));
		}
		if (sortedByName.booleanValue()) {
			Collections.sort(allTagtypeDto);
		}
		return allTagtypeDto;
	}

	@Override
	public Iterable<UnitDto> getAllUnits(Boolean sortedByName) {
		List<Unit> allUnits = (List<Unit>) unitRepository.findAll();
		List<UnitDto> allUnitDto = new LinkedList<UnitDto>();
		for (Unit unit : allUnits) {
			allUnitDto.add(new UnitDto(unit));
		}
		if (sortedByName.booleanValue()) {
			Collections.sort(allUnitDto);
		}
		return allUnitDto;
	}

	@Override
	public Iterable<PartDto> getAllParts(Boolean sortedByName) {
		List<Part> allParts = (List<Part>) partRepository.findAll();
		List<PartDto> allPartDto = new LinkedList<PartDto>();
		for (Part part : allParts) {
			allPartDto.add(new PartDto(part));
		}
		if (sortedByName.booleanValue()) {
			Collections.sort(allPartDto);
		}
		return allPartDto;
	}

	@Override
	public List<PersonDto> getAllPerson(Boolean sortedByName) {
		List<Person> allPerson = (List<Person>) personRepository.findAll();
		List<PersonDto> allPersonDto = new LinkedList<PersonDto>();
		for (Person person : allPerson) {
			allPersonDto.add(new PersonDto(person));
		}
		if (sortedByName.booleanValue()) {
			Collections.sort(allPersonDto);
		}
		return allPersonDto;
	}

	public String getDumpXMLToLog() {
		return dumpXMLToLog;
	}

	public void setDumpXMLToLog(String dumpXMLToLog) {
		this.dumpXMLToLog = dumpXMLToLog;
	}

	public String getLoggingPath() {
		return loggingPath;
	}

	public void setLoggingPath(String loggingPath) {
		this.loggingPath = loggingPath;
	}

	public EntityManager getEm() {
		return em;
	}

	public void setEm(EntityManager em) {
		this.em = em;
	}

	public RecipeRepository getRecipeRepository() {
		return recipeRepository;
	}

	public void setRecipeRepository(RecipeRepository recipeRepository) {
		this.recipeRepository = recipeRepository;
	}

	public SourceRepository getSourceRepository() {
		return sourceRepository;
	}

	public void setSourceRepository(SourceRepository sourceRepository) {
		this.sourceRepository = sourceRepository;
	}

	public TagRepository getTagRepository() {
		return tagRepository;
	}

	public void setTagRepository(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}

	public TagtypeRepository getTagtypeRepository() {
		return tagtypeRepository;
	}

	public void setTagtypeRepository(TagtypeRepository tagtypeRepository) {
		this.tagtypeRepository = tagtypeRepository;
	}

	public UnitRepository getUnitRepository() {
		return unitRepository;
	}

	public void setUnitRepository(UnitRepository unitRepository) {
		this.unitRepository = unitRepository;
	}

	public PartRepository getPartRepository() {
		return partRepository;
	}

	public void setPartRepository(PartRepository partRepository) {
		this.partRepository = partRepository;
	}

	public AccountRepository getAccountRepository() {
		return accountRepository;
	}

	public void setAccountRepository(AccountRepository accountRepository) {
		this.accountRepository = accountRepository;
	}

	public TodoRepository getTodoRepository() {
		return todoRepository;
	}

	public void setTodoRepository(TodoRepository todoRepository) {
		this.todoRepository = todoRepository;
	}

	public IngredientRepository getIngredientRepository() {
		return ingredientRepository;
	}

	public void setIngredientRepository(IngredientRepository ingredientRepository) {
		this.ingredientRepository = ingredientRepository;
	}

	public RecipeTagRepository getRecipeTagRepository() {
		return recipeTagRepository;
	}

	public void setRecipeTagRepository(RecipeTagRepository recipeTagRepository) {
		this.recipeTagRepository = recipeTagRepository;
	}

	public UnitCategoryRepository getUnitCategoryRepository() {
		return unitCategoryRepository;
	}

	public void setUnitCategoryRepository(UnitCategoryRepository unitCategoryRepository) {
		this.unitCategoryRepository = unitCategoryRepository;
	}

	public PersonRepository getPersonRepository() {
		return personRepository;
	}

	public void setPersonRepository(PersonRepository personRepository) {
		this.personRepository = personRepository;
	}

}
