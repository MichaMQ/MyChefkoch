package chefkoch.dto;

import org.jdom2.Element;

import com.fasterxml.jackson.annotation.JsonCreator;

import chefkoch.entity.Todo;
import chefkoch.util.StringUtil;

public class TodoDto implements Comparable<TodoDto> {
	private Integer id;
	private String uuid;
	private Long number;
	private String text;
	private String image;
	private String image_comment;
	
	@JsonCreator
	public TodoDto() {}

	public TodoDto(Todo todo) {
		this.setId(todo.getId());
		this.setUuid(todo.getUuid());
		this.setNumber(todo.getNumber());
		this.setText(todo.getText());
		this.setImage(todo.getImage());
		this.setImage_comment(todo.getImage_comment());
	}

	public Element toXml() {
		Element tdEle = new Element("todo");
		tdEle.setAttribute("id", this.getId().toString());
		tdEle.setAttribute("number", StringUtil.toString(this.getNumber()));
		if(this.getImage() != null) {
			tdEle.setAttribute("image", StringUtil.toString(this.getImage()));
		}
		tdEle.addContent(StringUtil.toString(this.getText()));
		return tdEle;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Long getNumber() {
		return number;
	}
	public void setNumber(Long number) {
		this.number = number;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getImage_comment() {
		return image_comment;
	}
	public void setImage_comment(String image_comment) {
		this.image_comment = image_comment;
	}

	@Override
	public int compareTo(TodoDto o) {
	    Long myNumber = this.getNumber();
	    Long oNumber = o.getNumber();
	    return myNumber.compareTo(oNumber);
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
}
