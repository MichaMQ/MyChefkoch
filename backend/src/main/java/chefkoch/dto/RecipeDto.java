package chefkoch.dto;

import java.io.File;
import java.net.URL;
import java.util.LinkedList;
import java.util.List;

import org.jdom2.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonCreator;

import chefkoch.entity.Ingredient;
import chefkoch.entity.Part;
import chefkoch.entity.Recipe;
import chefkoch.entity.Tag;
import chefkoch.entity.Todo;
import chefkoch.util.Base64Util;
import chefkoch.util.StringUtil;

public class RecipeDto extends GenericDto {
	private static Logger logger = LoggerFactory.getLogger(RecipeDto.class);
	
	private String translate;
	private Long number;
	private String number_comment;
	private Long nv_size;
	private Double nv_energy;
	private Double nv_carbohydrates;
	private Double nv_protein;
	private Double nv_fat;
	private String image;
	private SourceDto source;
	private Long source_page;
	private Long aikz;
	private List<TagDto> tags = new LinkedList<TagDto>();
	private List<PartDto> parts = new LinkedList<PartDto>();
	private List<IngredientDto> ingredients = new LinkedList<IngredientDto>();
	private List<TodoDto> todos = new LinkedList<TodoDto>();
	
	@JsonCreator
	public RecipeDto() {}
	
	public RecipeDto(Recipe recipe, String imgPath) {
		this.setId(recipe.getId());
		this.setUuid(recipe.getUuid());
		this.setName(recipe.getName());
		this.setTranslate(recipe.getTranslate());
		this.setNumber(recipe.getNumber());
		this.setNumber_comment(recipe.getNumber_comment());
		this.setNv_size(recipe.getNv_size());
		this.setNv_energy(recipe.getNv_energy());
		this.setNv_carbohydrates(recipe.getNv_carbohydrates());
		this.setNv_protein(recipe.getNv_protein());
		this.setNv_fat(recipe.getNv_fat());
		this.setImage(recipe.getImage(), imgPath);
		this.setSource(new SourceDto(recipe.getSource()));
		this.setSource_page(recipe.getSource_page());
		this.setAikz(recipe.getAikz());
		for(Tag o : recipe.getTags()) {
			this.getTags().add(new TagDto(o));
		}
		//Collections.sort(this.tags);
		for(Ingredient o : recipe.getIngredients()) {
			PartDto part = this.getNewPartOrFromList(o.getPart());
			part.getIngredients().add(new IngredientDto(o));
			this.getParts().add(part);
		}
		//Collections.sort(this.tags);
		for(Ingredient o : recipe.getIngredients()) {
			this.getIngredients().add(new IngredientDto(o));
		}
		//Collections.sort(this.ingredients, new IngredientsComparator());
		for(Todo o : recipe.getTodos()) {
			this.getTodos().add(new TodoDto(o));
		}
		//Collections.sort(this.todos);
	}
	
	private PartDto getNewPartOrFromList(Part search) {
		PartDto partForSearch = new PartDto(search);
		for(PartDto part : this.getParts()) {
			if(part.getId().longValue() == partForSearch.getId().longValue()) {
				this.getParts().remove(part);
				return part;
			}
		}
		return partForSearch;
	}
	
