import { FoodItem } from 'Types/Nutrition';

const FAT_CALS = 9;
const CARBYDRATE_CALS = 4;
const PROTEIN_CALS = 4;

export const getCalculatedFoodItem = (foodItem: FoodItem): Pick<FoodItem, 'calories' | 'carbohydrates' | 'fats' | 'protein'> => {
  const { protein, carbohydrates, fats } = foodItem;

  const proteinCals = Number(protein) * PROTEIN_CALS;
  const carbCals = Number(carbohydrates) * CARBYDRATE_CALS;
  const fatCals = Number(fats) * FAT_CALS;

  return {
    protein: proteinCals,
    carbohydrates: carbCals,
    fats: fatCals,
    calories: proteinCals + carbCals + fatCals
  }
};
