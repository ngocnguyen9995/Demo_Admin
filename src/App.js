import React, { Component } from 'react';
import Table from './Components/Table'
import './App.css';
import AddData from './Components/AddData'
import NavBar from './Components/NavBar'

const apiLink = "https://jsonplaceholder.typicode.com/posts";
const tables = ["APP", "ENV", "CUSTOMER"];
class App extends Component {

  constructor(){
    super();
    this.state = {
      data: [],
      fields: [],
      tables: tables
    }
  }

  getData() {
    fetch(apiLink)
      .then(response => response.json())
      .then(json => {
        const fields = [];
        for (var field in json[0]){
          fields.push(field);
        }
        this.setState({
          data: json,
          fields: fields
        });
      });
  }

  handleAddNewEntry = (newEntry) => {
    if (newEntry){
      let newData = this.state.data;
      newData.push(newEntry);
      this.setState({data:newData});
    }
  }

  handleEditEntry = (newEntry, i) => {
    if (newEntry){
      let newData = this.state.data;
      newData[i] = newEntry;
      this.setState({data: newData});
    }
  }

  handleDeleteEntry = (selection) => {
    let newData = this.state.data;
    const index = (data, key) => {
      return data.findIndex(d => d.id === key);
    }
    for (var key in selection) {
      let i = index(newData, parseInt(key));
      newData.splice(i, 1);
    }
    this.setState({data: newData})
  }

  fetchTables = () =>{
    // Call apis to get list of tables
    this.setState({
      tables: ["App","Env","Customer"]
    });
  }

  /* fetchCurrentTable = () => {
    // Fetch the currently selected table, fields and data
    this.setState({
      fields: ["ID","Name","Description"],
      data: [
        {
          ID: 0,
          Name: 'Test',
          Description: 'Test Description'
        },
        {
          ID: 1,
          Name: 'Test2',
          Description: 'Test Description'
        },
        {
          ID: 2,
          Name: 'Test3',
          Description: 'Test Description'
        }
      ]
    });
  } */

  componentWillMount(){
    this.getData();
  }

  render() {
    const {data} = this.state;
    const {handleDeleteEntry} = this;
    const tableProps = {
      data: data,
      keyField: "id",
      uneditableFields: ["userId", "id"],
      onDelete: handleDeleteEntry,
      sortMethod: {
        id: "id",
        desc: true
      }
    }
    return (
      <div className="App">
        <div className = "Navigation">
          <NavBar tables ={this.state.tables}/> <br />
        </div>
          <Table
            {...tableProps}
          />
          <hr/>
          <AddData fields = {this.state.fields} addNewEntry = {this.handleAddNewEntry}/>
      </div>
    );
  }
}

export default App;
