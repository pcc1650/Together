const webapck = require('webpack')

module.exports = {
	context: `${__dirname}/src`,
    entry: [
		"./js/RootComponent.jsx",
		],
    output: {
		path: "/Users/zhaopengcheng/Django_Mysite/mysite/dist/js/",
		filename: 'bundle.js',
	},
    devtool: 'source-map',
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: [/node_modules/],
			use: [{
				loader: "babel-loader",
				options: {presets: ["es2015"]},
			}],
//            loader: 'babel',
          },
          {
            test: /\.css$/,
		  	use: ["style-loader", "css-loader"],
          },
          {
		  	test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			use: ["file-loader"],
		  },
		  {
		  	test: /\.(woff|woff2|jpeg)$/,
			use: ["url-loader?prefix=font/&limit=5000"], 
	      },
		  {
		  	test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
			use: ["url-loader?limit=10000&mimetype=application/octet-stream"], 
		  },
		  {
		  	test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			use: ["url-loader?limit=10000&mimetype=image/svg+xml"],
	      },
      ]
    },
    resolve: {
      alias: {
        components: './components',
      },
      extensions: ['.js', '.jsx'],
    },
	devServer: {
		proxy: {
			"/checkLoginState": {
				target:	"http://127.0.0.1:8000/testApp",
				changeOrigin: true,
			},
			"/register": {
				target: "http://127.0.0.1:8000/testApp",
				changeOrigin: true,
			},
		}	
	},
    plugins: [
        new webapck.ProvidePlugin({
            $ : 'jquery',
            jQuery: 'jquery'
        })
    ]
}
