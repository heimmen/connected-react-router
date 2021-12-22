const path = require('path')
const webpack = require('webpack');
const port = 1214;

const publicPath = '/';

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.resolve('src/index.js'),
  ],
  context: __dirname,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: [
          'babel-loader',
        ]
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolveLoader: {
    modules: [
      'node_modules',
    ],
  },
  stats: 'minimal',
  devServer: {
	  port,
		host: 'localhost',
		compress: true,
		hot: true,
		allowedHosts: 'all',
		headers: { 'Access-Control-Allow-Origin': '*' },
		static: {
			directory: __dirname,
			publicPath
		},
		watchFiles: {
			paths: __dirname,
			options: {
				aggregateTimeout: 1000,
				ignored: [
					path.resolve(__dirname, 'node_modules'),
					path.resolve(__dirname, 'app/node_modules'),
					path.resolve(__dirname, 'stats_backend'),
					path.resolve(__dirname, 'Samples'),
					path.resolve(__dirname, 'flow-typed'),
					path.resolve(__dirname, '.git'),
					path.resolve(__dirname, 'dll')
				],
				poll: 3000
			}
		},
		historyApiFallback: {
			verbose: true,
			disableDotRule: false
		},
		onBeforeSetupMiddleware: () => {
			if (process.env.START_HOT) {
				console.log('Starting Main Process...'); // eslint-disable-line
				spawn('npm', ['run', 'start-main-dev'], {
					shell: true,
					env: process.env,
					stdio: 'inherit'
				})
					.on('close', code => process.exit(code)) // eslint-disable-line
					.on('error', (spawnError) => console.error(spawnError));
			}
		}
	}
}
