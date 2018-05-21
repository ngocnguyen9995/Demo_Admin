import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html: this.props.content
        };
    }

    onChange = event => {
        this.setState({
            html: event.target.value
        }, () => this.props.handleChange(this.state.html));
    }

    render() {
        
        const {html} = this.state;
        const {onChange} = this;
        const {style} = this.props;
        
        const cellProps = {
            html,
            onChange,
            disabled: false,
            style,
        }

        return (
            <ContentEditable
                {...cellProps}
            />
        );
    }
}
