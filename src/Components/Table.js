import React, { Component } from 'react'
import DataEntry from './DataEntry'
import TableFields from './TableFields'

export default class Table extends Component {
  render() {

    let tableFields;
    if (this.props.fields){
      tableFields = this.props.fields.map(field => {
        return (
          <TableFields key = {field} field = {field} />
        )
      });
    }
    
    let tableData;
    if (this.props.data) {
      tableData = this.props.data.map(d => {
        console.log(d.ID);
        return (
          <DataEntry key = {d.ID} data = {d} />
        );
      });
    }
    return (
      <div className = "Table">
      <h2 align = "Center">App Table</h2>
      <table align = "Center" border = "1"  width = "70%" cellPadding = "5px">
        <thead>
          <tr>
          {tableFields}
          </tr>
        </thead>
        <tbody>
          {tableData}
        </tbody>
      </table>
        
      </div>
    )
  }
}
