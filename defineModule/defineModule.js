/*
* 暴露一个全局变量modules
* 定义模块：define()
* 获取模块：get()
*/

var Modules = (function () {

    var modules = {};

    function define(name, deps, method) {
        for (var i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = method.apply(method, deps);
    }

    function get(name) {
        return modules[name];
    }

    return {
        define: define,
        get: get
    }
})();

// 定义模块alert；通过get()获取，获取结果可使用return的对象内容
Modules.define('alert', [], function () {
    function one() {
        console.log("警告1");
    }

    function two() {
        console.log("警告2");
    }

    function three() {
        console.log("警告3");
    }

    return {
        one: one,
        two: two,
        three: three
    }
});

// 定义模块tips；通过get()获取，获取结果可使用return的对象内容
Modules.define('tips', [], function () {
    function one() {
        console.log("提示1");
    }

    function two() {
        console.log("提示2");
    }

    function three() {
        console.log("提示3");
    }

    return {
        one: one,
        two: two,
        three: three
    }
});

// 使用模块alert
Modules.get("alert").one();
Modules.get("alert").two();
Modules.get("alert").three();

// 使用模块tips
Modules.get("tips").one();
Modules.get("tips").two();
Modules.get("tips").three();