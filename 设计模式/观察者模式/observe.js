function Observer() {
    // 存储订阅者
    this.fns = [];
}

Observer.prototype = {

    // 订阅：添加订阅者
    subscribe: function (fn) {
        this.fns.push(fn);
    },

    // 退订：删除订阅者
    unsubscribe: function (fn) {
        this.fns = this.fns.filter(function (item) {
            if (fn !== item) {
                return item;
            }
        });
    },

    // 发布：通知订阅者
    publish: function (info) {
        this.fns.forEach(function (item) {
                item.call(this, info);
            }
        );
    }
};

// 测试
var sale = new Observer();

// 2个订阅者
var Bob = function (info) {
    console.log(info + '？我是Bob，我收到了消息');
};
var Jason = function (info) {
    console.log(info + '？我是Jason，我收到了消息');
};

// 订阅
sale.subscribe(Bob);
sale.subscribe(Jason);

// 退订
sale.unsubscribe(Bob)

// 发布
sale.publish('新货已上架');
