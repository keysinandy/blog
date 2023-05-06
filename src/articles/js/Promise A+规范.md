---
# 这是文章的标题
title: 根据PromiseA+规范手写Promise
# You can customize cover image
cover: https://pic2.imgdb.cn/item/644a7fe50d2dde57770132dc.jpg
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 2
# 设置作者
author: 积木
# 设置写作时间
date: 2023-05-06
# 一个页面可以有多个标签
tag:
  - JS基础
# 此页面会在文章列表置顶
sticky: true

---

我们通常这么使用Promise

```javascript
new Promise((resolve, reject) => {
  // 模拟异步
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
```

<a name="GX24e"></a>

#### 1.executor

首先，Promise是个构造函数，这个构造函数接受一个`executor`函数作为参数，这个**executor**函数接受两个方法：`resolve`和`reject`。因此可以先搭个结构

```typescript
type ResolveHandler = (result: unknown) => void;
type RejectHandler = (reason: unknown) => void;
type Executor = (resolve: ResolveHandler, reject: RejectHandler) => void;

class MyPromise {
  private _resolve = () => {

  }

  private _reject = () => {
    
  }

  constructor(executor: Executor ) {
    executor(this._resolve, this._reject)
  }

}
```

<a name="zJP9r"></a>

#### 2.状态

promise总是处于以下三种状态下: `pending`（等待中），`fulfilled`（已完成），`rejected`（已拒绝）<br />pengind状态下，promise可以向fulfilled和rejected状态变化<br />fulfilled状态下，则必须有一个value(结果)，并且状态不会变化<br />fulfilled状态下，则必须有一个reason(据因)，并且状态不会变化

resolve和reject只有在状态为pending的情况下才能改变Promise的状态，并且执行.then注册的回调函数，因此，代码可以拓展为

```typescript
type ResolveHandler = (result: unknown) => void;
type RejectHandler = (reason: unknown) => void;
type Executor = (resolve: ResolveHandler, reject: RejectHandler) => void;


enum PromiseState {
  PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED",
}

class MyPromise {
  private _state = PromiseState.PENDING
  
  private _resolve: ResolveHandler = () => {
    if (this._state === PromiseState.PENDING) {
      this._state = PromiseState.FULFILLED
      // TODO: other code...
    }
  }

  private _reject: RejectHandler = () => {
    if (this._state === PromiseState.PENDING) {
      this._state = PromiseState.REJECTED
      // TODO: other code...
    }
  }


  constructor(executor: Executor) {
    executor(this._resolve, this._reject)
  }

}
```

<a name="Mu6Z7"></a>

#### 3.then

promise代表异步操作的最终结果，得到一个promise最简单的方法是调用`then`方法，then方法注册接受`value`的在fulfilled状态下的回调函数和`reason`的在rejected状态下的回调函数。

```typescript
type OnFulfilledHandler = (result: unknown) => void;
type OnRejectedHandler = (reason: unknown) => void;


class MyPromise {
	// ...

  then(onFulFilled: OnFulfilledHandler, onRejected: OnRejectedHandler) {

  }
}

```

<a name="smpbi"></a>

#### 4.resolve and reject

调用.then时，假如状态为pending，那么需要等待状态改变才能调用注册的回调函数，这个时候，就需要维护两个队列，存放对应的回调函数。

假如调用.then时，状态已经改变为fulfilled或者是rejected，那么直接运行回调函数就行了

接下来稍微完善下.then与resolve、reject

