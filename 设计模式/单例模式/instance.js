/*  单例模式的核心：保证一个类仅有一个实例，并提供一个访问它的全局访问点
*   实现：Java的对象只能通过类构造；JavaScript创建对象非常简单，所以无需创建一个类
*   以登录框为例：假设有一个ID为login的按钮，点击时弹出登录框
*/

// 1、原始写法：用户不一定点击登录按钮，浪费DOM操作
var loginLayer = (function () {
    var div = document.createElement('div');
    div.innerHTML = '登录框';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
})();

document.getElementById('login').onclick = function () {
    loginLayer.style.display = 'block';
}

// 2、非单例惰性：在用户点击登录按钮时才开始创建登录框；每次点击登录按钮都会创建登录框
var createLoginLayer = function () {
    var div = document.createElement('div');
    div.innerHTML = '登录框';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
};

document.getElementById('login').onclick = function () {
    var loginLayer = createLoginLayer();
    loginLayer.style.display = 'block';
}

// 3、惰性单例：用一个变量判断是否已经创建过登录框;最多创建一次登录框
var createLoginLayer = (function () {
    var div;
    return function () {
        if (!div) {
            div = document.createElement('div');
            div.innerHTML = '登录框';
            div.style.display = 'none';
            document.body.appendChild(div);
            return div;
        }
        return div;
    }
})();

document.getElementById('login').onclick = function () {
    var loginLayer = createLoginLayer();
    loginLayer.style.display = 'block';
}

// 4、通用单例
var getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments));
    }
}

getSingle(function () {
    var div = document.createElement('div');
    div.innerHTML = '登录框';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
});