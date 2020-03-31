const merge = require( "webpack-merge" );
const path = require( "path" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );

const common = require( "./webpack.common" );

module.exports = merge( common, {
  mode: "development",

  output: {
    publicPath: "/assets/",
    filename     : "[name].js",
    chunkFilename: "[id].css"
  },

  devServer: {
    port              : process.env.PORT || 3000,
    contentBase       : path.join( process.cwd(), "./site/public" ),
    watchContentBase  : true,
    quiet             : false,
    open              : true,
    historyApiFallback: {
      rewrites: [{ from: /./, to: "404.html" }]
    }
  },

  plugins: [
    new MiniCssExtractPlugin( {
                                filename     : "[name].css",
                                chunkFilename: "[id].css"
                              } )
  ]
} );
