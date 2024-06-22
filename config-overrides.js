const { override, addBabelPlugin, addPostcssPlugins } = require('customize-cra');
const million = require('million/compiler');
const purgecss = require('@fullhuman/postcss-purgecss');
const JavaScriptObfuscator = require('webpack-obfuscator');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = override(
  // Add Million.js Webpack plugin
  (config) => {
    config.plugins.push(
      million.webpack({
        auto: {
          threshold: 0.05,
          skip: ["useBadHook", /badVariable/g],
        },
      })
    );
    return config;
  },

  // Add PurgeCSS to remove unused CSS
  addPostcssPlugins([
    purgecss({
      content: [
        './src/**/*.html',
        './src/**/*.js',
        './src/**/*.jsx',
        './src/**/*.ts',
        './src/**/*.tsx',
      ],
      css: ['./src/**/*.css'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]),

  // Additional configuration for optimization and obfuscation
  (config) => {
    // Disable source map generation only for production
    if (process.env.NODE_ENV === 'production') {
      config.devtool = false;

      // Add JavaScript Obfuscator plugin only for production
      config.plugins.push(
        new JavaScriptObfuscator(
          {
            rotateStringArray: true,
          },
          ['**/runtime~*.js', '**/vendors~*.js', '**/main*.js']
        )
      );

      // Optimize bundle size only for production
      if (config.optimization && config.optimization.minimizer) {
        config.optimization.minimizer = [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          }),
        ];
      }
    }

    return config;
  }
);
