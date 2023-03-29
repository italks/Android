export default {
  title: '移动开发',
  description: '',
  lastUpdated: true,

  themeConfig: {
    nav:nav(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/italks/Android' }
    ],
    footer: {
      message: 'Released under the Creative Commons license.',
      copyright: 'Copyright © 2023-present italks'
  },
  }
}
function nav() {
  return [
      { text: 'Home', link: '/',activeMatch:'' },
      { text: 'Kotlin', link: '/Kotlin/',activeMatch:'/Kotlin/' },
      { text: 'Jetpack', link: '/Jetpack/',activeMatch:'/Jetpack/' },
      {text:'README',link:'https://github.com/italks',activeMatch:'/README/', target: '_self',rel: 'sponsored'}
  ]
}