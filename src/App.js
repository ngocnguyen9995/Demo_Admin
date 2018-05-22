import React, { Component } from 'react';
import Table from './Components/Table'
import './App.css';
import NavBar from './Components/NavBar'

const apiLink = "https://jsonplaceholder.typicode.com/posts";
const TBLIST = ["App","Env","Customer"];
class App extends Component {

  constructor(){
    super();
    this.state = {
      currentTable: TBLIST[0],
      fields: [],
      tables: TBLIST
    }
  }

  render() {
    const {data, currentTable} = this.state;
    const {handleDeleteEntry} = this;
    const tableProps = {
      tableName: currentTable,
      data: data,
      keyField: "AppId",
      uneditableFields: ["AppEnv"],
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
      </div>
    );
  }
}

export default App;
