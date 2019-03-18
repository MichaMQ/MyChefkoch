package de.schaefer.objects;

import java.io.Serializable;

import de.schaefer.persistence.entities.Unit;
import de.schaefer.persistence.entities.Unit_Category;
public class UnitDto implements Serializable {
	private static final long serialVersionUID = 957612350395426512L;

	public UnitDto(Unit u) {
		this.setId(u.getId());
		this.setName(u.getName());
		this.setUnitCategory(u.getUnitCategory());
	}
	
	private Long id;
	private String name;
  private Unit_Category unitCategory;

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

	public Unit_Category getUnitCategory() {
		return unitCategory;
	}

	public void setUnitCategory(Unit_Category unitCategory) {
		this.unitCategory = unitCategory;
	}
	
}
