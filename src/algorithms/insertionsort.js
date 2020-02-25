function insertionSort(array, sortObj) {
    var { iteration, selectedIteration, partitionCompleted } = sortObj;
    var completed = false;
    var newArray = array;
    var pivot;
    let j = selectedIteration == null ? (iteration - 1) :  selectedIteration;
    if (iteration < array.length) {
        let currentValue = array[iteration];
        if (!partitionCompleted) {
            if (j >= 0 && currentValue < newArray[j]) {
                j--;
            } else {
                partitionCompleted = true;
                pivot = j;
            }
        } else {
            j = iteration - 1;
            while (j >= 0 && currentValue < newArray[j] ) {
                newArray[j + 1] = array[j];
                j--;
            }
            newArray[j + 1] = currentValue;
            iteration++;
            j = null;
            pivot = null;
            partitionCompleted = false;
        }
    } else {
        completed = true;
    }
    return {
        newArray,
        completed,
        swappers: [iteration, j],
        newSortObj: {
            iteration,
            pivot,
            selectedIteration: j,
            partitionCompleted
        }
    };
}
export default insertionSort;