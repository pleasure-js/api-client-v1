const { name, version, author, peerDependencies: external, dependencies: only } = require('./package.json')
const minify = require('rollup-plugin-babel-minify')
const vue = require('rollup-plugin-vue')
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
    input: 'src/pleasure-client.js',
    output: [
      {
        file: 'dist/pleasure-client.common.js',
        format: 'cjs',
        banner
      },
      {
        file: 'dist/pleasure-client.esm.js',
        format: 'esm',
        banner
      }
    ],
    plugins
  },
  {
    input: 'src/pleasure-client.js',
    output: [
      {
        file: 'dist/pleasure-client.js',
        name: 'PleasureClient',
        format: 'iife',
        banner
      }
    ],
    plugins: getPlugins({ bundle: true })
  },
  {
    input: 'src/pleasure-client.js',
    output: [
      {
        file: 'dist/pleasure-client.min.js',
        name: 'PleasureClient',
        format: 'iife',
        banner
      },
    ],
    plugins: getPlugins({ bundle: true, minified: true })
  },
]
