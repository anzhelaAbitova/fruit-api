import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as categoriesActions from '../store/categories/actions'
import * as categoriesSelectors from '../store/categories/reducer'
import Product from '../components/product.js'
import Products from './products.js'

const Table = (props) => {
  const [data, setData] = useState([])
  const [isCategory, setIsCategory] = useState(true)
  const [categoryId, setCategoryId] = useState(undefined)

  const getData = async () => {
    let test = await props.categoriesArray
    if (test) setData(Array.from(test))
  }
  useEffect(() => {
    props.dispatch(categoriesActions.fetchCategories())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [props])

  const renderLoading = () => {
    return <p>Loading...</p>
  }
  if (!props.categoriesArray) renderLoading()

  const renderRow = (categories) => {
    if (!categories.length) return
    const categoriesArr = Array.from(categories)
    const dom = categoriesArr.map((el, index) => {
      return (
        <tr
          className="grid grid-flow-col auto-cols-fr p-2 bg-blue-light"
          key={index}
          onClick={onRowClick}
        >
          <Product rows={el} renderRow={renderRow} />
        </tr>
      )
    })
    return dom
  }

  const onRowClick = (event) => {
    const id = event.target.id - 1
    const categoryUrl = data[id]
    props.dispatch(categoriesActions.selectCategory(categoryUrl))
    setCategoryId(parseInt(event.target.id))
    setIsCategory(false)
  }

  const handleToCategories = () => {
    setIsCategory(true)
  }

  const renderCategory = () => {
    return (
      <React.Fragment>
        <thead>
          <tr className="grid grid-flow-col auto-cols-fr bg-blue-dark p-2">
            <td className="flex-auto text-left text-white">Category name</td>
            <td className="flex-auto text-center text-white">Count</td>
            <td className="flex-auto text-center text-white">Units</td>
          </tr>
        </thead>
        <tbody>{data ? renderRow(data) : null}</tbody>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {!isCategory && (
        <button
          className="to-categories bg-gray-dark rounded-2xl m-4 p-0.5 box-border text-white"
          onClick={handleToCategories}
        >
          Back to categories
        </button>
      )}
      <table className="container mx-auto table-auto font-sans">
        {isCategory ? renderCategory() : <Products categoryId={categoryId} />}
      </table>
    </React.Fragment>
  )
}
function mapStateToProps(state) {
  return { categoriesArray: categoriesSelectors.getCategories(state) }
}

export default connect(mapStateToProps)(Table)
