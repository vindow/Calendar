import React from 'react';
import './css/planner.css';
import { Plan } from './plan';

export class Planner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newTime: "12:00-12:00",
            newDescription: "Add description here..."
        }
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.removePlan = this.removePlan.bind(this);
    }

    getPlans = () => {
        const plans = JSON.parse(localStorage.getItem("react.calendar.plans"));
        if (plans === null) {
            return;
        }
        const currentPlans = plans.filter(plan => {
            return (plan.year === this.props.year && plan.month === this.props.month && plan.day === this.props.day);
        });
        let displayedPlans = [];
        for (let i = 0; i < currentPlans.length; i++) {
            displayedPlans.push(<Plan removePlan = {this.removePlan} time={currentPlans[i].time} description={currentPlans[i].description}></Plan>)
        }
        return displayedPlans;
    }

    addNewPlan = () => {
        let newPlan = {
            time: this.state.newTime,
            description: this.state.newDescription,
            year: this.props.year,
            month: this.props.month,
            day: this.props.day
        }
        const plans = JSON.parse(localStorage.getItem("react.calendar.plans"));
        if (plans === null) {
            let newPlans = [newPlan];
            localStorage.setItem("react.calendar.plans", JSON.stringify(newPlans));
        } else {
            plans.push(newPlan);
            localStorage.setItem("react.calendar.plans", JSON.stringify(plans));
        }
    }

    removePlan = (planToRemove) => {
        const plans = JSON.parse(localStorage.getItem("react.calendar.plans"));
        if (plans === null) {
            return;
        }
        const plansToKeep = plans.filter(plan => {
            return (plan.description != planToRemove.description || plan.time != planToRemove.time || 
                !(plan.year === this.props.year && plan.month === this.props.month && plan.day === this.props.day));
        });
        localStorage.setItem("react.calendar.plans", JSON.stringify(plansToKeep));
        this.forceUpdate();
    }

    handleTimeChange = (e) => {
        this.setState({newTime: e.target.value});
    }

    handleDescriptionChange = (e) => {
        this.setState({newDescription: e.target.value});
    }

    render() {
        return(
            <div className="planner">
                <span className="title">Schedule for {this.props.year}/{this.props.month}/{this.props.day}</span>
                {this.getPlans()}
                <br />
                <span className="heading">Add New Plan</span>
                <form className="form">
                    <label>
                        Time:
                        <input type="text" name="time" value={this.state.newTime} onChange={this.handleTimeChange}></input>
                    </label>
                    <br />
                    <label>
                        Description:
                        <textarea name="description" value={this.state.newDescription} onChange={this.handleDescriptionChange}></textarea>
                    </label>
                    <br />
                    <button onClick={this.addNewPlan}>Add</button>
                </form>
            </div>
        );
    }
}