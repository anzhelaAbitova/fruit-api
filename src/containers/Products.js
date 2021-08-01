import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as productsActions from '../store/products/actions'
import * as productsSelectors from '../store/products/reducer'
import Product from '../components/Product'
import OneProduct from './../components/OneProduct'

const Products = (props) => {
  const [data, setData] = useState([])
  const [productId, setProductId] = useState(undefined)
  const [isOneProduct, setIsOneProduct] = useState(false)
  const [currProducts, setCurrProducts] = useState([])
  const [pageBTNs, setPageBTNs] = useState(undefined)
  const itemsPerPage = 10
  const [search, setSearch] = useState('')

  const getData = async () => {
    let test = await props.productsById
    if (test) {
      let arr = Array.from(test)
      setData(arr)
      setCurrProducts(arr.slice(0, itemsPerPage))
      setPageBTNs(arr.length / itemsPerPage)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [props])

  useEffect(() => {
    props.dispatch(productsActions.fetchPosts(props.categoryId))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    props.dispatch(productsActions.searchProducts(search))
    // eslint-disable-next-line
  }, [search])

  const renderRow = (products) => {
    if (!products.length) return
    //const productsArr = Array.from(products)
    const dom = products.map((el, index) => {
      return (
        <tr
          className="grid grid-flow-col auto-cols-fr p-2 bg-blue-light"
          key={index}
          onClick={onRowClick}
        >
          <Product rows={el} renderRow={renderRow} handleDelete={handleDelete} />
        </tr>
      )
    })
    return dom
  }

  const onRowClick = (event) => {
    const id = event.target.id - 1
    const productUrl = data[id]
    props.dispatch(productsActions.selectProduct(productUrl))
    setProductId(data[id])
    setIsOneProduct(!isOneProduct)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleCurrPage = (event) => {
    const id = parseInt(event.target.id)
    const arr = data.slice(id, itemsPerPage + id)
    setCurrProducts(arr)
  }

  const renderPagination = () => {
    let btnItems = []
    for (let i = 0; i < pageBTNs; i++) {
      btnItems.push(
        <button className="p-2" id={i} key={i} onClick={handleCurrPage}>
          {i + 1}
        </button>,
      )
    }
    return <React.Fragment>{btnItems}</React.Fragment>
  }
  const handleDelete = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const id = parseInt(event.target.id)
    console.log(id)
    props.dispatch(productsActions.deleteProduct(id))
    console.log(props)
  }
  return (
    <React.Fragment>
      {!isOneProduct && (
        <React.Fragment>
          <thead>
            <tr className="grid grid-flow-col auto-cols-fr bg-blue-dark p-2">
              <td className="flex-auto text-left text-white">Product name</td>
              <td className="flex-auto text-center text-white">Calories</td>
            </tr>
          </thead>
          <tbody>
            {data ? (
              <React.Fragment>
                {renderRow(currProducts)}
                <div>{renderPagination()}</div>
              </React.Fragment>
            ) : null}
            <tr>
              <input
                type="text"
                id="search"
                placeholder="Search product"
                className="border-blue-800"
                onBlur={handleSearch}
              />
            </tr>
          </tbody>
        </React.Fragment>
      )}
      {isOneProduct && <OneProduct productId={productId} />}
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  const productsArr = productsSelectors.getProducts(state)
  return { productsById: productsArr }
}

export default connect(mapStateToProps)(Products)
