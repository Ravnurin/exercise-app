import { Actions } from 'constants/Nutrition';

export interface FoodItem {
  name: string;
  servingSize: string;
  carbohydrates: number | string;
  fats: number | string;
  protein: number | string;
  calories: number | string;
}

interface Nutrition {
  foodItems: FoodItem[];
}

export type NutritionState = Nutrition;

export interface NutritionAction {
  type: Actions;
  payload: FoodItem[];
}
