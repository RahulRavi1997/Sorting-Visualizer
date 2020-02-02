export const resetBarSizes = length => ({
  type: 'RESET_BAR_SIZES',
  length
})
export const setBarSizes = (barSizes, sortObj) => ({
    type: 'SET_BAR_SIZES',
    barSizes,
    sortObj
  })
export const barSizeActions = {
  RESET_BAR_SIZES: 'RESET_BAR_SIZES',
  SET_BAR_SIZES: 'SET_BAR_SIZES',
}