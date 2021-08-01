import * as types from './actionTypes'
import fruitApi from '../../services/fruitApi'

export function fetchCategories() {
  return async (dispatch, getState) => {
    const categoriesArray = await fruitApi.getDefaultCategories()
    dispatch({ type: types.CATEGORIES_FETCHED, categoriesArray })
  }
}

export function selectCategory(categoryUrl) {
  return (dispatch, getState) => {
    dispatch({ type: types.CATEGORIES_SELECTED, selectedCategory: categoryUrl })
  }
}
