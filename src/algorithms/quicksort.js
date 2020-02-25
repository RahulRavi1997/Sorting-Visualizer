function doSort(items, left, right, pivot, pivoti, pivotj) {
    pivot = pivot == null ? items[left] : pivot;
    var i = pivoti == null ? left : pivoti;
    var j = pivotj == null ? right : pivotj;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
            return { items, pivot, pivoti: i, pivotj: j, partitionCompleted: false };
        }
        while (items[j] > pivot) {
            j--;
            return { items, pivot, pivoti: i, pivotj: j, partitionCompleted: false };
        }
        if (i <= j) {
            items = swap(items, i, j);
            i++;
            j--;
            return { items, pivot, pivoti: i, pivotj: j, partitionCompleted: false };
        }
    }
    return { items, pivot, pivoti: i, pivotj: null, partitionCompleted: true };
}

function quickSort(items, iteration, nextLeftIter, nextRightIter, pivot, pivoti, pivotj, currentPartition, pivots) {
    var completed;
    var newiteration = iteration;   
    if (items.length <= 1) {
        return {
            newArray: items,
            isCompleted: true
        };
    }
    if ((nextLeftIter.length > 0) || (nextRightIter.length > 0)) {
        var newBounds;
        if (currentPartition == null) {
            if (nextLeftIter.length > 0) {
                currentPartition = "left";
                newBounds = nextLeftIter[0];
            } else {
                currentPartition = "right";
                newBounds = nextRightIter[0];
            }
        } else {
            newBounds = currentPartition === "left" ? nextLeftIter[0] : nextRightIter[0];
        }
        const { left, right } = newBounds;
        var sortedObj = doSort(items, left, right, pivot, pivoti, pivotj);
        pivot = sortedObj.pivot;
        pivoti = sortedObj.pivoti;
        pivotj = sortedObj.pivotj;
        items = sortedObj.items;
        if (!sortedObj.partitionCompleted) {
            return {
                newArray: items,
                swappers: [pivoti, pivotj],
                isCompleted: false,
                newiteration,
                newLeft: nextLeftIter,
                newRight: nextRightIter,
                newPivot: pivot,
                newPivoti: pivoti,
                newPivotj: pivotj,
                newCurrentPartition: currentPartition,
                newPivots: pivots
            };
        }
        if (currentPartition === "left") {
            nextLeftIter = nextLeftIter.slice(1);
        } else if (currentPartition === "right") {
            nextRightIter = nextRightIter.slice(1);
        }
        if (left < pivoti - 1) {
            nextLeftIter.push({ left, right: pivoti - 1 });
        }
        if (pivoti < right) {
            nextRightIter.push({ left: pivoti, right });
        }
        pivots.push(pivoti);
        newiteration++;
    } else {
        completed = true;
    }
    return {
        newArray: items,
        swappers: [],
        isCompleted: completed,
        newiteration,
        newLeft: nextLeftIter,
        newRight: nextRightIter,
        newPivot: null,
        newPivoti: null,
        newPivotj: null,
        newCurrentPartition: null,
        newPivots: pivots
    };
}

function sort(array, sortObj) {
    const { iteration, nextLeftIter, nextRightIter, pivot, pivoti, pivotj, currentPartition, pivots } = sortObj;
    const { newArray, isCompleted, newiteration, newLeft, newRight, newPivot, newPivoti, newPivotj, newCurrentPartition, newPivots, swappers } =
        quickSort(array, iteration, nextLeftIter || [{ left: 0, right: array.length - 1 }], nextRightIter || [], pivot, pivoti, pivotj, currentPartition, pivots);
    return {
        newArray,
        completed: isCompleted,
        swappers: [],
        newSortObj: {
            iteration: newiteration,
            selectedIteration: 0,
            nextLeftIter: newLeft,
            nextRightIter: newRight,
            pivot: newPivot,
            pivoti: newPivoti,
            pivotj: newPivotj,
            currentPartition: newCurrentPartition,
            pivots: newPivots
        }
    };
}
function swap(arr, first_Index, second_Index) {
    var temp = arr[first_Index];
    arr[first_Index] = arr[second_Index];
    arr[second_Index] = temp;
    return arr;
}

export default sort;
