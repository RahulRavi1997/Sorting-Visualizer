import React from 'react';
import '../App.css';

class Slider extends React.Component {
    render() {
        const { size, total, color } = this.props;
        
        return (
            <div className={"bars"} style={ { height: 10*size+5 , width: 1000/total, marginLeft: 100/total, marginRight: 100/total, backgroundColor: color} }>
                <div className="shadow" />
            </div>
        );
    }
}

export default Slider;
