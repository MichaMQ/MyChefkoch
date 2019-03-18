package de.schaefer.persistence.entities;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
@NamedQueries({ 
	@NamedQuery(
			name = Tag.QUERY_GETALL, 
			query = "SELECT t FROM Tag t ORDER BY t.name"
		),
	@NamedQuery(
			name=Tag.QUERY_GET_BY_NAME,
			query="SELECT t FROM Tag t WHERE t.name = :tagName"
	),
	@NamedQuery(
			name=Tag.QUERY_GET_BY_TAGTYPEID,
			query="SELECT t FROM Tag t WHERE t.tagType.id = :tagTypeId ORDER BY t.name"
	)
})
public class Tag implements Serializable {
	private static final long serialVersionUID = 957612350395426512L;

	public static final String QUERY_GETALL = "Tag.GetAll";
	public static final String QUERY_GET_BY_NAME = "Tag.GetByName";
	public static final String QUERY_GET_BY_TAGTYPEID = "Tag.GetByTagTypeId";

	public Tag() {}
	
	public Tag(String name) {
		this.setName(name);
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Column(length = 255)
	private String name;

	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="tag_type_id")
  private Tag_Type tagType;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public Tag_Type getTagType() {
		return this.tagType;
	}
	
	public void setTagType(Tag_Type tagType) {
		this.tagType = tagType;
	}
}
