import { FoodItem } from './Nutrition';

export interface ErrorState {
  username?: string;
  password?: string;
  passwordConfirm?: string;
  customExerciseName?: string;
  createFoodItem?: FoodItem;
  [key: string]: string | undefined | FoodItem;
}

export interface ErrorAction {
  type: string;
  payload: ErrorState;
}
