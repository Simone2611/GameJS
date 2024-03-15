module.exports = {
  entry: "./src/entry.js",

  output: {
    path: __dirname,
    filename: "main.js",
  },

  module: {
    loaders: [
      { test: /level1.js/, loader: "script" },
      { test: /level2.js/, loader: "script" },
    ],
  },
};
