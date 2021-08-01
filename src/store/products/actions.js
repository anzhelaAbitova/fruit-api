import * as types from './actionTypes'
import fruitApi from '../../services/fruitApi'

export function fetchPosts(id) {
  return async (dispatch, getState) => {
    try {
      const productsById = await fruitApi.getProducts(id)
      dispatch({ type: types.PRODUCTS_FETCHED, productsById })
    } catch (error) {
      console.error(error)
    }
  }
}

export function selectProduct(productId) {
  return { type: types.PRODUCT_SELECTED, productId }
}

export function deleteProduct(productId) {
  return { type: types.PRODUCT_DELETED, productId }
}

export function searchProducts(search) {
  return (dispatch, getState) => {
    dispatch({ type: types.PRODUCT_SEARCHED, search })
  }
}
