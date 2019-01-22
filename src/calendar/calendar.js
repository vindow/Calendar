import React from 'react';
import './css/calendar.css'
import { Month } from './month';
import { Planner } from './planner';

export class Calendar extends React.Component {

    constructor(props) {
        super(props);
        var date = new Date();
        this.state = { 
            year : date.getFullYear(),
            month : date.getMonth() + 1,
            day: date.getDate() 
        };
        this.subYear = this.subYear.bind(this);
        this.addyear = this.addYear.bind(this);
        this.subMonth = this.subMonth.bind(this);
        this.addMonth = this.addMonth.bind(this);
        this.handleDaySelect = this.handleDaySelect.bind(this);
    }

    createYearMonthSelector = () => {
        const yearSelector = (
            <div className="selectorBar">
                <div className="yearSelector">
                    <button onClick={this.subYear}>{'<<'}</button>
                        {this.state.year}
                    <button onClick={this.addYear}>{'>>'}</button>
                </div>
                <div className="monthSelector">
                    <button onClick={this.subMonth}>{'<<'}</button>
                        {this.displayMonth()}
                    <button onClick={this.addMonth}>{'>>'}</button>
                </div>
                
            </div>
        );
        return yearSelector;
    }

    subYear = () => {
        const newYear = this.state.year - 1;
        this.setState({year: newYear});
    }

    addYear = () => {
        const newYear = this.state.year + 1;
        this.setState({year: newYear});
    }

    subMonth = () => {
        if (this.state.month === 1) {
            const newMonth = 12;
            const newYear = this.state.year - 1;
            this.setState({
                month: newMonth, 
                year: newYear
            });
        } else {
            const newMonth = this.state.month - 1;
            this.setState({month: newMonth});
        }
    }

    addMonth = () => {
        if (this.state.month === 12) {
            const newMonth = 1;
            const newYear = this.state.year + 1;
            this.setState({
                month: newMonth, 
                year: newYear
            });
        } else {
            const newMonth = this.state.month + 1;
            this.setState({month: newMonth});
        }
    }

    displayMonth = () => {
        switch (this.state.month) {
            case 1:
                return 'January';
            case 2:
                return 'February';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            case 12:
                return 'December';
            default:
                return "";
        }
    }

    handleDaySelect = (newDay) => {
        this.setState({day : newDay});
    }

    render() {
        return (
            <div>
                {this.createYearMonthSelector()}
                <Month year={this.state.year} month={this.state.month} handleState={this.handleDaySelect}></Month>
                <Planner year={this.state.year} month={this.state.month} day={this.state.day}></Planner>
            </div>
        );
    }
}