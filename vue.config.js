const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     port: 8080,
//     proxy: {
//       '/api': {
//         target: 'http://111.229.111.100:8080/login/',//这里填入你要请求的接口的前缀
//         // ws: true,//代理websocked
//         changeOrigin: true,//虚拟的站点需要更管origin
//         // secure: true,                   //是否https接口
//         pathRewrite: {
//           '^/api': ''//重写路径
//           // }
//         }
//       }
//     }
//   },
// })
