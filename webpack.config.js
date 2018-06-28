const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const paths = {
  DIST: path.resolve(__dirname, "dist"),
  SRC: path.resolve(__dirname, "src"),
  JS: path.resolve(__dirname, "src/app")
};

// Webpack configuration
module.exports = env => {
  let env_file = "./.env";

  if (fs.existsSync(env_file)) {
    require("dotenv").config({ path: env_file });
  }
  //console.log(process.env);
  return {
    entry: path.join(paths.JS, "app.js"),
    output: {
      path: paths.DIST,
      filename: "app.bundle.js"
    },
    // Tell webpack to use html plugin
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY)
        }
      }),
      new HtmlWebpackPlugin({
        template: path.join(paths.SRC, "index.html"),
        minify: {
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          useShortDoctype: true
        }
      }),
      new ExtractTextPlugin("style.bundle.css")
    ],
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.s(c)ss/,
          loader: "import-glob-loader"
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"] //
        },

        {
          test: /\.s?css$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader", "postcss-loader"]
          })
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: ["url-loader"]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          use: ["file-loader"]
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      extensions: [".js", ".jsx"]
    }
  };
};
