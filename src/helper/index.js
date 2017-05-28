/**
 * Created by phanmduong on 5/27/17.
 */

export function dotNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function maxArray(arr) {
    var max = -10000000;
    arr.forEach(function (item) {
        var data = parseInt(item);
        if (data > max) max = data;
    })
    return max;
}