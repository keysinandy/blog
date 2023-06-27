import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/blog/",

  // locales: {
  //   "/": {
  //     lang: "en-US",
  //     title: "Blog Demo",
  //     description: "A blog demo for vuepress-theme-hope",
  //   },
  //   "/zh/": {
  //     lang: "zh-CN",
  //     title: "博客演示",
  //     description: "vuepress-theme-hope 的博客演示",
  //   },
  // },
  locales: {
    "/": {
      lang: "zh-CN",
      title: "学习笔记",
      description: "Key的学习笔记",
    },
    // "/zh/": {
    //   lang: "zh-CN",
    //   title: "博客演示",
    //   description: "vuepress-theme-hope 的博客演示",
    // },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
