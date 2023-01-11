
const path = require('path');
module.exports = {

    lintOnSave: false,
    runtimeCompiler: true,
    pluginOptions: {},

    configureWebpack: {
        resolve: {
            alias: {
                'root': path.resolve(__dirname, './'),
                '@': path.resolve(__dirname, 'src/'),
                'src': path.resolve('src'),
                'assets': path.resolve('src/assets'),
                'components': path.resolve('src/components'),
            }
        }
    }
}