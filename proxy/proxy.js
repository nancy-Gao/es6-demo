// case1.proxy得使用
const obj = new Proxy({}, {
    get: (target, propKey, receiver)=> {
        console.log(target, propKey, receiver, 'getting')
        return Reflect.get(target, propKey, receiver);
    },
    set: (target, propKey, value, receiver)=> {
        console.log(target, propKey, receiver, 'setting', value)
        return Reflect.set(target, propKey, value, receiver);
    }
})
obj.count = 1;
console.log(obj.count)
// case2.对象复值，依旧可以获得proxy
const copy = Object.assign({}, obj);
copy.count = 2; // setting
console.log(copy.count); // getting 2
console.log(obj.count); // getting 1
// case3.对象创建，Proxy 实例也可以作为其他对象的原型对象
var proxy = new Proxy({}, {
    get: function (target, propKey, receiver) {
        return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
        return Reflect.set(target, propKey, value, receiver);
    }
});
const a = Object.create(proxy);
a.count = 1;
console.log(a.count); // getting 1
// proxy对象是a对象的原型，obj对象没有count, 根据原型链往下看，原型proxy读取，导致被拦截有count 则返回1

// case 4.拦截器函数

var handler = {
    get: (target, propKey)=> {
        // 获取函数属性
        if(name === 'prototype') {
            return Object.prototype;
        }
        return 'hello, ' + name;
    },
    apply: (target, thisbinding, args) => {
        // 函数执行
      return args[0]
    },
    construct: (target, args)=> {
        return {value: args[1]}
    }
}
var fproxy = new Proxy(function(x,y) {
    return x+y;
}, handler);
fproxy(1,2); // 1
new fproxy(1, 2); // {value: 2}
console.log(fproxy.prototype === Object.prototype) // true

// case5.实现属性的链式操作。
