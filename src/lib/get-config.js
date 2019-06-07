/**
 * @typedef {Object} ApiClientConfig
 * @property {Object} api - PleasureApi related configuration.
 * @property {String} [appURL=http://localhost:3000] - URL to the APP
 * @property {String} [apiURL=http://localhost:3000/api] - URL to the API server
 * @property {String} [entitiesUri=/entities] - endpoint where to access the entities schema.
 * @property {String} [authEndpoint=/token] - endpoint where to exchange credentials for accessToken / refreshToken.
 * @property {String} [revokeEndpoint=/revoke] - endpoint where to exchange credentials for accessToken / refreshToken.
 * @property {Number} [timeout=15000] - axios timeout in ms.
 */

export function getConfig () {
  const appURL = (process.server ? process.env.PLEASURE_CLIENT_APP_SERVER_URL : process.env.PLEASURE_CLIENT_APP_URL) || `http://localhost:${ DEF_API_PORT }`
  const apiURL = `${ appURL }${ DEF_API_PREFIX }`
  return {
    appURL,
    apiURL: process.env.PLEASURE_CLIENT_API_URL || apiURL,
    entitiesUri: process.env.PLEASURE_CLIENT_ENTITIES_URI || DEF_API_ENTITIES_URI,
    authEndpoint: process.env.PLEASURE_CLIENT_AUTH_ENDPOINT || DEF_API_AUTH_ENDPOINT,
    revokeEndpoint: process.env.PLEASURE_CLIENT_REVOKE_ENDPOINT || DEF_API_REVOKE_ENDPOINT,
    timeout: 15000
  }
}
