import React, { Component } from 'react';
import {isEmpty} from '../Lib/ObjHelper';

export default class AddData extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
    }

    onChange = (event) => {
        const newState = this.state;
        newState.data[event.target.name] = event.target.value;
        this.setState({data: newState.data});
    };

    onSubmit = (event) => {
        event.preventDefault();
        var newEntry = this.state.data;
        console.log(newEntry.length);
        if (isEmpty(newEntry)){
            alert("Duplicate/Empty data, please don't do that.");
        } else {
            this.setState({data: {}}, () => {this.props.addNewEntry(newEntry);});
        }
    };

    renderInputFields = () => {
        let inputFields;
        const fields = this.props.fields;
        inputFields = fields.map(field => {
            return(
                <div key = {field}>
                    <label>{field}</label><br/>
                    <input type = "text" name = {field} required/>
                </div>
            ); 
        });
        return inputFields;
    };

    render() {
        let fields = this.renderInputFields();
        return (
        <div align = "Center">
            <h3>Add New Entry</h3>
            <form onSubmit = {this.onSubmit} onChange = {this.onChange}>
                {fields}
                <input type = "submit" value = "Submit" />
            </form>
        </div>
        );
    }
}
