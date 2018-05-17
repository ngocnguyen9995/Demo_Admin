import React, { Component } from 'react'
import TableField from './TableField'

export default class Tables extends Component {
  render() {
    let tableFields;
    if (this.props.tables) {
      tableFields = this.props.tables.map((table, i) => {
        return (
          <TableField key = {table.id} table = {table} />
        );
      });
    }
    return (
      <div className = "Tables">
      <h2>App Table</h2>
      <table align = "center" border = "1"  width = "70%" cellPadding = "5px">
        <thead>
          <tr>
            <td width = "5%"><strong>ID</strong></td>
            <td><strong>Name</strong></td>
            <td><strong>Description</strong></td>
          </tr>
        </thead>
        <tbody>
          {tableFields}
        </tbody>
      </table>
        
      </div>
    )
  }
}
