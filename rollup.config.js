const { name, version, author, peerDependencies: external, dependencies: only } = require('./package.json')
const minify = require('rollup-plugin-babel-minify')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')
const builtins = require('rollup-plugin-node-builtins')
const merge = require('deepmerge')

const banner = `/*!
 * ${ name } v${ version }
 * (c) 2018-${ new Date().getFullYear() } ${ author }
 * Released under the MIT License.
 */`

const getPlugins = ({ minified = false, bundle = false } = {}) => {
  const plugs = [
    json()
  ]

  if (bundle) {
    plugs.push(
      builtins(),
      nodeResolve({
        jsnext: true,
        main: true
      }),
      commonjs()
    )
  }

  if (minified) {
    plugs.push(minify(merge({
      comments: false,
      bannerNewLine: true
    }, typeof minified === 'object' ? minified : {})))
  }

  return plugs
}

const plugins = getPlugins()

module.exports = [
  {
    input: 'src/pleasure-api-client.js',
    output: [
      {
        file: 'dist/pleasure-api-client.common.js',
        format: 'cjs',
        banner
      },
      {
        file: 'dist/pleasure-api-client.esm.js',
        format: 'esm',
        banner
      }
    ],
    plugins
  },
  {
    input: 'src/pleasure-api-client.js',
    output: [
      {
        file: 'dist/pleasure-api-client.js',
        name: 'pleasureClient',
        format: 'iife',
        banner
      }
    ],
    plugins: getPlugins()
  },
  {
    input: 'src/pleasure-api-client.js',
    output: [
      {
        file: 'dist/pleasure-api-client.min.js',
        name: 'pleasureClient',
        format: 'iife',
        banner
      },
    ],
    plugins: getPlugins({ minified: true })
  },
]