```typescript
type ResolveHandler = (result: unknown) => void;
type RejectHandler = (reason: unknown) => void;
type OnFulfilledHandler = (result: unknown) => void;
type OnRejectedHandler = (reason: unknown) => void;

type Executor = (resolve: ResolveHandler, reject: RejectHandler) => void;

enum PromiseState {
  PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED",
}
class MyPromise {
  private _state = PromiseState.PENDING;
  private _value: unknown = null;
  private _reason: unknown = null;
  private _onFulfilledQueue: CallableFunction[] = [];
  private _onRejectedQueue: CallableFunction[] = [];

  // _resolve方法用于将state变为fulfilled
  private _resolve: ResolveHandler = (val) => {
    if (this._state === PromiseState.PENDING) {
      this._state = PromiseState.FULFILLED;
      this._value = val;
      while (this._onFulfilledQueue.length) {
        const cb = this._onFulfilledQueue.shift();
        typeof cb === "function" && cb(this._value);
      }
    }
  };
  // _reject方法用于将state变为reject
  private _reject: RejectHandler = (reason) => {
    if (this._state === PromiseState.PENDING) {
      this._state = PromiseState.REJECTED;
      this._reason = reason;
      while (this._onRejectedQueue.length) {
        const cb = this._onRejectedQueue.shift();
        typeof cb === "function" && cb(this._reason);
      }
    }
  };

  constructor(executor: Executor) {
    executor(this._resolve, this._reject)
  }

  then(onFulFilled: OnFulfilledHandler, onRejected: OnRejectedHandler) {
    switch (this._state) {
      case PromiseState.FULFILLED:
        onFulFilled(this._value)
        break;
      case PromiseState.REJECTED:
        onRejected(this._reason)
        break;
      default:
        // 状态未修改，放入到对应的队列中
        this._fulfilledQueue.push(onFulFilled)
        this._rejectedQueue.push(onRejected)
        break;
    }
  }
}

export default MyPromise
```

<a name="P87Yt"></a>

#### 5.then方法参数可选

根据promiseA+规范2.2.1:<br />`onFulfilled`和`onRejected`都是可选的，当它们不是函数的时候，必须被忽略

```typescript
then(onFulFilled?: onFulFilledHandler, onRejected?: onRejectedHandler) {

  const fulfilledCallback = typeof onFulfilled === "function" ? onFulfilled : (val: unknown) => val;
  const rejectedCallback =
    typeof onRejected === "function"
      ? onRejected
      : (reason: unknown) => {
          throw reason;
        };

  switch (this._state) {
    case PromiseState.FULFILLED:
      fulfilledCallback(this._value)
      break;
    case PromiseState.REJECTED:
      rejectedCallback(this._reason)
      break;
    default:
      // 状态未修改，放入到对应的队列中
      this._fulfilledQueue.push(fulfilledCallback)
      this._rejectedQueue.push(rejectedCallback)
      break;
  }
}
```

<a name="ONfei"></a>

#### 6.onFulfilled与onRejected的异步执行

根据2.2.4，`onFulfilled`和`onRejected`的调用必须是异步的，可以用宏任务或者微任务来实现，这里我们用`queueMicrotask`这个api来实现。<br />queueMicrotask的使用方法很简单

> queueMicrotask(() => {
> // 这里的代码会放在微任务栈中
> })

```typescript
  then(onFulfilled?: OnFulfilledHandler, onRejected?: OnRejectedHandler) {
    const returnPromise = new MyPromise((resolve, reject) => {
      const fulfilledCallback =
        typeof onFulfilled === "function" ? onFulfilled : (val: unknown) => val;
      const rejectedCallback =
        typeof onRejected === "function"
          ? onRejected
          : (reason: unknown) => {
              throw reason;
            };
      const fulfilledTask = () =>
        queueMicrotask(() => {
          fulfilledCallback(this._value)
        });
      const rejectedTask = () =>
        queueMicrotask(() => {
          rejectedCallback(this._reason)
        });
      switch (this._state) {
        case PromiseState.FULFILLED:
          fulfilledTask();
          break;
        case PromiseState.REJECTED:
          rejectedTask();
          break;
        default:
          this._onFulfilledQueue.push(fulfilledTask);
          this._onRejectedQueue.push(rejectedTask);
          break;
      }
    });
    return returnPromise;
  }

```

<a name="FwUzS"></a>

#### 7.then方法返回promise

根据2.2.7，.then方法必须返回一个promise，这个是一个比较复杂的点<br />`promise2=promise1.then(onFulfilled,onRejected);`

> 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x)
> 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
> 2.2.7.3 If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
> 2.2.7.4 If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1.

如果onFulfilled或者onRejected返回了一个值，那么进入决议[[Resolve]](promise2, x)<br />如果onFulfilled或者onRejected抛出异常，那么promise2会以异常原因为据因被reject<br />如果onFulfilled不是函数，那么promise2会以promise1的value完成<br />如果onRejected不是函数，那么promise2会以promise1的reason拒绝<br />最主要的点就是构建一个新的promise并且返回它<br />我们可以这么改造：

