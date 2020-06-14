const TerserWebpackPlugin = require("terser-webpack-plugin");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",

  context: __dirname + "/src", // 모듈 파일 폴더
  entry: {
    // 엔트리 파일 목록
    app: "./index.ts",
  },
  output: {
    path: __dirname + "/dist", // 번들 파일 폴더
    filename: "jas.js", // 번들 파일 이름 규칙
    libraryTarget: "var",
    library: "jas",
    umdNamedDefine: false,
    // libraryExport: "default",
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        include: [path.resolve(__dirname, "src")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
