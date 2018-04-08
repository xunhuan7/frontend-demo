class HandleArray {
    constructor() {
        this.init();
    }

    init() {
        this.uniqArray1([1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6]);
        this.uniqArray2([1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6]);
        this.uniqArray3([1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6]);
    }

    /*
    * 数组去重*/

    // 双层for循环
    uniqArray1(arr) {
        let result = [];
        arr.forEach((arrItem) => {
            let isRepeat = false;
            result.forEach((resultItem) => {
                if (arrItem === resultItem) {
                    isRepeat = true;
                }
            });
            if (!isRepeat) {
                result.push(arrItem)
            }
        })
        console.log(result);
    }

    // 巧用indexOf方法
    uniqArray2(arr) {
        let result = [];
        arr.forEach((item) => {
            if (result.indexOf(item) < 0) {
                result.push(item);
            }
        })
        console.log(result);
    }

    // 借用对象更快地进行判断
    uniqArray3(arr) {
        let result = [];
        let obj = {};
        arr.forEach((item) => {
            if (!obj[item]) {
                result.push(item);
                obj[item] = 1;
            }
        });
        console.log(result);
    }

}

new HandleArray();