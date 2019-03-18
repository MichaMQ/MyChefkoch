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
			name = Source.QUERY_GETALL, 
			query = "SELECT s FROM Source s ORDER BY s.name"
		),
	@NamedQuery(
			name=Source.QUERY_GET_BY_NAME,
			query="SELECT s FROM Source s WHERE s.name = :sourceName"
	)
})
public class Source implements Serializable {
	private static final long serialVersionUID = 957612350395426512L;

	public static final String QUERY_GETALL = "Source.GetAll";
	public static final String QUERY_GET_BY_NAME = "Source.GetByName";

	public Source() {}
	
	public Source(String name) {
		this.setName(name);
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Column(length = 255)
	private String name;

	@NotNull
	@Column(length = 255)
	private String year;

	@NotNull
	@Column(length = 255)
	private String isbn;

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

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}
}
