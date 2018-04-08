class HandleString {
    constructor() {
        this.init();
    }

    init() {
        this.reverseMethod1('Hello world!');
        this.reverseMethod2('Hello world!');
    }

    /*
    * 字符串倒序
    * */
    reverseMethod1(str) {
        let result = '';
        for (let i = str.length - 1; i >= 0; i--) {
            result += str[i];
        }
        console.log(result);
    }

    reverseMethod2(str) {
        str = str.split('').reverse().join('');
        console.log(str);
    }


}

new HandleString();