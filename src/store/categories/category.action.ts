import { CATEGORY_ACTION_TYPES, Category } from './category.types'
import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../utils/reducer/reducer.utils'

export type FetchCategoriesStart =
  Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>

export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>

export type CategoryAction =
  | FetchCategoriesStart
  | FetchCategoriesSuccess
  | FetchCategoriesFailed

export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START)
)

export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: Category[]): FetchCategoriesSuccess =>
    createAction(
      CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
)

export const fetchCategoriesFailed = withMatcher(
  (err: Error): FetchCategoriesFailed =>
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, err)
)
