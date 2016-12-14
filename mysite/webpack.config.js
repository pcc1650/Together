const webapck = require('webpack')

module.exports = {
    entry: `${__dirname}/static/test_router.jsx`,
    output: {path: `${__dirname}/static`, filename: 'bundle.js'},
    devtool: 'source-map',
    module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
          },
          {
            test: /\.css$/,
            loader: 'style!css'
          },
          { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
		  { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
		  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
		  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
      ]
    },
    resolve: {
      alias: {
        components: './components',
      },
      extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        new webapck.ProvidePlugin({
            $ : 'jquery',
            jQuery: 'jquery'
        })
    ]
}