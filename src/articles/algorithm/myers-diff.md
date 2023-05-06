---
# 这是文章的标题
title: Myer's Diff算法解析
# You can customize cover image
cover: https://pic2.imgdb.cn/item/64491af50d2dde5777207205.jpg
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: 积木
# 设置写作时间
date: 2023-04-25
# 一个页面可以有多个标签
tag:
  - 算法
# 此页面会在文章列表置顶
sticky: true

---


### Git Diff 算法解析

### 背景

在日常编码时，大家都会使用版本控制系统，比如说`Git`。我们在提交代码的时候会看这次提交的修改内容，在合并代码时会看两个分支的不同。这种两份代码进行对比的情况我们称之为`diff`。`diff`是`Git`版本控制的核心。

`diff`的目的是比较两份代码的不同，这里的不同可以分为增与删。举个例子，在我们查看一个`commit`的时候，我们会关注一个代码块的删除、一个表达式的删除、一个函数的新增，而不太会关注那些没有改变的代码。因此，`diff`最重要的是展示删除、增加的部分。

### diff的几个要素

#### 我们的关心点

```javascript
const str1 = 'ABC'
const str2 = 'BCD'
```

假设我们通过一系列的编辑使`str1`转化为`str2`。

```diff
- A
- B
- C
+ B
+ C
+ D
```

上面的`diff`很暴力，直接将旧的字符串全部删除，同时添加了所有的新字符串。然而这个方法是不恰当的，因为我们关心的是哪些被删除了，哪些被修改了，哪些是增加的。我们其实不怎么关心那些不变的代码。下面则展现了一个良好的`diff`



```diff
- A
  B
  C
+ D
```



#### 最少的步数

看一个例子

```javascript
const str1 = 'ABCDA'
const str2 = 'CBACD'
```

对于这两个字符串，我们可以简单的做个`diff`

```diff
- A
+ C
  B
- C
- D
  A
+ C
+ D
```

但是我们观察了一会之后，可以发现修改次数更少的`diff`，例如：

```diff
- A
+ C
  B
+ A
  C
  D
- A
```

```diff
+ C
+ B
  A
- B
  C
  D
- A
```

相比于之前的那种，这两个`diff`用了更少的步骤，我们肯定是趋向于更少的`diff`步骤的。我们需要用最少的步骤来达到`diff`的目的。

但是这又产生了一个问题，比如上面两个`diff`，都用了最少的步骤，然而我们只会选择其中一种。

#### 优先删除，其次增加

看一个极端点的例子，有个例子能有助于我们理解为什么要优先删除

```javascript
const str1 = 'ABC'
const str2 = 'DEF'
```

下面有三种`diff`方案



```diff
- A
+ D
- B
+ E
- C
+ F
```



```diff
+ D
+ E
+ F
- A
- B
- C
```



```diff
- A
- B
- C
+ D
+ E
+ F
```

这三种`diff`都是可行的，但是如果让我们选择一种显示给我们看，我们肯定选择第三种

- 第一种的缺点是缺乏**连贯性**，本应该连续删除的和连续增加的没有在一起显示让人看的不明所以，看的非常累

- 第二种的缺点是顺序颠倒了，我们的阅读意识是从上往下看，从阅读顺序来看，上面的是“过去的”，下面的是“现在的”，与之对应的是`diff`就是上面的是“过去删除的"，下面的是”现在增加的”，像第三种一样，这样就不会产生一种违和感

#### 尽量保持不变

我们经常会遇到这种情况，我们会在一个代码片段中插入一段代码。这段代码的结构会和上下相似，看下面这个例子

```diff
function foo(bar) {
  switch (bar) {
    case 1:
      break;
    default:
      break;
  }
}
```

这么看比较直观，看下面这个函数，如果我们需要增加一种`case 2`的情况，下面两种情况选择一种，会怎么选

```diff
function foo(bar) {
  switch (bar) {
    case 1:
+     break;
+   case 2:
      break;
    default:
      break;
  }
}
```

