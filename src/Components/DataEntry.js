import React, { Component } from 'react'

export default class DataEntry extends Component {

  deleteEntry = (id) => {
    this.props.onDelete(id);
  }

  render() {
    let entry;
    const data = this.props.data;
    if (data){
      entry = Object.keys(data).map(d => {
        return(<td key = {d}>{data[d]}</td>);
      });
    }
    return (
        <tr>
          {entry}
          <td><a href = "#" onClick = {this.deleteEntry.bind(this.props.data.ID)}>X</a></td>
        </tr>
    )
  }
}
