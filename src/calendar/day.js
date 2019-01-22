import React from 'react';
import './css/day.css';

export class Day extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        this.props.onClick(this.props.day);
    }

    render() {
        return (
            <div>
                <button className="day" onClick={this.handleClick}>{this.props.day}</button>
            </div>
        );
    }
}