import React, { Component } from 'react'

export default class TableFields extends Component {
  render() {
    return (
        <td><strong>{this.props.field}</strong></td>
    )
  }
}
