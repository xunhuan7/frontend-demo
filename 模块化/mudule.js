var myModules = (function () {
    var modules = {};

    function define(name, deps, method) {
        for (var i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = method.apply(method, deps);
    }

    function get (name) {
        return modules[name];
    }

    return {
        define: define,
        get: get
    }
})();

myModules.define('alert', [], function () {
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
myModules.define('tips', [], function () {
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