---
title: 二叉树的遍历方式
cover: https://pic.imgdb.cn/item/64a569f21ddac507ccf0a10b.jpg
icon: page
order: 4
author: 积木
date: 2023-07-05
tag:
  - 算法
sticky: true
---

说起二叉树，不得不说二叉树的遍历。

我们可以通过 dfs（深度优先遍历）与 bfs（广度优先遍历）对二叉树进行遍历。

深度优先遍历又可分为前序遍历、中序遍历、后序遍历。

树的遍历一般通过递归可以解决（可能会有调用栈溢出的情况），我们只需要在如下三个地方处理遍历逻辑即可。

假设树节点的数据结构是这样的

```typescript
interface TreeNode<T = unknown> {
  left: TreeNode | null;
  right: TreeNode | null;
  value: T;
}
```

### 深度优先遍历

#### 递归方法

```javascript
const traverse = (node) => {
  if (node === null) return;
  // 1...前序遍历
  traverse(node.left);
  // 2...中序遍历
  traverse(node.right);
  // 3...后序遍历
};
```

#### 前序遍历

```javascript
const preOrderTraversal = () => {
  const values = [];
  const traverse = (node) => {
    if (node === null) return;
    values.push(node.value);
    traverse(node.left);
    traverse(node.right);
  };
};
```

#### 中序遍历

```javascript
const inOrderTraversal = () => {
  const values = [];
  const traverse = (node) => {
    if (node === null) return;
    traverse(node.left);
    values.push(node.value);
    traverse(node.right);
  };
};
```

#### 后序遍历

```javascript
const postOrderTraversal = () => {
  const values = [];
  const traverse = (node) => {
    if (node === null) return;
    traverse(node.left);
    traverse(node.right);
    values.push(node.value);
  };
};
```

#### 迭代方法

如果树的节点比较多，使用递归可能会导致调用栈溢出，这个时候我们需要借助栈来完成遍历

##### 前序遍历

前序遍历的逻辑比较简单，我们维护一个栈，现将根节点入栈，再出栈，并且使出栈的节点的右节点与左节点依次入栈，先将右节点入栈的原因是保证左节点先于右节点出栈，然后我们循环这个过程，直至栈中无节点。

```javascript
// 前序遍历
const preOrderTraversal = (root) => {
  const values = [];
  const stack = [root];
  let node = stack.pop();
  while (node) {
    values.push(node.val);
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
    node = stack.pop();
  }
  return values;
};
```

##### 中序遍历

我们先将根节点入栈，再入栈根节点的左节点，再入栈根节点的左节点的左节点。。。直至无左节点可入栈

此时可出栈一个节点，如果该节点有右节点，入栈该右节点后，再依次对这个右节点的所有左节点进行入栈

```javascript
const inOrderTraversal = (root) => {
  const values = [];
  const stack = [];

  const pushLeftNode = (node) => {
    if (node === null) return;
    let nodeLeft = node.left;
    while (nodeLeft) {
      stack.push(nodeLeft);
      nodeLeft = nodeLeft.left;
    }
  };

  pushLeftNode(root);

  let node = stack.pop();
  while (node) {
    values.push(node.val);
    if (node.right) {
      stack.push(node.right);
      pushLeftNode(node.right);
    }
  }
  return values;
};
```

##### 后序遍历

后序遍历比较复杂，我们需要知道当前节点的左右子树均已出栈完毕。首先我们需要知道当前要出栈节点的左、右子树是否均已出栈，如果当前要出栈的节点的左右节点均已出栈，则当前节点可以出栈，否则的话要依次序将右、左节点入栈

那么如何得知当前节点的左右子树均已出栈呢，好消息是根据后序遍历的规则出栈顺序是左-右-中，假如上个出栈的节点是当前节点左节点或者右节点，或者说当前节点没有左、右节点，那么当前节点的左右子树均已出栈

```javascript
const postOrderTraversal = (root) => {
  const values = [];
  if (root === null) return values;
  const stack = [root];
  // 设定一个指针，指向上个出栈的节点
  let p;
  while (stack.length) {
    let top = stack[stack.length - 1];
    if (
      top.left === p ||
      top.right === p ||
      (top.left === null && top.right === null)
    ) {
      // p指向出栈的节点
      p = stack.pop();
      values.push(p.val);
    } else {
      top.right && stack.push(top.right);
      top.left && stack.push(top.left);
    }
  }
};
```

### 广度优先遍历

所谓广度优先遍历，也就是层级遍历。我们可以维护一个队列，根据当前层的节点数量依次将节点出队列，并在出队列的同时将节点的左右节点入队列。

```javascript
const levelTraversal = (root) => {
  const values = [];
  if (root === null) return values;

  let level = [root];
  let len = level.length;
  while (level.length) {
    const index = values.length;
    values[index] = [];
    for (let i = 0; i < len; i++) {
      let node = level.shift();
      values[index][i] = node.val;
      node.left && level.push(node.left);
      node.right && level.push(node.right);
    }
    len = level.length;
  }
  return values;
};
```
