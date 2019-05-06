import pick from 'lodash/pick'
import merge from 'deepmerge'
/**
 * @typedef {Object} ClientConfig
 * @property {Object} api - PleasureClient related configuration.
 * @property {String} [baseURL=http://localhost:3000] - axios baseURL.
 * @property {String} [entitiesUri=/entities] - endpoint where to access the entities schema.
 * @property {String} [authEndpoint=/token] - endpoint where to exchange credentials for accessToken / refreshToken.
 * @property {Number} [timeout=15000] - axios timeout in ms.
 */

/**
 * @ignore
 * @exports {ClientConfig}
 */
export default function (localConfig = {}) {
  return {
    api: merge({
      baseURL: 'http://localhost:3000/api',
      entitiesUri: '/entities', // todo: grab it from local api config
      authEndpoint: '/token', // todo: grab it from local api config
      revokeEndpoint: '/revoke', // todo: grab it from local api config
      timeout: 15000
    }, pick(localConfig.api || {}, ['entitiesUri', 'authEndpoint']))
  }
}
