import{_ as n,X as s,Y as a,a1 as t}from"./framework-23afdf50.js";const p={},e=t(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>
<span class="token comment">/*
 * @lc app=leetcode.cn id=424 lang=typescript
 *
 * [424] 替换后的最长重复字符
 */</span>

<span class="token comment">// @lc code=start</span>
<span class="token keyword">function</span> <span class="token function">characterReplacement</span><span class="token punctuation">(</span>s<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> k<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> right <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> maxLen <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>right <span class="token operator">&lt;</span> s<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">,</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    right<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> mostNum <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token punctuation">[</span>_<span class="token punctuation">,</span> value<span class="token punctuation">]</span> <span class="token keyword">of</span> map<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&gt;</span> mostNum<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mostNum <span class="token operator">=</span> value<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> <span class="token function-variable function">shouldShrink</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> right <span class="token operator">-</span> left <span class="token operator">-</span> mostNum <span class="token operator">&gt;</span> k<span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right <span class="token operator">&amp;&amp;</span> <span class="token function">shouldShrink</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">,</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      left<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>right <span class="token operator">-</span> left <span class="token operator">&gt;</span> maxLen<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      maxLen <span class="token operator">=</span> right <span class="token operator">-</span> left<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> maxLen<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// @lc code=end</span>

<span class="token comment">// @lc code=end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","424.替换后的最长重复字符.html.vue"]]);export{k as default};
