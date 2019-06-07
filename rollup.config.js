const { name: packageName, version, author, peerDependencies: external, dependencies: only } = require('./package.json')
const minify = require('rollup-plugin-babel-minify')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')
const builtins = require('rollup-plugin-node-builtins')
const replace = require('rollup-plugin-replace')
const merge = require('deepmerge')
const { getConfig: getApiConfig, getPlugins: getApiPlugins } = require('pleasure-api')
const { port, entitiesUri, prefix } = getApiConfig()
const { pluginsConfig: { jwt: { authEndpoint, revokeEndpoint } } } = getApiPlugins()

const banner = `/*!
 * ${ packageName } v${ version }
 * (c) 2018-${ new Date().getFullYear() } ${ author }
 * Released under the MIT License.
 */`

const getPlugins = ({ minified = false, bundle = false } = {}) => {
  const plugs = [
    replace({
      VERSION: version,
      DEF_API_PORT: JSON.stringify(port),
      DEF_API_PREFIX: JSON.stringify(prefix),
      DEF_API_AUTH_ENDPOINT: JSON.stringify(authEndpoint),
      DEF_API_REVOKE_ENDPOINT: JSON.stringify(revokeEndpoint),
      DEF_API_ENTITIES_URI: JSON.stringify(entitiesUri)
    }),
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
const name = 'PleasureApiClient'

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
        name,
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
        name,
        format: 'iife',
        banner
      },
    ],
    plugins: getPlugins({ minified: true })
  },
]
