import React, { Component } from 'react'
import DataEntry from './DataEntry'

export default class Table extends Component {
  constructor(props){
      super(props);
      let newFields;
      if (this.props.fields){
        newFields = this.props.fields;
      }
      this.state = {
        fields: newFields
      }
  }

  renderTableFields = () =>{
    let tableFields;
    const fields = this.state.fields;
    tableFields = fields.map(field => {
      return(
        <th key = {field}><strong>{field}</strong></th>
      );
    });
    return tableFields;
  }

  deleteEntry = (id) => {
    this.props.onDelete(id);
  }

  render() {

    let tableFields = this.renderTableFields();
    
    let tableData;
    if (this.props.data) {
      tableData = this.props.data.map((d,i) => {
        return (
          <DataEntry key = {i} data = {d} onDelete = {this.deleteEntry}/>
        );
      });
    }
    return (
      <div className = "Table">
      <h2 align = "Center">App Table</h2>
      <table align = "Center" border = "1"  width = "70%" cellSpacing  = "5px">
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
