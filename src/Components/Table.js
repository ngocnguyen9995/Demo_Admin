import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import {isEmpty} from "../Lib/ObjHelper";
import AddData from "./AddData";
import axios from "axios";

const CheckboxTable = checkboxHOC(ReactTable);
const TBURLs = {"App": "https://localhost:44353/api/app"};

const stripNbsp = str => str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');
const stripTag = str => {
  var div = document.createElement("div");
  div.innerHTML = str;
  var text = div.textContent || div.innerText || "";
  return text;
};

export default class Table extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      fields: [],
      selection: {},
      selectAll: false
    };
  }

  componentWillMount(){
    this.fetchData();
  }

  fetchData = () => {
    if (this.props.tableName){
      const url = TBURLs[this.props.tableName];
      axios.get(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        proxy: {
          host: 'https://localhost',
          port: 44353
        }
        })
      .then(response => {
        const data = response.data.data.apps;
        const fields = [];
        for (var field in data[0]){
          if (!this.props.uneditableFields.includes(field)){
            fields.push(field);
          }
        }
        this.setState({
          data: data,
          fields: fields
        });
      });
    }
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

  isSelected = key => {
    return this.state.selection[key] === true;
  };

  handleAddNewEntry = (newEntry) => {
    if (newEntry){
      let newData = this.state.data;
      newData.push(newEntry);
      this.setState({data:newData});
    }
  }

  handleEditEntry = (cell, event) => {
    const data = [...this.state.data];
    console.log(event.target.value)
    data[cell.index][cell.id] = event.taget.value;
    this.setState({data});
  }

  deleteSelection = () => {
    const selection = this.state.selection;
    if (isEmpty(selection)){
      alert("No row selected");
    } else {
      let newData = this.state.data;
      const index = (data, key) => {
        return data.findIndex(d => d.id === key);
      }
      for (var key in selection) {
        let i = index(newData, parseInt(key));
        newData.splice(i, 1);
      }
      this.setState({data: newData, selection: {}});
    }
  };

  renderEditableCell = (cellInfo) => {
    return (
      <div
        style= {{background: "#fafafa"}}
        contentEditable
        suppressContentEditableWarning
        onBlur = {e => {
          const data = [...this.state.data];
          let newHtml = stripTag(stripNbsp(e.target.innerHTML));
          console.log(newHtml);
          data[cellInfo.index][cellInfo.column.id] = newHtml;
          this.setState({data});
        }}
        dangerouslySetInnerHTML = {{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
       />
    );
  }

  getColumns(data, exclude = [], uneditableCells = []) {
    let header = [];
    for (var d in data[0]){
      if (!exclude.includes(d.toString())){
        let h_and_a;
        if (!uneditableCells.includes(d)){
          h_and_a = {
            Header: d.toUpperCase(),
            accessor: d,
            Cell: this.renderEditableCell
          }
        } else {
          h_and_a = {
            Header: d.toUpperCase(),
            accessor: d
          }
        }
        header.push(h_and_a);
      }
    }
    return header;
  }

  render() {
    const {uneditableFields, keyField} = this.props;
    const {toggleSelection, toggleAll, isSelected, deleteSelection} = this;
    const {data, selectAll} = this.state;
    const columns = (this.getColumns(data, "", uneditableFields));

    const tableProps = {
      data: data,
      columns: columns,
      defaultSorted: [
        {
        id: "AppId",
        desc: false
        }
      ]
    };

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
    }

    return(
      <div>
        <h1 align = "Center">{this.props.tableName + " Table"}</h1><br/>
        <button onClick={deleteSelection}>Delete</button>
        <CheckboxTable
          ref = {r => (this.checkboxTable = r)}
          filterable
          {...tableProps}
          defaultPageSize = {10}
          style = {{height: "500px"}}
          className="-striped -highlight"
          {...checkboxProps}/>
          <br/>
          <AddData fields = {this.state.fields} addNewEntry = {this.handleAddNewEntry}/>
      </div>
    );

  }
}
