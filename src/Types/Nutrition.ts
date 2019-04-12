import { Actions } from 'constants/Nutrition';

interface FoodItem {
  name: string;
  carbohydrates: number;
  fats: number;
  protein: number;
  calories: number;
}

interface Nutrition {
  foodItems: FoodItem[];
}

export type NutritionState = Nutrition;

export interface NutritionAction {
  type: Actions;
  payload: Nutrition;
}
