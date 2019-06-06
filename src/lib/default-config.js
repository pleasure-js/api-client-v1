import { getConfig } from 'pleasure-api'
import { omit } from 'lodash'

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
export default function () {
  return omit(getConfig(), 'mongodb')
}
