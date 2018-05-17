import React, { Component } from 'react'

export default class DataEntry extends Component {
  render() {
    return (
        <tr>
          <td>{this.props.data.ID}</td>
          <td>{this.props.data.Name}</td>
          <td>{this.props.data.Description}</td>
        </tr>
    )
  }
}
