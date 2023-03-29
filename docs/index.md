---
layout: home
title: 移动开发

hero:
  name: 大前端开发
  text: Android,IOS,Web,小程序
  tagline: Lorem ipsum...
  actions:
    - theme: brand
      text: Get Started
      link: /guide/what-is-vitepress
    - theme: alt
      text: View on GitHub
      link: https://github.com/vuejs/vitepress
  bg:
    - item: 1
      link: /public/item1.jpg
      
features:
  - icon: 🛠️
    title: Simple and minimal, always
    details: Lorem ipsum...
  - icon:
      src: /cool-feature-icon.svg
    title: Another cool feature
    details: Lorem ipsum...
  - icon:
      dark: /dark-feature-icon.svg
      light: /light-feature-icon.svg
    title: Another cool feature
    details: Lorem ipsum...
---
<script setup>
import { useData } from 'vitepress'

const { page } = useData()
</script>


<img v-for="(item,index) in $frontmatter.hero.bg" :src="item.link"/>


