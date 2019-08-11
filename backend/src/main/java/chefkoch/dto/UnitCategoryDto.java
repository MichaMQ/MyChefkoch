package chefkoch.dto;

import com.fasterxml.jackson.annotation.JsonCreator;

import chefkoch.entity.Unit_Category;

public class UnitCategoryDto extends GenericDto {
	
	@JsonCreator
	public UnitCategoryDto() {}

	public UnitCategoryDto(Unit_Category unitCategory) {
		this.setId(unitCategory.getId());
		this.setUuid(unitCategory.getUuid());
		this.setName(unitCategory.getName());
	}
}
