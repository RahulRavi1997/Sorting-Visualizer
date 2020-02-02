function swap(arr, first_Index, second_Index) {
    var temp = arr[first_Index];
    arr[first_Index] = arr[second_Index];
    arr[second_Index] = temp;
    return arr;
}
function selectionsort(array, sortObj) {
    var { iteration, selectedIteration, leastIndex, leastValue } = sortObj;
    var completed = false;
    if (iteration > array.length) {
        console.error("Error in selection sort. Max length exceeded!");
        completed=true;
    }
    var newArray = array;
    if (iteration == array.length-1 || array.length === 1) {
        completed = true;
    } else {
        if (selectedIteration > array.length) {
            if (leastIndex != iteration) {
                newArray = swap(newArray, iteration, leastIndex);
            }
            iteration++;
            selectedIteration = iteration;
            leastValue = Number.MAX_VALUE;
            leastIndex = Number.MAX_VALUE;
        } else {
            if (array[selectedIteration] < leastValue) {
                leastValue = array[selectedIteration];
                leastIndex = selectedIteration;
            }
            selectedIteration++;
        }
    }
    return {
        newArray,
        completed,
        swappers: [leastIndex, iteration],
        newSortObj: {
            iteration,
            selectedIteration,
            leastIndex,
            leastValue
        }
    };
}

export default selectionsort;
