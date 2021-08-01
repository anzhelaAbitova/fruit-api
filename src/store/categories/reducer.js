import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
  categoriesArray: undefined,
  selectedCategory: undefined,
})

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.CATEGORIES_FETCHED:
      return state.merge({
        categoriesArray: action.categoriesArray,
      })
    case types.CATEGORIES_SELECTED:
      return state.merge({
        selectedCategory: action.selectedCategory,
      })
    default:
      return state
  }
}

// selectors

export function getCategories(state) {
  try {
    const topicsByUrl = state.categories.categoriesArray
    return topicsByUrl
  } catch (error) {
    console.log(error)
  }
}

export function getSelectedTopicUrls(state) {
  console.log(state)
  return state.categories.selectedTopicUrls
}
