'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const glob = require('glob')

var build = {
  // env: process.env.NODE_ENV,
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '',
  productionSourceMap: false,
  devtool: '#source-map',
  // npm install --save-dev compression-webpack-plugin
  productionGzip: true,
  productionGzipExtensions: ['js', 'css'],
  bundleAnalyzerReport: process.env.npm_config_report

}

function getEntry(globPath) {
  var entries = {},
  basename, tmp, pathname;
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    // pathname = basename.split("_")[0];  //index_main.js得到index
    // entries[pathname] = entry;
    var tmp = entry.split('/').splice(-3)
    var moduleName = tmp.slice(1, 2).toString().toLowerCase();
    entries[moduleName] = entry
  });
  return entries;
}

var pages = getEntry('src/modules/**/index.html');

//入口 index: path.resolve(__dirname, '../dist/index.html')
for (var pathname in pages) {
  build[pathname] = path.resolve(__dirname, '../dist/' + pathname + '.html')
}


module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8003, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: false
  },

  build: build,

  // build: {
  //   // Template for index.html
  //   index: path.resolve(__dirname, '../dist/index.html'),
  //   invitation: path.resolve(__dirname, '../dist/invitation.html'),
  //   reports: path.resolve(__dirname, '../dist/reports.html'),
  //   aboutus: path.resolve(__dirname, '../dist/aboutus.html'),
  //   docs: path.resolve(__dirname, '../dist/docs.html'),
  //
  //   // Paths
  //   assetsRoot: path.resolve(__dirname, '../dist'),
  //   assetsSubDirectory: 'static',
  //   assetsPublicPath: '',
  //
  //   /**
  //    * Source Maps
  //    */
  //
  //   productionSourceMap: false,
  //   // https://webpack.js.org/configuration/devtool/#production
  //   devtool: '#source-map',
  //
  //   // Gzip off by default as many popular static hosts such as
  //   // Surge or Netlify already gzip all static assets for you.
  //   // Before setting to `true`, make sure to:
  //   // npm install --save-dev compression-webpack-plugin
  //   productionGzip: false,
  //   productionGzipExtensions: ['js', 'css'],
  //
  //   // Run the build command with an extra argument to
  //   // View the bundle analyzer report after build finishes:
  //   // `npm run build --report`
  //   // Set to `true` or `false` to always turn it on or off
  //   bundleAnalyzerReport: process.env.npm_config_report
  // }
}
