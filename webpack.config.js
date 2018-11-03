const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const srcPath = path.join(__dirname, 'src');

module.exports = (env, argv = {}) => {
  const mode = argv.mode || 'production';
  return {
    externals: {
      'lodash-es': 'lodash-es',
      'lodash-es/isString': 'lodash-es/isString',
      'lodash-es/set': 'lodash-es/set',
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React',
      },
      statezero: {
        commonjs: 'statezero',
        commonjs2: 'statezero',
        amd: 'statezero',
        root: 'statezero',
      },
    },
    mode,
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [srcPath],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          ],
        },
        {
          test: /\.js$/,
          include: [srcPath],
          enforce: 'pre',
          loader: 'eslint-loader',
        },
      ],
    },
    output: {
      filename: 'statezero-react-hooks.js',
      // https://github.com/webpack/webpack/issues/6525
      globalObject: 'typeof self !== "undefined" ? self : this',
      library: 'statezero-react-hooks',
      libraryTarget: 'umd',
    },
    plugins: [new CleanWebpackPlugin(['dist'])],
    resolve: {
      alias: {
        'lodash-es': path.resolve(__dirname, './node_modules/lodash-es'),
        react: path.resolve(__dirname, './node_modules/react'),
        statezero: path.resolve(__dirname, './node_modules/statezero'),
      },
    },
  };
};
