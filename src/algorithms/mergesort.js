function merge(left, right, array){
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
    return merge(left, right, array);
}

function sort(array) {
    if (array.length > 1) {
        return merge(sort(array.slice(0, Math.ceil(array.length/2))), sort(array.slice(Math.ceil(array.length/2))), []);
    }
}
function mergeSort(array, sortObj){
    const {} = sortObj;
    sort(array);
    return {
        newArray: array,
        completed: true,
        swappers: [],
        sortObj: {}
    }
}
export default mergeSort;