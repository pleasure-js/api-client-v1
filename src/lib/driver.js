import { ApiError } from 'pleasure/src/api/lib/api-error'
import defaultConfig from './default-config.js'
import axios from 'axios'
import qs from 'qs'
import get from 'lodash/get'

let ui = defaultConfig()

if (process.env.$pleasure) {
  ui = process.env.$pleasure.ui
}

/**
 * Creates an axios instance able to handle API responses
 * @param {String} baseURL - URL of the API
 * @param {Number} timeout - Timeout in milliseconds
 * @return {Object} - axios instance
 */
export function getDriver ({ baseURL = ui.api.baseURL, timeout = ui.api.timeout } = {}) {
  const driver = axios.create({
    timeout,
    baseURL,
    paramsSerializer (params) {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    },
    headers: {
      'X-Client': 'pleasure'
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
        console.log(`[api:${ err.config.method }(${ err.response.status }/${ err.response.statusText }) => ${ err.config.url }] ${ JSON.stringify(err.response.data) }`)
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
