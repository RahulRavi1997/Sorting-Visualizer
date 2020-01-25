function bubbleSort(arr, i, j) {
    var len = arr.length, stop, completed = false;
    for (stop = len - i; j < stop; j++) {
        if (arr[j] > arr[j + 1]) {
            swap(arr, j, j + 1);
            return { arr, swappers: [j, j + 1], newiteration: i, newinnerIteration: j };
        }
    }
    if (i == len - 1) {
        completed = true;
    }
    i++;
    j = 0;
    return { arr, completed, swappers: [j, j + 1], newiteration: i, newinnerIteration: j };
}
function swap(arr, first_Index, second_Index) {
    var temp = arr[first_Index];
    arr[first_Index] = arr[second_Index];
    arr[second_Index] = temp;
}

function selectionsort(array, iteration, innerIteration) {
    if (iteration > array.length) {
        console.error("Error in bubble sort. Max length exceeded!");
        return {
            array,
            completed: true,
            swappers: [],
            newiteration: 1,
            newinnerIteration: 0
        };
    }
    const { arr: newArray, completed, swappers, newiteration, newinnerIteration } = bubbleSort(array, iteration, innerIteration);
    return {
        newArray,
        completed,
        swappers,
        newiteration,
        newinnerIteration
    };
}

export default selectionsort;
