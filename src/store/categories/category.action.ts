import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { Action } from "redux";
import {
  createActions,
  ActionWithPayload,
  withMatcher
} from './../../utils/reducer/reducer.utils';

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createActions(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
    )
);

export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: Category[]): FetchCategoriesSuccess =>
    createActions(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
);

export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed =>
    createActions(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error
    )
);
