import React, { Component } from 'react';
import logo from './logo.svg';
import Tables from './Components/Tables'
import './App.css';
import AddItem from './Components/AddItem'

class App extends Component {

  constructor(){
    super();
    this.state = {
      tables: []
    }
  }

  componentWillMount(){
    // call API to get all tables here
    this.setState(
      {
        tables: [
          {
            id: 0,
            name: 'Test',
            description: 'Test Description'
          },
          {
            id: 1,
            name: 'Test2',
            description: 'Test Description'
          },
          {
            id: 2,
            name: 'Test3',
            description: 'Test Description'
          },
        ]
      }
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Admin UI</h1>
        </header>
        <Tables tables = {this.state.tables}/>
        <hr />
        <AddItem />
      </div>
    );
  }
}

export default App;
