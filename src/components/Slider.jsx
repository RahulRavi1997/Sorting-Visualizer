import React from 'react';
import '../App.css';

class Slider extends React.Component {
    render() {
        const { name, disabled, value, onChange, values } = this.props;
        return (
            <div className={`slide slide${name}`}>
                <input type="range" disabled={disabled} className="slider" max={this.props.size} value={value} onChange={(e) => {onChange(name, e.target.value)}}/>
                <div className="level">
                    <div>{values[0]}</div>
                    <div>{values[1]}</div>
                    <div>{values[2]}</div>
                </div>
            <p>{name}</p>
            </div>
        );
    }
}

export default Slider;
