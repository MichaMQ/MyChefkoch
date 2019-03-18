package de.schaefer.objects;

import org.jdom.Element;

import de.schaefer.util.StringUtil;

public class ObjectFactory {
	public static Element recipeToXml(RecipeDto rec, String imagePath) {
		Element recEle = new Element("recipe");
		recEle.setAttribute("id", rec.getId().toString());
		recEle.setAttribute("name", StringUtil.toString(rec.getName()));
		
		recEle.addContent((new Element("translate")).addContent(StringUtil.toString(rec.getTranslate())));
		recEle.addContent((new Element("number")).addContent(StringUtil.toString(rec.getNumber())));
		recEle.addContent((new Element("number_comment")).addContent(StringUtil.toString(rec.getNumber_comment())));
		recEle.addContent((new Element("nv_size")).addContent(StringUtil.toString(rec.getNv_size())));
		recEle.addContent((new Element("nv_energy")).addContent(StringUtil.toString(rec.getNv_energy())));
		recEle.addContent((new Element("nv_calories")));
		recEle.addContent((new Element("nv_carbohydrates")).addContent(StringUtil.toString(rec.getNv_carbohydrates())));
		recEle.addContent((new Element("nv_protein")).addContent(StringUtil.toString(rec.getNv_protein())));
		recEle.addContent((new Element("nv_fat")).addContent(StringUtil.toString(rec.getNv_fat())));
		if(rec.getImage() != null) {
			recEle.addContent((new Element("image")).addContent(StringUtil.toString(imagePath + rec.getImage())));
		}
		
		Element srcEle = rec.getSource().toXml();
		srcEle.addContent((new Element("source_page")).addContent(StringUtil.toString(rec.getSource_page())));
		recEle.addContent(srcEle);
		
		Element tagsEle = new Element("tags");
		for(TagDto t : rec.getTags()) {
			tagsEle.addContent(tagToXml(t));
		}
		recEle.addContent(tagsEle);
		
		Element ingreEle = new Element("ingredients");
		long part = -1;
		Element partEle = new Element("part");
		for(IngredientDto i : rec.getIngredients()) {
			Long actPart = i.getPart();
			if(actPart == null) {
				actPart = Long.valueOf(-2);
			}
			if(actPart.longValue() != part) {
				if(partEle.getChildren().size() != 0) {
					ingreEle.addContent(partEle);
				}
				partEle = new Element("part");
				partEle.setAttribute("id", "" + i.getPart());
			}
			partEle.addContent(ingreToXml(i));
			part = actPart.longValue();
		}
		ingreEle.addContent(partEle);
		recEle.addContent(ingreEle);

		Element todoEle = new Element("todos");
		for(TodoDto t : rec.getTodos()) {
			Element tdEle = todoToXml(t);
			if(t.getImage() != null) {
				tdEle.setAttribute("image", StringUtil.toString(imagePath + t.getImage()));
			}
			todoEle.addContent(tdEle);
		}
		recEle.addContent(todoEle);

		return recEle;
	}
	
	public static Element todoToXml(TodoDto t) {
		Element tdEle = new Element("todo");
		tdEle.setAttribute("id", t.getId().toString());
		tdEle.setAttribute("number", StringUtil.toString(t.getNumber()));
		if(t.getImage() != null) {
			tdEle.setAttribute("image", StringUtil.toString(t.getImage()));
		}
		tdEle.addContent(StringUtil.toString(t.getText()));
		return tdEle;
	}
	
	public static Element ingreToXml(IngredientDto i) {
		Element ingreEle = new Element("ingredient");
		ingreEle.setAttribute("id", i.getId().toString());
		ingreEle.setAttribute("quantity", StringUtil.toString(i.getQuantity()));
		ingreEle.setAttribute("sortorder", StringUtil.toString(i.getSortorder()));
		ingreEle.setAttribute("part", StringUtil.toString(i.getPart()));
		ingreEle.setAttribute("comment", StringUtil.toString(i.getComment()));
		if(i.getUnit() != null) {
			ingreEle.setAttribute("unit_name", StringUtil.toString(i.getUnit().getName()));
		}
		ingreEle.addContent(StringUtil.toString(i.getName()));
		return ingreEle;
	}
	
	public static Element tagToXml(TagDto tag) {
		Element tagEle = new Element("tag");
		tagEle.setAttribute("id", tag.getId().toString());
		tagEle.setAttribute("name", StringUtil.toString(tag.getName()));
		tagEle.setAttribute("tagTypeName", StringUtil.toString(tag.getTagType().getName()));
		return tagEle;
	}
}
