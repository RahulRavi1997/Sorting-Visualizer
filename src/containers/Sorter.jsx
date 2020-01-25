
import React from 'react';
import Bar from "./../components/Bar";
import { setBarSizes } from '../actions/index';
import { connect } from 'react-redux'
import '../App.css';
import selectionsort from '../algorithms/selectionsort';
import bubblesort from '../algorithms/bubblesort';
import mergesort from '../algorithms/mergesort';
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
    const { sorting, paused, speed, sortType, barSizes: array } = nextProps;
    const sort =
      sortType === "quick" ? quicksort :
        sortType === "merge" ? mergesort :
          sortType === "selection" ? selectionsort :
            sortType === "bubble" ? bubblesort : null;
    if (null === sort) {
      console.error('unknown sorting method! ->', sortType);
      return;
    }
    if ((sorting && !this.props.sorting) || (sorting && !paused && this.props.paused)) {
      console.log('startSorting', this.props.iteration);
      this.doSort(sort, speed, sortType, array, this.props.iteration, this.props.innerIteration);
    } else if (!sorting && this.props.sorting || paused) {
      console.log('stopSorting');
      if (!paused) {
        this.state.swappers = []; // TODO: work around mutating state
      }
      window.clearTimeout(this.state.timeoutID);
    }
  }

  doSort(sort, speed, sortType, array, iteration, innerIteration) {
    var sortSpeed = Number(speed) === 0 ? 500 : (Number(speed) === 1 ? 250 : 50);
    const { newArray, completed, swappers, newiteration, newinnerIteration } = sort(array, iteration, innerIteration);
    if (!completed) {
      var timeoutID = setTimeout(() => this.doSort(sort, speed, sortType, array, newiteration, newinnerIteration), sortSpeed);
      this.setState({
        timeoutID,
        swappers
      });
      this.props.setBarSizes(newArray, newiteration, newinnerIteration);
    } else {
      this.props.setSorting(false);
      this.setState({
        swappers: [],
        timeoutID: null
      });
      this.props.setBarSizes(newArray, 0);
    }
  }

  createBars = (barSizes, swappers, sortType, iteration) => {
    var elementbars = [];
    for (var i = 0; i < barSizes.length; i++) {
      var color = "#9e9e9e";
      if (sortType === "selection" && i < iteration-1) {
        color = "#5580af";
      } else if (sortType === "bubble" && i >= (barSizes.length - iteration)) {
        color = "#5580af";
      }
      if ((swappers[0] && swappers[0] === i) || (swappers[1] && swappers[1] === i)) {
        color = "#5f5f5f";
      }
      elementbars.push(<Bar size={barSizes[i]} key={i} total={barSizes.length} color={color} />);
    }
    return elementbars;
  }

  render() {
    const { barSizes, sortType, iteration } = this.props;
    const { swappers } = this.state;
    return (
      <div className="sorter">
        <div className="barswrapper">
          {this.createBars(barSizes, swappers, sortType, iteration )}
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
    iteration: state.barSizesReducer.iteration,
    innerIteration: state.barSizesReducer.innerIteration
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setBarSizes: (barSizes, iteration, innerIteration) => { dispatch(setBarSizes(barSizes, iteration, innerIteration)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sorter);