/**
 * Created by Thinkpad on 2017/9/21.
 * 提前判断
 */

//绑定事件
var addHandler = document.body.addEventListener ?
    function (target, eventType, handler, bool) { //DOM2
        if (bool === undefined) {
            bool = false;
        }
        target.addEventListener(eventType, handler, bool);
    } :
    function (target, eventType, handler) { //<IE9
        target.attachEvent("on" + eventType, handler);
    };

//移除事件
var removeHandler = document.body.removeEventListener ?
    function (target, eventType, handler, bool) { //DOM2
        if (bool === undefined) {
            bool = false;
        }
        target.removeEventListener(eventType, handler, bool);
    } :
    function (target, eventType, handler) { //<IE9
        target.detachEvent("on" + eventType, handler);
    };