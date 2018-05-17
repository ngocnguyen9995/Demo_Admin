import React, { Component } from 'react'

export default class TableFields extends Component {
  render() {
    return (
        <tr>
          <td>{this.props.table.id}</td>
          <td>{this.props.table.name}</td>
          <td>{this.props.table.description}</td>
        </tr>
    )
  }
}
