const webpack = require( "webpack" );
const path = require( "path" );
const CopyWebpackPlugin = require( "copy-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const AssetsPlugin = require( "assets-webpack-plugin" );
const { CleanWebpackPlugin } = require( "clean-webpack-plugin" );


module.exports = {
  entry: {
    main: path.join( __dirname, "src", "index.js" )
  },

  output: {
    path: path.join( __dirname, "site/public/assets" )
  },

  module: {
    rules: [
      {
        test  : /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },

      { test: /\.json$/, loader: "json-loader" },

      {
        loader : "babel-loader",
        test   : /\.js?$/,
        exclude: /node_modules/,
        query  : { cacheDirectory: true }
      },

      {
        test   : /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use    : ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin( {
                                 fetch: "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
                               } ),

    new AssetsPlugin( {
                        filename   : "webpack.json",
                        path       : path.join( process.cwd(), "site/data" ),
                        prettyPrint: true
                      } ),
    new CleanWebpackPlugin( {
                              cleanOnceBeforeBuildPatterns: [
                                path.join( process.cwd(), "./site/public/assets/**/*.js" ),
                                path.join( process.cwd(), "./site/public/assets/**/*.css" ),
                                path.join( process.cwd(), "./site/public/assets/fonts/*" ),
                                path.join( process.cwd(), "./site/public/assets/images/*" ),
                                path.join( process.cwd(), "./site/public/assets/favicon/*" ),
                                path.join( process.cwd(), "./site/data/webpack.json" ),
                                path.join( process.cwd(), "./site/data/webpack2.json" )
                              ]
                            } ),
    new CopyWebpackPlugin( [
                             {
                               from   : "src/fonts",
                               to   : "fonts",
                               flatten: true
                             },
                             {
                               from   : "src/images",
                               to   : "images",
                               flatten: true
                             },
                             {
                               from   : "src/favicon",
                               to   : "favicon",
                               flatten: true
                             },
                             {
                               from   : "src/favicon",
                               to   : "favicon",
                               flatten: true
                             }
                           ] ),
  ]
};
