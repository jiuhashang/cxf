// const port = process.env.port || 80 // dev port
module.exports = {
  publicPath: '/cxf/',
  lintOnSave: false,
  productionSourceMap: false,
  // devServer: {
  //   open: true,
  //   proxy: {
  //     '/guangchuchong-api': {
  //       pathRewrite: {'^/guangchuchong-api': ''},
  //       target: 'http://119.45.162.104/guangchuchong-api',
  //       // target: 'http://123.60.52.140/xizi-api',
  //       ws: true,
  //       secure: false,
  //       changOrigin: true
  //     }
  //   }
  // },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.externals({
      vue:'Vue',
      'vue-router':'VueRouter',
      axios: 'axios'
    })
  }
}