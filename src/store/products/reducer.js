import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
  productsById: undefined,
  currentProductId: undefined,
})

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.PRODUCTS_FETCHED:
      return state.merge({
        productsById: action.productsById,
      })
    case types.PRODUCT_SELECTED:
      return state.merge({
        currentProductId: action.productId,
      })
    case types.PRODUCT_DELETED:
      return state.merge({
        productsById: state.productsById.filter((el) => el.id !== action.productId),
      })
    case types.PRODUCT_SEARCHED:
      return state.merge({
        productsById: state.productsById.filter((el) => el.name.includes(action.productId)),
      })
    default:
      return state
  }
}

// selectors

export function getProducts(state) {
  return state.products.productsById
}
