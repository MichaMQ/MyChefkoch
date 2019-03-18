package chefkoch.entity;

import javax.persistence.CascadeType;
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
		@NamedQuery(name = Unit.QUERY_GETALL, query = "SELECT u FROM Unit u ORDER BY u.unitCategory.name,u.name"),
		@NamedQuery(name = Unit.QUERY_GET_BY_NAME, query = "SELECT u FROM Unit u WHERE u.name = :unitName") })
public class Unit {
	public static final String QUERY_GETALL = "Unit.GetAll";
	public static final String QUERY_GET_BY_NAME = "Unit.GetByName";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@NotNull
	private String name;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "unit_category_id")
	private Unit_Category unitCategory;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Unit_Category getUnitCategory() {
		return unitCategory;
	}

	public void setUnitCategory(Unit_Category unitCategory) {
		this.unitCategory = unitCategory;
	}

}
