function swap(arr, first_Index, second_Index) {
    var temp = arr[first_Index];
    arr[first_Index] = arr[second_Index];
    arr[second_Index] = temp;
    return arr;
}
function selectionsort(array, iteration) {
    var completed = false;
    if (iteration > array.length) {
        console.error("Error in selection sort. Max length exceeded!");
        completed=true;
    }
    var leastValue = Number.MAX_VALUE;
    var leastIndex = Number.MAX_VALUE;
    var newArray = array;
    if (iteration == array.length-1 || array.length === 1) {
        completed = true;
    } else {
        for (var i = iteration; i <= array.length; i++) {
            if (array[i] < leastValue) {
                leastValue = array[i];
                leastIndex = i;
            }
        }
        if (leastIndex != iteration) {
            newArray = swap(newArray, iteration, leastIndex);
        }
    }
    return {
        newArray,
        completed,
        swappers: [leastIndex, iteration],
        newiteration: iteration+1
    };
}

export default selectionsort;
