
import React from 'react';
import Bar from "./../components/Bar";
import { setBarSizes } from '../actions/index';
import { connect } from 'react-redux'
import '../App.css';
import selectionsort from '../algorithms/selectionsort';
import bubblesort from '../algorithms/bubblesort';
import insertionsort from "../algorithms/insertionsort";
import quicksort from '../algorithms/quicksort';

class Sorter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeoutID: null,
      swappers: []
    };
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { sorting, paused, speed, sortType, barSizes: array, sortObj } = nextProps;
    const sort =
      sortType === "quick" ? quicksort :
        sortType === "insertion" ? insertionsort :
          sortType === "selection" ? selectionsort :
            sortType === "bubble" ? bubblesort : null;
    if (null === sort) {
      console.error('unknown sorting method! ->', sortType);
      return;
    }
    if ((sorting && !this.props.sorting) || (sorting && !paused && this.props.paused)) {
      console.log('startSorting', this.props.iteration);
      this.doSort(sort, speed, sortType, array, sortObj);
    } else if (!sorting || paused) {
      console.log('stopSorting');
      if (!paused) {
        this.state.swappers = []; // TODO: work around mutating state
      }
      window.clearTimeout(this.state.timeoutID);
    }
  }

  doSort(sort, speed, sortType, array, sortObj) {
    var sortSpeed = Number(speed) === 0 ? 500 : (Number(speed) === 1 ? 250 : 50);
    const { newArray, completed, swappers, newSortObj } = sort(array, sortObj);
    if (!completed) {
      var timeoutID = setTimeout(() => this.doSort(sort, speed, sortType, array, newSortObj), sortSpeed);
      this.setState({
        timeoutID,
        swappers
      });
      this.props.setBarSizes(newArray, newSortObj);
    } else {
      this.props.setSorting(false);
      this.setState({
        swappers: [],
        timeoutID: null
      });
      this.props.setBarSizes(newArray, 0);
    }
  }

  createBars = (barSizes, swappers, sortType, sortObj) => {
    var iteration, selectedIteration;
    if (sortObj) {
      iteration = sortObj.iteration;
      selectedIteration = sortObj.selectedIteration;
      iteration = sortObj.iteration;
    }
    var elementbars = [];
    for (var i = 0; i < barSizes.length; i++) {
      var color = "#9e9e9e";
      if (sortType === "selection") {
        if (i < iteration) {
          color = "#5580af";
        }
        if (i == selectedIteration) {
          color = "#5f5f5f";
        }
      } else if (sortType === "bubble" && i >= (barSizes.length - iteration)) {
        color = "#5580af";
      } else if (sortType === "quick") {
        if (sortObj.pivoti === i) {
          color = "#5f5f5f";
        }
        if (sortObj.pivotj === i) {
          color = "#5f5f5f";
        }
        if (sortObj.pivots && sortObj.pivots.length > 0 && sortObj.pivots.indexOf(i) !== -1) {
          color = "#5580af";
        }
        if (sortObj.pivot === i) {
          color = "#ff50507d";
        }
      } 
      if ((swappers[0] && swappers[0] === i) || (swappers[1] && swappers[1] === i)) {
        color = "#007bff80";
      }
      elementbars.push(<Bar size={barSizes[i]} key={i} total={barSizes.length} color={color} />);
    }
    return elementbars;
  }

  render() {
    const { barSizes, sortType, sortObj } = this.props;
    const { swappers } = this.state;
    return (
      <div className="sorter">
        <div className="barswrapper">
          {this.createBars(barSizes, swappers, sortType, sortObj )}
        </div>
      </div>
    );
  }
}

Sorter.defaultProps = {
};

const mapStateToProps = state => {
  return {
    barSizes: state.barSizesReducer.barSizes,
    sortObj: state.barSizesReducer.sortObj
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setBarSizes: (barSizes, sortObj) => { dispatch(setBarSizes(barSizes, sortObj)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sorter);