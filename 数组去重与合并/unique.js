/**
 * Created by Thinkpad on 2017/10/12.
 */

// 先合并再去重
function unique(arr1,arr2) {
    var arr = arr1.concat(arr2),
        unique_arr = [];
    for (var i = 0; i < arr.length; i++) {
        if (unique_arr.indexOf(arr[i]) === -1) {
            unique_arr.push(arr[i]);
        }
    }
    return unique_arr;
}

console.log(unique([1,1,1,2,3,4,5,5,6,7],[8,8,9,9,10]));