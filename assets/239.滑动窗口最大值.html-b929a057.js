const n=JSON.parse('{"key":"v-42e07c3f","path":"/articles/leetcode/239.%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%9C%80%E5%A4%A7%E5%80%BC.html","title":"滑动窗口最大值","lang":"zh-CN","frontmatter":{"title":"滑动窗口最大值","cover":"https://pic.imgdb.cn/item/64b68cd51ddac507cc75fed7.jpg","icon":"page","order":5,"author":"积木","date":"2023-07-18T00:00:00.000Z","tag":["leetcode slidingwindow"],"sticky":true,"description":"题目: 239.滑动窗口最大值 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。 返回 滑动窗口中的最大值 。 解题思路 /* * @lc app=leetcode.cn id=239 lang=typescript * * [239] 滑动窗口最大值 */ // @lc code=start function maxSlidingWindow(nums: number[], k: number): number[] { const result: number[] = []; let start = 0; let end = start + k; let indexList: number[] = []; const pushList = (i: number) =&gt; { while ( indexList.length &amp;&amp; nums[indexList[indexList.length - 1]] &lt;= nums[i] ) { indexList.pop(); } indexList.push(i); }; for (let i = start; i &lt; end; i++) { pushList(i); } while (end &lt;= nums.length) { const maxIndex = indexList[0]; // console.log(end, indexList); result.push(nums[maxIndex]); start++; end++; pushList(end - 1); while (indexList.length &amp;&amp; indexList[0] &lt; start) { indexList.shift(); } } return result; } // @lc code=end","head":[["meta",{"property":"og:url","content":"https://github.com/keysinandy/blog/articles/leetcode/239.%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%9C%80%E5%A4%A7%E5%80%BC.html"}],["meta",{"property":"og:site_name","content":"学习笔记"}],["meta",{"property":"og:title","content":"滑动窗口最大值"}],["meta",{"property":"og:description","content":"题目: 239.滑动窗口最大值 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。 返回 滑动窗口中的最大值 。 解题思路 /* * @lc app=leetcode.cn id=239 lang=typescript * * [239] 滑动窗口最大值 */ // @lc code=start function maxSlidingWindow(nums: number[], k: number): number[] { const result: number[] = []; let start = 0; let end = start + k; let indexList: number[] = []; const pushList = (i: number) =&gt; { while ( indexList.length &amp;&amp; nums[indexList[indexList.length - 1]] &lt;= nums[i] ) { indexList.pop(); } indexList.push(i); }; for (let i = start; i &lt; end; i++) { pushList(i); } while (end &lt;= nums.length) { const maxIndex = indexList[0]; // console.log(end, indexList); result.push(nums[maxIndex]); start++; end++; pushList(end - 1); while (indexList.length &amp;&amp; indexList[0] &lt; start) { indexList.shift(); } } return result; } // @lc code=end"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://pic.imgdb.cn/item/64b68cd51ddac507cc75fed7.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-31T11:31:52.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"滑动窗口最大值"}],["meta",{"property":"article:author","content":"积木"}],["meta",{"property":"article:tag","content":"leetcode slidingwindow"}],["meta",{"property":"article:published_time","content":"2023-07-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-31T11:31:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"滑动窗口最大值\\",\\"image\\":[\\"https://pic.imgdb.cn/item/64b68cd51ddac507cc75fed7.jpg\\"],\\"datePublished\\":\\"2023-07-18T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-31T11:31:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"积木\\"}]}"]]},"headers":[{"level":3,"title":"题目: 239.滑动窗口最大值","slug":"题目-239-滑动窗口最大值","link":"#题目-239-滑动窗口最大值","children":[]},{"level":3,"title":"解题思路","slug":"解题思路","link":"#解题思路","children":[]}],"git":{"createdTime":1689685384000,"updatedTime":1690803112000,"contributors":[{"name":"keysin","email":"keysinandy@outlook.com","commits":2}]},"readingTime":{"minutes":0.72,"words":216},"filePathRelative":"articles/leetcode/239.滑动窗口最大值.md","localizedDate":"2023年7月18日","excerpt":"<h3> 题目: 239.滑动窗口最大值</h3>\\n<p>给你一个整数数组 <code>nums</code>，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。</p>\\n<p>返回 滑动窗口中的最大值 。</p>\\n<h3> 解题思路</h3>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code>\\n<span class=\\"token comment\\">/*\\n * @lc app=leetcode.cn id=239 lang=typescript\\n *\\n * [239] 滑动窗口最大值\\n */</span>\\n\\n<span class=\\"token comment\\">// @lc code=start</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">maxSlidingWindow</span><span class=\\"token punctuation\\">(</span>nums<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span> k<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">const</span> result<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">let</span> start <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">let</span> end <span class=\\"token operator\\">=</span> start <span class=\\"token operator\\">+</span> k<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">let</span> indexList<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">pushList</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span>i<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span>\\n      indexList<span class=\\"token punctuation\\">.</span>length <span class=\\"token operator\\">&amp;&amp;</span>\\n      nums<span class=\\"token punctuation\\">[</span>indexList<span class=\\"token punctuation\\">[</span>indexList<span class=\\"token punctuation\\">.</span>length <span class=\\"token operator\\">-</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">&lt;=</span> nums<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span>\\n    <span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n      indexList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">pop</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    indexList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">push</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">let</span> i <span class=\\"token operator\\">=</span> start<span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> end<span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">pushList</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span>end <span class=\\"token operator\\">&lt;=</span> nums<span class=\\"token punctuation\\">.</span>length<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">const</span> maxIndex <span class=\\"token operator\\">=</span> indexList<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// console.log(end, indexList);</span>\\n    result<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">push</span><span class=\\"token punctuation\\">(</span>nums<span class=\\"token punctuation\\">[</span>maxIndex<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    start<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">;</span>\\n    end<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">pushList</span><span class=\\"token punctuation\\">(</span>end <span class=\\"token operator\\">-</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span>indexList<span class=\\"token punctuation\\">.</span>length <span class=\\"token operator\\">&amp;&amp;</span> indexList<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">&lt;</span> start<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n      indexList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">shift</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">return</span> result<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token comment\\">// @lc code=end</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
