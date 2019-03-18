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
			name = Unit_Category.QUERY_GETALL, 
			query = "SELECT uc FROM Unit_Category uc ORDER BY uc.name"
		),
	@NamedQuery(
			name=Unit_Category.QUERY_GET_BY_NAME,
			query="SELECT uc FROM Unit_Category uc WHERE uc.name = :ucName"
	)
})
public class Unit_Category implements Serializable {
	private static final long serialVersionUID = 957612350395426512L;

	public static final String QUERY_GETALL = "UnitCategory.GetAll";
	public static final String QUERY_GET_BY_NAME = "UnitCategory.GetByName";

	public Unit_Category() {}
	
	public Unit_Category(String name) {
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
