export default {
  title: '移动开发',
  description: '',
  lastUpdated: true,

  themeConfig: {
    nav: nav(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/italks/Android' }
    ],
    footer: {
      message: 'Released under the Creative Commons license.',
      copyright: 'Copyright © 2023-present italks'
    },
    sidebar: {
      '/Tools/': sidebarGuide(),
    },
  }
}
function nav() {
  return [
    { text: 'Home', link: '/', activeMatch: '' },
    { text: 'Tools', link: '/Tools/Charquopy/', activeMatch: '/Tools/' },
    // { text: 'Kotlin', link: '/Kotlin/', activeMatch: '/Kotlin/' },
    // { text: 'Jetpack', link: '/Jetpack/', activeMatch: '/Jetpack/' },
    { text: 'README', link: 'https://github.com/italks', activeMatch: '/README/', target: '_self', rel: 'sponsored' }
  ]
}
function sidebarGuide() {
  return [
    {
      text: 'Charquopy',
      collapsed: false,
      items: [
        { text: 'Charquopy是什么', link: '/Tools/Charquopy/' },
        { text: '简介', link: '/Tools/Charquopy/UserGuide' },
        {
          text: '用户手册', collapsed: false,
          items: [
            { text: '例子', link: '/Tools/Charquopy/UserGuide/Examples' },
            { text: 'Gradle插件', link: '/Tools/Charquopy/UserGuide/GradlePlugin' },
            { text: 'Java接口', link: '/Tools/Charquopy/UserGuide/JavaAPI' },
            { text: 'Python接口', link: '/Tools/Charquopy/UserGuide/PythonAPI' },
            { text: '跨语言问题', link: '/Tools/Charquopy/UserGuide/CrossLanguageIssues' },
            { text: '常见问题', link: '/Tools/Charquopy/UserGuide/FAQ' },
          ]
        },
        {
          text: '历史', collapsed: false,
          items: [
            { text: '版本摘要', link: '/Tools/Charquopy/History/VersionSummary' },
            { text: '更新日志', link: '/Tools/Charquopy/History/ChangeLog' },
          ]
        },
      ]
    }
  ]
}