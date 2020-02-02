function doSort(arr, sortObj) {
    var { iteration: i, selectedIteration: j } = sortObj;
    var len = arr.length, stop, completed = false;
    for (stop = len - i; j < stop; j++) {
        if (arr[j] > arr[j + 1]) {
            swap(arr, j, j + 1);
            return { newArray: arr, swappers: [j, j + 1], iteration: i, selectedIteration: j };
        }
    }
    if (i == len - 1) {
        completed = true;
    }
    i++;
    j = 0;
    return { newArray: arr, completed, swappers: [j, j + 1], iteration: i, selectedIteration: j };
}
function swap(arr, first_Index, second_Index) {
    var temp = arr[first_Index];
    arr[first_Index] = arr[second_Index];
    arr[second_Index] = temp;
}

function bubbleSort(array, sortObj) {
    if (sortObj.iteration > array.length) {
        console.error("Error in bubble sort. Max length exceeded!");
        return {
            array,
            completed: true,
            swappers: [],
            newSortObj: {
                iteration: 0,
                selectedIteration: 0,
            }
        };
    }
    const { newArray, completed, swappers, iteration, selectedIteration } = doSort(array, sortObj);
    return {
        newArray,
        completed,
        swappers,
        newSortObj: {
            iteration: iteration,
            selectedIteration: selectedIteration
        }
    };
}

export default bubbleSort;
