const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist"; //  "browserslist" - для учета настроек браузера.
const devtool = devMode ? "source-map" : undefined; //  "source-map" - для удобства нахождения ошибок для dev-версии, т.к. в prod-версии все содержимое файла будет в одной строке

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (!devMode) {
    config.minimizer = [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()];
  }

  return config;
};

const filename = (ext) => (devMode ? `[name].${ext}` : `[name].[contenthash].${ext}`);

module.exports = {
  mode: mode,
  target: target,
  devtool: devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  // entry: {
  // index: "./index.js",
  // analitics: "./js/analitics.js",
  // },
  entry: {
    index: ["@babel/polyfill", path.resolve(__dirname, "src", "index.js")],
  },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "assets/img/[name].[hash][ext]",
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@styles": path.resolve(__dirname, "src/assets/styles"),
      "@js": path.resolve(__dirname, "src/js"),
    },
  },
  optimization: optimization(),
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      minify: {
        collapseWhitespace: !devMode,
      },
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-preset-env")],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: "asset/resource",
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]", // путь куда сохранять все шрифты в папке dist
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          // devMode ? "eslint-loader" : "",
        ],
      },
    ],
  },
};
