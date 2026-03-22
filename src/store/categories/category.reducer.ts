import { Action } from 'redux';
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed
} from './category.action';
import { Category } from './category.types';

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoaded: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoaded: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as Action
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return {
      ...state,
      isLoaded: true,
    };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return {
      ...state,
      categories: action.payload,
      isLoaded: false,
    };
  }

  if (fetchCategoriesFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoaded: false,
    };
  }

  return state;
};