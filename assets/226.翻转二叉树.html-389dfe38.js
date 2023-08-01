import{_ as n,X as s,Y as a,a1 as e}from"./framework-23afdf50.js";const t={},i=e(`<h3 id="题目-226-翻转二叉树" tabindex="-1"><a class="header-anchor" href="#题目-226-翻转二叉树" aria-hidden="true">#</a> 题目: 226.翻转二叉树</h3><p>给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。</p><p>示例 1：</p><figure><img src="https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-card line-numbers-mode" data-ext="card"><pre class="language-card"><code>输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 2：</p><figure><img src="https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-card line-numbers-mode" data-ext="card"><pre class="language-card"><code>输入：root = [2,1,3]
输出：[2,3,1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 3：</p><div class="language-card line-numbers-mode" data-ext="card"><pre class="language-card"><code>输入：root = []
输出：[]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>提示：</p><ul><li>树中节点数目范围在 [0, 100] 内</li><li>-100 &lt;= Node.val &lt;= 100</li></ul><h3 id="解题思路" tabindex="-1"><a class="header-anchor" href="#解题思路" aria-hidden="true">#</a> 解题思路</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * Definition for a binary tree node.
 * class TreeNode <span class="token punctuation">{</span>
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) <span class="token punctuation">{</span>
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     <span class="token punctuation">}</span>
 * <span class="token punctuation">}</span>
 */</span>

<span class="token keyword">function</span> <span class="token function">invertTree</span><span class="token punctuation">(</span>root<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token function-variable function">traverse</span> <span class="token operator">=</span> <span class="token punctuation">(</span>node<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token function">traverse</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">traverse</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> tmp <span class="token operator">=</span> node<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
    node<span class="token punctuation">.</span>right <span class="token operator">=</span> node<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
    node<span class="token punctuation">.</span>left <span class="token operator">=</span> tmp<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function">traverse</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> root<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),o=[i];function l(p,c){return s(),a("div",null,o)}const d=n(t,[["render",l],["__file","226.翻转二叉树.html.vue"]]);export{d as default};