```typescript
// code...
const resolvePromise = (x: any, resolve: resolveHandler, reject: resolveHandler) => {
   // TODO: Resolution Procedure
}
class MyPromise {
	// code...

	// code...
  then(onFulfilled?: OnFulfilledHandler, onRejected?: OnRejectedHandler) {
    const returnPromise = new MyPromise((resolve, reject) => {
      const fulfilledCallback =
        typeof onFulfilled === "function" ? onFulfilled : (val: unknown) => val;
      const rejectedCallback =
        typeof onRejected === "function"
          ? onRejected
          : (reason: unknown) => {
              throw reason;
            };
      const fulfilledTask = () =>
        queueMicrotask(() => {
          try {
            const x = fulfilledCallback(this._value);
            resolvePromise(x, returnPromise, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      const rejectedTask = () =>
        queueMicrotask(() => {
          try {
            const x = rejectedCallback(this._reason);
            resolvePromise(x, returnPromise, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      switch (this._state) {
        case PromiseState.FULFILLED:
          fulfilledTask();
          break;
        case PromiseState.REJECTED:
          rejectedTask();
          break;
        default:
          this._onFulfilledQueue.push(fulfilledTask);
          this._onRejectedQueue.push(rejectedTask);
          break;
      }
    });
    return returnPromise;
  }
}

export default MyPromise
```

<a name="hz86U"></a>

#### 8.Resolution Procedure

这个是处理promise的核心函数

```typescript
const resolvePromise = (x: any, returnPromise: MyPromise , resolve: ResolveHandler, reject: RejectHandler) => {
  // 2.3.1 If promise and x refer to the same object, reject promise with a TypeError as the reason
  // 2.3.1 防止无限递归
  if (x === returnPromise) {
    throw new TypeError("Promise has infinite loop");
  }
  // 2.3.2 If x is a promise, adopt its state
  // 假如x是promise，那么必须由x的状态来决定当前的promise状态，即必须等待x fulfilled 或者 rejected，当前promise才会 fulfilled或者rejected
  if (x instanceof MyPromise) {
    // If x is pending, promise must remain pending until x is fulfilled or rejected
    x.then(res => {
      // 2.3.2.2 If/when x is fulfilled, fulfill promise with the same value
      // 这里不能立刻resolve，因为res可能是个promise
      resolvePromise(res, returnPromise, resolve, reject)
    }, err => {
      // 2.3.2.3 If/when x is rejected, reject promise with the same reason.
      reject(err)
    })
  } else if (typeof x === 'function' || isObject(x)) {
    // 2.3.3 Otherwise, if x is an object or function
    let then
    // 这里使then = x.then 假如这里报错了，那么就用reject抛出错误
    try {
      // 2.3.3.1 Let then be x.then. 
      then = x.then
    } catch (error) {
      // 2.3.3.2 If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason
      reject(error)
    }
    // 假如 then 是函数，那么就用 x 作为它的this
    if (typeof then === 'function') {
      // 2.3.3.3 If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, where
      let called = false
      try {
        then.call(x,  (y: any) => {
          // 2.3.3.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
          // 在这里 resolvePromise 和 rejectPromise 只能有一个被调用，多次调用的话，会忽略
          if (called === false) {
            // 2.3.3.3.1 If/when resolvePromise is called with a value y, run [[Resolve]](promise, y)
            called = true
            resolvePromise(y, returnPromise, resolve, reject)
          }
        }, (e: any) => {
          if (called === false) {
            // 2.3.3.3.2 If/when rejectPromise is called with a reason r, reject promise with r
            called = true
            reject(e)
          }
        })
      } catch (error) {
        // 2.3.3.4 If calling then throws an exception e
        // 2.3.3.4.1 If resolvePromise or rejectPromise have been called, ignore it
        // 只有还未调用 resolvePromise 或 rejectPromise才会被reject
        if (called === false) {
          // 2.3.3.4.2 Otherwise, reject promise with e as the reason
          reject(error)
        }
      }
    } else {
      // 2.3.3.4 If then is not a function, fulfill promise with x
      resolve(x)
    }
  } else {
    // 2.3.4 If x is not an object or function, fulfill promise with x
    resolve(x)
  }
}
```

