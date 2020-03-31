const merge = require( "webpack-merge" );
const UglifyJsPlugin = require( "uglifyjs-webpack-plugin" );
const OptimizeCSSAssetsPlugin = require( "optimize-css-assets-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const PurgecssPlugin = require( 'purgecss-webpack-plugin' );
const glob = require( 'glob' );
const path = require( 'path' );
//  const WorkboxPlugin = require( 'workbox-webpack-plugin' );

const common = require( "./webpack.common.js" );

module.exports = merge( common, {
  mode: "production",

  output: {
    publicPath   : "/assets/",
    filename     : "[name].[hash:5].js",
    chunkFilename: "[id].[hash:5].css"
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin( {
                            cache    : true,
                            parallel : true,
                            sourceMap: true
                          } ),

      new MiniCssExtractPlugin( {
                                  filename     : "[name].[hash:5].css",
                                  chunkFilename: "[id].[hash:5].css"
                                } ),

      new OptimizeCSSAssetsPlugin( {} )
    ]
  },
  plugins     : [

    new PurgecssPlugin( {
                          whitelist: ['grecaptcha-badge'],
                          paths    : glob.sync(
                            path.join( process.cwd(), "./site/**/*" ), { nodir: true } ),
                        } ),
    /*
    new WorkboxPlugin.GenerateSW( {
                                    // these options encourage the ServiceWorkers to get in there fast
                                    // and not allow any straggling "old" SWs to hang around
                                    clientsClaim  : true,
                                    skipWaiting   : true,
                                    swDest        : path.join( process.cwd(), "./site/public/sw.js" ),
                                    runtimeCaching: [{
                                      urlPattern: new RegExp( '/' ),
                                      //handler: 'CacheFirst'
                                      handler   : 'NetworkFirst'
                                    }]
                                  } ),
     */
  ]
} );
