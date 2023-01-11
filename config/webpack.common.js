const pathtoresolve = require('path');
const paths = require('./paths')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/main.js'],

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'components': pathtoresolve.resolve(__dirname, '../src/components/'),
      'images': pathtoresolve.resolve(__dirname, '../src/images/'),
      '@': pathtoresolve.resolve(__dirname, '../src/'),

      'styles': pathtoresolve.resolve(__dirname, '../src/styles/'),

    }
  },

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },


  // Customize the webpack build process
  plugins: [

    // Vue plugin for the magic
    new VueLoaderPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      // title: 'webpack Boilerplate',
      // favicon: paths.src + '/images/favicon.png',
      template: paths.public + '/index.html', // template file
      filename: 'index.html', // output file
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          // Note: Only style-loader works for me !!!
          // 'vue-style-loader',
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
}
