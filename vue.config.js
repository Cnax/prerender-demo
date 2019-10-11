const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  configureWebpack: config => {
    config.plugins.push(
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        // 需要进行预渲染的路由路径 我这里做的是首页
        routes: ['/', '/about'],
        // html文件压缩
        minify: {
          minifyCSS: true, // css压缩
          removeComments: true // 移除注释
        },
        renderer: new Renderer({
          // Optional - The name of the property to add to the window object with the contents of `inject`.
          injectProperty: '__PRERENDER_INJECTED',
          // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
          inject: {}
          // 在 main.js 中 new Vue({ mounted () {document.dispatchEvent(new Event('render-event'))}})，两者的事件名称要对应上。
          // renderAfterDocumentEvent: 'render-event'
        })
      })
    )
  }
}
