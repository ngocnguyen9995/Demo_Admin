import React, { Component } from 'react';
import Table from './Components/Table'
import './App.css';
import AddData from './Components/AddData'
import NavBar from './Components/NavBar'

const APPFIELDS = ["ID","Name","Description"];
const ENVFIELDS = ["ID", ]

class App extends Component {

  constructor(){
    super();
    this.state = {
      tables: [],
      currentTable: '',
      fields: [],
      data: []
    }
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

  handleDeleteEntry = (id) => {
    let newData = this.state.data;
    let index = newData.findIndex(d => d.id === id);
    newData.splice(index, 1);
    this.setState({data: newData});
  }

  fetchTables = () =>{
    // Call apis to get list of tables
    this.setState({
      tables: ["App","Env","Customer"]
    });
  }

  fetchCurrentTable = () => {
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
  }

  componentWillMount(){
    this.fetchTables();
    this.fetchCurrentTable();
  }

  render() {
    return (
      <div className="App">
        <div className = "Navigation">
          <NavBar tables ={this.state.tables}/> <br />
        </div>
        <Table title = {this.state.currentTable} fields = {this.state.fields} data = {this.state.data} onDelete = {this.handleDeleteEntry}/>
        <hr />
        <AddData fields = {this.state.fields} addNewEntry = {this.handleAddNewEntry}/>
      </div>
    );
  }
}

export default App;
