import React, { Component } from 'react';
import Table from './Components/Table'
import './App.css';
import AddData from './Components/AddData'
import NavBar from './Components/NavBar'

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
    let data = this.state.data;
    data.push(newEntry);
    console.log(newEntry);
    this.setState({data:data});
  }

  componentWillMount(){
    // call API to get table here
    this.setState(
      {
        tables:[
          "App","Env","Customer"
        ],
        // API to get fields?
        fields:[
          "ID","Name","Description"
        ],
        // Fetch data
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
          },
        ]
      }
    )
  }

  render() {
    return (
      <div className="App">
        <div className = "Navigation">
          <NavBar tables ={this.state.tables}/> <br />
        </div>
        <Table title = {this.state.currentTable} fields = {this.state.fields} data = {this.state.data}/>
        <hr />
        <AddData fields = {this.state.fields} addNewEntry = {this.handleAddNewEntry}/>
      </div>
    );
  }
}

export default App;
