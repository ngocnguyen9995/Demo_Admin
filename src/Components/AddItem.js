import React, { Component } from 'react'

export default class AddItem extends Component {

    onChange = (event) => {

    }

    onSubmit = (event) => {
        
    }

    render() {
        return (
        <div>
            <h3>Add New Entry</h3>
            <form>
                <div>
                    <label>Name</label><br/>
                    <input type = "text" ref = "Name" />
                </div>
                <div>
                    <label>Description</label><br/>
                    <input type = "text" ref = "Description" />
                </div>
                <input type = "submit" value = "Submit" />
            </form>
        </div>
        )
    }
}
