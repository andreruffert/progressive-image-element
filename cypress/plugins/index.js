const browserify = require('@cypress/browserify-preprocessor');

module.exports = (on, config) => {
  const options = browserify.defaultOptions;
  const plugins = options.browserifyOptions.transform[1][1].plugins;
  options.browserifyOptions.transform[1][1].plugins = [
    ...plugins,
    '@babel/plugin-proposal-optional-chaining'
  ];

  on('file:preprocessor', browserify(options));
}
