/*
原型链继承：用父类实例作为子类原型对象（ES5使用Object.create()规范了原型继承）
优点：易于实现
缺点：创建子类实例时，无法向父类构造函数传参；实例共享原型中的引用属性
*/
function Biology() {
    this.species = "生物";
    this.area = ['China'];
}

Biology.prototype.say = function () {
    console.log("I am biology!");
};

function Cat(name, color) {
    this.name = name;
    this.color = color;
}

Cat.prototype = new Biology();  // 继承:{species:"生物", area:指针, __proto__:Biology.prototype, constructor:Biology}

var cat1 = new Cat("小猫", "黄色"),
    cat2 = new Cat("大猫", "花色");
cat1.area.push("Japan");
console.log(cat2.area);  //['China','Japan']

/*
构造函数继承：借用父类构造函数来增强子类实例
优点：实例不再共享原型中的引用属性；创建子类实例时，可向父类传参
缺点：只能继承父类实例属性和方法，无法继承原型中的方法，即无法复用
*/
function Biology(species) {
    this.species = species;
    this.area = ['China'];
}

Biology.prototype.say = function () {
    console.log("I am biology!");
};

function Cat(species, name, color) {
    Biology.apply(this, arguments);   // 继承（可传参）
    this.name = name;
    this.color = color;
}

var cat1 = new Cat("猫", "大猫", "黄色"),
    cat2 = new Cat("猫", "小猫", "花色");
cat1.area = []
console.log(cat2.area);    // 缺乏复用；属性不共享

/*
组合继承(最常用)：把通用函数放在原型上，以实现复用
优点：实例不再共享原型中的引用属性；可传参；可复用
缺点：调用了2次构造函数
*/
function Biology(species) {
    this.species = species;
    this.area = ['China'];
}

Biology.prototype.say = function () {
    console.log("I am biology!");
};

function Cat(species, name, color) {
    Biology.apply(this, arguments); // 属性继承
    this.name = name;
    this.color = color;
}

Cat.prototype = new Biology();  // 原型继承

var cat = new Cat("猫", "小猫", "黄色");
