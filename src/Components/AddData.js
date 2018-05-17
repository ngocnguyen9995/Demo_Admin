import React, { Component } from 'react'

export default class AddData extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    onChange = (event) => {
        const state = this.state;
        state[event.target.name] = event.target.value
        this.setState(state);
    }

    onSubmit = (event) => {
        event.preventDefault();
        const newEntry = this.state;
        this.props.addNewEntry(newEntry);
    }

    
    componentWillMount(){
        // Add properties to state
        const state = this.state
        if (this.props.fields){
            this.props.fields.map(field =>{
                state[field] = '';
            });
        }
        this.setState(state);
    }

    render() {
        let fields;
        for (var key in this.state) {
            fields += (
                <div>
                <label>{key}</label><br />
                <input type = "text" name = {key} value = {this.state[key]}required/>
                </div>);
        }
        /* if (this.state){
            fields = Object.keys(this.state).map(key =>{
                return(
                    <div key = {key}>
                        <label>{key}</label><br />
                        <input type = "text" name = {key} value = {this.state[key]}required/>
                    </div>
                );
            });
        } */
        /* if (this.props.fields){
            fields = this.props.fields.map(field => {
                return(
                    <div key = {field}>
                        <label>{field}</label> <br/>
                        <input type = "text" name = {field} />
                    </div>
                );
            });
        } */

        return (
        <div align = "Center">
            <h3>Add New Entry</h3>
            <form onSubmit = {this.onSubmit} onChange = {this.onChange}>
                {fields}
                <input type = "submit" value = "Submit" />
            </form>
        </div>
        )
    }
}
