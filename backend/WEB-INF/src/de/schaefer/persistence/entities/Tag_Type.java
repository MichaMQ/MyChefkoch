package de.schaefer.persistence.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.validation.constraints.NotNull;

@Entity
@NamedQueries({ 
	@NamedQuery(
			name = Tag_Type.QUERY_GETALL, 
			query = "SELECT tt FROM Tag_Type tt ORDER BY tt.name"
		)
})

public class Tag_Type implements Serializable {
	private static final long serialVersionUID = 957612350395426512L;

	public static final String QUERY_GETALL = "Tag_Type.GetAll";

	public Tag_Type() {}
	
	public Tag_Type(String name) {
		this.setName(name);
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Column(length = 255)
	private String name;

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
}