```diff
function foo(bar) {
  switch (bar) {
    case 1:
     break;
+   case 2:
+    break;
    default:
      break;
  }
}
```

我们肯定会选择第二种`diff`方式，因为他能更加直观的表现出新增`case 2`的情况，如果我们把这一次`diff`分为3部分，一部分是前面的**不变**部分，**中间**的增加部分，**后面**的不变部分，在`diff`时，我们更倾向于保持这些不变的部分。

**Eugene W. Myers**的算法就是一种能达到上面这些目的的算法，他可以用来找出**最短编辑路径**，这是算法的[论文地址](http://www.xmailserver.org/diff2.pdf)。

### 图

接下来就是介绍这个算法，`Myers`将这种寻找最短编辑路径的方法用图来解决，我们可以建一张图来表示`diff`的过程

接下来用两个字符串做例子

```javascript
const str1 = 'ABCABBA'
const str2 = 'CBABAC'
```

这两个字符串转化成为图是这样的

![将字符串的diff转化为图](https://pic2.imgdb.cn/item/6449207f0d2dde57772b7722.png)



#### 一“步”

我们用**x轴**来代表旧的字符串，用**y轴**来代表新的字符串，原点的坐标值是**（0，0）**，当我们向左移动一步时，坐标变为**(1,0)**，这代表着旧字符串**str1的字符A被删除了**，当我们从原点向下移动，从坐标**（0，0）**变为**（1，0）**，这代表着**增加了新字符串的C**。这种坐标的改变我们称为移动，一次移动之能向右一步或者向下一步，从图中我们可以看到，从原点到终点右下角最多的步数就是字符串`str1`的长度加上字符串`str2`的长度。



#### 走斜线

除了向右移动或者向下移动，我们还可以选择向斜右下方移动，当起点与终点对应经过的x与y相等时，就可以进行一次斜线的移动，这样的移动不是一步，而是被包含在一步之内，走斜线就代表着那些不用做修改的内容，所以说，对于修改步数来说，走斜线是没有**代价**的。这也意味着我们能走斜线就走斜线，能走多远就走多远。

![走斜线](https://pic2.imgdb.cn/item/644926a20d2dde577736c282.png)



#### 遍历

接来下，我们肉身对这个图进行一次广度优先遍历，先从**0,0**开始，有两种选择**1,0**或者**0,1**,接来下分别对**1,0**、**0,1**进行遍历

![step1](https://pic2.imgdb.cn/item/644a5aac0d2dde5777c7316e.png)

![step2](https://pic2.imgdb.cn/item/644a5ac30d2dde5777c74ca8.png)

![step3](https://pic2.imgdb.cn/item/644a5ac80d2dde5777c753aa.png)

![step4](https://pic2.imgdb.cn/item/644a5ac80d2dde5777c753d5.png)

![step5](https://pic2.imgdb.cn/item/644a5ac80d2dde5777c753f6.png)


把上面的过程做成一张坐标图可以得到
![坐标图](https://pic2.imgdb.cn/item/644a5e4d0d2dde5777ccc570.png)

把上面的图逆时间转45度
![坐标图](https://pic2.imgdb.cn/item/644a5e000d2dde5777cc49b0.png)



#### 明确几个概念

我们把每一步称之为`d`，一步可以是向x轴右方或者y轴下方移动一个坐标并且如果可以进行斜线移动的话再进行斜线移动。

我们再设立一个`k`，`k = x - y`， 如果把`d`理解为`diff`的深度，`k`可以理解为向`x`方向或者`y`方向偏移的深度

![K线图](https://pic2.imgdb.cn/item/644a5c0c0d2dde5777c8d2f0.png)

那么这个`k`值有什么用呢，`k`其实是与`d`相对应的，上面提到了一次`d`是向右或者向下移动一步，那么在`d`步时，`k`值的区间在`-k ~ k`之间（走斜线并不会改变`k`值）。同时对于奇数的`d`，`k`值必定是奇数，对于偶数的`d`，`k`值必定是偶数。

将之前的过程加上`d`和`k`就是这样的

![组合图](https://pic2.imgdb.cn/item/644a5ee00d2dde5777ce415a.png)

### 算法

现在我们通过代码来实现`diff`过程，算法的过程大致是这样的，我们通过从`0,0`点出发遍历,每一次遍历就是一'步'。从上一个点来得到下一个点的坐标，假如这个坐标是终点，那么停止遍历。



我们将`str1`、`str2`转化为两个字符串数组`from`、`to`，`from`代表修改之前的代码、`to`代表修改之后的代码，数组的每一项相当于代码的每一行。

并且我们通过求得`from`的长度`n`，`to`的长度`m`，来计算出最多需要走`d = n + m`步。

```typescript
const diff = (from: string[], to:string[]) => {
    const n = from.length
  	const m = to.length
    for (let d = 0; d < n + m; d++) {
      // ...
    }
}
```



之前我们得出一个结论：对于第`d`步，`k`总是分布在`-d ~ +d`之间，并且`k`的奇偶性与`d`相同，此时我们可以较为精确的得出在第`d`步时，`k`的分布。

```typescript
const diff = (from: string[], to:string[]) => {
    const n = from.length
  	const m = to.length
    for (let d = 0; d < n + m; d++) {
      for (let k = -d; k <= d; k += 2) {
        // k将被限制在这里
      }
    }
}
```





我们需要通过上一步的坐标来得出这一步的坐标，因此我们需要一个`map`来保存上一步的坐标。我们通过设置`v[k] = x`来保存坐标，因为`k`的定义是`x-y`，我们通过保存`k`值与`x`值也就变相保存了`x,y`坐标。同时我们还需保存每一步的所有坐标`vs[d] = v`。

```typescript
interface V {
  [k:number]: number
}
interface Vs {
  [d: number]: V
}

const diff = (from: string[], to:string[]) => {
    const n = from.length
  	const m = to.length
    const v: V  = {}
    // v[k] = x
    // x - y = k
    // 这个是初始值，因为我们从0,0开始，0,0这个坐标也需要从上一个坐标推导出来，因此我们设置了一个虚拟坐标（0，-1）
    v[1] = 0
    const vs: Vs = {
      0: v
    }
    for (let d = 0; d < n + m; d++) {
      for (let k = -d; k <= d; k += 2) {
        // k将被限制在这里
      }
    }
}
```



那么如何从这一步的起始坐标推导至当前坐标呢，对于当前坐标而言，我们已经知道了当前的`k`值与起始的坐标，上面我们已经讲过，每一步的都会使`k`值`+1`或者`-1`。也就是说，当前`k`值的坐标可能会对应两个个起始的坐标，我们需要得出一个最优解。我们之前说过`diff`的策略有一点：优先删除，其次增加。也就是说优先选择两个起始坐标`x`值较大的那个。

我们可以通过上面的思路，先求出起始坐标的`kPrev`，再通过`vs`取得起始坐标

```typescript
const isDown = k == -d || (k != d && v[k - 1] < v[k + 1])
const kPrev = isDown ? k + 1 : k - 1
```

上面这个是状态转移的核心，我们逐步分析，首先我们先判断是否向下走，假如向下走，那么`kPrev`就是当前`k+1`，否则就是`k-1`，那么如何判断是否向下走呢。

![](https://pic2.imgdb.cn/item/644a5f020d2dde5777cea850.png)

我们拿这个举例子，假设`d = 1`,那么当前的`k = -1 || k = 1`，如果`k = -1`，显而易见的，k不可能从-2变成-1，也就是说当`k = -d`时，只可能是由起始坐标向y轴走一步，同理`k = d`时，只可能是起始坐标向x轴方向走一步。那么当`k !== d || k !== -d`时，由前一轮的坐标而定。

例如当`d = 2, k = 0`时，我们获取`d = 1, k = -1,k = 1`的x坐标，发现`k = 1`的x坐标大于`k = -1`时的x坐标，根据优先删除原则，我们选择`k = 1`的坐标作为起始坐标。

然而当`d = 3, k = -1时`，我们获取` d = 2, k = 0, k = 1`的坐标，我们发现`k = 0`的x坐标等于`k = 1`时的x坐标，这是为什么。一般来说k值越小，代表在y轴上偏移的越远，于此同时在x轴上就走的相对近，然而他们的x坐标却想等，只有一种可能，那就是`k = 0`，时，那一步额外走了`斜线`，走斜线的时候k值保持不变，但会在x轴与y轴更接近最终的坐标，所以我们选择`k = 0`，向上走。

![](https://pic2.imgdb.cn/item/644a5f180d2dde5777cedd02.png)



这个时候，我们的代码就变成了这样。

```typescript
interface V {
  [k:number]: number
}
interface Vs {
  [d: number]: V
}

const diff = (from: string[], to:string[]) => {
    const n = from.length
  	const m = to.length
    const v: V  = {}
    // v[k] = x

    v[1] = 0
    const vs: Vs = {
      0: v
    }
    for (let d = 0; d < n + m; d++) {
      for (let k = -d; k <= d; k += 2) {
        const isDown = k == -d || (k != d && v[k - 1] < v[k + 1])
				const kPrev = isDown ? k + 1 : k - 1
        const xStart = v[kPrev]
      	const yStart = xStart - kPrev
        
        const xEnd = isDown ? xStart : xStart + 1
      	const yEnd = isDown ? yStart + 1 : yStart
      }
    }
}
```

那么这一步走完了吗？当然没有，因为我们可以走斜线。假使当前坐标的`x + 1`对应的值等于`y + 1`对应的值，我们就可以走斜线。

```typescript
for (let k = -d; k <= d; k += 2) {
  const isDown = k == -d || (k != d && v[k - 1] < v[k + 1])
  const kPrev = isDown ? k + 1 : k - 1
 	const xStart = v[kPrev]
  const yStart = xStart - kPrev

  const xMid = isDown ? xStart : xStart + 1
  const yMid = isDown ? yStart + 1 : yStart

  let xEnd = xMid
  let yEnd = yMid
  // move diagonally
  while (xEnd < n && yEnd < m && from[xEnd] === to[yEnd]) {
    xEnd++
    yEnd++
  }
  v[k] = xEnd
  tmpV[k] = xEnd
  // reach to end
  if (xEnd >= n && yEnd >= m) {
    // back to start point
    vs[d] = tmpV
    const snakes = recall(vs, n, m, d);
  }
}
```



这样，没走完一轮，我们就将当前`d`可以到达的所有坐标保存到`Vs`中，以供下一次使用，而如果当前的`xEnd >= n && yEnd >= m)`，那么就意味着到达了终点，结束了循环。这样，我们就取得了到达终点所需要最少的步数`d`以及到达终点所需的所有坐标`Vs`，我们就可以通过这些信息回溯到原点，收集所有的坐标，最后形成一个坐标的集合`snake`

```typescript
// 从终点到起点，记录每一个节点
const recall = (vs: Vs, n: number, m: number, d: number) => {
  const snakes = []
  const point = { x: n, y: m}
  for (let i = d; i > 0; i--) {
    const vPrev = vs[i-1]
    const k = point.x - point.y
    const isDown = k == -i || (k != i && vPrev[k - 1] < vPrev[k + 1])
    const kPrev = isDown ? k + 1 : k - 1

    const xEnd = point.x
    const yEnd = point.y

    const xStart = vPrev[kPrev]
    const yStart = xStart - kPrev

    snakes.unshift({
      xStart,
      yStart,
      isDown,
      xEnd,
      yEnd,
    })

    point.x = xStart
    point.y = yStart
  }
  return snakes
}
```

