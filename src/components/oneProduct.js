import React from 'react'

const OneProduct = (props) => {
  console.log(props)
  return (
    <tbody>
      <tr className="one-product">
        <td>{props.productId.name}</td>
        <td>{props.productId.id}</td>
        <td>{props.productId.ccal}</td>
      </tr>
    </tbody>
  )
}

export default OneProduct
