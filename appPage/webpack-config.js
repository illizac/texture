var htmlPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var resolve = require('path').resolve

module.exports = {
	entry: {
		main: ["babel-polyfill", resolve(__dirname, './src/index.js')],
	},
	output: {
		path: resolve(__dirname, './dist'),
		publicPath: '/',
		// filename: '[name][hash].js'
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!less-loader'
			},
			{
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
            	test: /\.less$/,
            	loader: `style-loader!css-loader!less-loader`
            }
		]
	},
	plugins: [
		new htmlPlugin({
	        filename: 'index.html',    //生成的文件，从 output.path 开始 output.path + "/react.html"
	        template: resolve(__dirname, './index.html'),  //读取的模板文件,这个路径是相对于当前这个配置文件的
	        inject: true, // 自动注入
	        minify: {
	            removeComments: true,        //去注释
	            collapseWhitespace: true,    //压缩空格
	            removeAttributeQuotes: true  //去除属性引用
	        },
	        chunksSortMode: 'dependency'
	    }),
		new webpack.optimize.UglifyJsPlugin({
			comments: false, 
	      	compress: {
	        	warnings: false
	      	}
	    }),
	    new webpack.DefinePlugin({
		  "process.env": { 
		     NODE_ENV: JSON.stringify("production") 
		   }
		}),
	    new webpack.LoaderOptionsPlugin({
		    minimize: true
		})
	],
	// devtool: "#source-map"
}