package chefkoch.util.comp;

import java.util.Comparator;

import chefkoch.dto.IngredientDto;

public class IngredientsComparator implements Comparator<IngredientDto> {

	@Override
	public int compare(IngredientDto i1, IngredientDto i2) {
		Long sort1 = i1.getSortorder();
		Long sort2 = i2.getSortorder();
        return sort1.compareTo(sort2);
	}

}
