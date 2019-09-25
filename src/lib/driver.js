import { ApiError } from './api-error'
import { getConfig } from './get-config.js'
import axios from 'axios'
import qs from 'qs'
import get from 'lodash/get'

export let config = getConfig()

/**
 * Creates an axios instance able to handle API responses
 * @param {String} apiURL - URL of the API
 * @param {Number} timeout - Timeout in milliseconds
 * @return {Object} - axios instance
 */
export function getDriver ({ apiURL = config.apiURL, timeout = config.timeout } = {}) {
  // console.log(`pleasure-api-client config`, { config })
  const driver = axios.create({
    timeout,
    baseURL: apiURL,
    paramsSerializer (params) {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    },
    headers: {
      'X-Pleasure-Client': VERSION
    }
  })

  driver.interceptors.response.use((response) => {
      const { data: { statusCode, data, error, message } } = response || {}

      if (statusCode === 200) {
        return data
      }

      throw new ApiError(error, message, statusCode, data)
    },
    err => {
      const { errors, error } = get(err, 'response.data', {})

      if (process.env.API_ERROR) {
        if (err && err.response) {
          console.log(`[api:${ err.config.method }(${ err.response.status }/${ err.response.statusText }) => ${ err.config.url }] ${ JSON.stringify(err.response.data) }`)
        } else {
          console.log(`[api:`, err)
        }
      }

      throw new Error(error || 'Unknown error')
    })

  return driver
}

/**
 * Instance of getDriver using default values.
 * @type getDriver
 */
export default getDriver()
