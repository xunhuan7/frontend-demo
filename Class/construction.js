/*  使用Object构造函数或对象字面量都可以创建单个对象
*   缺点：使用同一个接口创建很多对象，会产生大量重复代码
*   改进：工场模式；构造函数模式；原型模式；动态原型模式
* */

/*
1、工场模式
优点：抽象了创建具体对象的过程
缺点：无法识别对象，即无法判断对象属于哪个类
*/
function createPerson(name, sex, age) {
    var o = new Object();
    o.name = name;
    o.sex = sex;
    o.age = age;
    o.think = function () {
        console.log('I think, therefore I am.');
    };
    return o;
}

var jason = createPerson('Jason', 'male', 21);
var alice = createPerson('Alice', 'female', 20);

/*
2、构造函数模式：创建一个新对象=》this指向新对象=》执行代码以添加属性和方法；返回新对象（）
优点：可识别对象（jason.constructor === Person && jason instanceof Person）
缺点：不同实例的通用方法是不相等的，即每一个实例会创建一个新的方法，这完全没有必要（可将方法写在构造函数函数外部，但这又缺乏封装性）
*/
function Person(name, sex, age) {
    this.name = name;
    this.sex = sex;
    this.age = age;
    this.think = function () {
        console.log('I think, therefore I am.');
    }
}

var jason = new Person('Jason', 'male', 21);
var alice = new Person('Alice', 'female', 20);
console.log(jason.constructor === Person && jason instanceof Person)    // true
console.log(jason.think === alice.think);   //false

/*
3、原型模式：使用原型保存通用属性，配合搞糟形式使用
优点：对象可共享方法或属性
*/
function Person(name, sex, age) {
    this.name = name;
    this.sex = sex;
    this.age = age;
}

Person.prototype.think = function () {
    console.log('I think, therefore I am.');
}

var jason = new Person('Jason', 'male', 21);
var alice = new Person('Alice', 'female', 20);
console.log(jason.think === alice.think);   //true

/*
4、动态原型模式：具有更好的封装性
*/
function Person(name, sex, age) {
    this.name = name;
    this.sex = sex;
    this.age = age;
    if (typeof this.think != "function") { // 创建第一个实例后，think被添加到原型中，后续实例无需创建
        Person.prototype.think = function () {
            console.log('I think, therefore I am.');
        }
    }
}