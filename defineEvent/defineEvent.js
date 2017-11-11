/**
 * Created by Thinkpad on 2017/9/21.
 */

// 方法一：判断绑定（每次调用都需要进行浏览器检测）
function addHandler(target, type, handler) {
    //浏览器检测
    if (target.addEventListener) {//支持DOM2
        addHandler = function (target, type, handler) {
            target.addEventListener(type, handler);
        }
    } else {//IE8及更低版本
        addHandler = function (target, type, handler) {
            target.attachEvent("on" + type, handler);
        }
    }
    addHandler(target, type, handler);
}

function removeHandler(target, type, handler) {
    //浏览器检测
    if (target.removeEventListener) {//支持DOM2
        removeHandler = function (target, type, handler) {
            target.removeHandler = function () {
                target.removeEventListener(type, handler)
            }
        }
    } else {//IE8及更低版本
        removeHandler = function () {
            target.detachEvent("on" + type, handler);
        }
    }
    removeHandler(target, type, handler)
}

// 方法二：单例模式（仅需在脚本加载时执行一次）
var addHandler = document.body.addEventListener ?
    function (target, type, handler) { //DOM2
        target.addEventListener(type, handler);
    } :
    function (target, type, handler) { //<IE9
        target.attachEvent("on" + type, handler);
    };
var removeHandler = document.body.removeEventListener ?
    function (target, type, handler) { //DOM2
        target.removeEventListener(type, handler);
    } :
    function (target, type, handler) { //<IE9
        target.detachEvent("on" + type, handler);
    };