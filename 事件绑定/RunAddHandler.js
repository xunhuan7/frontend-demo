/**
 * Created by Thinkpad on 2017/9/21.
 * 调用时检测
 */

//事件绑定
function addHandler(target, event_type, handler, bool) {

    //浏览器检测
    if (target.addEventListener) {//支持DOM2
        addHandler = function (target, event_type, handler, bool) {
            if (bool === undefined) {
                bool = false;
            }
            target.addEventListener(event_type, handler, bool);
        }
    } else {//IE8及更低版本
        addHandler = function (target, event_type, handler, bool) {
            target.attachEvent("on" + event_type, handler);
        }
    }

    addHandler(target, event_type, handler, bool);
}

//事件移除
function removeHandler(target, event_type, handler, bool) {

    //浏览器检测
    if (target.removeEventListener) {//支持DOM2
        removeHandler = function (target, event_type, handler, bool) {
            if (bool === undefined) {
                bool = false;
            }
            target.removeHandler = function () {
                target.removeEventListener(event_type, handler, bool)
            }
        }
    } else {//IE8及更低版本
        removeHandler = function () {
            target.detachEvent("on" + event_type, handler);
        }
    }

    removeHandler(target, event_type, handler, bool)
}