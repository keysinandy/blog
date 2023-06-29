---
title: 常见排序实现(一)
cover: https://pic2.imgdb.cn/item/6458d5ed0d2dde5777d37bb4.jpg
icon: page
order: 3
author: 积木
date: 2023-05-08
tag:
  - 算法
sticky: true
---

这是常见排序的实现第一篇，我们将实现`插入排序`、`选择排序`、`冒泡排序`

### 插入排序

插入排序的原理是构建一个有序序列，从无序序列中拿出一个与有序数列从后向前比较，找到相应的位置插入，在从后往前扫描的过程中，会将已排序好的元素逐步的向后移位，这样就能做到`O(1)`的空间复杂度，对于未排序的每一项，都要与有序数列进行比较，时间复杂度是`O(n^2)`

#### 复杂度

空间复杂度: `O(1)`

时间复杂度：平均`O(n^2)` 最好`O(n)` 最坏`O(n^2)`

#### 代码实现

```javascript
const insertionSort = (list) => {
  for (let i = 1; i < list.length; i++) {
    let key = list[i];
    let j = i - 1;
    while (j >= 0 && key < list[j]) {
      list[j + 1] = list[j];
      list[j] = key;
      j--;
    }
  }
  return list;
};
```

### 冒泡排序

冒泡排序从头部取出一个数，每次比较相邻两个数的大小，如果顺序错误就互换两者的位置，并且继续这个步骤，这样，较大的数就会冒泡到队列的末尾

#### 复杂度

空间复杂度: `O(1)`

时间复杂度：平均`O(n^2)` 最好`O(n)` 最坏`O(n^2)`

#### 代码实现

```javascript
// 我们在这里定义一个用于交换数组元素的函数
const swap = (list, prevIndex, nextIndex) => {
  [list[prevIndex], list[nextIndex]] = [list[nextIndex], list[prevIndex]];
};
const bobbleSort = (list) => {
  for (let i = list.length - 1; i >= 0; i--) {
    const lastIndex = i;
    let j = 0;
    while (j < lastIndex) {
      if (list[j] > list[j + 1]) {
        swap(list, j, j + 1);
      }
      j++;
    }
  }
  return list;
};
```

#### 优化思路

##### 外层循环优化

假如在某一次冒泡的过程中，没有完成一次交换，那么这个序列其实已经是有序的，我们就没必要对它进行下一次的冒泡了。

我们可以在外层循环定义一个 flag，当出现交换时设置为 1，并且在出外层循环时判断 flag，来决定要不要继续冒泡

```javascript
const bobbleSort = (list) => {
  for (let i = list.length - 1; i >= 0; i--) {
    const lastIndex = i;
    let j = 0;
    let flag = 0;
    while (j < lastIndex) {
      if (list[j] > list[j + 1]) {
        swap(list, j, j + 1);
        flag = 1;
      }
      j++;
    }
    if (flag === 0) break;
  }
  return list;
};
```

##### 内层循环优化

假如当某一次冒泡到了 x 位置时，之后再也没有进行过交换，那么就意味着，从 x 位置到列表的最末尾，这部分的排序是有序的，也就意味着，下一次的冒泡可以到 x 位置就结束了。

我们可以定义一个 position 变量，每次进行交换时记录位置，当进行下一次冒泡时，就用 position 作为冒泡的终点。

```javascript
const bobbleSort = (list) => {
  let position = list.length - 1;

  for (let i = list.length - 1; i >= 0; i--) {
    let j = 0;
    let flag = 0;
    const lastIndex = position;
    while (j < lastIndex) {
      if (list[j] > list[j + 1]) {
        swap(list, j, j + 1);
        flag = 1;
        position = j;
      }
      j++;
    }
    if (flag === 0) break;
  }
  return list;
};
```

### 选择排序

选择排序的过程是在未排序的队列中找出一个最小的数，放到已排序队列中的最后面

#### 复杂度

空间复杂度: `O(1)`

时间复杂度：平均`O(n^2)` 最好`O(n^2)` 最坏`O(n^2)`

#### 代码实现

```javascript
const selectionSort = (list) => {
  for (let i = 0; i < list.length; i++) {
    let min = list[i];
    let minIndex = i;
    for (let j = i; j < list.length; j++) {
      if (list[j] < min) {
        min = list[j];
        minIndex = j;
      }
    }
    swap(list, i, minIndex);
  }
  return list;
};
```