	public Element toXml(ClassLoader classLoader) {
		
		Element recEle = new Element("recipe");
		recEle.setAttribute("id", this.getId().toString());
		recEle.setAttribute("name", StringUtil.toString(this.getName()));
		
		recEle.addContent((new Element("translate")).addContent(StringUtil.toString(this.getTranslate())));
		recEle.addContent((new Element("number")).addContent(StringUtil.toString(this.getNumber())));
		recEle.addContent((new Element("number_comment")).addContent(StringUtil.toString(this.getNumber_comment())));
		recEle.addContent((new Element("nv_size")).addContent(StringUtil.toString(this.getNv_size())));
		recEle.addContent((new Element("nv_energy")).addContent(StringUtil.toString(this.getNv_energy())));
		recEle.addContent((new Element("nv_calories")));
		recEle.addContent((new Element("nv_carbohydrates")).addContent(StringUtil.toString(this.getNv_carbohydrates())));
		recEle.addContent((new Element("nv_protein")).addContent(StringUtil.toString(this.getNv_protein())));
		recEle.addContent((new Element("nv_fat")).addContent(StringUtil.toString(this.getNv_fat())));
		if(this.getImage() != null) {
			/*
			URL imageFileUrl = classLoader.getResource("static/images/" + this.getImage());
			logger.debug("imagePath 0 :" + this.getImage());
			String imageFileName = imageFileUrl.getFile();
			File imageFile = new File(imageFileName);
			String imagePath = imageFile.getAbsolutePath();
			logger.debug("imagePath 1 :" + imagePath);
			recEle.addContent((new Element("image")).addContent(StringUtil.toString(imagePath)));
			*/
			recEle.addContent((new Element("image")).addContent(this.getImage()));
		}
		
		Element srcEle = this.getSource().toXml();
		srcEle.addContent((new Element("source_page")).addContent(StringUtil.toString(this.getSource_page())));
		recEle.addContent(srcEle);
		
		Element tagsEle = new Element("tags");
		for(TagDto t : this.getTags()) {
			tagsEle.addContent(t.toXml());
		}
		recEle.addContent(tagsEle);
		
		Element partsEle = new Element("parts");
		for(PartDto p : this.getParts()) {
			partsEle.addContent(p.toXml());
		}
		recEle.addContent(partsEle);
		/*
		Element ingreEle = new Element("ingredients");
		long partId = -1;
		Element partEle = new Element("part");
		for(IngredientDto i : this.getIngredients()) {
			PartDto actPart = i.getPart();
			if(actPart == null) {
				actPart = new PartDto(null);
			}
			if(actPart.getId().longValue() != partId) {
				if(partEle.getChildren().size() != 0) {
					ingreEle.addContent(partEle);
				}
				partEle = actPart.toXml();
			}
			partEle.addContent(i.toXml());
			partId = actPart.getId().longValue();
		}
		ingreEle.addContent(partEle);
		recEle.addContent(ingreEle);
		*/
		Element todoEle = new Element("todos");
		for(TodoDto t : this.getTodos()) {
			Element tdEle = t.toXml();
			if(t.getImage() != null) {
				File imageFile = new File(classLoader.getResource("static/images/" + t.getImage()).getFile());
				String imagePath = imageFile.getAbsolutePath();
				logger.debug("imagePath 2 :" + imagePath);
				tdEle.setAttribute("image", StringUtil.toString(imagePath));
			}
			todoEle.addContent(tdEle);
		}
		recEle.addContent(todoEle);

		return recEle;
	}
	
	public String getTranslate() {
		return translate;
	}
	public void setTranslate(String translate) {
		this.translate = translate;
	}
	public Long getNumber() {
		return number;
	}
	public void setNumber(Long number) {
		this.number = number;
	}
	public String getNumber_comment() {
		return number_comment;
	}
	public void setNumber_comment(String number_comment) {
		this.number_comment = number_comment;
	}
	public Long getNv_size() {
		return nv_size;
	}
	public void setNv_size(Long nv_size) {
		this.nv_size = nv_size;
	}
	public Double getNv_energy() {
		return nv_energy;
	}
	public void setNv_energy(Double nv_energy) {
		this.nv_energy = nv_energy;
	}
	public Double getNv_carbohydrates() {
		return nv_carbohydrates;
	}
	public void setNv_carbohydrates(Double nv_carbohydrates) {
		this.nv_carbohydrates = nv_carbohydrates;
	}
	public Double getNv_protein() {
		return nv_protein;
	}
	public void setNv_protein(Double nv_protein) {
		this.nv_protein = nv_protein;
	}
	public Double getNv_fat() {
		return nv_fat;
	}
	public void setNv_fat(Double nv_fat) {
		this.nv_fat = nv_fat;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image, String imgPath) {
		if(image != null) {
			String imgCode = Base64Util.encodeToBase64(imgPath + "/" + image);
			this.image = imgCode;
		} else {
			this.image = image;
		}
	}
	public SourceDto getSource() {
		return source;
	}
	public void setSource(SourceDto source) {
		this.source = source;
	}
	public Long getSource_page() {
		return source_page;
	}
	public void setSource_page(Long source_page) {
		this.source_page = source_page;
	}
	public Long getAikz() {
		return aikz;
	}
	public void setAikz(Long aikz) {
		this.aikz = aikz;
	}
	public List<TagDto> getTags() {
		return tags;
	}
	public void setTags(List<TagDto> tags) {
		this.tags = tags;
	}
	public List<IngredientDto> getIngredients() {
		return ingredients;
	}
	public void setIngredients(List<IngredientDto> ingredients) {
		this.ingredients = ingredients;
	}
	public List<PartDto> getParts() {
		return parts;
	}
	public void setParts(List<PartDto> parts) {
		this.parts = parts;
	}
	public List<TodoDto> getTodos() {
		return todos;
	}
	public void setTodos(List<TodoDto> todos) {
		this.todos = todos;
	}
}