9.整体代码与验证

```typescript
type ResolveHandler = (result: unknown) => void;
type RejectHandler = (reason: unknown) => void;
type OnFulfilledHandler = (result: unknown) => void;
type OnRejectedHandler = (reason: unknown) => void;

type Executor = (resolve: ResolveHandler, reject: RejectHandler) => void;

enum PromiseState {
  PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED",
}

const isObject = (val: unknown) =>
  Object.prototype.toString.call(val).slice(8, -1) === "Object";

class MyPromise {
  private _state = PromiseState.PENDING;
  private _value: unknown = null;
  private _reason: unknown = null;
  private _onFulfilledQueue: CallableFunction[] = [];
  private _onRejectedQueue: CallableFunction[] = [];
  // _resolve方法用于将state变为fulfilled
  private _resolve: ResolveHandler = (val) => {
    if (this._state === PromiseState.PENDING) {
      this._state = PromiseState.FULFILLED;
      this._value = val;
      while (this._onFulfilledQueue.length) {
        const cb = this._onFulfilledQueue.shift();
        typeof cb === "function" && cb(this._value);
      }
    }
  };
  // _reject方法用于将state变为reject
  private _reject: RejectHandler = (reason) => {
    if (this._state === PromiseState.PENDING) {
      this._state = PromiseState.REJECTED;
      this._reason = reason;
      while (this._onRejectedQueue.length) {
        const cb = this._onRejectedQueue.shift();
        typeof cb === "function" && cb(this._reason);
      }
    }
  };

  constructor(executor: Executor) {
    executor(this._resolve, this._reject);
  }

  then(onFulfilled?: OnFulfilledHandler, onRejected?: OnRejectedHandler) {
    const returnPromise = new MyPromise((resolve, reject) => {
      const fulfilledCallback =
        typeof onFulfilled === "function" ? onFulfilled : (val: unknown) => val;
      const rejectedCallback =
        typeof onRejected === "function"
          ? onRejected
          : (reason: unknown) => {
              throw reason;
            };
      const fulfilledTask = () =>
        queueMicrotask(() => {
          try {
            const x = fulfilledCallback(this._value);
            resolvePromise(x, returnPromise, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      const rejectedTask = () =>
        queueMicrotask(() => {
          try {
            const x = rejectedCallback(this._reason);
            resolvePromise(x, returnPromise, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      switch (this._state) {
        case PromiseState.FULFILLED:
          fulfilledTask();
          break;
        case PromiseState.REJECTED:
          rejectedTask();
          break;
        default:
          this._onFulfilledQueue.push(fulfilledTask);
          this._onRejectedQueue.push(rejectedTask);
          break;
      }
    });
    return returnPromise;
  }
}

const resolvePromise = (
  x: any,
  returnPromise: MyPromise,
  resolve: ResolveHandler,
  reject: RejectHandler
) => {
  if (x === returnPromise) {
    throw new TypeError("Promise has infinite loop");
  } else if (x instanceof MyPromise) {
    x.then(
      (result) => {
        resolvePromise(result, returnPromise, resolve, reject);
      },
      (reason) => {
        reject(reason);
      }
    );
  } else if (isObject(x) || typeof x === "function") {
    let then;
    try {
      then = x.then;
    } catch (error) {
      reject(error);
    }
    if (typeof then === "function") {
      let called = false;
      try {
        then.call(
          x,
          (y: unknown) => {
            if (called === false) {
              called = true;
              resolvePromise(y, returnPromise, resolve, reject);
            }
          },
          (r: unknown) => {
            if (called === false) {
              called = true;
              reject(r);
            }
          }
        );
      } catch (e) {
        if (called === false) {
          reject(e);
        }
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
};

```

安装promises-aplus-tests<br />`npm install promises-aplus-tests` || `yarn add promises-aplus-tests`<br />先运行tsc将.ts文件编译为.js文件<br />再到最后面加上

```javascript
MyPromise.deferred = function () {
var result = {};
result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
});
return result;
};
module.exports = MyPromise
```

然后运行以下脚本，通过所有的测试

```json
  "scripts": {
    "promiseTest": "promises-aplus-tests ./myPromise"
  }
```

Promise/A+规范:[https://promisesaplus.com/](https://promisesaplus.com/)