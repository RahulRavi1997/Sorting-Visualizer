function merge(left, right, array) {
    console.log('pks2', left, right, array);
    if (left.length == 0 && right.length == 0) {
        return array;
    } else if (left.length == 0) {
        return array.concat(right);
    } else if (right.length == 0) {
        return array.concat(left);
    } else if (left[0] < right[0]) {
        array.push(left.shift());
    } else {
        array.push(right.shift());
    }
    console.log('pks1', left, right, array);
    return merge(left, right, array);
}

function sort(array) {
    var newArray;
    if (array.length <= 1) {
        newArray = array;
    } else {
        console.log('pks',array, array.slice(0, Math.ceil(array.length / 2)),array.slice(Math.ceil(array.length / 2)));
        newArray = merge(
            sort(array.slice(0, Math.ceil(array.length / 2))).newArray,
            sort(array.slice(Math.ceil(array.length / 2))).newArray,
            []
        );
    }
    return {
        newArray, 
    };
}

function mergeSort(array, sortObj) {
    const { } = sortObj;
    const { newArray } = sort(array);
    return {
        newArray,
        completed: true,
        swappers: [],
        sortObj: {}
    }
}
export default mergeSort;