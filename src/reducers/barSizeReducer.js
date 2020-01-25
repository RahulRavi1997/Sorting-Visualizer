const initialState = {
  barSizes: Array.from({ length: 50 }, () => Math.floor(Math.random() * 50)),
  iteration: 1,
  innerIteration: 0
}
const barSizesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_BAR_SIZES':
      var barSizes = Array.from({ length: action.length }, () => Math.floor(Math.random() * 50));
      return {
        ...state,
        barSizes,
        iteration: 0,
        innerIteration: 0
      }
    case 'SET_BAR_SIZES':
      return {
        ...state,
        barSizes: action.barSizes,
        iteration: action.iteration === undefined ? state.iteration+1 : action.iteration,
        innerIteration: action.innerIteration === undefined ? state.innerIteration : action.innerIteration
      }
    default:
      return state
  }
}
export {
  barSizesReducer
}