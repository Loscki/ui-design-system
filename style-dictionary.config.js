// style-dictionary.config.cjs
module.exports = {
  source: ['build/tokens-for-style-dict.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
  },
};