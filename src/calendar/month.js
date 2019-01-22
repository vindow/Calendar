import React from 'react';
import './css/month.css';
import { Day } from './day';

export class Month extends React.Component {
    
    createTable = () => {
        let table = [];
        let startingDay = this.dayOfWeek(1, this.props.month, this.props.year)
        let dayCount = 1;
        
        // Outer loop to create rows of weeks
        for (let i = 1; i <= 6; i++) {
            let children = [];
            //Inner loop to create columns of days
            for (let j = 1; j <= 7; j++) {
                if (dayCount <= startingDay || dayCount - startingDay > this.maxDays()) {
                    children.push(<td></td>)
                } else {
                    children.push(<td><Day day={dayCount - startingDay} onClick={this.props.handleState}></Day></td>);
                }
                dayCount++;
            }
            //Create the parent and add the children
            table.push(<tr>{children}</tr>);
        }
        return table;
    }

    maxDays = () => {
        let largeMonths = [1, 3, 5, 7, 8, 10, 12];
        let smallMonths = [4, 6, 9, 11];
        if (largeMonths.includes(this.props.month)) {
            return 31;
        } else if (smallMonths.includes(this.props.month)) {
            return 30;
        } else {
            if (this.props.year % 400 === 0) {
                return 29;
            }
            if (this.props.year % 100 === 0) {
                return 28;
            }
            if (this.props.year % 4 === 0) {
                return 29;
            }
            return 28;
        }
    }

    dayOfWeek = (d, m, y) => {
        const t = [ 0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4 ] 
        y -= (m < 3) ? 1 : 0; 
        return (( y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + t[m - 1] + d) % 7);
    } 
    

    render() {
        return (
            <div className="month">
                <table className="table">
                    <th>SUN</th>
                    <th>MON</th>
                    <th>TUE</th>
                    <th>WED</th>
                    <th>THU</th>
                    <th>FRI</th>
                    <th>SAT</th>
                    {this.createTable()}
                </table> 
            </div>
        );
    }
}