/**
 * Used to throw errors returned by the API server.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error|Error}
 */
export class ApiError extends Error {
  /**
   *
   * @param {String} error - Error name.
   * @param {String} message
   * @param {Number} [code=500] - Error number.
   * @param data
   */
  constructor (error, message, code = 500, data) {
    super(error)
    this.message = message
    this.code = code
    this.data = data
  }
}
