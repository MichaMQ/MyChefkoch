package chefkoch.dto;

import com.fasterxml.jackson.annotation.JsonCreator;

import chefkoch.entity.Unit;

public class UnitDto extends GenericDto {
	private UnitCategoryDto unitCategory;

	@JsonCreator
	public UnitDto() {}

	public UnitDto(Unit unit) {
		this.setId(unit.getId());
		this.setName(unit.getName());
		this.setUnitCategory(new UnitCategoryDto(unit.getUnitCategory()));
	}

	public UnitCategoryDto getUnitCategory() {
		return unitCategory;
	}

	public void setUnitCategory(UnitCategoryDto unitCategory) {
		this.unitCategory = unitCategory;
	}
}
