module.exports = {
    title: 'Kiana\'s BLog',
    description: 'personal blog',
    theme: 'reco',
    locales: {
        '/': {
        lang: 'zh-CN'
        }
    },
    themeConfig: {
        nav: [
            { text: 'home', link: '/' },
            {text:'note',link:'/note/test'},
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' }
    ],
        // 博客配置
        blogConfig: {
            category: {
            location: 2,     // 在导航栏菜单中所占的位置，默认2
            text: 'Category' // 默认文案 “分类”
            },
            tag: {
            location: 3,     // 在导航栏菜单中所占的位置，默认3
            text: 'Tag'      // 默认文案 “标签”
            },
            socialLinks: [     // 信息栏展示社交信息
            { icon: 'reco-github', link: 'https://github.com/recoluan' },
            { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' }
            ]
        }
    }
}