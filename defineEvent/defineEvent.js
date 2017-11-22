/**
 * Created by Thinkpad on 2017/9/21.
 * 事件监听：
 *          可以绑定多个事件，顺序执行
 *          更方便的移除事件
 *          老版IE的事件监听函数中，this指向window
 * 事件冒泡和事件捕获：
 *         控制事件触发流程，首先从父到子（事件捕获），找到触发事件的最精确的元素（事件目标target），然后从子到父触发事件（事件冒泡）
 *         一般采用事件冒泡模型，阻止事件冒泡用event.stopPropagation(),IE用event.cancelBubble = true
 * 事件委托：
 *         event.target.nodeName.toLowerCase()  // 标准
 *         event.srcElement.nodeName.toLowerCase()  // IE
 */

// 方法一：判断绑定（每次调用都需要进行功能检测）
function addHandler(target, type, handler) {
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