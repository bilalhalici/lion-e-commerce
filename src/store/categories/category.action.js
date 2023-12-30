import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createActions } from "../../utils/reducer/reducer.utils";

export const fetchCategoriesStart = () =>
  createActions(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = categoriesArray =>
  createActions(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = error =>
  createActions(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
