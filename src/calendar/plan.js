import React from 'react';
import './css/plan.css';

export class Plan extends React.Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete = (e) => {
        this.props.removePlan({
            time: this.props.time,
            description: this.props.description
        });
    }

    render() {
        return(
            <div className="plan">
                <span className="info"><b>Time:</b> {this.props.time}</span>
                <span className="info"><b>Description:</b> {this.props.description}</span>
                <button className="button" onClick={this.delete}>Remove</button>
            </div>
        );
    }
}