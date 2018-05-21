import React, { Component } from 'react'
import ReactTable from 'react-table';
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import {isEmpty} from "../Lib/ObjHelper"

const CheckboxTable = checkboxHOC(ReactTable);

export default class Table extends Component {
  constructor(props){
    super(props);
    this.state = {
      selection: {},
      selectAll: false
    };
  }

  toggleSelection = (key, shift, row) => {
    const newSelection = Object.assign({}, this.state.selection);
    newSelection[key] = !this.state.selection[key];
    this.setState({
      selection: newSelection
    });
  };

  toggleAll = () => {
    const selectAll = this.state.selectAll ? false : true;
    let newSelection = {};
    if (selectAll) {
      // Get table internals and all currently visible rows
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // Push al IDs to selection
      currentRecords.forEach(element => {
        newSelection[element.id] = true;
      });
    }
    this.setState({selectAll, selection: newSelection});
  };

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

  isSelected = key => {
    return this.state.selection[key] === true;
  };

  /* renderEditable = (cellInfo) => {
    return(
      <div
        style = {{background: "#fafafa"}}
        contentEditable
        suppressContentEditableWarning
        onBlur = {() => {
          {this.props.handleChange}
        }}
        dangerouslySetInnerHTML = {{
          __html: this.stat
        }}
      />
    );
  }; */

  deleteSelection = () => {
    const selection = this.state.selection;
    if (isEmpty(selection)){
      alert("No row selected");
    } else {
      this.props.onDelete(selection);
    }
    this.setState({selection: {}});
  };

  getColumns(data, exclude = "", uneditableCells = []) {
    let header = [];
    for (var d in data[0]){
      if (d !== exclude){
        let h_and_a = {
          Header: d.toUpperCase(),
          accessor: d
        };
        /* if (!uneditableCells.includes(d)){
          h_and_a = {
            Header: d.toUpperCase(),
            accessor: d,
            Cell: this.renderEditable
          }
        } else {
          h_and_a = {
            Header: d.toUpperCase(),
            accessor: d
          }
        } */
        header.push(h_and_a);
      }
    }
    return header;
  }

  render() {
    const {data, exclude, uneditableFields, keyField, sortMethod} = this.props;
    const {toggleSelection, toggleAll, isSelected, deleteSelection} = this;
    const selectAll = this.state.selectAll;
    const columns = (this.getColumns(data, exclude, uneditableFields));

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
    }

    return(
      <div>
        <button onClick={deleteSelection}>Delete</button>
        <CheckboxTable
          ref = {r => (this.checkboxTable = r)}
          filterable
          keyField = {keyField}
          data = {data}
          columns = {columns}
          defaultPageSize = {50}
          defaultSorted = {[
            {sortMethod}
          ]}
          style = {{height: "500px"}}
          className="-striped -highlight"
          {...checkboxProps}/>
      </div>
    );

  }
}
