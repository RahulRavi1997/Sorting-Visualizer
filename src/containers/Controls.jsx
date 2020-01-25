
import React from 'react';
import { connect } from 'react-redux'
import { resetBarSizes } from '../actions/index';
import '../App.css';
import Slider from '../components/Slider';
import Sorter from './Sorter';

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 1,
      bars: 50,
      sortType: "selection",
      sorting: false,
      paused: false
    }
  }

  onChange = (name, value) => {
    var val = value;
    if (val !== this.state.bars) {
      if (name === "Bars") {
        val = (Number(value) === Number(0)) ? 1 : value;
        this.props.resetBarSizes(val);
      }
    }
    this.setState({
      [name.toLowerCase()]: val
    });
  }

  selectSort = (e) => {
    this.setState({
      sortType: e.currentTarget.value
    });
  }
  setSorting = (sorting) => {
    this.setState({
      sorting,
      paused: false
    });
  }

  setPaused = (paused) => {
    this.setState({
      paused
    });
  }

  render() {
    const { sortType, sorting, paused, speed, bars } = this.state;
    const { barSizes } = this.props;
    console.log('render', barSizes);
    return (
      <div className="controls-wrapper">
        <Sorter sortType={sortType} sorting={sorting} paused={paused} speed={speed} bars={bars} barSizes={barSizes} setSorting={this.setSorting} />
        <div className="controls" >
          <Slider name={"Speed"} value={speed} onChange={this.onChange} values={["Slow", "Medium", "Fast"]} size={2}/>
          <Slider name={"Bars"} value={bars} onChange={this.onChange} values={[0, 50, 100]} size={100}/>
          <div className="sortbuttons">
            <button className={`btn btn-default sort-type ${sortType === "selection" ? "active" : ""}`} disabled={sorting} autoFocus value="selection" onClick={this.selectSort}>Selection Sort</button>
            <button className={`btn btn-default sort-type ${sortType === "bubble" ? "active" : ""}`} disabled={sorting} value="bubble" onClick={this.selectSort}>Bubble Sort</button>
            <button className={`btn btn-default sort-type ${sortType === "quick" ? "active" : ""}`} disabled={sorting} value="quick" onClick={this.selectSort}>Quick Sort</button>
            <button className={`btn btn-default sort-type ${sortType === "merge" ? "active" : ""}`} disabled={sorting} value="merge" onClick={this.selectSort}>Merge Sort</button>

            <button className="btn btn-primary sort" disabled={sorting} onClick={() => { this.setSorting(true) }}>Sort!</button>
            <button className="btn btn-primary sort" disabled={!sorting} onClick={() => { this.setPaused(!paused)}}>Pause/Play</button>
            <button className="btn btn-primary sort" onClick={() => { this.setSorting(false); this.props.resetBarSizes(bars)}}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

Controls.defaultProps = {
  barSizes: Array.from({ length: 50 }, () => Math.floor(Math.random() * 50))
};

const mapStateToProps = state => {
  return {
    barSizes: state.barSizesReducer.barSizes
  }
}
const mapDispatchToProps = dispatch => {
  return {
    resetBarSizes: length => { dispatch(resetBarSizes(length)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Controls);