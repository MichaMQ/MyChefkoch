package chefkoch.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;
import javax.servlet.ServletException;

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

import chefkoch.dto.PartDto;
import chefkoch.dto.RecipeDto;
import chefkoch.dto.SourceDto;
import chefkoch.dto.TagDto;
import chefkoch.dto.TagtypeDto;
import chefkoch.dto.UnitDto;
import chefkoch.entity.Account;
import chefkoch.entity.Part;
import chefkoch.entity.Recipe;
import chefkoch.entity.Source;
import chefkoch.entity.Tag;
import chefkoch.entity.Tag_Type;
import chefkoch.entity.Unit;
import chefkoch.fop.FopInterface;
import chefkoch.repo.iface.AccountRepository;
import chefkoch.repo.iface.PartRepository;
import chefkoch.repo.iface.RecipeRepository;
import chefkoch.repo.iface.SourceRepository;
import chefkoch.repo.iface.TagRepository;
import chefkoch.repo.iface.TagtypeRepository;
import chefkoch.repo.iface.UnitRepository;
import chefkoch.service.enums.AccountType;
import chefkoch.service.enums.BookPrintType;
import chefkoch.service.iface.RecipeService;
import chefkoch.util.StringUtil;
import chefkoch.util.XMLUtil;

@Service
public class RecipeServiceImpl implements RecipeService {
	private static Logger logger = LoggerFactory.getLogger(RecipeServiceImpl.class);

	@Value("${my.dumpXMLToLog}")
	private String dumpXMLToLog;
	@Value("${logging.path}")
	private String loggingPath;
	
	@PersistenceContext
    private EntityManager em;
	
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private SourceRepository sourceRepository;
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
	public Boolean login(String username, String password) {
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
				}
			}
		}
		return loggedIn;
	}

	@Override
	public ResponseEntity<byte[]> printBook(BookPrintType bookPrintType) {
		ClassLoader classLoader = getClass().getClassLoader();
		File file = new File(classLoader.getResource("book.xsl").getFile());
		
		ResponseEntity<byte[]> res = ResponseEntity.status(401).build();
		List<Recipe> recipes = (List<Recipe>) recipeRepository.findAll();
		List<TagtypeDto> tagtypes = (List<TagtypeDto>) this.getAllTagtypes(Boolean.TRUE);

		logger.debug("loggingPath: " + loggingPath);
		logger.debug("dumpXMLToLog: " + dumpXMLToLog);
		System.out.println("loggingPath: " + loggingPath);
		System.out.println("dumpXMLToLog: " + dumpXMLToLog);

		Element bookEle = XMLUtil.getRecipeBookXML(recipes, tagtypes, classLoader, this.recipeRepository, this.tagRepository);
		logger.debug(XMLUtil.dumpElement(bookEle));
		
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
			RecipeDto rDto = new RecipeDto(r);
			if(withMeta == false) {
				rDto.setImage(null);
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
			RecipeDto rDto = new RecipeDto(r);
			if(withMeta == false) {
				rDto.setImage(null);
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
			return new RecipeDto(recipe.get());
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
	public Boolean saveRecipe(Recipe recipe) throws IllegalArgumentException {
		if (recipe == null) {
			throw new IllegalArgumentException("error.recipe");
		} else {
			recipeRepository.save(recipe);
		}
		return Boolean.TRUE;
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
}