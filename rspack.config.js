const rspack = require('@rspack/core')
const refreshPlugin = require('@rspack/plugin-react-refresh')
const isDev = process.env.NODE_ENV === 'development'
const path = require('path');
require('dotenv').config();

const printCompilationMessage = require('./compilation.config.js');

const port = 8080;

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: './src/index.ts',
  },

  output: {
    publicPath: '/',
  },
  
  devServer: {
    port,
    historyApiFallback: {
      index: '/index.html',
    },
    watchFiles: [path.resolve(__dirname, 'src')],
    onListening: function (devServer) {
      const port = devServer.server.address().port

      printCompilationMessage('compiling', port)

      devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage('failure', port)
          } else {
            printCompilationMessage('success', port)
          }
        })
      })
    }
  },

  resolve: {
    extensions: ['.js','.jsx','.ts','.tsx','.json']
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  tailwindcss: {},
                  autoprefixer: {},
                },
              },
            },
          },
        ],
        type: 'css',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: {
                targets: [
                  'chrome >= 87',
                  'edge >= 88',
                  'firefox >= 78',
                  'safari >= 14',
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.container.ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      exposes: {
        "./GlobalStore": "./src/helpers/globalStore.js",
        "./useAxiosInstance": "./src/helpers/axiosInstance.js",
        // "./designRecipes": "./src/design-system/designRecipes.ts",
        // "./themeBootstrap": "./src/design-system/themeBootstrap.ts",
        // "./tailwindTheme": "./src/design-system/tailwindTheme.js",
        "./toast": "./src/helpers/toast.ts"
      },
      remotes: {
        authMF: `authMF@${process.env.REACT_APP_AUTH_MF_REMOTE}`,
        profileMF: `profileMF@${process.env.REACT_APP_PROFILE_MF_REMOTE}`,
        hostApp: `host@${process.env.REACT_APP_HOST_REMOTE}`
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        'react-router': {
          singleton: true,
          requiredVersion: '^7.1.1',
        },
        'react-hot-toast': {
          singleton: true,
          requiredVersion: '^2.5.2',
        },
      },
    }),
    new rspack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.REACT_APP_DEFAULT_PROFILE_IMAGE': JSON.stringify(process.env.REACT_APP_DEFAULT_PROFILE_IMAGE),
      'process.env.REACT_APP_PLACEHOLDER_PROFILE_IMAGE': JSON.stringify(process.env.REACT_APP_PLACEHOLDER_PROFILE_IMAGE),
      'process.env.REACT_APP_NOTIFICATION_SERVICE_URL': JSON.stringify(process.env.REACT_APP_NOTIFICATION_SERVICE_URL),
      'process.env.REACT_APP_LEAF_USER_BASE_URL': JSON.stringify(process.env.REACT_APP_LEAF_USER_BASE_URL),
      'process.env.REACT_APP_LEAF_PROFILE_REFRESH_TOKEN_URL': JSON.stringify(process.env.REACT_APP_LEAF_PROFILE_REFRESH_TOKEN_URL),
      'process.env.REACT_APP_HOST_REMOTE': JSON.stringify(process.env.REACT_APP_HOST_REMOTE),
      'process.env.REACT_APP_AUTH_MF_REMOTE': JSON.stringify(process.env.REACT_APP_AUTH_MF_REMOTE),
      'process.env.REACT_APP_PROFILE_MF_REMOTE': JSON.stringify(process.env.REACT_APP_PROFILE_MF_REMOTE),
    }),
    new rspack.ProgressPlugin({}),
    new rspack.HtmlRspackPlugin({
      template: './src/index.html',
    }),
    isDev ? new refreshPlugin() : null,
  ].filter(Boolean),
}
