module.exports = {
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1'],
        compact: false
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
