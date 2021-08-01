import React from 'react'

const Product = (props) => {
  return (
    <React.Fragment>
      <td id={props.rows.id}>{props.rows.name}</td>
      {props.rows.count && <td id={props.rows.id}>{props.rows.count}</td>}
      {props.rows.unit && <td id={props.rows.id}>{props.rows.unit}</td>}
      {props.rows.ccal && <td id={props.rows.id}>{props.rows.ccal}</td>}
      <td onClick={props.handleDelete} id={props.rows.id}>
        <button id={props.rows.id}>Delete</button>
      </td>
    </React.Fragment>
  )
}

export default Product
