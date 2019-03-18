package de.schaefer.services.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.ServletException;
import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.jdom.Element;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

import de.schaefer.beans.RecipeBean;
import de.schaefer.core.spring.SpringApplicationContext;
import de.schaefer.fop.FopInterface;
import de.schaefer.objects.ImageDataDto;
import de.schaefer.objects.RecipeDto;
import de.schaefer.objects.SourceDto;
import de.schaefer.objects.TagDto;
import de.schaefer.objects.TagTypeDto;
import de.schaefer.objects.UnitDto;
import de.schaefer.persistence.entities.Recipe;
import de.schaefer.persistence.entities.Source;
import de.schaefer.services.enums.BookPrintType;
import de.schaefer.services.interf.RecipeService;
import de.schaefer.util.XMLUtil;

@Path("/recipeRestService/v1")
public class RecipeServiceImpl implements RecipeService {
	private static Logger logger = Logger.getLogger(RecipeServiceImpl.class);
	private RecipeBean recipeBean = (RecipeBean) SpringApplicationContext.getBean("recipeBean");

	@Override
	public Boolean uploadImage( ImageDataDto imgData ) throws IOException {
		logger.debug("Filename: " + imgData.getFilename());
		logger.debug("Filecontent: " + imgData.getContents());

		String pubPath = System.getProperty("pubPath");
		
		String filepath = pubPath + "images/" + imgData.getFilename();
		String base64String = imgData.getContents();
		
		int idx = base64String.indexOf(",");
		
		File file = new File( filepath );
		byte[] bytes = Base64.decodeBase64( base64String.substring(idx + 1) );
		FileUtils.writeByteArrayToFile( file, bytes );
		
		return Boolean.TRUE;
	}
	
	@Override
	public void clearCache() {
		logger.debug("Service getAllTagTypes started");
		this.recipeBean.clearCache();
	}

	@Override
	public List<UnitDto> getAllUnits() {
		logger.debug("Service getAllUnits started");
		return this.recipeBean.getAllUnits();
	}

	@Override
	public Response printBookInline() {
		return this.printBook(BookPrintType.INLINE);
	}
	
	@Override
	public Response printBookDownload() {
		return this.printBook(BookPrintType.ATTACHMENT);
	}
	
	private Response printBook(BookPrintType type) {
		logger.debug("Service printBook started");
		Response res = Response.serverError().status(401).build();

		List<RecipeDto> recipes = this.recipeBean.getAllRecipes();
		List<TagTypeDto> tagtypes = this.recipeBean.getAllTagTypeDtos();

		Element bookEle = XMLUtil.getRecipeBookXML(recipes, tagtypes, this.recipeBean);
		logger.debug(XMLUtil.dumpElement(bookEle));
		if(System.getProperty("dumpXMLToLog") != null && System.getProperty("dumpXMLToLog").equalsIgnoreCase("y")) {
			String logPath = System.getProperty("logPath");
			File fileLocation = new File(logPath + "book.xml");
			XMLOutputter xmlOut = new XMLOutputter(Format.getPrettyFormat());
			try {
				FileOutputStream fos = new FileOutputStream(fileLocation);
				xmlOut.output(bookEle, fos);
			} catch (IOException e) {
				logger.error(e);
			}
		}
		
		try {
			byte[] data = FopInterface.transform(bookEle);
			int strlen = data.length;

			StreamingOutput stream = new StreamingOutput() {
				public void write(OutputStream out) throws IOException, WebApplicationException {
					try {
						out.write(data);
					} catch (Exception e) {
						throw new WebApplicationException(e);
					}
				}
			};

			res = Response
					.ok(stream, "application/pdf")
					.header("Content-Length", Integer.toString(strlen))
					.header("Content-Disposition", type.toString().toLowerCase() + "; filename = \"Micha's Kochbuch.pdf\"")
					.build();
		} catch (ServletException e) {
			logger.error(e);
		} catch (IOException e) {
			logger.error(e);
		}
		return res;
	}

	@Override
	public List<SourceDto> getAllSources() {
		logger.debug("Service getAllSources started");
		return this.recipeBean.getAllSources();
	}

	@Override
	public List<TagDto> getAllTags() {
		logger.debug("Service getAllTags started");
		return this.recipeBean.getAllTags();
	}

	@Override
	public List<TagTypeDto> getAllTagTypes() {
		logger.debug("Service getAllTagTypes started");
		return this.recipeBean.getAllTagTypeDtos();
	}

	@Override
	public List<RecipeDto> getAllRecipeByTagWithoutMeta(Long tagId) {
		logger.debug("Service getAllRecipeByTagWithoutMeta started");
		return this.recipeBean.getAllRecipeByTag(tagId, false);
	}

	@Override
	public RecipeDto getRecipeById(Long recipeId) {
		logger.debug("Service getRecipeById started");
		return this.recipeBean.getRecipeById(recipeId);
	}

	@Override
	public List<RecipeDto> findRecipeByName(String name) {
		logger.debug("Service getRecipeById started");
		return this.recipeBean.findRecipeByName(name, false);
	}

	@Override
	public Boolean deleteRecipeById(Long recipeId) {
		logger.debug("Service deleteRecipeById started");
		return this.recipeBean.deleteRecipeById(recipeId);
	}

	@Override
	public RecipeDto saveRecipe(Recipe r) {
		logger.debug("Service saveRecipe started");
		return this.recipeBean.saveRecipe(r);
	}

	@Override
	public SourceDto saveSource(Source s) {
		logger.debug("Service saveSource started");
		return this.recipeBean.saveSource(s);
	}
}
