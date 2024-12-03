import { join } from 'node:path'
import rspack from '@rspack/core'
import { InjectManifest } from '@aaroon/workbox-rspack-plugin'
import HtmlPlugin from 'html-webpack-plugin'

import InjectAssetsPlugin from './scripts/inject-assets-plugin.js'

const __dirname = import.meta.dirname

export default () => ({
  output: {
    path: join(__dirname, 'build'),
    publicPath: '/',
    filename: 'scripts/[name].[contenthash:6].js'
  },
  optimization: {
    realContentHash: false,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          minSize: 10000,
          name: (module, chunks) => {
            const allChunksNames = chunks.map(({ name }) => name).join('.')
            const moduleName = (module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/) || [])[1]

            return `${moduleName}.${allChunksNames}`.replace('@', '')
          }
        }
      }
    }
  },
  plugins: [
    new HtmlPlugin({ template: 'public/index.html', scriptLoading: 'module' }),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: { ignore: ['**/index.html'] },
          info: { minimized: true }
        }
      ]
    }),
    new InjectManifest({
      include: [/fonts\//, /scripts\/.+\.js$/],
      swSrc: join(__dirname, 'public', 'service-worker.js'),
      compileSrc: false,
      maximumFileSizeToCacheInBytes: 10000000
    }),
    new InjectAssetsPlugin()
  ]
})
