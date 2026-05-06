const rspack = require('@rspack/core')
const refreshPlugin = require('@rspack/plugin-react-refresh')
const isDev = process.env.NODE_ENV === 'development'
const path = require('path');
require('dotenv').config();

const printCompilationMessage = require('./compilation.config.js');

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: './src/index.ts',
  },
  
  devServer: {
    port: 8080,
    historyApiFallback: true,
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
        "./designTokens": "./src/design-system/designTokens.ts",
        "./designRecipes": "./src/design-system/designRecipes.ts",
        "./themeBootstrap": "./src/design-system/themeBootstrap.ts",
        "./tailwindTheme": "./src/design-system/tailwindTheme.js"
      },
      remotes: {
        authMF: `authMF@${process.env.VITE_AUTH_MF_REMOTE}`,
        profileMF: `profileMF@${process.env.VITE_PROFILE_MF_REMOTE}`,
        hostApp: `host@${process.env.VITE_HOST_REMOTE}`,
        chatMF: `chatMF@${process.env.VITE_CHAT_MF_REMOTE}`
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
      },
    }),
    new rspack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VITE_DEFAULT_PROFILE_IMAGE': JSON.stringify(process.env.VITE_DEFAULT_PROFILE_IMAGE),
      'process.env.VITE_PLACEHOLDER_PROFILE_IMAGE': JSON.stringify(process.env.VITE_PLACEHOLDER_PROFILE_IMAGE),
      'process.env.VITE_NOTIFICATION_SERVICE_URL': JSON.stringify(process.env.VITE_NOTIFICATION_SERVICE_URL),
      'process.env.VITE_HOST_REMOTE': JSON.stringify(process.env.VITE_HOST_REMOTE),
      'process.env.VITE_AUTH_MF_REMOTE': JSON.stringify(process.env.VITE_AUTH_MF_REMOTE),
      'process.env.VITE_PROFILE_MF_REMOTE': JSON.stringify(process.env.VITE_PROFILE_MF_REMOTE),
      'process.env.VITE_CHAT_MF_REMOTE': JSON.stringify(process.env.VITE_CHAT_MF_REMOTE),
    }),
    new rspack.ProgressPlugin({}),
    new rspack.HtmlRspackPlugin({
      template: './src/index.html',
    }),
    isDev ? new refreshPlugin() : null,
  ].filter(Boolean),
}
