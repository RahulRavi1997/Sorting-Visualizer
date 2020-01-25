function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)];
    var i = left;
    var j = right;
    var completed = false;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    if (i > j) {
        completed = true;
    }
    return { iteration: i, completed };
}

function quickSort(items, left, right) {
    var index;
    var completed;
    if (items.length > 1) {
        const { iteration, isCompleted } = partition(items, left, right);
        index = iteration;
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
        completed = isCompleted;
    }
    return {
        newArray: items,
        isCompleted: completed
    };
}

function sort(array, iteration) {
    var completed = false;
    if (iteration > array.length) {
        console.error("Error in quick sort. Max length exceeded!");
        completed = true;
    } else {
        const { newArray, isCompleted } = quickSort(array, 0, array.length - 1);
        completed = isCompleted;
        array = newArray;
    }
    return {
        newArray: array,
        completed,
        swappers: [],
        newiteration: iteration + 1
    };
}
function swap(arr, first_Index, second_Index) {
    var temp = arr[first_Index];
    arr[first_Index] = arr[second_Index];
    arr[second_Index] = temp;
    return arr;
}

export default sort;
