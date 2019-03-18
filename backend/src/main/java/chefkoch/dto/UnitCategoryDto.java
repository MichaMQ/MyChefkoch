package chefkoch.dto;

import chefkoch.entity.Unit_Category;

public class UnitCategoryDto extends GenericDto {
	public UnitCategoryDto(Unit_Category unitCategory) {
		this.setId(unitCategory.getId());
		this.setName(unitCategory.getName());
	}
}
