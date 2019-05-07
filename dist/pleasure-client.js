/*!
 * pleasure-client v0.0.9
 * (c) 2018-2019 Martin Rafael Gonzalez <tin@devtin.io>
 * Released under the MIT License.
 */
var pleasureClient = (function (exports, http, https, url$1, assert, stream, tty, util$1, os, zlib, crypto, events, fs, child_process, net, tls, bufferutil, utf8Validate) {
  'use strict';

  http = http && http.hasOwnProperty('default') ? http['default'] : http;
  https = https && https.hasOwnProperty('default') ? https['default'] : https;
  url$1 = url$1 && url$1.hasOwnProperty('default') ? url$1['default'] : url$1;
  assert = assert && assert.hasOwnProperty('default') ? assert['default'] : assert;
  stream = stream && stream.hasOwnProperty('default') ? stream['default'] : stream;
  tty = tty && tty.hasOwnProperty('default') ? tty['default'] : tty;
  util$1 = util$1 && util$1.hasOwnProperty('default') ? util$1['default'] : util$1;
  os = os && os.hasOwnProperty('default') ? os['default'] : os;
  zlib = zlib && zlib.hasOwnProperty('default') ? zlib['default'] : zlib;
  crypto = crypto && crypto.hasOwnProperty('default') ? crypto['default'] : crypto;
  var events__default = 'default' in events ? events['default'] : events;
  fs = fs && fs.hasOwnProperty('default') ? fs['default'] : fs;
  child_process = child_process && child_process.hasOwnProperty('default') ? child_process['default'] : child_process;
  net = net && net.hasOwnProperty('default') ? net['default'] : net;
  tls = tls && tls.hasOwnProperty('default') ? tls['default'] : tls;
  bufferutil = bufferutil && bufferutil.hasOwnProperty('default') ? bufferutil['default'] : bufferutil;
  utf8Validate = utf8Validate && utf8Validate.hasOwnProperty('default') ? utf8Validate['default'] : utf8Validate;

  /**
   * Used to throw errors returned by the API server.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error|Error}
   */
  class ApiError extends Error {
    /**
     *
     * @param {String} error - Error name.
     * @param {String} message
     * @param {Number} [code=500] - Error number.
     * @param data
     */
    constructor (error, message, code = 500, data) {
      super(error);
      this.message = message;
      this.code = code;
      this.data = data;
    }
  }

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  var isArray_1 = isArray;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /** Built-in value references. */
  var Symbol$1 = _root.Symbol;

  var _Symbol = Symbol$1;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
  }

  var isSymbol_1 = isSymbol;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray_1(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol_1(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object));
  }

  var _isKey = isKey;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = _root['__core-js_shared__'];

  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$2 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }
    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  /* Built-in method references that are verified to be native. */
  var nativeCreate = _getNative(Object, 'create');

  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;

  var _Hash = Hash;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  var eq_1 = eq;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  var _assocIndexOf = assocIndexOf;

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;

  var _ListCache = ListCache;

  /* Built-in method references that are verified to be native. */
  var Map$1 = _getNative(_root, 'Map');

  var _Map = Map$1;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash,
      'map': new (_Map || _ListCache),
      'string': new _Hash
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;

  var _MapCache = MapCache;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || _MapCache);
    return memoized;
  }

  // Expose `MapCache`.
  memoize.Cache = _MapCache;

  var memoize_1 = memoize;

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped(func) {
    var result = memoize_1(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

  var _memoizeCapped = memoizeCapped;

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = _memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  var _stringToPath = stringToPath;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  var _arrayMap = arrayMap;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray_1(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return _arrayMap(value, baseToString) + '';
    }
    if (isSymbol_1(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  var _baseToString = baseToString;

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    return value == null ? '' : _baseToString(value);
  }

  var toString_1 = toString;

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value, object) {
    if (isArray_1(value)) {
      return value;
    }
    return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
  }

  var _castPath = castPath;

  /** Used as references for various `Number` constants. */
  var INFINITY$1 = 1 / 0;

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol_1(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
  }

  var _toKey = toKey;

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = _castPath(path, object);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[_toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

  var _baseGet = baseGet;

  var defineProperty = (function() {
    try {
      var func = _getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var _defineProperty = defineProperty;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty) {
      _defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$4.call(object, key) && eq_1(objValue, value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignValue = assignValue;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex;

  /**
   * The base implementation of `_.set`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @param {Function} [customizer] The function to customize path creation.
   * @returns {Object} Returns `object`.
   */
  function baseSet(object, path, value, customizer) {
    if (!isObject_1(object)) {
      return object;
    }
    path = _castPath(path, object);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = _toKey(path[index]),
          newValue = value;

      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;
        if (newValue === undefined) {
          newValue = isObject_1(objValue)
            ? objValue
            : (_isIndex(path[index + 1]) ? [] : {});
        }
      }
      _assignValue(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }

  var _baseSet = baseSet;

  /**
   * The base implementation of  `_.pickBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} paths The property paths to pick.
   * @param {Function} predicate The function invoked per property.
   * @returns {Object} Returns the new object.
   */
  function basePickBy(object, paths, predicate) {
    var index = -1,
        length = paths.length,
        result = {};

    while (++index < length) {
      var path = paths[index],
          value = _baseGet(object, path);

      if (predicate(value, path)) {
        _baseSet(result, _castPath(path, object), value);
      }
    }
    return result;
  }

  var _basePickBy = basePickBy;

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }

  var _baseHasIn = baseHasIn;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
    return isObjectLike_1(value) && hasOwnProperty$5.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  var isArguments_1 = isArguments;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  var isLength_1 = isLength;

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    path = _castPath(path, object);

    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = _toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength_1(length) && _isIndex(key, length) &&
      (isArray_1(object) || isArguments_1(object));
  }

  var _hasPath = hasPath;

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */
  function hasIn(object, path) {
    return object != null && _hasPath(object, path, _baseHasIn);
  }

  var hasIn_1 = hasIn;

  /**
   * The base implementation of `_.pick` without support for individual
   * property identifiers.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} paths The property paths to pick.
   * @returns {Object} Returns the new object.
   */
  function basePick(object, paths) {
    return _basePickBy(object, paths, function(value, path) {
      return hasIn_1(object, path);
    });
  }

  var _basePick = basePick;

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  var _arrayPush = arrayPush;

  /** Built-in value references. */
  var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenable(value) {
    return isArray_1(value) || isArguments_1(value) ||
      !!(spreadableSymbol && value && value[spreadableSymbol]);
  }

  var _isFlattenable = isFlattenable;

  /**
   * The base implementation of `_.flatten` with support for restricting flattening.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {number} depth The maximum recursion depth.
   * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
   * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
   * @param {Array} [result=[]] The initial result value.
   * @returns {Array} Returns the new flattened array.
   */
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1,
        length = array.length;

    predicate || (predicate = _isFlattenable);
    result || (result = []);

    while (++index < length) {
      var value = array[index];
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          // Recursively flatten arrays (susceptible to call stack limits).
          baseFlatten(value, depth - 1, predicate, isStrict, result);
        } else {
          _arrayPush(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }

  var _baseFlatten = baseFlatten;

  /**
   * Flattens `array` a single level deep.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to flatten.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flatten([1, [2, [3, [4]], 5]]);
   * // => [1, 2, [3, [4]], 5]
   */
  function flatten(array) {
    var length = array == null ? 0 : array.length;
    return length ? _baseFlatten(array, 1) : [];
  }

  var flatten_1 = flatten;

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  var _apply = apply;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return _apply(func, this, otherArgs);
    };
  }

  var _overRest = overRest;

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  var constant_1 = constant;

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  var identity_1 = identity;

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
    return _defineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant_1(string),
      'writable': true
    });
  };

  var _baseSetToString = baseSetToString;

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  var _shortOut = shortOut;

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = _shortOut(_baseSetToString);

  var _setToString = setToString;

  /**
   * A specialized version of `baseRest` which flattens the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @returns {Function} Returns the new function.
   */
  function flatRest(func) {
    return _setToString(_overRest(func, undefined, flatten_1), func + '');
  }

  var _flatRest = flatRest;

  /**
   * Creates an object composed of the picked `object` properties.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {...(string|string[])} [paths] The property paths to pick.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * _.pick(object, ['a', 'c']);
   * // => { 'a': 1, 'c': 3 }
   */
  var pick = _flatRest(function(object, paths) {
    return object == null ? {} : _basePick(object, paths);
  });

  var pick_1 = pick;

  var umd = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
  	module.exports = factory();
  }(commonjsGlobal, (function () {
  var isMergeableObject = function isMergeableObject(value) {
  	return isNonNullObject(value)
  		&& !isSpecial(value)
  };

  function isNonNullObject(value) {
  	return !!value && typeof value === 'object'
  }

  function isSpecial(value) {
  	var stringValue = Object.prototype.toString.call(value);

  	return stringValue === '[object RegExp]'
  		|| stringValue === '[object Date]'
  		|| isReactElement(value)
  }

  // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
  var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

  function isReactElement(value) {
  	return value.$$typeof === REACT_ELEMENT_TYPE
  }

  function emptyTarget(val) {
  	return Array.isArray(val) ? [] : {}
  }

  function cloneUnlessOtherwiseSpecified(value, options) {
  	return (options.clone !== false && options.isMergeableObject(value))
  		? deepmerge(emptyTarget(value), value, options)
  		: value
  }

  function defaultArrayMerge(target, source, options) {
  	return target.concat(source).map(function(element) {
  		return cloneUnlessOtherwiseSpecified(element, options)
  	})
  }

  function getMergeFunction(key, options) {
  	if (!options.customMerge) {
  		return deepmerge
  	}
  	var customMerge = options.customMerge(key);
  	return typeof customMerge === 'function' ? customMerge : deepmerge
  }

  function mergeObject(target, source, options) {
  	var destination = {};
  	if (options.isMergeableObject(target)) {
  		Object.keys(target).forEach(function(key) {
  			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
  		});
  	}
  	Object.keys(source).forEach(function(key) {
  		if (!options.isMergeableObject(source[key]) || !target[key]) {
  			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
  		} else {
  			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
  		}
  	});
  	return destination
  }

  function deepmerge(target, source, options) {
  	options = options || {};
  	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  	options.isMergeableObject = options.isMergeableObject || isMergeableObject;

  	var sourceIsArray = Array.isArray(source);
  	var targetIsArray = Array.isArray(target);
  	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  	if (!sourceAndTargetTypesMatch) {
  		return cloneUnlessOtherwiseSpecified(source, options)
  	} else if (sourceIsArray) {
  		return options.arrayMerge(target, source, options)
  	} else {
  		return mergeObject(target, source, options)
  	}
  }

  deepmerge.all = function deepmergeAll(array, options) {
  	if (!Array.isArray(array)) {
  		throw new Error('first argument should be an array')
  	}

  	return array.reduce(function(prev, next) {
  		return deepmerge(prev, next, options)
  	}, {})
  };

  var deepmerge_1 = deepmerge;

  return deepmerge_1;

  })));
  });

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
  function defaultConfig (localConfig = {}) {
    return {
      api: umd({
        baseURL: 'http://localhost:3000/api',
        entitiesUri: '/entities', // todo: grab it from local api config
        authEndpoint: '/token', // todo: grab it from local api config
        revokeEndpoint: '/revoke', // todo: grab it from local api config
        timeout: 15000
      }, pick_1(localConfig.api || {}, ['entitiesUri', 'authEndpoint']))
    }
  }

  var bind = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };

  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */

  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually
  var isBuffer_1 = function (obj) {
    return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
  };

  function isBuffer (obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  }

  // For Node v0.10 support. Remove this eventually.
  function isSlowBuffer (obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
  }

  /*global toString:true*/

  // utils is a library of generic helper functions non-specific to axios

  var toString$1 = Object.prototype.toString;

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  function isArray$1(val) {
    return toString$1.call(val) === '[object Array]';
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  function isArrayBuffer(val) {
    return toString$1.call(val) === '[object ArrayBuffer]';
  }

  /**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  function isFormData(val) {
    return (typeof FormData !== 'undefined') && (val instanceof FormData);
  }

  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    var result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
      result = ArrayBuffer.isView(val);
    } else {
      result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
  function isString(val) {
    return typeof val === 'string';
  }

  /**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
  function isNumber(val) {
    return typeof val === 'number';
  }

  /**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  function isUndefined(val) {
    return typeof val === 'undefined';
  }

  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
  function isObject$1(val) {
    return val !== null && typeof val === 'object';
  }

  /**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
  function isDate(val) {
    return toString$1.call(val) === '[object Date]';
  }

  /**
   * Determine if a value is a File
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
  function isFile(val) {
    return toString$1.call(val) === '[object File]';
  }

  /**
   * Determine if a value is a Blob
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  function isBlob(val) {
    return toString$1.call(val) === '[object Blob]';
  }

  /**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  function isFunction$1(val) {
    return toString$1.call(val) === '[object Function]';
  }

  /**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  function isStream(val) {
    return isObject$1(val) && isFunction$1(val.pipe);
  }

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
  }

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
  function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
  }

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   */
  function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
      return false;
    }
    return (
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    );
  }

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray$1(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
  function merge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
      if (typeof result[key] === 'object' && typeof val === 'object') {
        result[key] = merge(result[key], val);
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }

  var utils = {
    isArray: isArray$1,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer_1,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject$1,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction$1,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim
  };

  var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };

  /**
   * Update an Error with the specified config, error code, and response.
   *
   * @param {Error} error The error to update.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The error.
   */
  var enhanceError = function enhanceError(error, config, code, request, response) {
    error.config = config;
    if (code) {
      error.code = code;
    }
    error.request = request;
    error.response = response;
    return error;
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The created error.
   */
  var createError = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
  };

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   */
  var settle = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    // Note: status is not exposed by XDomainRequest
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(createError(
        'Request failed with status code ' + response.status,
        response.config,
        null,
        response.request,
        response
      ));
    }
  };

  function encode(val) {
    return encodeURIComponent(val).
      replace(/%40/gi, '@').
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, '+').
      replace(/%5B/gi, '[').
      replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
  var buildURL = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }

    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];

      utils.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return;
        }

        if (utils.isArray(val)) {
          key = key + '[]';
        } else {
          val = [val];
        }

        utils.forEach(val, function parseValue(v) {
          if (utils.isDate(v)) {
            v = v.toISOString();
          } else if (utils.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode(key) + '=' + encode(v));
        });
      });

      serializedParams = parts.join('&');
    }

    if (serializedParams) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  };

  // Headers whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  var ignoreDuplicateOf = [
    'age', 'authorization', 'content-length', 'content-type', 'etag',
    'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
    'last-modified', 'location', 'max-forwards', 'proxy-authorization',
    'referer', 'retry-after', 'user-agent'
  ];

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} headers Headers needing to be parsed
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;

    if (!headers) { return parsed; }

    utils.forEach(headers.split('\n'), function parser(line) {
      i = line.indexOf(':');
      key = utils.trim(line.substr(0, i)).toLowerCase();
      val = utils.trim(line.substr(i + 1));

      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === 'set-cookie') {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      }
    });

    return parsed;
  };

  var isURLSameOrigin = (
    utils.isStandardBrowserEnv() ?

    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */
      function resolveURL(url) {
        var href = url;

        if (msie) {
          // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                    urlParsingNode.pathname :
                    '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
              parsed.host === originURL.host);
      };
    })() :

    // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
  );

  // btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  function E() {
    this.message = 'String contains an invalid character';
  }
  E.prototype = new Error;
  E.prototype.code = 5;
  E.prototype.name = 'InvalidCharacterError';

  function btoa(input) {
    var str = String(input);
    var output = '';
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars;
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      str.charAt(idx | 0) || (map = '=', idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
      charCode = str.charCodeAt(idx += 3 / 4);
      if (charCode > 0xFF) {
        throw new E();
      }
      block = block << 8 | charCode;
    }
    return output;
  }

  var btoa_1 = btoa;

  var cookies = (
    utils.isStandardBrowserEnv() ?

    // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

    // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
  );

  var btoa$1 = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || btoa_1;

  var xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;

      if (utils.isFormData(requestData)) {
        delete requestHeaders['Content-Type']; // Let the browser set it
      }

      var request = new XMLHttpRequest();
      var loadEvent = 'onreadystatechange';
      var xDomain = false;

      // For IE 8/9 CORS support
      // Only supports POST and GET calls and doesn't returns the response headers.
      // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
      if (process.env.NODE_ENV !== 'test' &&
          typeof window !== 'undefined' &&
          window.XDomainRequest && !('withCredentials' in request) &&
          !isURLSameOrigin(config.url)) {
        request = new window.XDomainRequest();
        loadEvent = 'onload';
        xDomain = true;
        request.onprogress = function handleProgress() {};
        request.ontimeout = function handleTimeout() {};
      }

      // HTTP basic authentication
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        requestHeaders.Authorization = 'Basic ' + btoa$1(username + ':' + password);
      }

      request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

      // Set the request timeout in MS
      request.timeout = config.timeout;

      // Listen for ready state
      request[loadEvent] = function handleLoad() {
        if (!request || (request.readyState !== 4 && !xDomain)) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }

        // Prepare the response
        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
        var response = {
          data: responseData,
          // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
          status: request.status === 1223 ? 204 : request.status,
          statusText: request.status === 1223 ? 'No Content' : request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        };

        settle(resolve, reject, response);

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(createError('Network Error', config, null, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
          request));

        // Clean up request
        request = null;
      };

      // Add xsrf header
      // This is only done if running in a standard browser environment.
      // Specifically not if we're in a web worker, or react-native.
      if (utils.isStandardBrowserEnv()) {
        var cookies$1 = cookies;

        // Add xsrf header
        var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
            cookies$1.read(config.xsrfCookieName) :
            undefined;

        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
            // Remove Content-Type if data is undefined
            delete requestHeaders[key];
          } else {
            // Otherwise add header to the request
            request.setRequestHeader(key, val);
          }
        });
      }

      // Add withCredentials to request if needed
      if (config.withCredentials) {
        request.withCredentials = true;
      }

      // Add responseType to request if needed
      if (config.responseType) {
        try {
          request.responseType = config.responseType;
        } catch (e) {
          // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
          // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
          if (config.responseType !== 'json') {
            throw e;
          }
        }
      }

      // Handle progress if needed
      if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', config.onDownloadProgress);
      }

      // Not all browsers support upload events
      if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config.onUploadProgress);
      }

      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }

          request.abort();
          reject(cancel);
          // Clean up request
          request = null;
        });
      }

      if (requestData === undefined) {
        requestData = null;
      }

      // Send the request
      request.send(requestData);
    });
  };

  /**
   * Helpers.
   */

  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse(val);
    } else if (type === 'number' && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;
      case 'weeks':
      case 'week':
      case 'w':
        return n * w;
      case 'days':
      case 'day':
      case 'd':
        return n * d;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
  }

  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   */
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = ms;
    Object.keys(env).forEach(function (key) {
      createDebug[key] = env[key];
    });
    /**
    * Active `debug` instances.
    */

    createDebug.instances = [];
    /**
    * The currently active debug mode names, and names to skip.
    */

    createDebug.names = [];
    createDebug.skips = [];
    /**
    * Map of special "%n" handling functions, for the debug "format" argument.
    *
    * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
    */

    createDebug.formatters = {};
    /**
    * Selects a color for a debug namespace
    * @param {String} namespace The namespace string for the for the debug instance to be colored
    * @return {Number|String} An ANSI color code for the given namespace
    * @api private
    */

    function selectColor(namespace) {
      var hash = 0;

      for (var i = 0; i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }

      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }

    createDebug.selectColor = selectColor;
    /**
    * Create a debugger with the given `namespace`.
    *
    * @param {String} namespace
    * @return {Function}
    * @api public
    */

    function createDebug(namespace) {
      var prevTime;

      function debug() {
        // Disabled?
        if (!debug.enabled) {
          return;
        }

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var self = debug; // Set `diff` timestamp

        var curr = Number(new Date());
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);

        if (typeof args[0] !== 'string') {
          // Anything else let's inspect with %O
          args.unshift('%O');
        } // Apply any `formatters` transformations


        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
          // If we encounter an escaped % then don't increase the array index
          if (match === '%%') {
            return match;
          }

          index++;
          var formatter = createDebug.formatters[format];

          if (typeof formatter === 'function') {
            var val = args[index];
            match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

            args.splice(index, 1);
            index--;
          }

          return match;
        }); // Apply env-specific formatting (colors, etc.)

        createDebug.formatArgs.call(self, args);
        var logFn = self.log || createDebug.log;
        logFn.apply(self, args);
      }

      debug.namespace = namespace;
      debug.enabled = createDebug.enabled(namespace);
      debug.useColors = createDebug.useColors();
      debug.color = selectColor(namespace);
      debug.destroy = destroy;
      debug.extend = extend; // Debug.formatArgs = formatArgs;
      // debug.rawLog = rawLog;
      // env-specific initialization logic for debug instances

      if (typeof createDebug.init === 'function') {
        createDebug.init(debug);
      }

      createDebug.instances.push(debug);
      return debug;
    }

    function destroy() {
      var index = createDebug.instances.indexOf(this);

      if (index !== -1) {
        createDebug.instances.splice(index, 1);
        return true;
      }

      return false;
    }

    function extend(namespace, delimiter) {
      return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
    }
    /**
    * Enables a debug mode by namespaces. This can include modes
    * separated by a colon and wildcards.
    *
    * @param {String} namespaces
    * @api public
    */


    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.names = [];
      createDebug.skips = [];
      var i;
      var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
      var len = split.length;

      for (i = 0; i < len; i++) {
        if (!split[i]) {
          // ignore empty strings
          continue;
        }

        namespaces = split[i].replace(/\*/g, '.*?');

        if (namespaces[0] === '-') {
          createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
        } else {
          createDebug.names.push(new RegExp('^' + namespaces + '$'));
        }
      }

      for (i = 0; i < createDebug.instances.length; i++) {
        var instance = createDebug.instances[i];
        instance.enabled = createDebug.enabled(instance.namespace);
      }
    }
    /**
    * Disable debug output.
    *
    * @api public
    */


    function disable() {
      createDebug.enable('');
    }
    /**
    * Returns true if the given mode name is enabled, false otherwise.
    *
    * @param {String} name
    * @return {Boolean}
    * @api public
    */


    function enabled(name) {
      if (name[name.length - 1] === '*') {
        return true;
      }

      var i;
      var len;

      for (i = 0, len = createDebug.skips.length; i < len; i++) {
        if (createDebug.skips[i].test(name)) {
          return false;
        }
      }

      for (i = 0, len = createDebug.names.length; i < len; i++) {
        if (createDebug.names[i].test(name)) {
          return true;
        }
      }

      return false;
    }
    /**
    * Coerce `val`.
    *
    * @param {Mixed} val
    * @return {Mixed}
    * @api private
    */


    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }

      return val;
    }

    createDebug.enable(createDebug.load());
    return createDebug;
  }

  var common = setup;

  var browser = createCommonjsModule(function (module, exports) {

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  /* eslint-env browser */

  /**
   * This is the web browser implementation of `debug()`.
   */
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  /**
   * Colors.
   */

  exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */
  // eslint-disable-next-line complexity

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
      return true;
    } // Internet Explorer and Edge do not support colors.


    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    } // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */


  function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

    if (!this.useColors) {
      return;
    }

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into

    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function (match) {
      if (match === '%%') {
        return;
      }

      index++;

      if (match === '%c') {
        // We only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */


  function log() {
    var _console;

    // This hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
  }
  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */


  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem('debug', namespaces);
      } else {
        exports.storage.removeItem('debug');
      }
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }
  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */


  function load() {
    var r;

    try {
      r = exports.storage.getItem('debug');
    } catch (error) {} // Swallow
    // XXX (@Qix-) should we be logging these?
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }
  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */


  function localstorage() {
    try {
      // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
      // The Browser also has localStorage in the global context.
      return localStorage;
    } catch (error) {// Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }

  module.exports = common(exports);
  var formatters = module.exports.formatters;
  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  formatters.j = function (v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return '[UnexpectedJSONParseError]: ' + error.message;
    }
  };
  });
  var browser_1 = browser.log;
  var browser_2 = browser.formatArgs;
  var browser_3 = browser.save;
  var browser_4 = browser.load;
  var browser_5 = browser.useColors;
  var browser_6 = browser.storage;
  var browser_7 = browser.colors;

  var hasFlag = (flag, argv) => {
  	argv = argv || process.argv;
  	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
  	const pos = argv.indexOf(prefix + flag);
  	const terminatorPos = argv.indexOf('--');
  	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
  };

  const env = process.env;

  let forceColor;
  if (hasFlag('no-color') ||
  	hasFlag('no-colors') ||
  	hasFlag('color=false')) {
  	forceColor = false;
  } else if (hasFlag('color') ||
  	hasFlag('colors') ||
  	hasFlag('color=true') ||
  	hasFlag('color=always')) {
  	forceColor = true;
  }
  if ('FORCE_COLOR' in env) {
  	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
  }

  function translateLevel(level) {
  	if (level === 0) {
  		return false;
  	}

  	return {
  		level,
  		hasBasic: true,
  		has256: level >= 2,
  		has16m: level >= 3
  	};
  }

  function supportsColor(stream) {
  	if (forceColor === false) {
  		return 0;
  	}

  	if (hasFlag('color=16m') ||
  		hasFlag('color=full') ||
  		hasFlag('color=truecolor')) {
  		return 3;
  	}

  	if (hasFlag('color=256')) {
  		return 2;
  	}

  	if (stream && !stream.isTTY && forceColor !== true) {
  		return 0;
  	}

  	const min = forceColor ? 1 : 0;

  	if (process.platform === 'win32') {
  		// Node.js 7.5.0 is the first version of Node.js to include a patch to
  		// libuv that enables 256 color output on Windows. Anything earlier and it
  		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
  		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
  		// release that supports 256 colors. Windows 10 build 14931 is the first release
  		// that supports 16m/TrueColor.
  		const osRelease = os.release().split('.');
  		if (
  			Number(process.versions.node.split('.')[0]) >= 8 &&
  			Number(osRelease[0]) >= 10 &&
  			Number(osRelease[2]) >= 10586
  		) {
  			return Number(osRelease[2]) >= 14931 ? 3 : 2;
  		}

  		return 1;
  	}

  	if ('CI' in env) {
  		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
  			return 1;
  		}

  		return min;
  	}

  	if ('TEAMCITY_VERSION' in env) {
  		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  	}

  	if (env.COLORTERM === 'truecolor') {
  		return 3;
  	}

  	if ('TERM_PROGRAM' in env) {
  		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

  		switch (env.TERM_PROGRAM) {
  			case 'iTerm.app':
  				return version >= 3 ? 3 : 2;
  			case 'Apple_Terminal':
  				return 2;
  			// No default
  		}
  	}

  	if (/-256(color)?$/i.test(env.TERM)) {
  		return 2;
  	}

  	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
  		return 1;
  	}

  	if ('COLORTERM' in env) {
  		return 1;
  	}

  	if (env.TERM === 'dumb') {
  		return min;
  	}

  	return min;
  }

  function getSupportLevel(stream) {
  	const level = supportsColor(stream);
  	return translateLevel(level);
  }

  var supportsColor_1 = {
  	supportsColor: getSupportLevel,
  	stdout: getSupportLevel(process.stdout),
  	stderr: getSupportLevel(process.stderr)
  };

  var node = createCommonjsModule(function (module, exports) {

  /**
   * Module dependencies.
   */



  /**
   * This is the Node.js implementation of `debug()`.
   */


  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  /**
   * Colors.
   */

  exports.colors = [6, 2, 3, 4, 5, 1];

  try {
    // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
    // eslint-disable-next-line import/no-extraneous-dependencies
    var supportsColor = supportsColor_1;

    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
      exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
    }
  } catch (error) {} // Swallow - we only care if `supports-color` is available; it doesn't have to be.

  /**
   * Build up the default `inspectOpts` object from the environment variables.
   *
   *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
   */


  exports.inspectOpts = Object.keys(process.env).filter(function (key) {
    return /^debug_/i.test(key);
  }).reduce(function (obj, key) {
    // Camel-case
    var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
      return k.toUpperCase();
    }); // Coerce string value into JS value

    var val = process.env[key];

    if (/^(yes|on|true|enabled)$/i.test(val)) {
      val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
      val = false;
    } else if (val === 'null') {
      val = null;
    } else {
      val = Number(val);
    }

    obj[prop] = val;
    return obj;
  }, {});
  /**
   * Is stdout a TTY? Colored output is enabled when `true`.
   */

  function useColors() {
    return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
  }
  /**
   * Adds ANSI color escape codes if enabled.
   *
   * @api public
   */


  function formatArgs(args) {
    var name = this.namespace,
        useColors = this.useColors;

    if (useColors) {
      var c = this.color;
      var colorCode = "\x1B[3" + (c < 8 ? c : '8;5;' + c);
      var prefix = "  ".concat(colorCode, ";1m").concat(name, " \x1B[0m");
      args[0] = prefix + args[0].split('\n').join('\n' + prefix);
      args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + "\x1B[0m");
    } else {
      args[0] = getDate() + name + ' ' + args[0];
    }
  }

  function getDate() {
    if (exports.inspectOpts.hideDate) {
      return '';
    }

    return new Date().toISOString() + ' ';
  }
  /**
   * Invokes `util.format()` with the specified arguments and writes to stderr.
   */


  function log() {
    return process.stderr.write(util$1.format.apply(util$1, arguments) + '\n');
  }
  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */


  function save(namespaces) {
    if (namespaces) {
      process.env.DEBUG = namespaces;
    } else {
      // If you set a process.env field to null or undefined, it gets cast to the
      // string 'null' or 'undefined'. Just delete instead.
      delete process.env.DEBUG;
    }
  }
  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */


  function load() {
    return process.env.DEBUG;
  }
  /**
   * Init logic for `debug` instances.
   *
   * Create a new `inspectOpts` object in case `useColors` is set
   * differently for a particular `debug` instance.
   */


  function init(debug) {
    debug.inspectOpts = {};
    var keys = Object.keys(exports.inspectOpts);

    for (var i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }

  module.exports = common(exports);
  var formatters = module.exports.formatters;
  /**
   * Map %o to `util.inspect()`, all on a single line.
   */

  formatters.o = function (v) {
    this.inspectOpts.colors = this.useColors;
    return util$1.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, ' ');
  };
  /**
   * Map %O to `util.inspect()`, allowing multiple lines if needed.
   */


  formatters.O = function (v) {
    this.inspectOpts.colors = this.useColors;
    return util$1.inspect(v, this.inspectOpts);
  };
  });
  var node_1 = node.init;
  var node_2 = node.log;
  var node_3 = node.formatArgs;
  var node_4 = node.save;
  var node_5 = node.load;
  var node_6 = node.useColors;
  var node_7 = node.colors;
  var node_8 = node.inspectOpts;

  var src = createCommonjsModule(function (module) {

  /**
   * Detect Electron renderer / nwjs process, which is node, but we should
   * treat as a browser.
   */
  if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
    module.exports = browser;
  } else {
    module.exports = node;
  }
  });

  var URL = url$1.URL;



  var Writable = stream.Writable;
  var debug = src("follow-redirects");

  // RFC7231§4.2.1: Of the request methods defined by this specification,
  // the GET, HEAD, OPTIONS, and TRACE methods are defined to be safe.
  var SAFE_METHODS = { GET: true, HEAD: true, OPTIONS: true, TRACE: true };

  // Create handlers that pass events from native requests
  var eventHandlers = Object.create(null);
  ["abort", "aborted", "error", "socket", "timeout"].forEach(function (event) {
    eventHandlers[event] = function (arg) {
      this._redirectable.emit(event, arg);
    };
  });

  // An HTTP(S) request that can be redirected
  function RedirectableRequest(options, responseCallback) {
    // Initialize the request
    Writable.call(this);
    options.headers = options.headers || {};
    this._options = options;
    this._ended = false;
    this._ending = false;
    this._redirectCount = 0;
    this._redirects = [];
    this._requestBodyLength = 0;
    this._requestBodyBuffers = [];

    // Since http.request treats host as an alias of hostname,
    // but the url module interprets host as hostname plus port,
    // eliminate the host property to avoid confusion.
    if (options.host) {
      // Use hostname if set, because it has precedence
      if (!options.hostname) {
        options.hostname = options.host;
      }
      delete options.host;
    }

    // Attach a callback if passed
    if (responseCallback) {
      this.on("response", responseCallback);
    }

    // React to responses of native requests
    var self = this;
    this._onNativeResponse = function (response) {
      self._processResponse(response);
    };

    // Complete the URL object when necessary
    if (!options.pathname && options.path) {
      var searchPos = options.path.indexOf("?");
      if (searchPos < 0) {
        options.pathname = options.path;
      }
      else {
        options.pathname = options.path.substring(0, searchPos);
        options.search = options.path.substring(searchPos);
      }
    }

    // Perform the first request
    this._performRequest();
  }
  RedirectableRequest.prototype = Object.create(Writable.prototype);

  // Writes buffered data to the current native request
  RedirectableRequest.prototype.write = function (data, encoding, callback) {
    // Writing is not allowed if end has been called
    if (this._ending) {
      throw new Error("write after end");
    }

    // Validate input and shift parameters if necessary
    if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
      throw new Error("data should be a string, Buffer or Uint8Array");
    }
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }

    // Ignore empty buffers, since writing them doesn't invoke the callback
    // https://github.com/nodejs/node/issues/22066
    if (data.length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    // Only write when we don't exceed the maximum body length
    if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
      this._requestBodyLength += data.length;
      this._requestBodyBuffers.push({ data: data, encoding: encoding });
      this._currentRequest.write(data, encoding, callback);
    }
    // Error when we exceed the maximum body length
    else {
      this.emit("error", new Error("Request body larger than maxBodyLength limit"));
      this.abort();
    }
  };

  // Ends the current native request
  RedirectableRequest.prototype.end = function (data, encoding, callback) {
    // Shift parameters if necessary
    if (typeof data === "function") {
      callback = data;
      data = encoding = null;
    }
    else if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }

    // Write data if needed and end
    if (!data) {
      this._ended = this._ending = true;
      this._currentRequest.end(null, null, callback);
    }
    else {
      var self = this;
      var currentRequest = this._currentRequest;
      this.write(data, encoding, function () {
        self._ended = true;
        currentRequest.end(null, null, callback);
      });
      this._ending = true;
    }
  };

  // Sets a header value on the current native request
  RedirectableRequest.prototype.setHeader = function (name, value) {
    this._options.headers[name] = value;
    this._currentRequest.setHeader(name, value);
  };

  // Clears a header value on the current native request
  RedirectableRequest.prototype.removeHeader = function (name) {
    delete this._options.headers[name];
    this._currentRequest.removeHeader(name);
  };

  // Global timeout for all underlying requests
  RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
    if (callback) {
      this.once("timeout", callback);
    }

    if (this.socket) {
      startTimer(this, msecs);
    }
    else {
      var self = this;
      this._currentRequest.once("socket", function () {
        startTimer(self, msecs);
      });
    }

    this.once("response", clearTimer);
    this.once("error", clearTimer);

    return this;
  };

  function startTimer(request, msecs) {
    clearTimeout(request._timeout);
    request._timeout = setTimeout(function () {
      request.emit("timeout");
    }, msecs);
  }

  function clearTimer() {
    clearTimeout(this._timeout);
  }

  // Proxy all other public ClientRequest methods
  [
    "abort", "flushHeaders", "getHeader",
    "setNoDelay", "setSocketKeepAlive",
  ].forEach(function (method) {
    RedirectableRequest.prototype[method] = function (a, b) {
      return this._currentRequest[method](a, b);
    };
  });

  // Proxy all public ClientRequest properties
  ["aborted", "connection", "socket"].forEach(function (property) {
    Object.defineProperty(RedirectableRequest.prototype, property, {
      get: function () { return this._currentRequest[property]; },
    });
  });

  // Executes the next native request (initial or redirect)
  RedirectableRequest.prototype._performRequest = function () {
    // Load the native protocol
    var protocol = this._options.protocol;
    var nativeProtocol = this._options.nativeProtocols[protocol];
    if (!nativeProtocol) {
      this.emit("error", new Error("Unsupported protocol " + protocol));
      return;
    }

    // If specified, use the agent corresponding to the protocol
    // (HTTP and HTTPS use different types of agents)
    if (this._options.agents) {
      var scheme = protocol.substr(0, protocol.length - 1);
      this._options.agent = this._options.agents[scheme];
    }

    // Create the native request
    var request = this._currentRequest =
          nativeProtocol.request(this._options, this._onNativeResponse);
    this._currentUrl = url$1.format(this._options);

    // Set up event handlers
    request._redirectable = this;
    for (var event in eventHandlers) {
      /* istanbul ignore else */
      if (event) {
        request.on(event, eventHandlers[event]);
      }
    }

    // End a redirected request
    // (The first request must be ended explicitly with RedirectableRequest#end)
    if (this._isRedirect) {
      // Write the request entity and end.
      var i = 0;
      var self = this;
      var buffers = this._requestBodyBuffers;
      (function writeNext(error) {
        // Only write if this request has not been redirected yet
        /* istanbul ignore else */
        if (request === self._currentRequest) {
          // Report any write errors
          /* istanbul ignore if */
          if (error) {
            self.emit("error", error);
          }
          // Write the next buffer if there are still left
          else if (i < buffers.length) {
            var buffer = buffers[i++];
            /* istanbul ignore else */
            if (!request.finished) {
              request.write(buffer.data, buffer.encoding, writeNext);
            }
          }
          // End the request if `end` has been called on us
          else if (self._ended) {
            request.end();
          }
        }
      }());
    }
  };

  // Processes a response from the current native request
  RedirectableRequest.prototype._processResponse = function (response) {
    // Store the redirected response
    if (this._options.trackRedirects) {
      this._redirects.push({
        url: this._currentUrl,
        headers: response.headers,
        statusCode: response.statusCode,
      });
    }

    // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
    // that further action needs to be taken by the user agent in order to
    // fulfill the request. If a Location header field is provided,
    // the user agent MAY automatically redirect its request to the URI
    // referenced by the Location field value,
    // even if the specific status code is not understood.
    var location = response.headers.location;
    if (location && this._options.followRedirects !== false &&
        response.statusCode >= 300 && response.statusCode < 400) {
      // Abort the current request
      this._currentRequest.removeAllListeners();
      this._currentRequest.on("error", noop);
      this._currentRequest.abort();

      // RFC7231§6.4: A client SHOULD detect and intervene
      // in cyclical redirections (i.e., "infinite" redirection loops).
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new Error("Max redirects exceeded."));
        return;
      }

      // RFC7231§6.4: Automatic redirection needs to done with
      // care for methods not known to be safe […],
      // since the user might not wish to redirect an unsafe request.
      // RFC7231§6.4.7: The 307 (Temporary Redirect) status code indicates
      // that the target resource resides temporarily under a different URI
      // and the user agent MUST NOT change the request method
      // if it performs an automatic redirection to that URI.
      var header;
      var headers = this._options.headers;
      if (response.statusCode !== 307 && !(this._options.method in SAFE_METHODS)) {
        this._options.method = "GET";
        // Drop a possible entity and headers related to it
        this._requestBodyBuffers = [];
        for (header in headers) {
          if (/^content-/i.test(header)) {
            delete headers[header];
          }
        }
      }

      // Drop the Host header, as the redirect might lead to a different host
      if (!this._isRedirect) {
        for (header in headers) {
          if (/^host$/i.test(header)) {
            delete headers[header];
          }
        }
      }

      // Perform the redirected request
      var redirectUrl = url$1.resolve(this._currentUrl, location);
      debug("redirecting to", redirectUrl);
      Object.assign(this._options, url$1.parse(redirectUrl));
      this._isRedirect = true;
      this._performRequest();

      // Discard the remainder of the response to avoid waiting for data
      response.destroy();
    }
    else {
      // The response is not a redirect; return it as-is
      response.responseUrl = this._currentUrl;
      response.redirects = this._redirects;
      this.emit("response", response);

      // Clean up
      this._requestBodyBuffers = [];
    }
  };

  // Wraps the key/value object of protocols with redirect functionality
  function wrap(protocols) {
    // Default settings
    var exports = {
      maxRedirects: 21,
      maxBodyLength: 10 * 1024 * 1024,
    };

    // Wrap each protocol
    var nativeProtocols = {};
    Object.keys(protocols).forEach(function (scheme) {
      var protocol = scheme + ":";
      var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
      var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

      // Executes a request, following redirects
      wrappedProtocol.request = function (input, options, callback) {
        // Parse parameters
        if (typeof input === "string") {
          var urlStr = input;
          try {
            input = urlToOptions(new URL(urlStr));
          }
          catch (err) {
            /* istanbul ignore next */
            input = url$1.parse(urlStr);
          }
        }
        else if (URL && (input instanceof URL)) {
          input = urlToOptions(input);
        }
        else {
          callback = options;
          options = input;
          input = { protocol: protocol };
        }
        if (typeof options === "function") {
          callback = options;
          options = null;
        }

        // Set defaults
        options = Object.assign({
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength,
        }, input, options);
        options.nativeProtocols = nativeProtocols;

        assert.equal(options.protocol, protocol, "protocol mismatch");
        debug("options", options);
        return new RedirectableRequest(options, callback);
      };

      // Executes a GET request, following redirects
      wrappedProtocol.get = function (input, options, callback) {
        var request = wrappedProtocol.request(input, options, callback);
        request.end();
        return request;
      };
    });
    return exports;
  }

  /* istanbul ignore next */
  function noop() { /* empty */ }

  // from https://github.com/nodejs/node/blob/master/lib/internal/url.js
  function urlToOptions(urlObject) {
    var options = {
      protocol: urlObject.protocol,
      hostname: urlObject.hostname.startsWith("[") ?
        /* istanbul ignore next */
        urlObject.hostname.slice(1, -1) :
        urlObject.hostname,
      hash: urlObject.hash,
      search: urlObject.search,
      pathname: urlObject.pathname,
      path: urlObject.pathname + urlObject.search,
      href: urlObject.href,
    };
    if (urlObject.port !== "") {
      options.port = Number(urlObject.port);
    }
    return options;
  }

  // Exports
  var followRedirects = wrap({ http: http, https: https });
  var wrap_1 = wrap;
  followRedirects.wrap = wrap_1;

  var name = "axios";
  var version = "0.18.0";
  var description = "Promise based HTTP client for the browser and node.js";
  var main = "index.js";
  var scripts = {
  	test: "grunt test && bundlesize",
  	start: "node ./sandbox/server.js",
  	build: "NODE_ENV=production grunt build",
  	preversion: "npm test",
  	version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
  	postversion: "git push && git push --tags",
  	examples: "node ./examples/server.js",
  	coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js"
  };
  var repository = {
  	type: "git",
  	url: "https://github.com/axios/axios.git"
  };
  var keywords = [
  	"xhr",
  	"http",
  	"ajax",
  	"promise",
  	"node"
  ];
  var author = "Matt Zabriskie";
  var license = "MIT";
  var bugs = {
  	url: "https://github.com/axios/axios/issues"
  };
  var homepage = "https://github.com/axios/axios";
  var devDependencies = {
  	bundlesize: "^0.5.7",
  	coveralls: "^2.11.9",
  	"es6-promise": "^4.0.5",
  	grunt: "^1.0.1",
  	"grunt-banner": "^0.6.0",
  	"grunt-cli": "^1.2.0",
  	"grunt-contrib-clean": "^1.0.0",
  	"grunt-contrib-nodeunit": "^1.0.0",
  	"grunt-contrib-watch": "^1.0.0",
  	"grunt-eslint": "^19.0.0",
  	"grunt-karma": "^2.0.0",
  	"grunt-ts": "^6.0.0-beta.3",
  	"grunt-webpack": "^1.0.18",
  	"istanbul-instrumenter-loader": "^1.0.0",
  	"jasmine-core": "^2.4.1",
  	karma: "^1.3.0",
  	"karma-chrome-launcher": "^2.0.0",
  	"karma-coverage": "^1.0.0",
  	"karma-firefox-launcher": "^1.0.0",
  	"karma-jasmine": "^1.0.2",
  	"karma-jasmine-ajax": "^0.1.13",
  	"karma-opera-launcher": "^1.0.0",
  	"karma-safari-launcher": "^1.0.0",
  	"karma-sauce-launcher": "^1.1.0",
  	"karma-sinon": "^1.0.5",
  	"karma-sourcemap-loader": "^0.3.7",
  	"karma-webpack": "^1.7.0",
  	"load-grunt-tasks": "^3.5.2",
  	minimist: "^1.2.0",
  	sinon: "^1.17.4",
  	webpack: "^1.13.1",
  	"webpack-dev-server": "^1.14.1",
  	"url-search-params": "^0.6.1",
  	typescript: "^2.0.3"
  };
  var browser$1 = {
  	"./lib/adapters/http.js": "./lib/adapters/xhr.js"
  };
  var typings = "./index.d.ts";
  var dependencies = {
  	"follow-redirects": "^1.3.0",
  	"is-buffer": "^1.1.5"
  };
  var bundlesize = [
  	{
  		path: "./dist/axios.min.js",
  		threshold: "5kB"
  	}
  ];
  var _package = {
  	name: name,
  	version: version,
  	description: description,
  	main: main,
  	scripts: scripts,
  	repository: repository,
  	keywords: keywords,
  	author: author,
  	license: license,
  	bugs: bugs,
  	homepage: homepage,
  	devDependencies: devDependencies,
  	browser: browser$1,
  	typings: typings,
  	dependencies: dependencies,
  	bundlesize: bundlesize
  };

  var _package$1 = /*#__PURE__*/Object.freeze({
    name: name,
    version: version,
    description: description,
    main: main,
    scripts: scripts,
    repository: repository,
    keywords: keywords,
    author: author,
    license: license,
    bugs: bugs,
    homepage: homepage,
    devDependencies: devDependencies,
    browser: browser$1,
    typings: typings,
    dependencies: dependencies,
    bundlesize: bundlesize,
    'default': _package
  });

  var pkg = getCjsExportFromNamespace(_package$1);

  var httpFollow = followRedirects.http;
  var httpsFollow = followRedirects.https;






  /*eslint consistent-return:0*/
  var http_1 = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(resolve, reject) {
      var data = config.data;
      var headers = config.headers;
      var timer;

      // Set User-Agent (required by some servers)
      // Only set header if it hasn't been set in config
      // See https://github.com/axios/axios/issues/69
      if (!headers['User-Agent'] && !headers['user-agent']) {
        headers['User-Agent'] = 'axios/' + pkg.version;
      }

      if (data && !utils.isStream(data)) {
        if (Buffer.isBuffer(data)) ; else if (utils.isArrayBuffer(data)) {
          data = new Buffer(new Uint8Array(data));
        } else if (utils.isString(data)) {
          data = new Buffer(data, 'utf-8');
        } else {
          return reject(createError(
            'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
            config
          ));
        }

        // Add Content-Length header if data exists
        headers['Content-Length'] = data.length;
      }

      // HTTP basic authentication
      var auth = undefined;
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        auth = username + ':' + password;
      }

      // Parse url
      var parsed = url$1.parse(config.url);
      var protocol = parsed.protocol || 'http:';

      if (!auth && parsed.auth) {
        var urlAuth = parsed.auth.split(':');
        var urlUsername = urlAuth[0] || '';
        var urlPassword = urlAuth[1] || '';
        auth = urlUsername + ':' + urlPassword;
      }

      if (auth) {
        delete headers.Authorization;
      }

      var isHttps = protocol === 'https:';
      var agent = isHttps ? config.httpsAgent : config.httpAgent;

      var options = {
        path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
        method: config.method,
        headers: headers,
        agent: agent,
        auth: auth
      };

      if (config.socketPath) {
        options.socketPath = config.socketPath;
      } else {
        options.hostname = parsed.hostname;
        options.port = parsed.port;
      }

      var proxy = config.proxy;
      if (!proxy && proxy !== false) {
        var proxyEnv = protocol.slice(0, -1) + '_proxy';
        var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
        if (proxyUrl) {
          var parsedProxyUrl = url$1.parse(proxyUrl);
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }

      if (proxy) {
        options.hostname = proxy.host;
        options.host = proxy.host;
        options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
        options.port = proxy.port;
        options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

        // Basic proxy authorization
        if (proxy.auth) {
          var base64 = new Buffer(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
          options.headers['Proxy-Authorization'] = 'Basic ' + base64;
        }
      }

      var transport;
      if (config.transport) {
        transport = config.transport;
      } else if (config.maxRedirects === 0) {
        transport = isHttps ? https : http;
      } else {
        if (config.maxRedirects) {
          options.maxRedirects = config.maxRedirects;
        }
        transport = isHttps ? httpsFollow : httpFollow;
      }

      if (config.maxContentLength && config.maxContentLength > -1) {
        options.maxBodyLength = config.maxContentLength;
      }

      // Create the request
      var req = transport.request(options, function handleResponse(res) {
        if (req.aborted) return;

        // Response has been received so kill timer that handles request timeout
        clearTimeout(timer);
        timer = null;

        // uncompress the response body transparently if required
        var stream = res;
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
          // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }

        // return the last request in case of redirects
        var lastRequest = res.req || req;

        var response = {
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          config: config,
          request: lastRequest
        };

        if (config.responseType === 'stream') {
          response.data = stream;
          settle(resolve, reject, response);
        } else {
          var responseBuffer = [];
          stream.on('data', function handleStreamData(chunk) {
            responseBuffer.push(chunk);

            // make sure the content length is not over the maxContentLength if specified
            if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
              reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
                config, null, lastRequest));
            }
          });

          stream.on('error', function handleStreamError(err) {
            if (req.aborted) return;
            reject(enhanceError(err, config, null, lastRequest));
          });

          stream.on('end', function handleStreamEnd() {
            var responseData = Buffer.concat(responseBuffer);
            if (config.responseType !== 'arraybuffer') {
              responseData = responseData.toString('utf8');
            }

            response.data = responseData;
            settle(resolve, reject, response);
          });
        }
      });

      // Handle errors
      req.on('error', function handleRequestError(err) {
        if (req.aborted) return;
        reject(enhanceError(err, config, null, req));
      });

      // Handle request timeout
      if (config.timeout && !timer) {
        timer = setTimeout(function handleRequestTimeout() {
          req.abort();
          reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
        }, config.timeout);
      }

      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (req.aborted) return;

          req.abort();
          reject(cancel);
        });
      }

      // Send the request
      if (utils.isStream(data)) {
        data.pipe(req);
      } else {
        req.end(data);
      }
    });
  };

  var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = value;
    }
  }

  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      adapter = xhr;
    } else if (typeof process !== 'undefined') {
      // For node use HTTP adapter
      adapter = http_1;
    }
    return adapter;
  }

  var defaults = {
    adapter: getDefaultAdapter(),

    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName(headers, 'Content-Type');
      if (utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
      ) {
        return data;
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
      }
      if (utils.isObject(data)) {
        setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
        return JSON.stringify(data);
      }
      return data;
    }],

    transformResponse: [function transformResponse(data) {
      /*eslint no-param-reassign:0*/
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) { /* Ignore */ }
      }
      return data;
    }],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    maxContentLength: -1,

    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };

  defaults.headers = {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  };

  utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });

  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
  });

  var defaults_1 = defaults;

  function InterceptorManager() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected
    });
    return this.handlers.length - 1;
  };

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */
  InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };

  var InterceptorManager_1 = InterceptorManager;

  /**
   * Transform the data for a request or a response
   *
   * @param {Object|String} data The data to be transformed
   * @param {Array} headers The headers for the request or response
   * @param {Array|Function} fns A single function or Array of functions
   * @returns {*} The resulting transformed data
   */
  var transformData = function transformData(data, headers, fns) {
    /*eslint no-param-reassign:0*/
    utils.forEach(fns, function transform(fn) {
      data = fn(data, headers);
    });

    return data;
  };

  var isCancel = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  var isAbsoluteURL = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   * @returns {string} The combined URL
   */
  var combineURLs = function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  };

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
  var dispatchRequest = function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    // Support baseURL config
    if (config.baseURL && !isAbsoluteURL(config.url)) {
      config.url = combineURLs(config.baseURL, config.url);
    }

    // Ensure headers exist
    config.headers = config.headers || {};

    // Transform request data
    config.data = transformData(
      config.data,
      config.headers,
      config.transformRequest
    );

    // Flatten headers
    config.headers = utils.merge(
      config.headers.common || {},
      config.headers[config.method] || {},
      config.headers || {}
    );

    utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      function cleanHeaderConfig(method) {
        delete config.headers[method];
      }
    );

    var adapter = config.adapter || defaults_1.adapter;

    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData(
        response.data,
        response.headers,
        config.transformResponse
      );

      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData(
            reason.response.data,
            reason.response.headers,
            config.transformResponse
          );
        }
      }

      return Promise.reject(reason);
    });
  };

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   */
  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager_1(),
      response: new InterceptorManager_1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
  Axios.prototype.request = function request(config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof config === 'string') {
      config = utils.merge({
        url: arguments[0]
      }, arguments[1]);
    }

    config = utils.merge(defaults_1, {method: 'get'}, this.defaults, config);
    config.method = config.method.toLowerCase();

    // Hook up interceptors middleware
    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);

    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  };

  // Provide aliases for supported request methods
  utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, config) {
      return this.request(utils.merge(config || {}, {
        method: method,
        url: url
      }));
    };
  });

  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, data, config) {
      return this.request(utils.merge(config || {}, {
        method: method,
        url: url,
        data: data
      }));
    };
  });

  var Axios_1 = Axios;

  /**
   * A `Cancel` is an object that is thrown when an operation is canceled.
   *
   * @class
   * @param {string=} message The message.
   */
  function Cancel(message) {
    this.message = message;
  }

  Cancel.prototype.toString = function toString() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  };

  Cancel.prototype.__CANCEL__ = true;

  var Cancel_1 = Cancel;

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @class
   * @param {Function} executor The executor function.
   */
  function CancelToken(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    var token = this;
    executor(function cancel(message) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new Cancel_1(message);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token,
      cancel: cancel
    };
  };

  var CancelToken_1 = CancelToken;

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   * @returns {Function}
   */
  var spread = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   * @return {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    var context = new Axios_1(defaultConfig);
    var instance = bind(Axios_1.prototype.request, context);

    // Copy axios.prototype to instance
    utils.extend(instance, Axios_1.prototype, context);

    // Copy context to instance
    utils.extend(instance, context);

    return instance;
  }

  // Create the default instance to be exported
  var axios = createInstance(defaults_1);

  // Expose Axios class to allow class inheritance
  axios.Axios = Axios_1;

  // Factory for creating new instances
  axios.create = function create(instanceConfig) {
    return createInstance(utils.merge(defaults_1, instanceConfig));
  };

  // Expose Cancel & CancelToken
  axios.Cancel = Cancel_1;
  axios.CancelToken = CancelToken_1;
  axios.isCancel = isCancel;

  // Expose all/spread
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;

  var axios_1 = axios;

  // Allow use of default import syntax in TypeScript
  var default_1 = axios;
  axios_1.default = default_1;

  var axios$1 = axios_1;

  var has = Object.prototype.hasOwnProperty;
  var isArray$2 = Array.isArray;

  var hexTable = (function () {
      var array = [];
      for (var i = 0; i < 256; ++i) {
          array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
      }

      return array;
  }());

  var compactQueue = function compactQueue(queue) {
      while (queue.length > 1) {
          var item = queue.pop();
          var obj = item.obj[item.prop];

          if (isArray$2(obj)) {
              var compacted = [];

              for (var j = 0; j < obj.length; ++j) {
                  if (typeof obj[j] !== 'undefined') {
                      compacted.push(obj[j]);
                  }
              }

              item.obj[item.prop] = compacted;
          }
      }
  };

  var arrayToObject = function arrayToObject(source, options) {
      var obj = options && options.plainObjects ? Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
          if (typeof source[i] !== 'undefined') {
              obj[i] = source[i];
          }
      }

      return obj;
  };

  var merge$1 = function merge(target, source, options) {
      if (!source) {
          return target;
      }

      if (typeof source !== 'object') {
          if (isArray$2(target)) {
              target.push(source);
          } else if (target && typeof target === 'object') {
              if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                  target[source] = true;
              }
          } else {
              return [target, source];
          }

          return target;
      }

      if (!target || typeof target !== 'object') {
          return [target].concat(source);
      }

      var mergeTarget = target;
      if (isArray$2(target) && !isArray$2(source)) {
          mergeTarget = arrayToObject(target, options);
      }

      if (isArray$2(target) && isArray$2(source)) {
          source.forEach(function (item, i) {
              if (has.call(target, i)) {
                  var targetItem = target[i];
                  if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                      target[i] = merge(targetItem, item, options);
                  } else {
                      target.push(item);
                  }
              } else {
                  target[i] = item;
              }
          });
          return target;
      }

      return Object.keys(source).reduce(function (acc, key) {
          var value = source[key];

          if (has.call(acc, key)) {
              acc[key] = merge(acc[key], value, options);
          } else {
              acc[key] = value;
          }
          return acc;
      }, mergeTarget);
  };

  var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function (acc, key) {
          acc[key] = source[key];
          return acc;
      }, target);
  };

  var decode = function (str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, ' ');
      if (charset === 'iso-8859-1') {
          // unescape never throws, no try...catch needed:
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      // utf-8
      try {
          return decodeURIComponent(strWithoutPlus);
      } catch (e) {
          return strWithoutPlus;
      }
  };

  var encode$1 = function encode(str, defaultEncoder, charset) {
      // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
      // It has been adapted here for stricter adherence to RFC 3986
      if (str.length === 0) {
          return str;
      }

      var string = typeof str === 'string' ? str : String(str);

      if (charset === 'iso-8859-1') {
          return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
              return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
          });
      }

      var out = '';
      for (var i = 0; i < string.length; ++i) {
          var c = string.charCodeAt(i);

          if (
              c === 0x2D // -
              || c === 0x2E // .
              || c === 0x5F // _
              || c === 0x7E // ~
              || (c >= 0x30 && c <= 0x39) // 0-9
              || (c >= 0x41 && c <= 0x5A) // a-z
              || (c >= 0x61 && c <= 0x7A) // A-Z
          ) {
              out += string.charAt(i);
              continue;
          }

          if (c < 0x80) {
              out = out + hexTable[c];
              continue;
          }

          if (c < 0x800) {
              out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
              continue;
          }

          if (c < 0xD800 || c >= 0xE000) {
              out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
              continue;
          }

          i += 1;
          c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
          out += hexTable[0xF0 | (c >> 18)]
              + hexTable[0x80 | ((c >> 12) & 0x3F)]
              + hexTable[0x80 | ((c >> 6) & 0x3F)]
              + hexTable[0x80 | (c & 0x3F)];
      }

      return out;
  };

  var compact = function compact(value) {
      var queue = [{ obj: { o: value }, prop: 'o' }];
      var refs = [];

      for (var i = 0; i < queue.length; ++i) {
          var item = queue[i];
          var obj = item.obj[item.prop];

          var keys = Object.keys(obj);
          for (var j = 0; j < keys.length; ++j) {
              var key = keys[j];
              var val = obj[key];
              if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                  queue.push({ obj: obj, prop: key });
                  refs.push(val);
              }
          }
      }

      compactQueue(queue);

      return value;
  };

  var isRegExp = function isRegExp(obj) {
      return Object.prototype.toString.call(obj) === '[object RegExp]';
  };

  var isBuffer$1 = function isBuffer(obj) {
      if (!obj || typeof obj !== 'object') {
          return false;
      }

      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
  };

  var combine = function combine(a, b) {
      return [].concat(a, b);
  };

  var utils$1 = {
      arrayToObject: arrayToObject,
      assign: assign,
      combine: combine,
      compact: compact,
      decode: decode,
      encode: encode$1,
      isBuffer: isBuffer$1,
      isRegExp: isRegExp,
      merge: merge$1
  };

  var replace = String.prototype.replace;
  var percentTwenties = /%20/g;

  var formats = {
      'default': 'RFC3986',
      formatters: {
          RFC1738: function (value) {
              return replace.call(value, percentTwenties, '+');
          },
          RFC3986: function (value) {
              return value;
          }
      },
      RFC1738: 'RFC1738',
      RFC3986: 'RFC3986'
  };

  var has$1 = Object.prototype.hasOwnProperty;

  var arrayPrefixGenerators = {
      brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
          return prefix + '[]';
      },
      comma: 'comma',
      indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
          return prefix + '[' + key + ']';
      },
      repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
          return prefix;
      }
  };

  var isArray$3 = Array.isArray;
  var push = Array.prototype.push;
  var pushToArray = function (arr, valueOrArray) {
      push.apply(arr, isArray$3(valueOrArray) ? valueOrArray : [valueOrArray]);
  };

  var toISO = Date.prototype.toISOString;

  var defaults$1 = {
      addQueryPrefix: false,
      allowDots: false,
      charset: 'utf-8',
      charsetSentinel: false,
      delimiter: '&',
      encode: true,
      encoder: utils$1.encode,
      encodeValuesOnly: false,
      formatter: formats.formatters[formats['default']],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
          return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
  };

  var stringify = function stringify( // eslint-disable-line func-name-matching
      object,
      prefix,
      generateArrayPrefix,
      strictNullHandling,
      skipNulls,
      encoder,
      filter,
      sort,
      allowDots,
      serializeDate,
      formatter,
      encodeValuesOnly,
      charset
  ) {
      var obj = object;
      if (typeof filter === 'function') {
          obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
          obj = serializeDate(obj);
      } else if (generateArrayPrefix === 'comma' && isArray$3(obj)) {
          obj = obj.join(',');
      }

      if (obj === null) {
          if (strictNullHandling) {
              return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder, charset) : prefix;
          }

          obj = '';
      }

      if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils$1.isBuffer(obj)) {
          if (encoder) {
              var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder, charset);
              return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults$1.encoder, charset))];
          }
          return [formatter(prefix) + '=' + formatter(String(obj))];
      }

      var values = [];

      if (typeof obj === 'undefined') {
          return values;
      }

      var objKeys;
      if (isArray$3(filter)) {
          objKeys = filter;
      } else {
          var keys = Object.keys(obj);
          objKeys = sort ? keys.sort(sort) : keys;
      }

      for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];

          if (skipNulls && obj[key] === null) {
              continue;
          }

          if (isArray$3(obj)) {
              pushToArray(values, stringify(
                  obj[key],
                  typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                  generateArrayPrefix,
                  strictNullHandling,
                  skipNulls,
                  encoder,
                  filter,
                  sort,
                  allowDots,
                  serializeDate,
                  formatter,
                  encodeValuesOnly,
                  charset
              ));
          } else {
              pushToArray(values, stringify(
                  obj[key],
                  prefix + (allowDots ? '.' + key : '[' + key + ']'),
                  generateArrayPrefix,
                  strictNullHandling,
                  skipNulls,
                  encoder,
                  filter,
                  sort,
                  allowDots,
                  serializeDate,
                  formatter,
                  encodeValuesOnly,
                  charset
              ));
          }
      }

      return values;
  };

  var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
      if (!opts) {
          return defaults$1;
      }

      if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
          throw new TypeError('Encoder has to be a function.');
      }

      var charset = opts.charset || defaults$1.charset;
      if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
          throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
      }

      var format = formats['default'];
      if (typeof opts.format !== 'undefined') {
          if (!has$1.call(formats.formatters, opts.format)) {
              throw new TypeError('Unknown format option provided.');
          }
          format = opts.format;
      }
      var formatter = formats.formatters[format];

      var filter = defaults$1.filter;
      if (typeof opts.filter === 'function' || isArray$3(opts.filter)) {
          filter = opts.filter;
      }

      return {
          addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
          allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
          charset: charset,
          charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
          delimiter: typeof opts.delimiter === 'undefined' ? defaults$1.delimiter : opts.delimiter,
          encode: typeof opts.encode === 'boolean' ? opts.encode : defaults$1.encode,
          encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults$1.encoder,
          encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
          filter: filter,
          formatter: formatter,
          serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults$1.serializeDate,
          skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults$1.skipNulls,
          sort: typeof opts.sort === 'function' ? opts.sort : null,
          strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
      };
  };

  var stringify_1 = function (object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);

      var objKeys;
      var filter;

      if (typeof options.filter === 'function') {
          filter = options.filter;
          obj = filter('', obj);
      } else if (isArray$3(options.filter)) {
          filter = options.filter;
          objKeys = filter;
      }

      var keys = [];

      if (typeof obj !== 'object' || obj === null) {
          return '';
      }

      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
          arrayFormat = opts.arrayFormat;
      } else if (opts && 'indices' in opts) {
          arrayFormat = opts.indices ? 'indices' : 'repeat';
      } else {
          arrayFormat = 'indices';
      }

      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

      if (!objKeys) {
          objKeys = Object.keys(obj);
      }

      if (options.sort) {
          objKeys.sort(options.sort);
      }

      for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];

          if (options.skipNulls && obj[key] === null) {
              continue;
          }
          pushToArray(keys, stringify(
              obj[key],
              key,
              generateArrayPrefix,
              options.strictNullHandling,
              options.skipNulls,
              options.encode ? options.encoder : null,
              options.filter,
              options.sort,
              options.allowDots,
              options.serializeDate,
              options.formatter,
              options.encodeValuesOnly,
              options.charset
          ));
      }

      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? '?' : '';

      if (options.charsetSentinel) {
          if (options.charset === 'iso-8859-1') {
              // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
              prefix += 'utf8=%26%2310003%3B&';
          } else {
              // encodeURIComponent('✓')
              prefix += 'utf8=%E2%9C%93&';
          }
      }

      return joined.length > 0 ? prefix + joined : '';
  };

  var has$2 = Object.prototype.hasOwnProperty;

  var defaults$2 = {
      allowDots: false,
      allowPrototypes: false,
      arrayLimit: 20,
      charset: 'utf-8',
      charsetSentinel: false,
      comma: false,
      decoder: utils$1.decode,
      delimiter: '&',
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1000,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
  };

  var interpretNumericEntities = function (str) {
      return str.replace(/&#(\d+);/g, function ($0, numberStr) {
          return String.fromCharCode(parseInt(numberStr, 10));
      });
  };

  // This is what browsers will submit when the ✓ character occurs in an
  // application/x-www-form-urlencoded body and the encoding of the page containing
  // the form is iso-8859-1, or when the submitted form has an accept-charset
  // attribute of iso-8859-1. Presumably also with other charsets that do not contain
  // the ✓ character, such as us-ascii.
  var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

  // These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
  var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

  var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
      var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1; // Keep track of where the utf8 sentinel was found
      var i;

      var charset = options.charset;
      if (options.charsetSentinel) {
          for (i = 0; i < parts.length; ++i) {
              if (parts[i].indexOf('utf8=') === 0) {
                  if (parts[i] === charsetSentinel) {
                      charset = 'utf-8';
                  } else if (parts[i] === isoSentinel) {
                      charset = 'iso-8859-1';
                  }
                  skipIndex = i;
                  i = parts.length; // The eslint settings do not allow break;
              }
          }
      }

      for (i = 0; i < parts.length; ++i) {
          if (i === skipIndex) {
              continue;
          }
          var part = parts[i];

          var bracketEqualsPos = part.indexOf(']=');
          var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

          var key, val;
          if (pos === -1) {
              key = options.decoder(part, defaults$2.decoder, charset);
              val = options.strictNullHandling ? null : '';
          } else {
              key = options.decoder(part.slice(0, pos), defaults$2.decoder, charset);
              val = options.decoder(part.slice(pos + 1), defaults$2.decoder, charset);
          }

          if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
              val = interpretNumericEntities(val);
          }

          if (val && options.comma && val.indexOf(',') > -1) {
              val = val.split(',');
          }

          if (has$2.call(obj, key)) {
              obj[key] = utils$1.combine(obj[key], val);
          } else {
              obj[key] = val;
          }
      }

      return obj;
  };

  var parseObject = function (chain, val, options) {
      var leaf = val;

      for (var i = chain.length - 1; i >= 0; --i) {
          var obj;
          var root = chain[i];

          if (root === '[]' && options.parseArrays) {
              obj = [].concat(leaf);
          } else {
              obj = options.plainObjects ? Object.create(null) : {};
              var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
              var index = parseInt(cleanRoot, 10);
              if (!options.parseArrays && cleanRoot === '') {
                  obj = { 0: leaf };
              } else if (
                  !isNaN(index)
                  && root !== cleanRoot
                  && String(index) === cleanRoot
                  && index >= 0
                  && (options.parseArrays && index <= options.arrayLimit)
              ) {
                  obj = [];
                  obj[index] = leaf;
              } else {
                  obj[cleanRoot] = leaf;
              }
          }

          leaf = obj;
      }

      return leaf;
  };

  var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
      if (!givenKey) {
          return;
      }

      // Transform dot notation to bracket notation
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

      // The regex chunks

      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;

      // Get the parent

      var segment = brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;

      // Stash the parent if it exists

      var keys = [];
      if (parent) {
          // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
          if (!options.plainObjects && has$2.call(Object.prototype, parent)) {
              if (!options.allowPrototypes) {
                  return;
              }
          }

          keys.push(parent);
      }

      // Loop through children appending to the array until we hit depth

      var i = 0;
      while ((segment = child.exec(key)) !== null && i < options.depth) {
          i += 1;
          if (!options.plainObjects && has$2.call(Object.prototype, segment[1].slice(1, -1))) {
              if (!options.allowPrototypes) {
                  return;
              }
          }
          keys.push(segment[1]);
      }

      // If there's a remainder, just add whatever is left

      if (segment) {
          keys.push('[' + key.slice(segment.index) + ']');
      }

      return parseObject(keys, val, options);
  };

  var normalizeParseOptions = function normalizeParseOptions(opts) {
      if (!opts) {
          return defaults$2;
      }

      if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
          throw new TypeError('Decoder has to be a function.');
      }

      if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
          throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
      }
      var charset = typeof opts.charset === 'undefined' ? defaults$2.charset : opts.charset;

      return {
          allowDots: typeof opts.allowDots === 'undefined' ? defaults$2.allowDots : !!opts.allowDots,
          allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults$2.allowPrototypes,
          arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults$2.arrayLimit,
          charset: charset,
          charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$2.charsetSentinel,
          comma: typeof opts.comma === 'boolean' ? opts.comma : defaults$2.comma,
          decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults$2.decoder,
          delimiter: typeof opts.delimiter === 'string' || utils$1.isRegExp(opts.delimiter) ? opts.delimiter : defaults$2.delimiter,
          depth: typeof opts.depth === 'number' ? opts.depth : defaults$2.depth,
          ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
          interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults$2.interpretNumericEntities,
          parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults$2.parameterLimit,
          parseArrays: opts.parseArrays !== false,
          plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults$2.plainObjects,
          strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$2.strictNullHandling
      };
  };

  var parse$1 = function (str, opts) {
      var options = normalizeParseOptions(opts);

      if (str === '' || str === null || typeof str === 'undefined') {
          return options.plainObjects ? Object.create(null) : {};
      }

      var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
      var obj = options.plainObjects ? Object.create(null) : {};

      // Iterate over the keys and setup the new object

      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var newObj = parseKeys(key, tempObj[key], options);
          obj = utils$1.merge(obj, newObj, options);
      }

      return utils$1.compact(obj);
  };

  var lib = {
      formats: formats,
      parse: parse$1,
      stringify: stringify_1
  };

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get(object, path, defaultValue) {
    var result = object == null ? undefined : _baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  var get_1 = get;

  let ui = defaultConfig();

  if (process.env.$pleasure) {
    ui = process.env.$pleasure.ui;
  }

  /**
   * Creates an axios instance able to handle API responses
   * @param {String} baseURL - URL of the API
   * @param {Number} timeout - Timeout in milliseconds
   * @return {Object} - axios instance
   */
  function getDriver ({ baseURL = ui.api.baseURL, timeout = ui.api.timeout } = {}) {
    const driver = axios$1.create({
      timeout,
      baseURL,
      paramsSerializer (params) {
        return lib.stringify(params, { arrayFormat: 'brackets' })
      },
      headers: {
        'X-Client': 'pleasure'
      }
    });

    driver.interceptors.response.use((response) => {
        const { data: { statusCode, data, error, message } } = response || {};

        if (statusCode === 200) {
          return data
        }

        throw new ApiError(error, message, statusCode, data)
      },
      err => {
        const { errors, error } = get_1(err, 'response.data', {});

        if (process.env.API_ERROR) {
          console.log(`[api:${ err.config.method }(${ err.response.status }/${ err.response.statusText }) => ${ err.config.url }] ${ JSON.stringify(err.response.data) }`);
        }

        throw new Error(error || 'Unknown error')
      });

    return driver
  }

  /**
   * Instance of getDriver using default values.
   * @type getDriver
   */
  getDriver();

  /**
   * Casts `value` as an array if it's not one.
   *
   * @static
   * @memberOf _
   * @since 4.4.0
   * @category Lang
   * @param {*} value The value to inspect.
   * @returns {Array} Returns the cast array.
   * @example
   *
   * _.castArray(1);
   * // => [1]
   *
   * _.castArray({ 'a': 1 });
   * // => [{ 'a': 1 }]
   *
   * _.castArray('abc');
   * // => ['abc']
   *
   * _.castArray(null);
   * // => [null]
   *
   * _.castArray(undefined);
   * // => [undefined]
   *
   * _.castArray();
   * // => []
   *
   * var array = [1, 2, 3];
   * console.log(_.castArray(array) === array);
   * // => true
   */
  function castArray() {
    if (!arguments.length) {
      return [];
    }
    var value = arguments[0];
    return isArray_1(value) ? value : [value];
  }

  var castArray_1 = castArray;

  /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array == null ? 0 : array.length;

    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  var _arrayReduce = arrayReduce;

  /**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? undefined : object[key];
    };
  }

  var _basePropertyOf = basePropertyOf;

  /** Used to map Latin Unicode letters to basic Latin letters. */
  var deburredLetters = {
    // Latin-1 Supplement block.
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss',
    // Latin Extended-A block.
    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
    '\u0134': 'J',  '\u0135': 'j',
    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
    '\u0174': 'W',  '\u0175': 'w',
    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
    '\u0132': 'IJ', '\u0133': 'ij',
    '\u0152': 'Oe', '\u0153': 'oe',
    '\u0149': "'n", '\u017f': 's'
  };

  /**
   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
   * letters to basic Latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  var deburrLetter = _basePropertyOf(deburredLetters);

  var _deburrLetter = deburrLetter;

  /** Used to match Latin Unicode letters (excluding mathematical operators). */
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

  /** Used to compose unicode character classes. */
  var rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

  /** Used to compose unicode capture groups. */
  var rsCombo = '[' + rsComboRange + ']';

  /**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */
  var reComboMark = RegExp(rsCombo, 'g');

  /**
   * Deburrs `string` by converting
   * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
   * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
   * letters to basic Latin letters and removing
   * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to deburr.
   * @returns {string} Returns the deburred string.
   * @example
   *
   * _.deburr('déjà vu');
   * // => 'deja vu'
   */
  function deburr(string) {
    string = toString_1(string);
    return string && string.replace(reLatin, _deburrLetter).replace(reComboMark, '');
  }

  var deburr_1 = deburr;

  /** Used to match words composed of alphanumeric characters. */
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

  /**
   * Splits an ASCII `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }

  var _asciiWords = asciiWords;

  /** Used to detect strings that need a more robust regexp to match words. */
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

  /**
   * Checks if `string` contains a word composed of Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a word is found, else `false`.
   */
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }

  var _hasUnicodeWord = hasUnicodeWord;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange$1 = '\\u0300-\\u036f',
      reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
      rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
      rsDingbatRange = '\\u2700-\\u27bf',
      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = '\\u2000-\\u206f',
      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange = '\\ufe0e\\ufe0f',
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

  /** Used to compose unicode capture groups. */
  var rsApos = "['\u2019]",
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo$1 = '[' + rsComboRange$1 + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo$1 + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ = '\\u200d';

  /** Used to compose unicode regexes. */
  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

  /** Used to match complex or compound words. */
  var reUnicodeWord = RegExp([
    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join('|'), 'g');

  /**
   * Splits a Unicode `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }

  var _unicodeWords = unicodeWords;

  /**
   * Splits `string` into an array of its words.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to inspect.
   * @param {RegExp|string} [pattern] The pattern to match words.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Array} Returns the words of `string`.
   * @example
   *
   * _.words('fred, barney, & pebbles');
   * // => ['fred', 'barney', 'pebbles']
   *
   * _.words('fred, barney, & pebbles', /[^, ]+/g);
   * // => ['fred', 'barney', '&', 'pebbles']
   */
  function words(string, pattern, guard) {
    string = toString_1(string);
    pattern = guard ? undefined : pattern;

    if (pattern === undefined) {
      return _hasUnicodeWord(string) ? _unicodeWords(string) : _asciiWords(string);
    }
    return string.match(pattern) || [];
  }

  var words_1 = words;

  /** Used to compose unicode capture groups. */
  var rsApos$1 = "['\u2019]";

  /** Used to match apostrophes. */
  var reApos = RegExp(rsApos$1, 'g');

  /**
   * Creates a function like `_.camelCase`.
   *
   * @private
   * @param {Function} callback The function to combine each word.
   * @returns {Function} Returns the new compounder function.
   */
  function createCompounder(callback) {
    return function(string) {
      return _arrayReduce(words_1(deburr_1(string).replace(reApos, '')), callback, '');
    };
  }

  var _createCompounder = createCompounder;

  /**
   * Converts `string` to
   * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the kebab cased string.
   * @example
   *
   * _.kebabCase('Foo Bar');
   * // => 'foo-bar'
   *
   * _.kebabCase('fooBar');
   * // => 'foo-bar'
   *
   * _.kebabCase('__FOO_BAR__');
   * // => 'foo-bar'
   */
  var kebabCase = _createCompounder(function(result, word, index) {
    return result + (index ? '-' : '') + word.toLowerCase();
  });

  var kebabCase_1 = kebabCase;

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  var _arrayEach = arrayEach;

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  var _createBaseFor = createBaseFor;

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = _createBaseFor();

  var _baseFor = baseFor;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1$1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse_1;

  module.exports = isBuffer;
  });

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike_1(value) &&
      isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && _freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  });

  /* Node.js helper references. */
  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

  var isTypedArray_1 = isTypedArray;

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1$1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$6.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             _isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = _overArg(Object.keys, Object);

  var _nativeKeys = nativeKeys;

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!_isPrototype(object)) {
      return _nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeys = baseKeys;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
  }

  var keys_1 = keys;

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && _baseFor(object, iteratee, keys_1);
  }

  var _baseForOwn = baseForOwn;

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike_1(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length,
          index = fromRight ? length : -1,
          iterable = Object(collection);

      while ((fromRight ? index-- : ++index < length)) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }

  var _createBaseEach = createBaseEach;

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEach = _createBaseEach(_baseForOwn);

  var _baseEach = baseEach;

  /**
   * Casts `value` to `identity` if it's not a function.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Function} Returns cast function.
   */
  function castFunction(value) {
    return typeof value == 'function' ? value : identity_1;
  }

  var _castFunction = castFunction;

  /**
   * Iterates over elements of `collection` and invokes `iteratee` for each element.
   * The iteratee is invoked with three arguments: (value, index|key, collection).
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * **Note:** As with other "Collections" methods, objects with a "length"
   * property are iterated like arrays. To avoid this behavior use `_.forIn`
   * or `_.forOwn` for object iteration.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias each
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   * @see _.forEachRight
   * @example
   *
   * _.forEach([1, 2], function(value) {
   *   console.log(value);
   * });
   * // => Logs `1` then `2`.
   *
   * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
   *   console.log(key);
   * });
   * // => Logs 'a' then 'b' (iteration order is not guaranteed).
   */
  function forEach$1(collection, iteratee) {
    var func = isArray_1(collection) ? _arrayEach : _baseEach;
    return func(collection, _castFunction(iteratee));
  }

  var forEach_1 = forEach$1;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new _ListCache;
    this.size = 0;
  }

  var _stackClear = stackClear;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof _ListCache) {
      var pairs = data.__data__;
      if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new _MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new _ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = _stackClear;
  Stack.prototype['delete'] = _stackDelete;
  Stack.prototype.get = _stackGet;
  Stack.prototype.has = _stackHas;
  Stack.prototype.set = _stackSet;

  var _Stack = Stack;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED$2);
    return this;
  }

  var _setCacheAdd = setCacheAdd;

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas(value) {
    return this.__data__.has(value);
  }

  var _setCacheHas = setCacheHas;

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var index = -1,
        length = values == null ? 0 : values.length;

    this.__data__ = new _MapCache;
    while (++index < length) {
      this.add(values[index]);
    }
  }

  // Add methods to `SetCache`.
  SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
  SetCache.prototype.has = _setCacheHas;

  var _SetCache = SetCache;

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  var _arraySome = arraySome;

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  var _cacheHas = cacheHas;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var index = -1,
        result = true,
        seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new _SetCache : undefined;

    stack.set(array, other);
    stack.set(other, array);

    // Ignore non-index properties.
    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, arrValue, index, other, array, stack)
          : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== undefined) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      // Recursively compare arrays (susceptible to call stack limits).
      if (seen) {
        if (!_arraySome(other, function(othValue, othIndex) {
              if (!_cacheHas(seen, othIndex) &&
                  (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
          result = false;
          break;
        }
      } else if (!(
            arrValue === othValue ||
              equalFunc(arrValue, othValue, bitmask, customizer, stack)
          )) {
        result = false;
        break;
      }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
  }

  var _equalArrays = equalArrays;

  /** Built-in value references. */
  var Uint8Array$1 = _root.Uint8Array;

  var _Uint8Array = Uint8Array$1;

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  var _mapToArray = mapToArray;

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  var _setToArray = setToArray;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$1 = 1,
      COMPARE_UNORDERED_FLAG$1 = 2;

  /** `Object#toString` result references. */
  var boolTag$1 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      errorTag$1 = '[object Error]',
      mapTag$1 = '[object Map]',
      numberTag$1 = '[object Number]',
      regexpTag$1 = '[object RegExp]',
      setTag$1 = '[object Set]',
      stringTag$1 = '[object String]',
      symbolTag$1 = '[object Symbol]';

  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]';

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag$1:
        if ((object.byteLength != other.byteLength) ||
            (object.byteOffset != other.byteOffset)) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag$1:
        if ((object.byteLength != other.byteLength) ||
            !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
          return false;
        }
        return true;

      case boolTag$1:
      case dateTag$1:
      case numberTag$1:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq_1(+object, +other);

      case errorTag$1:
        return object.name == other.name && object.message == other.message;

      case regexpTag$1:
      case stringTag$1:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == (other + '');

      case mapTag$1:
        var convert = _mapToArray;

      case setTag$1:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
        convert || (convert = _setToArray);

        if (object.size != other.size && !isPartial) {
          return false;
        }
        // Assume cyclic values are equal.
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG$1;

        // Recursively compare objects (susceptible to call stack limits).
        stack.set(object, other);
        var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack['delete'](object);
        return result;

      case symbolTag$1:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }

  var _equalByTag = equalByTag;

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
  }

  var _baseGetAllKeys = baseGetAllKeys;

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  var _arrayFilter = arrayFilter;

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return [];
  }

  var stubArray_1 = stubArray;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return _arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable$1.call(object, symbol);
    });
  };

  var _getSymbols = getSymbols;

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return _baseGetAllKeys(object, keys_1, _getSymbols);
  }

  var _getAllKeys = getAllKeys;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$2 = 1;

  /** Used for built-in method references. */
  var objectProto$b = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$b.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
        objProps = _getAllKeys(object),
        objLength = objProps.length,
        othProps = _getAllKeys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty$8.call(other, key))) {
        return false;
      }
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);

    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, objValue, key, other, object, stack)
          : customizer(objValue, othValue, key, object, other, stack);
      }
      // Recursively compare objects (susceptible to call stack limits).
      if (!(compared === undefined
            ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
            : compared
          )) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      // Non `Object` object instances with different constructors are not equal.
      if (objCtor != othCtor &&
          ('constructor' in object && 'constructor' in other) &&
          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
  }

  var _equalObjects = equalObjects;

  /* Built-in method references that are verified to be native. */
  var DataView = _getNative(_root, 'DataView');

  var _DataView = DataView;

  /* Built-in method references that are verified to be native. */
  var Promise$1 = _getNative(_root, 'Promise');

  var _Promise = Promise$1;

  /* Built-in method references that are verified to be native. */
  var Set$1 = _getNative(_root, 'Set');

  var _Set = Set$1;

  /* Built-in method references that are verified to be native. */
  var WeakMap = _getNative(_root, 'WeakMap');

  var _WeakMap = WeakMap;

  /** `Object#toString` result references. */
  var mapTag$2 = '[object Map]',
      objectTag$1 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$2 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';

  var dataViewTag$2 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = _toSource(_DataView),
      mapCtorString = _toSource(_Map),
      promiseCtorString = _toSource(_Promise),
      setCtorString = _toSource(_Set),
      weakMapCtorString = _toSource(_WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = _baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
      (_Map && getTag(new _Map) != mapTag$2) ||
      (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
      (_Set && getTag(new _Set) != setTag$2) ||
      (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
    getTag = function(value) {
      var result = _baseGetTag(value),
          Ctor = result == objectTag$1 ? value.constructor : undefined,
          ctorString = Ctor ? _toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag$2;
          case mapCtorString: return mapTag$2;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag$2;
          case weakMapCtorString: return weakMapTag$1;
        }
      }
      return result;
    };
  }

  var _getTag = getTag;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$3 = 1;

  /** `Object#toString` result references. */
  var argsTag$2 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      objectTag$2 = '[object Object]';

  /** Used for built-in method references. */
  var objectProto$c = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray_1(object),
        othIsArr = isArray_1(other),
        objTag = objIsArr ? arrayTag$1 : _getTag(object),
        othTag = othIsArr ? arrayTag$1 : _getTag(other);

    objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
    othTag = othTag == argsTag$2 ? objectTag$2 : othTag;

    var objIsObj = objTag == objectTag$2,
        othIsObj = othTag == objectTag$2,
        isSameTag = objTag == othTag;

    if (isSameTag && isBuffer_1$1(object)) {
      if (!isBuffer_1$1(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new _Stack);
      return (objIsArr || isTypedArray_1(object))
        ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
        : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
      var objIsWrapped = objIsObj && hasOwnProperty$9.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty$9.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;

        stack || (stack = new _Stack);
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new _Stack);
    return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }

  var _baseIsEqualDeep = baseIsEqualDeep;

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
      return value !== value && other !== other;
    }
    return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }

  var _baseIsEqual = baseIsEqual;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$4 = 1,
      COMPARE_UNORDERED_FLAG$2 = 2;

  /**
   * The base implementation of `_.isMatch` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Array} matchData The property names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if ((noCustomizer && data[2])
            ? data[1] !== object[data[0]]
            : !(data[0] in object)
          ) {
        return false;
      }
    }
    while (++index < length) {
      data = matchData[index];
      var key = data[0],
          objValue = object[key],
          srcValue = data[1];

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false;
        }
      } else {
        var stack = new _Stack;
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === undefined
              ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack)
              : result
            )) {
          return false;
        }
      }
    }
    return true;
  }

  var _baseIsMatch = baseIsMatch;

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable(value) {
    return value === value && !isObject_1(value);
  }

  var _isStrictComparable = isStrictComparable;

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */
  function getMatchData(object) {
    var result = keys_1(object),
        length = result.length;

    while (length--) {
      var key = result[length],
          value = object[key];

      result[length] = [key, value, _isStrictComparable(value)];
    }
    return result;
  }

  var _getMatchData = getMatchData;

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function matchesStrictComparable(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue &&
        (srcValue !== undefined || (key in Object(object)));
    };
  }

  var _matchesStrictComparable = matchesStrictComparable;

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatches(source) {
    var matchData = _getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || _baseIsMatch(object, source, matchData);
    };
  }

  var _baseMatches = baseMatches;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$5 = 1,
      COMPARE_UNORDERED_FLAG$3 = 2;

  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatchesProperty(path, srcValue) {
    if (_isKey(path) && _isStrictComparable(srcValue)) {
      return _matchesStrictComparable(_toKey(path), srcValue);
    }
    return function(object) {
      var objValue = get_1(object, path);
      return (objValue === undefined && objValue === srcValue)
        ? hasIn_1(object, path)
        : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
    };
  }

  var _baseMatchesProperty = baseMatchesProperty;

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  var _baseProperty = baseProperty;

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyDeep(path) {
    return function(object) {
      return _baseGet(object, path);
    };
  }

  var _basePropertyDeep = basePropertyDeep;

  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */
  function property(path) {
    return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
  }

  var property_1 = property;

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */
  function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value;
    }
    if (value == null) {
      return identity_1;
    }
    if (typeof value == 'object') {
      return isArray_1(value)
        ? _baseMatchesProperty(value[0], value[1])
        : _baseMatches(value);
    }
    return property_1(value);
  }

  var _baseIteratee = baseIteratee;

  /**
   * Creates an object with the same keys as `object` and values generated
   * by running each own enumerable string keyed property of `object` thru
   * `iteratee`. The iteratee is invoked with three arguments:
   * (value, key, object).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Object
   * @param {Object} object The object to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Object} Returns the new mapped object.
   * @see _.mapKeys
   * @example
   *
   * var users = {
   *   'fred':    { 'user': 'fred',    'age': 40 },
   *   'pebbles': { 'user': 'pebbles', 'age': 1 }
   * };
   *
   * _.mapValues(users, function(o) { return o.age; });
   * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
   *
   * // The `_.property` iteratee shorthand.
   * _.mapValues(users, 'age');
   * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
   */
  function mapValues(object, iteratee) {
    var result = {};
    iteratee = _baseIteratee(iteratee, 3);

    _baseForOwn(object, function(value, key, object) {
      _baseAssignValue(result, key, iteratee(value, key, object));
    });
    return result;
  }

  var mapValues_1 = mapValues;

  var objectHash_1 = createCommonjsModule(function (module, exports) {



  /**
   * Exported function
   *
   * Options:
   *
   *  - `algorithm` hash algo to be used by this instance: *'sha1', 'md5'
   *  - `excludeValues` {true|*false} hash object keys, values ignored
   *  - `encoding` hash encoding, supports 'buffer', '*hex', 'binary', 'base64'
   *  - `ignoreUnknown` {true|*false} ignore unknown object types
   *  - `replacer` optional function that replaces values before hashing
   *  - `respectFunctionProperties` {*true|false} consider function properties when hashing
   *  - `respectFunctionNames` {*true|false} consider 'name' property of functions for hashing
   *  - `respectType` {*true|false} Respect special properties (prototype, constructor)
   *    when hashing to distinguish between types
   *  - `unorderedArrays` {true|*false} Sort all arrays before hashing
   *  - `unorderedSets` {*true|false} Sort `Set` and `Map` instances before hashing
   *  * = default
   *
   * @param {object} object value to hash
   * @param {object} options hashing options
   * @return {string} hash value
   * @api public
   */
  exports = module.exports = objectHash;

  function objectHash(object, options){
    options = applyDefaults(object, options);

    return hash(object, options);
  }

  /**
   * Exported sugar methods
   *
   * @param {object} object value to hash
   * @return {string} hash value
   * @api public
   */
  exports.sha1 = function(object){
    return objectHash(object);
  };
  exports.keys = function(object){
    return objectHash(object, {excludeValues: true, algorithm: 'sha1', encoding: 'hex'});
  };
  exports.MD5 = function(object){
    return objectHash(object, {algorithm: 'md5', encoding: 'hex'});
  };
  exports.keysMD5 = function(object){
    return objectHash(object, {algorithm: 'md5', encoding: 'hex', excludeValues: true});
  };

  // Internals
  var hashes = crypto.getHashes ? crypto.getHashes().slice() : ['sha1', 'md5'];
  hashes.push('passthrough');
  var encodings = ['buffer', 'hex', 'binary', 'base64'];

  function applyDefaults(object, options){
    options = options || {};
    options.algorithm = options.algorithm || 'sha1';
    options.encoding = options.encoding || 'hex';
    options.excludeValues = options.excludeValues ? true : false;
    options.algorithm = options.algorithm.toLowerCase();
    options.encoding = options.encoding.toLowerCase();
    options.ignoreUnknown = options.ignoreUnknown !== true ? false : true; // default to false
    options.respectType = options.respectType === false ? false : true; // default to true
    options.respectFunctionNames = options.respectFunctionNames === false ? false : true;
    options.respectFunctionProperties = options.respectFunctionProperties === false ? false : true;
    options.unorderedArrays = options.unorderedArrays !== true ? false : true; // default to false
    options.unorderedSets = options.unorderedSets === false ? false : true; // default to false
    options.unorderedObjects = options.unorderedObjects === false ? false : true; // default to true
    options.replacer = options.replacer || undefined;
    options.excludeKeys = options.excludeKeys || undefined;

    if(typeof object === 'undefined') {
      throw new Error('Object argument required.');
    }

    // if there is a case-insensitive match in the hashes list, accept it
    // (i.e. SHA256 for sha256)
    for (var i = 0; i < hashes.length; ++i) {
      if (hashes[i].toLowerCase() === options.algorithm.toLowerCase()) {
        options.algorithm = hashes[i];
      }
    }

    if(hashes.indexOf(options.algorithm) === -1){
      throw new Error('Algorithm "' + options.algorithm + '"  not supported. ' +
        'supported values: ' + hashes.join(', '));
    }

    if(encodings.indexOf(options.encoding) === -1 &&
       options.algorithm !== 'passthrough'){
      throw new Error('Encoding "' + options.encoding + '"  not supported. ' +
        'supported values: ' + encodings.join(', '));
    }

    return options;
  }

  /** Check if the given function is a native function */
  function isNativeFunction(f) {
    if ((typeof f) !== 'function') {
      return false;
    }
    var exp = /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i;
    return exp.exec(Function.prototype.toString.call(f)) != null;
  }

  function hash(object, options) {
    var hashingStream;

    if (options.algorithm !== 'passthrough') {
      hashingStream = crypto.createHash(options.algorithm);
    } else {
      hashingStream = new PassThrough();
    }

    if (typeof hashingStream.write === 'undefined') {
      hashingStream.write = hashingStream.update;
      hashingStream.end   = hashingStream.update;
    }

    var hasher = typeHasher(options, hashingStream);
    hasher.dispatch(object);
    if (!hashingStream.update)
      hashingStream.end('');

    if (hashingStream.digest) {
      return hashingStream.digest(options.encoding === 'buffer' ? undefined : options.encoding);
    }

    var buf = hashingStream.read();
    if (options.encoding === 'buffer') {
      return buf;
    }

    return buf.toString(options.encoding);
  }

  /**
   * Expose streaming API
   *
   * @param {object} object  Value to serialize
   * @param {object} options  Options, as for hash()
   * @param {object} stream  A stream to write the serializiation to
   * @api public
   */
  exports.writeToStream = function(object, options, stream) {
    if (typeof stream === 'undefined') {
      stream = options;
      options = {};
    }

    options = applyDefaults(object, options);

    return typeHasher(options, stream).dispatch(object);
  };

  function typeHasher(options, writeTo, context){
    context = context || [];
    var write = function(str) {
      if (writeTo.update)
        return writeTo.update(str, 'utf8');
      else
        return writeTo.write(str, 'utf8');
    };

    return {
      dispatch: function(value){
        if (options.replacer) {
          value = options.replacer(value);
        }

        var type = typeof value;
        if (value === null) {
          type = 'null';
        }

        //console.log("[DEBUG] Dispatch: ", value, "->", type, " -> ", "_" + type);

        return this['_' + type](value);
      },
      _object: function(object) {
        var pattern = (/\[object (.*)\]/i);
        var objString = Object.prototype.toString.call(object);
        var objType = pattern.exec(objString);
        if (!objType) { // object type did not match [object ...]
          objType = 'unknown:[' + objString + ']';
        } else {
          objType = objType[1]; // take only the class name
        }

        objType = objType.toLowerCase();

        var objectNumber = null;

        if ((objectNumber = context.indexOf(object)) >= 0) {
          return this.dispatch('[CIRCULAR:' + objectNumber + ']');
        } else {
          context.push(object);
        }

        if (typeof Buffer !== 'undefined' && Buffer.isBuffer && Buffer.isBuffer(object)) {
          write('buffer:');
          return write(object);
        }

        if(objType !== 'object' && objType !== 'function') {
          if(this['_' + objType]) {
            this['_' + objType](object);
          } else if (options.ignoreUnknown) {
            return write('[' + objType + ']');
          } else {
            throw new Error('Unknown object type "' + objType + '"');
          }
        }else{
          var keys = Object.keys(object);
          if (options.unorderedObjects) {
            keys = keys.sort();
          }
          // Make sure to incorporate special properties, so
          // Types with different prototypes will produce
          // a different hash and objects derived from
          // different functions (`new Foo`, `new Bar`) will
          // produce different hashes.
          // We never do this for native functions since some
          // seem to break because of that.
          if (options.respectType !== false && !isNativeFunction(object)) {
            keys.splice(0, 0, 'prototype', '__proto__', 'constructor');
          }

          if (options.excludeKeys) {
            keys = keys.filter(function(key) { return !options.excludeKeys(key); });
          }

          write('object:' + keys.length + ':');
          var self = this;
          return keys.forEach(function(key){
            self.dispatch(key);
            write(':');
            if(!options.excludeValues) {
              self.dispatch(object[key]);
            }
            write(',');
          });
        }
      },
      _array: function(arr, unordered){
        unordered = typeof unordered !== 'undefined' ? unordered :
          options.unorderedArrays !== false; // default to options.unorderedArrays

        var self = this;
        write('array:' + arr.length + ':');
        if (!unordered || arr.length <= 1) {
          return arr.forEach(function(entry) {
            return self.dispatch(entry);
          });
        }

        // the unordered case is a little more complicated:
        // since there is no canonical ordering on objects,
        // i.e. {a:1} < {a:2} and {a:1} > {a:2} are both false,
        // we first serialize each entry using a PassThrough stream
        // before sorting.
        // also: we can’t use the same context array for all entries
        // since the order of hashing should *not* matter. instead,
        // we keep track of the additions to a copy of the context array
        // and add all of them to the global context array when we’re done
        var contextAdditions = [];
        var entries = arr.map(function(entry) {
          var strm = new PassThrough();
          var localContext = context.slice(); // make copy
          var hasher = typeHasher(options, strm, localContext);
          hasher.dispatch(entry);
          // take only what was added to localContext and append it to contextAdditions
          contextAdditions = contextAdditions.concat(localContext.slice(context.length));
          return strm.read().toString();
        });
        context = context.concat(contextAdditions);
        entries.sort();
        return this._array(entries, false);
      },
      _date: function(date){
        return write('date:' + date.toJSON());
      },
      _symbol: function(sym){
        return write('symbol:' + sym.toString());
      },
      _error: function(err){
        return write('error:' + err.toString());
      },
      _boolean: function(bool){
        return write('bool:' + bool.toString());
      },
      _string: function(string){
        write('string:' + string.length + ':');
        write(string.toString());
      },
      _function: function(fn){
        write('fn:');
        if (isNativeFunction(fn)) {
          this.dispatch('[native]');
        } else {
          this.dispatch(fn.toString());
        }

        if (options.respectFunctionNames !== false) {
          // Make sure we can still distinguish native functions
          // by their name, otherwise String and Function will
          // have the same hash
          this.dispatch("function-name:" + String(fn.name));
        }

        if (options.respectFunctionProperties) {
          this._object(fn);
        }
      },
      _number: function(number){
        return write('number:' + number.toString());
      },
      _xml: function(xml){
        return write('xml:' + xml.toString());
      },
      _null: function() {
        return write('Null');
      },
      _undefined: function() {
        return write('Undefined');
      },
      _regexp: function(regex){
        return write('regex:' + regex.toString());
      },
      _uint8array: function(arr){
        write('uint8array:');
        return this.dispatch(Array.prototype.slice.call(arr));
      },
      _uint8clampedarray: function(arr){
        write('uint8clampedarray:');
        return this.dispatch(Array.prototype.slice.call(arr));
      },
      _int8array: function(arr){
        write('uint8array:');
        return this.dispatch(Array.prototype.slice.call(arr));
      },
      _uint16array: function(arr){
        write('uint16array:');
        return this.dispatch(Array.prototype.slice.call(arr));
      },
      _int16array: function(arr){
        write('uint16array:');
        return this.dispatch(Array.prototype.slice.call(arr));
      },
      _uint32array: function(arr){
        write('uint32array:');
        return this.dispatch(Array.prototype.slice.call(arr));
      },
      _int32array: function(arr){
        write('uint32array:');
        return this.dispatch(Array.prototype.slice.call(arr));
      },
      _float32array: function(arr){
        write('float32array:');
        return this.dispatch(Array.prototype.slice.call(arr));
      },
      _float64array: function(arr){
        write('float64array:');
        return this.dispatch(Array.prototype.slice.call(arr));
      },
      _arraybuffer: function(arr){
        write('arraybuffer:');
        return this.dispatch(new Uint8Array(arr));
      },
      _url: function(url) {
        return write('url:' + url.toString(), 'utf8');
      },
      _map: function(map) {
        write('map:');
        var arr = Array.from(map);
        return this._array(arr, options.unorderedSets !== false);
      },
      _set: function(set) {
        write('set:');
        var arr = Array.from(set);
        return this._array(arr, options.unorderedSets !== false);
      },
      _blob: function() {
        if (options.ignoreUnknown) {
          return write('[blob]');
        }

        throw Error('Hashing Blob objects is currently not supported\n' +
          '(see https://github.com/puleos/object-hash/issues/26)\n' +
          'Use "options.replacer" or "options.ignoreUnknown"\n');
      },
      _domwindow: function() { return write('domwindow'); },
      /* Node.js standard native objects */
      _process: function() { return write('process'); },
      _timer: function() { return write('timer'); },
      _pipe: function() { return write('pipe'); },
      _tcp: function() { return write('tcp'); },
      _udp: function() { return write('udp'); },
      _tty: function() { return write('tty'); },
      _statwatcher: function() { return write('statwatcher'); },
      _securecontext: function() { return write('securecontext'); },
      _connection: function() { return write('connection'); },
      _zlib: function() { return write('zlib'); },
      _context: function() { return write('context'); },
      _nodescript: function() { return write('nodescript'); },
      _httpparser: function() { return write('httpparser'); },
      _dataview: function() { return write('dataview'); },
      _signal: function() { return write('signal'); },
      _fsevent: function() { return write('fsevent'); },
      _tlswrap: function() { return write('tlswrap'); }
    };
  }

  // Mini-implementation of stream.PassThrough
  // We are far from having need for the full implementation, and we can
  // make assumptions like "many writes, then only one final read"
  // and we can ignore encoding specifics
  function PassThrough() {
    return {
      buf: '',

      write: function(b) {
        this.buf += b;
      },

      end: function(b) {
        this.buf += b;
      },

      read: function() {
        return this.buf;
      }
    };
  }
  });
  var objectHash_2 = objectHash_1.sha1;
  var objectHash_3 = objectHash_1.keys;
  var objectHash_4 = objectHash_1.MD5;
  var objectHash_5 = objectHash_1.keysMD5;
  var objectHash_6 = objectHash_1.writeToStream;

  var es5 = createCommonjsModule(function (module) {
  var isES5 = (function(){
      return this === undefined;
  })();

  if (isES5) {
      module.exports = {
          freeze: Object.freeze,
          defineProperty: Object.defineProperty,
          getDescriptor: Object.getOwnPropertyDescriptor,
          keys: Object.keys,
          names: Object.getOwnPropertyNames,
          getPrototypeOf: Object.getPrototypeOf,
          isArray: Array.isArray,
          isES5: isES5,
          propertyIsWritable: function(obj, prop) {
              var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
              return !!(!descriptor || descriptor.writable || descriptor.set);
          }
      };
  } else {
      var has = {}.hasOwnProperty;
      var str = {}.toString;
      var proto = {}.constructor.prototype;

      var ObjectKeys = function (o) {
          var ret = [];
          for (var key in o) {
              if (has.call(o, key)) {
                  ret.push(key);
              }
          }
          return ret;
      };

      var ObjectGetDescriptor = function(o, key) {
          return {value: o[key]};
      };

      var ObjectDefineProperty = function (o, key, desc) {
          o[key] = desc.value;
          return o;
      };

      var ObjectFreeze = function (obj) {
          return obj;
      };

      var ObjectGetPrototypeOf = function (obj) {
          try {
              return Object(obj).constructor.prototype;
          }
          catch (e) {
              return proto;
          }
      };

      var ArrayIsArray = function (obj) {
          try {
              return str.call(obj) === "[object Array]";
          }
          catch(e) {
              return false;
          }
      };

      module.exports = {
          isArray: ArrayIsArray,
          keys: ObjectKeys,
          names: ObjectKeys,
          defineProperty: ObjectDefineProperty,
          getDescriptor: ObjectGetDescriptor,
          freeze: ObjectFreeze,
          getPrototypeOf: ObjectGetPrototypeOf,
          isES5: isES5,
          propertyIsWritable: function() {
              return true;
          }
      };
  }
  });
  var es5_1 = es5.freeze;
  var es5_2 = es5.defineProperty;
  var es5_3 = es5.getDescriptor;
  var es5_4 = es5.keys;
  var es5_5 = es5.names;
  var es5_6 = es5.getPrototypeOf;
  var es5_7 = es5.isArray;
  var es5_8 = es5.isES5;
  var es5_9 = es5.propertyIsWritable;

  var canEvaluate = typeof navigator == "undefined";

  var errorObj = {e: {}};
  var tryCatchTarget;
  var globalObject = typeof self !== "undefined" ? self :
      typeof window !== "undefined" ? window :
      typeof commonjsGlobal !== "undefined" ? commonjsGlobal :
      commonjsGlobal !== undefined ? commonjsGlobal : null;

  function tryCatcher() {
      try {
          var target = tryCatchTarget;
          tryCatchTarget = null;
          return target.apply(this, arguments);
      } catch (e) {
          errorObj.e = e;
          return errorObj;
      }
  }
  function tryCatch(fn) {
      tryCatchTarget = fn;
      return tryCatcher;
  }

  var inherits = function(Child, Parent) {
      var hasProp = {}.hasOwnProperty;

      function T() {
          this.constructor = Child;
          this.constructor$ = Parent;
          for (var propertyName in Parent.prototype) {
              if (hasProp.call(Parent.prototype, propertyName) &&
                  propertyName.charAt(propertyName.length-1) !== "$"
             ) {
                  this[propertyName + "$"] = Parent.prototype[propertyName];
              }
          }
      }
      T.prototype = Parent.prototype;
      Child.prototype = new T();
      return Child.prototype;
  };


  function isPrimitive(val) {
      return val == null || val === true || val === false ||
          typeof val === "string" || typeof val === "number";

  }

  function isObject$2(value) {
      return typeof value === "function" ||
             typeof value === "object" && value !== null;
  }

  function maybeWrapAsError(maybeError) {
      if (!isPrimitive(maybeError)) return maybeError;

      return new Error(safeToString(maybeError));
  }

  function withAppended(target, appendee) {
      var len = target.length;
      var ret = new Array(len + 1);
      var i;
      for (i = 0; i < len; ++i) {
          ret[i] = target[i];
      }
      ret[i] = appendee;
      return ret;
  }

  function getDataPropertyOrDefault(obj, key, defaultValue) {
      if (es5.isES5) {
          var desc = Object.getOwnPropertyDescriptor(obj, key);

          if (desc != null) {
              return desc.get == null && desc.set == null
                      ? desc.value
                      : defaultValue;
          }
      } else {
          return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
      }
  }

  function notEnumerableProp(obj, name, value) {
      if (isPrimitive(obj)) return obj;
      var descriptor = {
          value: value,
          configurable: true,
          enumerable: false,
          writable: true
      };
      es5.defineProperty(obj, name, descriptor);
      return obj;
  }

  function thrower(r) {
      throw r;
  }

  var inheritedDataKeys = (function() {
      var excludedPrototypes = [
          Array.prototype,
          Object.prototype,
          Function.prototype
      ];

      var isExcludedProto = function(val) {
          for (var i = 0; i < excludedPrototypes.length; ++i) {
              if (excludedPrototypes[i] === val) {
                  return true;
              }
          }
          return false;
      };

      if (es5.isES5) {
          var getKeys = Object.getOwnPropertyNames;
          return function(obj) {
              var ret = [];
              var visitedKeys = Object.create(null);
              while (obj != null && !isExcludedProto(obj)) {
                  var keys;
                  try {
                      keys = getKeys(obj);
                  } catch (e) {
                      return ret;
                  }
                  for (var i = 0; i < keys.length; ++i) {
                      var key = keys[i];
                      if (visitedKeys[key]) continue;
                      visitedKeys[key] = true;
                      var desc = Object.getOwnPropertyDescriptor(obj, key);
                      if (desc != null && desc.get == null && desc.set == null) {
                          ret.push(key);
                      }
                  }
                  obj = es5.getPrototypeOf(obj);
              }
              return ret;
          };
      } else {
          var hasProp = {}.hasOwnProperty;
          return function(obj) {
              if (isExcludedProto(obj)) return [];
              var ret = [];

              /*jshint forin:false */
              enumeration: for (var key in obj) {
                  if (hasProp.call(obj, key)) {
                      ret.push(key);
                  } else {
                      for (var i = 0; i < excludedPrototypes.length; ++i) {
                          if (hasProp.call(excludedPrototypes[i], key)) {
                              continue enumeration;
                          }
                      }
                      ret.push(key);
                  }
              }
              return ret;
          };
      }

  })();

  var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
  function isClass(fn) {
      try {
          if (typeof fn === "function") {
              var keys = es5.names(fn.prototype);

              var hasMethods = es5.isES5 && keys.length > 1;
              var hasMethodsOtherThanConstructor = keys.length > 0 &&
                  !(keys.length === 1 && keys[0] === "constructor");
              var hasThisAssignmentAndStaticMethods =
                  thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

              if (hasMethods || hasMethodsOtherThanConstructor ||
                  hasThisAssignmentAndStaticMethods) {
                  return true;
              }
          }
          return false;
      } catch (e) {
          return false;
      }
  }

  function toFastProperties(obj) {
      return obj;
      eval(obj);
  }

  var rident = /^[a-z$_][a-z$_0-9]*$/i;
  function isIdentifier(str) {
      return rident.test(str);
  }

  function filledRange(count, prefix, suffix) {
      var ret = new Array(count);
      for(var i = 0; i < count; ++i) {
          ret[i] = prefix + i + suffix;
      }
      return ret;
  }

  function safeToString(obj) {
      try {
          return obj + "";
      } catch (e) {
          return "[no string representation]";
      }
  }

  function isError(obj) {
      return obj instanceof Error ||
          (obj !== null &&
             typeof obj === "object" &&
             typeof obj.message === "string" &&
             typeof obj.name === "string");
  }

  function markAsOriginatingFromRejection(e) {
      try {
          notEnumerableProp(e, "isOperational", true);
      }
      catch(ignore) {}
  }

  function originatesFromRejection(e) {
      if (e == null) return false;
      return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
          e["isOperational"] === true);
  }

  function canAttachTrace(obj) {
      return isError(obj) && es5.propertyIsWritable(obj, "stack");
  }

  var ensureErrorObject = (function() {
      if (!("stack" in new Error())) {
          return function(value) {
              if (canAttachTrace(value)) return value;
              try {throw new Error(safeToString(value));}
              catch(err) {return err;}
          };
      } else {
          return function(value) {
              if (canAttachTrace(value)) return value;
              return new Error(safeToString(value));
          };
      }
  })();

  function classString(obj) {
      return {}.toString.call(obj);
  }

  function copyDescriptors(from, to, filter) {
      var keys = es5.names(from);
      for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (filter(key)) {
              try {
                  es5.defineProperty(to, key, es5.getDescriptor(from, key));
              } catch (ignore) {}
          }
      }
  }

  var asArray = function(v) {
      if (es5.isArray(v)) {
          return v;
      }
      return null;
  };

  if (typeof Symbol !== "undefined" && Symbol.iterator) {
      var ArrayFrom = typeof Array.from === "function" ? function(v) {
          return Array.from(v);
      } : function(v) {
          var ret = [];
          var it = v[Symbol.iterator]();
          var itResult;
          while (!((itResult = it.next()).done)) {
              ret.push(itResult.value);
          }
          return ret;
      };

      asArray = function(v) {
          if (es5.isArray(v)) {
              return v;
          } else if (v != null && typeof v[Symbol.iterator] === "function") {
              return ArrayFrom(v);
          }
          return null;
      };
  }

  var isNode = typeof process !== "undefined" &&
          classString(process).toLowerCase() === "[object process]";

  var hasEnvVariables = typeof process !== "undefined" &&
      typeof process.env !== "undefined";

  function env$1(key) {
      return hasEnvVariables ? process.env[key] : undefined;
  }

  function getNativePromise() {
      if (typeof Promise === "function") {
          try {
              var promise = new Promise(function(){});
              if ({}.toString.call(promise) === "[object Promise]") {
                  return Promise;
              }
          } catch (e) {}
      }
  }

  function domainBind(self, cb) {
      return self.bind(cb);
  }

  var ret = {
      isClass: isClass,
      isIdentifier: isIdentifier,
      inheritedDataKeys: inheritedDataKeys,
      getDataPropertyOrDefault: getDataPropertyOrDefault,
      thrower: thrower,
      isArray: es5.isArray,
      asArray: asArray,
      notEnumerableProp: notEnumerableProp,
      isPrimitive: isPrimitive,
      isObject: isObject$2,
      isError: isError,
      canEvaluate: canEvaluate,
      errorObj: errorObj,
      tryCatch: tryCatch,
      inherits: inherits,
      withAppended: withAppended,
      maybeWrapAsError: maybeWrapAsError,
      toFastProperties: toFastProperties,
      filledRange: filledRange,
      toString: safeToString,
      canAttachTrace: canAttachTrace,
      ensureErrorObject: ensureErrorObject,
      originatesFromRejection: originatesFromRejection,
      markAsOriginatingFromRejection: markAsOriginatingFromRejection,
      classString: classString,
      copyDescriptors: copyDescriptors,
      hasDevTools: typeof chrome !== "undefined" && chrome &&
                   typeof chrome.loadTimes === "function",
      isNode: isNode,
      hasEnvVariables: hasEnvVariables,
      env: env$1,
      global: globalObject,
      getNativePromise: getNativePromise,
      domainBind: domainBind
  };
  ret.isRecentNode = ret.isNode && (function() {
      var version;
      if (process.versions && process.versions.node) {    
          version = process.versions.node.split(".").map(Number);
      } else if (process.version) {
          version = process.version.split(".").map(Number);
      }
      return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
  })();

  if (ret.isNode) ret.toFastProperties(process);

  try {throw new Error(); } catch (e) {ret.lastLineError = e;}
  var util = ret;

  var schedule;
  var noAsyncScheduler = function() {
      throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
  };
  var NativePromise = util.getNativePromise();
  if (util.isNode && typeof MutationObserver === "undefined") {
      var GlobalSetImmediate = commonjsGlobal.setImmediate;
      var ProcessNextTick = process.nextTick;
      schedule = util.isRecentNode
                  ? function(fn) { GlobalSetImmediate.call(commonjsGlobal, fn); }
                  : function(fn) { ProcessNextTick.call(process, fn); };
  } else if (typeof NativePromise === "function" &&
             typeof NativePromise.resolve === "function") {
      var nativePromise = NativePromise.resolve();
      schedule = function(fn) {
          nativePromise.then(fn);
      };
  } else if ((typeof MutationObserver !== "undefined") &&
            !(typeof window !== "undefined" &&
              window.navigator &&
              (window.navigator.standalone || window.cordova))) {
      schedule = (function() {
          var div = document.createElement("div");
          var opts = {attributes: true};
          var toggleScheduled = false;
          var div2 = document.createElement("div");
          var o2 = new MutationObserver(function() {
              div.classList.toggle("foo");
              toggleScheduled = false;
          });
          o2.observe(div2, opts);

          var scheduleToggle = function() {
              if (toggleScheduled) return;
              toggleScheduled = true;
              div2.classList.toggle("foo");
          };

          return function schedule(fn) {
              var o = new MutationObserver(function() {
                  o.disconnect();
                  fn();
              });
              o.observe(div, opts);
              scheduleToggle();
          };
      })();
  } else if (typeof setImmediate !== "undefined") {
      schedule = function (fn) {
          setImmediate(fn);
      };
  } else if (typeof setTimeout !== "undefined") {
      schedule = function (fn) {
          setTimeout(fn, 0);
      };
  } else {
      schedule = noAsyncScheduler;
  }
  var schedule_1 = schedule;

  function arrayMove(src, srcIndex, dst, dstIndex, len) {
      for (var j = 0; j < len; ++j) {
          dst[j + dstIndex] = src[j + srcIndex];
          src[j + srcIndex] = void 0;
      }
  }

  function Queue(capacity) {
      this._capacity = capacity;
      this._length = 0;
      this._front = 0;
  }

  Queue.prototype._willBeOverCapacity = function (size) {
      return this._capacity < size;
  };

  Queue.prototype._pushOne = function (arg) {
      var length = this.length();
      this._checkCapacity(length + 1);
      var i = (this._front + length) & (this._capacity - 1);
      this[i] = arg;
      this._length = length + 1;
  };

  Queue.prototype.push = function (fn, receiver, arg) {
      var length = this.length() + 3;
      if (this._willBeOverCapacity(length)) {
          this._pushOne(fn);
          this._pushOne(receiver);
          this._pushOne(arg);
          return;
      }
      var j = this._front + length - 3;
      this._checkCapacity(length);
      var wrapMask = this._capacity - 1;
      this[(j + 0) & wrapMask] = fn;
      this[(j + 1) & wrapMask] = receiver;
      this[(j + 2) & wrapMask] = arg;
      this._length = length;
  };

  Queue.prototype.shift = function () {
      var front = this._front,
          ret = this[front];

      this[front] = undefined;
      this._front = (front + 1) & (this._capacity - 1);
      this._length--;
      return ret;
  };

  Queue.prototype.length = function () {
      return this._length;
  };

  Queue.prototype._checkCapacity = function (size) {
      if (this._capacity < size) {
          this._resizeTo(this._capacity << 1);
      }
  };

  Queue.prototype._resizeTo = function (capacity) {
      var oldCapacity = this._capacity;
      this._capacity = capacity;
      var front = this._front;
      var length = this._length;
      var moveItemsCount = (front + length) & (oldCapacity - 1);
      arrayMove(this, 0, this, oldCapacity, moveItemsCount);
  };

  var queue = Queue;

  var firstLineError;
  try {throw new Error(); } catch (e) {firstLineError = e;}




  function Async() {
      this._customScheduler = false;
      this._isTickUsed = false;
      this._lateQueue = new queue(16);
      this._normalQueue = new queue(16);
      this._haveDrainedQueues = false;
      this._trampolineEnabled = true;
      var self = this;
      this.drainQueues = function () {
          self._drainQueues();
      };
      this._schedule = schedule_1;
  }

  Async.prototype.setScheduler = function(fn) {
      var prev = this._schedule;
      this._schedule = fn;
      this._customScheduler = true;
      return prev;
  };

  Async.prototype.hasCustomScheduler = function() {
      return this._customScheduler;
  };

  Async.prototype.enableTrampoline = function() {
      this._trampolineEnabled = true;
  };

  Async.prototype.disableTrampolineIfNecessary = function() {
      if (util.hasDevTools) {
          this._trampolineEnabled = false;
      }
  };

  Async.prototype.haveItemsQueued = function () {
      return this._isTickUsed || this._haveDrainedQueues;
  };


  Async.prototype.fatalError = function(e, isNode) {
      if (isNode) {
          process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
              "\n");
          process.exit(2);
      } else {
          this.throwLater(e);
      }
  };

  Async.prototype.throwLater = function(fn, arg) {
      if (arguments.length === 1) {
          arg = fn;
          fn = function () { throw arg; };
      }
      if (typeof setTimeout !== "undefined") {
          setTimeout(function() {
              fn(arg);
          }, 0);
      } else try {
          this._schedule(function() {
              fn(arg);
          });
      } catch (e) {
          throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
  };

  function AsyncInvokeLater(fn, receiver, arg) {
      this._lateQueue.push(fn, receiver, arg);
      this._queueTick();
  }

  function AsyncInvoke(fn, receiver, arg) {
      this._normalQueue.push(fn, receiver, arg);
      this._queueTick();
  }

  function AsyncSettlePromises(promise) {
      this._normalQueue._pushOne(promise);
      this._queueTick();
  }

  if (!util.hasDevTools) {
      Async.prototype.invokeLater = AsyncInvokeLater;
      Async.prototype.invoke = AsyncInvoke;
      Async.prototype.settlePromises = AsyncSettlePromises;
  } else {
      Async.prototype.invokeLater = function (fn, receiver, arg) {
          if (this._trampolineEnabled) {
              AsyncInvokeLater.call(this, fn, receiver, arg);
          } else {
              this._schedule(function() {
                  setTimeout(function() {
                      fn.call(receiver, arg);
                  }, 100);
              });
          }
      };

      Async.prototype.invoke = function (fn, receiver, arg) {
          if (this._trampolineEnabled) {
              AsyncInvoke.call(this, fn, receiver, arg);
          } else {
              this._schedule(function() {
                  fn.call(receiver, arg);
              });
          }
      };

      Async.prototype.settlePromises = function(promise) {
          if (this._trampolineEnabled) {
              AsyncSettlePromises.call(this, promise);
          } else {
              this._schedule(function() {
                  promise._settlePromises();
              });
          }
      };
  }

  function _drainQueue(queue) {
      while (queue.length() > 0) {
          _drainQueueStep(queue);
      }
  }

  function _drainQueueStep(queue) {
      var fn = queue.shift();
      if (typeof fn !== "function") {
          fn._settlePromises();
      } else {
          var receiver = queue.shift();
          var arg = queue.shift();
          fn.call(receiver, arg);
      }
  }

  Async.prototype._drainQueues = function () {
      _drainQueue(this._normalQueue);
      this._reset();
      this._haveDrainedQueues = true;
      _drainQueue(this._lateQueue);
  };

  Async.prototype._queueTick = function () {
      if (!this._isTickUsed) {
          this._isTickUsed = true;
          this._schedule(this.drainQueues);
      }
  };

  Async.prototype._reset = function () {
      this._isTickUsed = false;
  };

  var async = Async;
  var firstLineError_1 = firstLineError;
  async.firstLineError = firstLineError_1;

  var Objectfreeze = es5.freeze;

  var inherits$1 = util.inherits;
  var notEnumerableProp$1 = util.notEnumerableProp;

  function subError(nameProperty, defaultMessage) {
      function SubError(message) {
          if (!(this instanceof SubError)) return new SubError(message);
          notEnumerableProp$1(this, "message",
              typeof message === "string" ? message : defaultMessage);
          notEnumerableProp$1(this, "name", nameProperty);
          if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
          } else {
              Error.call(this);
          }
      }
      inherits$1(SubError, Error);
      return SubError;
  }

  var _TypeError, _RangeError;
  var Warning = subError("Warning", "warning");
  var CancellationError = subError("CancellationError", "cancellation error");
  var TimeoutError = subError("TimeoutError", "timeout error");
  var AggregateError = subError("AggregateError", "aggregate error");
  try {
      _TypeError = TypeError;
      _RangeError = RangeError;
  } catch(e) {
      _TypeError = subError("TypeError", "type error");
      _RangeError = subError("RangeError", "range error");
  }

  var methods = ("join pop push shift unshift slice filter forEach some " +
      "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

  for (var i = 0; i < methods.length; ++i) {
      if (typeof Array.prototype[methods[i]] === "function") {
          AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
      }
  }

  es5.defineProperty(AggregateError.prototype, "length", {
      value: 0,
      configurable: false,
      writable: true,
      enumerable: true
  });
  AggregateError.prototype["isOperational"] = true;
  var level = 0;
  AggregateError.prototype.toString = function() {
      var indent = Array(level * 4 + 1).join(" ");
      var ret = "\n" + indent + "AggregateError of:" + "\n";
      level++;
      indent = Array(level * 4 + 1).join(" ");
      for (var i = 0; i < this.length; ++i) {
          var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
          var lines = str.split("\n");
          for (var j = 0; j < lines.length; ++j) {
              lines[j] = indent + lines[j];
          }
          str = lines.join("\n");
          ret += str + "\n";
      }
      level--;
      return ret;
  };

  function OperationalError(message) {
      if (!(this instanceof OperationalError))
          return new OperationalError(message);
      notEnumerableProp$1(this, "name", "OperationalError");
      notEnumerableProp$1(this, "message", message);
      this.cause = message;
      this["isOperational"] = true;

      if (message instanceof Error) {
          notEnumerableProp$1(this, "message", message.message);
          notEnumerableProp$1(this, "stack", message.stack);
      } else if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
      }

  }
  inherits$1(OperationalError, Error);

  var errorTypes = Error["__BluebirdErrorTypes__"];
  if (!errorTypes) {
      errorTypes = Objectfreeze({
          CancellationError: CancellationError,
          TimeoutError: TimeoutError,
          OperationalError: OperationalError,
          RejectionError: OperationalError,
          AggregateError: AggregateError
      });
      es5.defineProperty(Error, "__BluebirdErrorTypes__", {
          value: errorTypes,
          writable: false,
          enumerable: false,
          configurable: false
      });
  }

  var errors = {
      Error: Error,
      TypeError: _TypeError,
      RangeError: _RangeError,
      CancellationError: errorTypes.CancellationError,
      OperationalError: errorTypes.OperationalError,
      TimeoutError: errorTypes.TimeoutError,
      AggregateError: errorTypes.AggregateError,
      Warning: Warning
  };

  var thenables = function(Promise, INTERNAL) {
  var util$1 = util;
  var errorObj = util$1.errorObj;
  var isObject = util$1.isObject;

  function tryConvertToPromise(obj, context) {
      if (isObject(obj)) {
          if (obj instanceof Promise) return obj;
          var then = getThen(obj);
          if (then === errorObj) {
              if (context) context._pushContext();
              var ret = Promise.reject(then.e);
              if (context) context._popContext();
              return ret;
          } else if (typeof then === "function") {
              if (isAnyBluebirdPromise(obj)) {
                  var ret = new Promise(INTERNAL);
                  obj._then(
                      ret._fulfill,
                      ret._reject,
                      undefined,
                      ret,
                      null
                  );
                  return ret;
              }
              return doThenable(obj, then, context);
          }
      }
      return obj;
  }

  function doGetThen(obj) {
      return obj.then;
  }

  function getThen(obj) {
      try {
          return doGetThen(obj);
      } catch (e) {
          errorObj.e = e;
          return errorObj;
      }
  }

  var hasProp = {}.hasOwnProperty;
  function isAnyBluebirdPromise(obj) {
      try {
          return hasProp.call(obj, "_promise0");
      } catch (e) {
          return false;
      }
  }

  function doThenable(x, then, context) {
      var promise = new Promise(INTERNAL);
      var ret = promise;
      if (context) context._pushContext();
      promise._captureStackTrace();
      if (context) context._popContext();
      var synchronous = true;
      var result = util$1.tryCatch(then).call(x, resolve, reject);
      synchronous = false;

      if (promise && result === errorObj) {
          promise._rejectCallback(result.e, true, true);
          promise = null;
      }

      function resolve(value) {
          if (!promise) return;
          promise._resolveCallback(value);
          promise = null;
      }

      function reject(reason) {
          if (!promise) return;
          promise._rejectCallback(reason, synchronous, true);
          promise = null;
      }
      return ret;
  }

  return tryConvertToPromise;
  };

  var promise_array = function(Promise, INTERNAL, tryConvertToPromise,
      apiRejection, Proxyable) {
  var util$1 = util;

  function toResolutionValue(val) {
      switch(val) {
      case -2: return [];
      case -3: return {};
      case -6: return new Map();
      }
  }

  function PromiseArray(values) {
      var promise = this._promise = new Promise(INTERNAL);
      if (values instanceof Promise) {
          promise._propagateFrom(values, 3);
      }
      promise._setOnCancel(this);
      this._values = values;
      this._length = 0;
      this._totalResolved = 0;
      this._init(undefined, -2);
  }
  util$1.inherits(PromiseArray, Proxyable);

  PromiseArray.prototype.length = function () {
      return this._length;
  };

  PromiseArray.prototype.promise = function () {
      return this._promise;
  };

  PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
      var values = tryConvertToPromise(this._values, this._promise);
      if (values instanceof Promise) {
          values = values._target();
          var bitField = values._bitField;
          this._values = values;

          if (((bitField & 50397184) === 0)) {
              this._promise._setAsyncGuaranteed();
              return values._then(
                  init,
                  this._reject,
                  undefined,
                  this,
                  resolveValueIfEmpty
             );
          } else if (((bitField & 33554432) !== 0)) {
              values = values._value();
          } else if (((bitField & 16777216) !== 0)) {
              return this._reject(values._reason());
          } else {
              return this._cancel();
          }
      }
      values = util$1.asArray(values);
      if (values === null) {
          var err = apiRejection(
              "expecting an array or an iterable object but got " + util$1.classString(values)).reason();
          this._promise._rejectCallback(err, false);
          return;
      }

      if (values.length === 0) {
          if (resolveValueIfEmpty === -5) {
              this._resolveEmptyArray();
          }
          else {
              this._resolve(toResolutionValue(resolveValueIfEmpty));
          }
          return;
      }
      this._iterate(values);
  };

  PromiseArray.prototype._iterate = function(values) {
      var len = this.getActualLength(values.length);
      this._length = len;
      this._values = this.shouldCopyValues() ? new Array(len) : this._values;
      var result = this._promise;
      var isResolved = false;
      var bitField = null;
      for (var i = 0; i < len; ++i) {
          var maybePromise = tryConvertToPromise(values[i], result);

          if (maybePromise instanceof Promise) {
              maybePromise = maybePromise._target();
              bitField = maybePromise._bitField;
          } else {
              bitField = null;
          }

          if (isResolved) {
              if (bitField !== null) {
                  maybePromise.suppressUnhandledRejections();
              }
          } else if (bitField !== null) {
              if (((bitField & 50397184) === 0)) {
                  maybePromise._proxy(this, i);
                  this._values[i] = maybePromise;
              } else if (((bitField & 33554432) !== 0)) {
                  isResolved = this._promiseFulfilled(maybePromise._value(), i);
              } else if (((bitField & 16777216) !== 0)) {
                  isResolved = this._promiseRejected(maybePromise._reason(), i);
              } else {
                  isResolved = this._promiseCancelled(i);
              }
          } else {
              isResolved = this._promiseFulfilled(maybePromise, i);
          }
      }
      if (!isResolved) result._setAsyncGuaranteed();
  };

  PromiseArray.prototype._isResolved = function () {
      return this._values === null;
  };

  PromiseArray.prototype._resolve = function (value) {
      this._values = null;
      this._promise._fulfill(value);
  };

  PromiseArray.prototype._cancel = function() {
      if (this._isResolved() || !this._promise._isCancellable()) return;
      this._values = null;
      this._promise._cancel();
  };

  PromiseArray.prototype._reject = function (reason) {
      this._values = null;
      this._promise._rejectCallback(reason, false);
  };

  PromiseArray.prototype._promiseFulfilled = function (value, index) {
      this._values[index] = value;
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= this._length) {
          this._resolve(this._values);
          return true;
      }
      return false;
  };

  PromiseArray.prototype._promiseCancelled = function() {
      this._cancel();
      return true;
  };

  PromiseArray.prototype._promiseRejected = function (reason) {
      this._totalResolved++;
      this._reject(reason);
      return true;
  };

  PromiseArray.prototype._resultCancelled = function() {
      if (this._isResolved()) return;
      var values = this._values;
      this._cancel();
      if (values instanceof Promise) {
          values.cancel();
      } else {
          for (var i = 0; i < values.length; ++i) {
              if (values[i] instanceof Promise) {
                  values[i].cancel();
              }
          }
      }
  };

  PromiseArray.prototype.shouldCopyValues = function () {
      return true;
  };

  PromiseArray.prototype.getActualLength = function (len) {
      return len;
  };

  return PromiseArray;
  };

  var context = function(Promise) {
  var longStackTraces = false;
  var contextStack = [];

  Promise.prototype._promiseCreated = function() {};
  Promise.prototype._pushContext = function() {};
  Promise.prototype._popContext = function() {return null;};
  Promise._peekContext = Promise.prototype._peekContext = function() {};

  function Context() {
      this._trace = new Context.CapturedTrace(peekContext());
  }
  Context.prototype._pushContext = function () {
      if (this._trace !== undefined) {
          this._trace._promiseCreated = null;
          contextStack.push(this._trace);
      }
  };

  Context.prototype._popContext = function () {
      if (this._trace !== undefined) {
          var trace = contextStack.pop();
          var ret = trace._promiseCreated;
          trace._promiseCreated = null;
          return ret;
      }
      return null;
  };

  function createContext() {
      if (longStackTraces) return new Context();
  }

  function peekContext() {
      var lastIndex = contextStack.length - 1;
      if (lastIndex >= 0) {
          return contextStack[lastIndex];
      }
      return undefined;
  }
  Context.CapturedTrace = null;
  Context.create = createContext;
  Context.deactivateLongStackTraces = function() {};
  Context.activateLongStackTraces = function() {
      var Promise_pushContext = Promise.prototype._pushContext;
      var Promise_popContext = Promise.prototype._popContext;
      var Promise_PeekContext = Promise._peekContext;
      var Promise_peekContext = Promise.prototype._peekContext;
      var Promise_promiseCreated = Promise.prototype._promiseCreated;
      Context.deactivateLongStackTraces = function() {
          Promise.prototype._pushContext = Promise_pushContext;
          Promise.prototype._popContext = Promise_popContext;
          Promise._peekContext = Promise_PeekContext;
          Promise.prototype._peekContext = Promise_peekContext;
          Promise.prototype._promiseCreated = Promise_promiseCreated;
          longStackTraces = false;
      };
      longStackTraces = true;
      Promise.prototype._pushContext = Context.prototype._pushContext;
      Promise.prototype._popContext = Context.prototype._popContext;
      Promise._peekContext = Promise.prototype._peekContext = peekContext;
      Promise.prototype._promiseCreated = function() {
          var ctx = this._peekContext();
          if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
      };
  };
  return Context;
  };

  var debuggability = function(Promise, Context) {
  var getDomain = Promise._getDomain;
  var async = Promise._async;
  var Warning = errors.Warning;
  var util$1 = util;
  var es5$1 = es5;
  var canAttachTrace = util$1.canAttachTrace;
  var unhandledRejectionHandled;
  var possiblyUnhandledRejection;
  var bluebirdFramePattern =
      /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
  var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
  var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
  var stackFramePattern = null;
  var formatStack = null;
  var indentStackFrames = false;
  var printWarning;
  var debugging = !!(util$1.env("BLUEBIRD_DEBUG") != 0 &&
                          (util$1.env("BLUEBIRD_DEBUG") ||
                           util$1.env("NODE_ENV") === "development"));

  var warnings = !!(util$1.env("BLUEBIRD_WARNINGS") != 0 &&
      (debugging || util$1.env("BLUEBIRD_WARNINGS")));

  var longStackTraces = !!(util$1.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
      (debugging || util$1.env("BLUEBIRD_LONG_STACK_TRACES")));

  var wForgottenReturn = util$1.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
      (warnings || !!util$1.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

  Promise.prototype.suppressUnhandledRejections = function() {
      var target = this._target();
      target._bitField = ((target._bitField & (~1048576)) |
                        524288);
  };

  Promise.prototype._ensurePossibleRejectionHandled = function () {
      if ((this._bitField & 524288) !== 0) return;
      this._setRejectionIsUnhandled();
      var self = this;
      setTimeout(function() {
          self._notifyUnhandledRejection();
      }, 1);
  };

  Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
      fireRejectionEvent("rejectionHandled",
                                    unhandledRejectionHandled, undefined, this);
  };

  Promise.prototype._setReturnedNonUndefined = function() {
      this._bitField = this._bitField | 268435456;
  };

  Promise.prototype._returnedNonUndefined = function() {
      return (this._bitField & 268435456) !== 0;
  };

  Promise.prototype._notifyUnhandledRejection = function () {
      if (this._isRejectionUnhandled()) {
          var reason = this._settledValue();
          this._setUnhandledRejectionIsNotified();
          fireRejectionEvent("unhandledRejection",
                                        possiblyUnhandledRejection, reason, this);
      }
  };

  Promise.prototype._setUnhandledRejectionIsNotified = function () {
      this._bitField = this._bitField | 262144;
  };

  Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
      this._bitField = this._bitField & (~262144);
  };

  Promise.prototype._isUnhandledRejectionNotified = function () {
      return (this._bitField & 262144) > 0;
  };

  Promise.prototype._setRejectionIsUnhandled = function () {
      this._bitField = this._bitField | 1048576;
  };

  Promise.prototype._unsetRejectionIsUnhandled = function () {
      this._bitField = this._bitField & (~1048576);
      if (this._isUnhandledRejectionNotified()) {
          this._unsetUnhandledRejectionIsNotified();
          this._notifyUnhandledRejectionIsHandled();
      }
  };

  Promise.prototype._isRejectionUnhandled = function () {
      return (this._bitField & 1048576) > 0;
  };

  Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
      return warn(message, shouldUseOwnTrace, promise || this);
  };

  Promise.onPossiblyUnhandledRejection = function (fn) {
      var domain = getDomain();
      possiblyUnhandledRejection =
          typeof fn === "function" ? (domain === null ?
                                              fn : util$1.domainBind(domain, fn))
                                   : undefined;
  };

  Promise.onUnhandledRejectionHandled = function (fn) {
      var domain = getDomain();
      unhandledRejectionHandled =
          typeof fn === "function" ? (domain === null ?
                                              fn : util$1.domainBind(domain, fn))
                                   : undefined;
  };

  var disableLongStackTraces = function() {};
  Promise.longStackTraces = function () {
      if (async.haveItemsQueued() && !config.longStackTraces) {
          throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      if (!config.longStackTraces && longStackTracesIsSupported()) {
          var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
          var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
          var Promise_dereferenceTrace = Promise.prototype._dereferenceTrace;
          config.longStackTraces = true;
          disableLongStackTraces = function() {
              if (async.haveItemsQueued() && !config.longStackTraces) {
                  throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              }
              Promise.prototype._captureStackTrace = Promise_captureStackTrace;
              Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
              Promise.prototype._dereferenceTrace = Promise_dereferenceTrace;
              Context.deactivateLongStackTraces();
              async.enableTrampoline();
              config.longStackTraces = false;
          };
          Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
          Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
          Promise.prototype._dereferenceTrace = longStackTracesDereferenceTrace;
          Context.activateLongStackTraces();
          async.disableTrampolineIfNecessary();
      }
  };

  Promise.hasLongStackTraces = function () {
      return config.longStackTraces && longStackTracesIsSupported();
  };

  var fireDomEvent = (function() {
      try {
          if (typeof CustomEvent === "function") {
              var event = new CustomEvent("CustomEvent");
              util$1.global.dispatchEvent(event);
              return function(name, event) {
                  var eventData = {
                      detail: event,
                      cancelable: true
                  };
                  es5$1.defineProperty(
                      eventData, "promise", {value: event.promise});
                  es5$1.defineProperty(eventData, "reason", {value: event.reason});
                  var domEvent = new CustomEvent(name.toLowerCase(), eventData);
                  return !util$1.global.dispatchEvent(domEvent);
              };
          } else if (typeof Event === "function") {
              var event = new Event("CustomEvent");
              util$1.global.dispatchEvent(event);
              return function(name, event) {
                  var domEvent = new Event(name.toLowerCase(), {
                      cancelable: true
                  });
                  domEvent.detail = event;
                  es5$1.defineProperty(domEvent, "promise", {value: event.promise});
                  es5$1.defineProperty(domEvent, "reason", {value: event.reason});
                  return !util$1.global.dispatchEvent(domEvent);
              };
          } else {
              var event = document.createEvent("CustomEvent");
              event.initCustomEvent("testingtheevent", false, true, {});
              util$1.global.dispatchEvent(event);
              return function(name, event) {
                  var domEvent = document.createEvent("CustomEvent");
                  domEvent.initCustomEvent(name.toLowerCase(), false, true,
                      event);
                  return !util$1.global.dispatchEvent(domEvent);
              };
          }
      } catch (e) {}
      return function() {
          return false;
      };
  })();

  var fireGlobalEvent = (function() {
      if (util$1.isNode) {
          return function() {
              return process.emit.apply(process, arguments);
          };
      } else {
          if (!util$1.global) {
              return function() {
                  return false;
              };
          }
          return function(name) {
              var methodName = "on" + name.toLowerCase();
              var method = util$1.global[methodName];
              if (!method) return false;
              method.apply(util$1.global, [].slice.call(arguments, 1));
              return true;
          };
      }
  })();

  function generatePromiseLifecycleEventObject(name, promise) {
      return {promise: promise};
  }

  var eventToObjectGenerator = {
      promiseCreated: generatePromiseLifecycleEventObject,
      promiseFulfilled: generatePromiseLifecycleEventObject,
      promiseRejected: generatePromiseLifecycleEventObject,
      promiseResolved: generatePromiseLifecycleEventObject,
      promiseCancelled: generatePromiseLifecycleEventObject,
      promiseChained: function(name, promise, child) {
          return {promise: promise, child: child};
      },
      warning: function(name, warning) {
          return {warning: warning};
      },
      unhandledRejection: function (name, reason, promise) {
          return {reason: reason, promise: promise};
      },
      rejectionHandled: generatePromiseLifecycleEventObject
  };

  var activeFireEvent = function (name) {
      var globalEventFired = false;
      try {
          globalEventFired = fireGlobalEvent.apply(null, arguments);
      } catch (e) {
          async.throwLater(e);
          globalEventFired = true;
      }

      var domEventFired = false;
      try {
          domEventFired = fireDomEvent(name,
                      eventToObjectGenerator[name].apply(null, arguments));
      } catch (e) {
          async.throwLater(e);
          domEventFired = true;
      }

      return domEventFired || globalEventFired;
  };

  Promise.config = function(opts) {
      opts = Object(opts);
      if ("longStackTraces" in opts) {
          if (opts.longStackTraces) {
              Promise.longStackTraces();
          } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
              disableLongStackTraces();
          }
      }
      if ("warnings" in opts) {
          var warningsOption = opts.warnings;
          config.warnings = !!warningsOption;
          wForgottenReturn = config.warnings;

          if (util$1.isObject(warningsOption)) {
              if ("wForgottenReturn" in warningsOption) {
                  wForgottenReturn = !!warningsOption.wForgottenReturn;
              }
          }
      }
      if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
          if (async.haveItemsQueued()) {
              throw new Error(
                  "cannot enable cancellation after promises are in use");
          }
          Promise.prototype._clearCancellationData =
              cancellationClearCancellationData;
          Promise.prototype._propagateFrom = cancellationPropagateFrom;
          Promise.prototype._onCancel = cancellationOnCancel;
          Promise.prototype._setOnCancel = cancellationSetOnCancel;
          Promise.prototype._attachCancellationCallback =
              cancellationAttachCancellationCallback;
          Promise.prototype._execute = cancellationExecute;
          propagateFromFunction = cancellationPropagateFrom;
          config.cancellation = true;
      }
      if ("monitoring" in opts) {
          if (opts.monitoring && !config.monitoring) {
              config.monitoring = true;
              Promise.prototype._fireEvent = activeFireEvent;
          } else if (!opts.monitoring && config.monitoring) {
              config.monitoring = false;
              Promise.prototype._fireEvent = defaultFireEvent;
          }
      }
      return Promise;
  };

  function defaultFireEvent() { return false; }

  Promise.prototype._fireEvent = defaultFireEvent;
  Promise.prototype._execute = function(executor, resolve, reject) {
      try {
          executor(resolve, reject);
      } catch (e) {
          return e;
      }
  };
  Promise.prototype._onCancel = function () {};
  Promise.prototype._setOnCancel = function (handler) { };
  Promise.prototype._attachCancellationCallback = function(onCancel) {
  };
  Promise.prototype._captureStackTrace = function () {};
  Promise.prototype._attachExtraTrace = function () {};
  Promise.prototype._dereferenceTrace = function () {};
  Promise.prototype._clearCancellationData = function() {};
  Promise.prototype._propagateFrom = function (parent, flags) {
  };

  function cancellationExecute(executor, resolve, reject) {
      var promise = this;
      try {
          executor(resolve, reject, function(onCancel) {
              if (typeof onCancel !== "function") {
                  throw new TypeError("onCancel must be a function, got: " +
                                      util$1.toString(onCancel));
              }
              promise._attachCancellationCallback(onCancel);
          });
      } catch (e) {
          return e;
      }
  }

  function cancellationAttachCancellationCallback(onCancel) {
      if (!this._isCancellable()) return this;

      var previousOnCancel = this._onCancel();
      if (previousOnCancel !== undefined) {
          if (util$1.isArray(previousOnCancel)) {
              previousOnCancel.push(onCancel);
          } else {
              this._setOnCancel([previousOnCancel, onCancel]);
          }
      } else {
          this._setOnCancel(onCancel);
      }
  }

  function cancellationOnCancel() {
      return this._onCancelField;
  }

  function cancellationSetOnCancel(onCancel) {
      this._onCancelField = onCancel;
  }

  function cancellationClearCancellationData() {
      this._cancellationParent = undefined;
      this._onCancelField = undefined;
  }

  function cancellationPropagateFrom(parent, flags) {
      if ((flags & 1) !== 0) {
          this._cancellationParent = parent;
          var branchesRemainingToCancel = parent._branchesRemainingToCancel;
          if (branchesRemainingToCancel === undefined) {
              branchesRemainingToCancel = 0;
          }
          parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
      }
      if ((flags & 2) !== 0 && parent._isBound()) {
          this._setBoundTo(parent._boundTo);
      }
  }

  function bindingPropagateFrom(parent, flags) {
      if ((flags & 2) !== 0 && parent._isBound()) {
          this._setBoundTo(parent._boundTo);
      }
  }
  var propagateFromFunction = bindingPropagateFrom;

  function boundValueFunction() {
      var ret = this._boundTo;
      if (ret !== undefined) {
          if (ret instanceof Promise) {
              if (ret.isFulfilled()) {
                  return ret.value();
              } else {
                  return undefined;
              }
          }
      }
      return ret;
  }

  function longStackTracesCaptureStackTrace() {
      this._trace = new CapturedTrace(this._peekContext());
  }

  function longStackTracesAttachExtraTrace(error, ignoreSelf) {
      if (canAttachTrace(error)) {
          var trace = this._trace;
          if (trace !== undefined) {
              if (ignoreSelf) trace = trace._parent;
          }
          if (trace !== undefined) {
              trace.attachExtraTrace(error);
          } else if (!error.__stackCleaned__) {
              var parsed = parseStackAndMessage(error);
              util$1.notEnumerableProp(error, "stack",
                  parsed.message + "\n" + parsed.stack.join("\n"));
              util$1.notEnumerableProp(error, "__stackCleaned__", true);
          }
      }
  }

  function longStackTracesDereferenceTrace() {
      this._trace = undefined;
  }

  function checkForgottenReturns(returnValue, promiseCreated, name, promise,
                                 parent) {
      if (returnValue === undefined && promiseCreated !== null &&
          wForgottenReturn) {
          if (parent !== undefined && parent._returnedNonUndefined()) return;
          if ((promise._bitField & 65535) === 0) return;

          if (name) name = name + " ";
          var handlerLine = "";
          var creatorLine = "";
          if (promiseCreated._trace) {
              var traceLines = promiseCreated._trace.stack.split("\n");
              var stack = cleanStack(traceLines);
              for (var i = stack.length - 1; i >= 0; --i) {
                  var line = stack[i];
                  if (!nodeFramePattern.test(line)) {
                      var lineMatches = line.match(parseLinePattern);
                      if (lineMatches) {
                          handlerLine  = "at " + lineMatches[1] +
                              ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                      }
                      break;
                  }
              }

              if (stack.length > 0) {
                  var firstUserLine = stack[0];
                  for (var i = 0; i < traceLines.length; ++i) {

                      if (traceLines[i] === firstUserLine) {
                          if (i > 0) {
                              creatorLine = "\n" + traceLines[i - 1];
                          }
                          break;
                      }
                  }

              }
          }
          var msg = "a promise was created in a " + name +
              "handler " + handlerLine + "but was not returned from it, " +
              "see http://goo.gl/rRqMUw" +
              creatorLine;
          promise._warn(msg, true, promiseCreated);
      }
  }

  function deprecated(name, replacement) {
      var message = name +
          " is deprecated and will be removed in a future version.";
      if (replacement) message += " Use " + replacement + " instead.";
      return warn(message);
  }

  function warn(message, shouldUseOwnTrace, promise) {
      if (!config.warnings) return;
      var warning = new Warning(message);
      var ctx;
      if (shouldUseOwnTrace) {
          promise._attachExtraTrace(warning);
      } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
          ctx.attachExtraTrace(warning);
      } else {
          var parsed = parseStackAndMessage(warning);
          warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
      }

      if (!activeFireEvent("warning", warning)) {
          formatAndLogError(warning, "", true);
      }
  }

  function reconstructStack(message, stacks) {
      for (var i = 0; i < stacks.length - 1; ++i) {
          stacks[i].push("From previous event:");
          stacks[i] = stacks[i].join("\n");
      }
      if (i < stacks.length) {
          stacks[i] = stacks[i].join("\n");
      }
      return message + "\n" + stacks.join("\n");
  }

  function removeDuplicateOrEmptyJumps(stacks) {
      for (var i = 0; i < stacks.length; ++i) {
          if (stacks[i].length === 0 ||
              ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
              stacks.splice(i, 1);
              i--;
          }
      }
  }

  function removeCommonRoots(stacks) {
      var current = stacks[0];
      for (var i = 1; i < stacks.length; ++i) {
          var prev = stacks[i];
          var currentLastIndex = current.length - 1;
          var currentLastLine = current[currentLastIndex];
          var commonRootMeetPoint = -1;

          for (var j = prev.length - 1; j >= 0; --j) {
              if (prev[j] === currentLastLine) {
                  commonRootMeetPoint = j;
                  break;
              }
          }

          for (var j = commonRootMeetPoint; j >= 0; --j) {
              var line = prev[j];
              if (current[currentLastIndex] === line) {
                  current.pop();
                  currentLastIndex--;
              } else {
                  break;
              }
          }
          current = prev;
      }
  }

  function cleanStack(stack) {
      var ret = [];
      for (var i = 0; i < stack.length; ++i) {
          var line = stack[i];
          var isTraceLine = "    (No stack trace)" === line ||
              stackFramePattern.test(line);
          var isInternalFrame = isTraceLine && shouldIgnore(line);
          if (isTraceLine && !isInternalFrame) {
              if (indentStackFrames && line.charAt(0) !== " ") {
                  line = "    " + line;
              }
              ret.push(line);
          }
      }
      return ret;
  }

  function stackFramesAsArray(error) {
      var stack = error.stack.replace(/\s+$/g, "").split("\n");
      for (var i = 0; i < stack.length; ++i) {
          var line = stack[i];
          if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
              break;
          }
      }
      if (i > 0 && error.name != "SyntaxError") {
          stack = stack.slice(i);
      }
      return stack;
  }

  function parseStackAndMessage(error) {
      var stack = error.stack;
      var message = error.toString();
      stack = typeof stack === "string" && stack.length > 0
                  ? stackFramesAsArray(error) : ["    (No stack trace)"];
      return {
          message: message,
          stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
      };
  }

  function formatAndLogError(error, title, isSoft) {
      if (typeof console !== "undefined") {
          var message;
          if (util$1.isObject(error)) {
              var stack = error.stack;
              message = title + formatStack(stack, error);
          } else {
              message = title + String(error);
          }
          if (typeof printWarning === "function") {
              printWarning(message, isSoft);
          } else if (typeof console.log === "function" ||
              typeof console.log === "object") {
              console.log(message);
          }
      }
  }

  function fireRejectionEvent(name, localHandler, reason, promise) {
      var localEventFired = false;
      try {
          if (typeof localHandler === "function") {
              localEventFired = true;
              if (name === "rejectionHandled") {
                  localHandler(promise);
              } else {
                  localHandler(reason, promise);
              }
          }
      } catch (e) {
          async.throwLater(e);
      }

      if (name === "unhandledRejection") {
          if (!activeFireEvent(name, reason, promise) && !localEventFired) {
              formatAndLogError(reason, "Unhandled rejection ");
          }
      } else {
          activeFireEvent(name, promise);
      }
  }

  function formatNonError(obj) {
      var str;
      if (typeof obj === "function") {
          str = "[function " +
              (obj.name || "anonymous") +
              "]";
      } else {
          str = obj && typeof obj.toString === "function"
              ? obj.toString() : util$1.toString(obj);
          var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
          if (ruselessToString.test(str)) {
              try {
                  var newStr = JSON.stringify(obj);
                  str = newStr;
              }
              catch(e) {

              }
          }
          if (str.length === 0) {
              str = "(empty array)";
          }
      }
      return ("(<" + snip(str) + ">, no stack trace)");
  }

  function snip(str) {
      var maxChars = 41;
      if (str.length < maxChars) {
          return str;
      }
      return str.substr(0, maxChars - 3) + "...";
  }

  function longStackTracesIsSupported() {
      return typeof captureStackTrace === "function";
  }

  var shouldIgnore = function() { return false; };
  var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
  function parseLineInfo(line) {
      var matches = line.match(parseLineInfoRegex);
      if (matches) {
          return {
              fileName: matches[1],
              line: parseInt(matches[2], 10)
          };
      }
  }

  function setBounds(firstLineError, lastLineError) {
      if (!longStackTracesIsSupported()) return;
      var firstStackLines = firstLineError.stack.split("\n");
      var lastStackLines = lastLineError.stack.split("\n");
      var firstIndex = -1;
      var lastIndex = -1;
      var firstFileName;
      var lastFileName;
      for (var i = 0; i < firstStackLines.length; ++i) {
          var result = parseLineInfo(firstStackLines[i]);
          if (result) {
              firstFileName = result.fileName;
              firstIndex = result.line;
              break;
          }
      }
      for (var i = 0; i < lastStackLines.length; ++i) {
          var result = parseLineInfo(lastStackLines[i]);
          if (result) {
              lastFileName = result.fileName;
              lastIndex = result.line;
              break;
          }
      }
      if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
          firstFileName !== lastFileName || firstIndex >= lastIndex) {
          return;
      }

      shouldIgnore = function(line) {
          if (bluebirdFramePattern.test(line)) return true;
          var info = parseLineInfo(line);
          if (info) {
              if (info.fileName === firstFileName &&
                  (firstIndex <= info.line && info.line <= lastIndex)) {
                  return true;
              }
          }
          return false;
      };
  }

  function CapturedTrace(parent) {
      this._parent = parent;
      this._promisesCreated = 0;
      var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
      captureStackTrace(this, CapturedTrace);
      if (length > 32) this.uncycle();
  }
  util$1.inherits(CapturedTrace, Error);
  Context.CapturedTrace = CapturedTrace;

  CapturedTrace.prototype.uncycle = function() {
      var length = this._length;
      if (length < 2) return;
      var nodes = [];
      var stackToIndex = {};

      for (var i = 0, node = this; node !== undefined; ++i) {
          nodes.push(node);
          node = node._parent;
      }
      length = this._length = i;
      for (var i = length - 1; i >= 0; --i) {
          var stack = nodes[i].stack;
          if (stackToIndex[stack] === undefined) {
              stackToIndex[stack] = i;
          }
      }
      for (var i = 0; i < length; ++i) {
          var currentStack = nodes[i].stack;
          var index = stackToIndex[currentStack];
          if (index !== undefined && index !== i) {
              if (index > 0) {
                  nodes[index - 1]._parent = undefined;
                  nodes[index - 1]._length = 1;
              }
              nodes[i]._parent = undefined;
              nodes[i]._length = 1;
              var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

              if (index < length - 1) {
                  cycleEdgeNode._parent = nodes[index + 1];
                  cycleEdgeNode._parent.uncycle();
                  cycleEdgeNode._length =
                      cycleEdgeNode._parent._length + 1;
              } else {
                  cycleEdgeNode._parent = undefined;
                  cycleEdgeNode._length = 1;
              }
              var currentChildLength = cycleEdgeNode._length + 1;
              for (var j = i - 2; j >= 0; --j) {
                  nodes[j]._length = currentChildLength;
                  currentChildLength++;
              }
              return;
          }
      }
  };

  CapturedTrace.prototype.attachExtraTrace = function(error) {
      if (error.__stackCleaned__) return;
      this.uncycle();
      var parsed = parseStackAndMessage(error);
      var message = parsed.message;
      var stacks = [parsed.stack];

      var trace = this;
      while (trace !== undefined) {
          stacks.push(cleanStack(trace.stack.split("\n")));
          trace = trace._parent;
      }
      removeCommonRoots(stacks);
      removeDuplicateOrEmptyJumps(stacks);
      util$1.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
      util$1.notEnumerableProp(error, "__stackCleaned__", true);
  };

  var captureStackTrace = (function stackDetection() {
      var v8stackFramePattern = /^\s*at\s*/;
      var v8stackFormatter = function(stack, error) {
          if (typeof stack === "string") return stack;

          if (error.name !== undefined &&
              error.message !== undefined) {
              return error.toString();
          }
          return formatNonError(error);
      };

      if (typeof Error.stackTraceLimit === "number" &&
          typeof Error.captureStackTrace === "function") {
          Error.stackTraceLimit += 6;
          stackFramePattern = v8stackFramePattern;
          formatStack = v8stackFormatter;
          var captureStackTrace = Error.captureStackTrace;

          shouldIgnore = function(line) {
              return bluebirdFramePattern.test(line);
          };
          return function(receiver, ignoreUntil) {
              Error.stackTraceLimit += 6;
              captureStackTrace(receiver, ignoreUntil);
              Error.stackTraceLimit -= 6;
          };
      }
      var err = new Error();

      if (typeof err.stack === "string" &&
          err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
          stackFramePattern = /@/;
          formatStack = v8stackFormatter;
          indentStackFrames = true;
          return function captureStackTrace(o) {
              o.stack = new Error().stack;
          };
      }

      var hasStackAfterThrow;
      try { throw new Error(); }
      catch(e) {
          hasStackAfterThrow = ("stack" in e);
      }
      if (!("stack" in err) && hasStackAfterThrow &&
          typeof Error.stackTraceLimit === "number") {
          stackFramePattern = v8stackFramePattern;
          formatStack = v8stackFormatter;
          return function captureStackTrace(o) {
              Error.stackTraceLimit += 6;
              try { throw new Error(); }
              catch(e) { o.stack = e.stack; }
              Error.stackTraceLimit -= 6;
          };
      }

      formatStack = function(stack, error) {
          if (typeof stack === "string") return stack;

          if ((typeof error === "object" ||
              typeof error === "function") &&
              error.name !== undefined &&
              error.message !== undefined) {
              return error.toString();
          }
          return formatNonError(error);
      };

      return null;

  })([]);

  if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
      printWarning = function (message) {
          console.warn(message);
      };
      if (util$1.isNode && process.stderr.isTTY) {
          printWarning = function(message, isSoft) {
              var color = isSoft ? "\u001b[33m" : "\u001b[31m";
              console.warn(color + message + "\u001b[0m\n");
          };
      } else if (!util$1.isNode && typeof (new Error().stack) === "string") {
          printWarning = function(message, isSoft) {
              console.warn("%c" + message,
                          isSoft ? "color: darkorange" : "color: red");
          };
      }
  }

  var config = {
      warnings: warnings,
      longStackTraces: false,
      cancellation: false,
      monitoring: false
  };

  if (longStackTraces) Promise.longStackTraces();

  return {
      longStackTraces: function() {
          return config.longStackTraces;
      },
      warnings: function() {
          return config.warnings;
      },
      cancellation: function() {
          return config.cancellation;
      },
      monitoring: function() {
          return config.monitoring;
      },
      propagateFromFunction: function() {
          return propagateFromFunction;
      },
      boundValueFunction: function() {
          return boundValueFunction;
      },
      checkForgottenReturns: checkForgottenReturns,
      setBounds: setBounds,
      warn: warn,
      deprecated: deprecated,
      CapturedTrace: CapturedTrace,
      fireDomEvent: fireDomEvent,
      fireGlobalEvent: fireGlobalEvent
  };
  };

  var catch_filter = function(NEXT_FILTER) {
  var util$1 = util;
  var getKeys = es5.keys;
  var tryCatch = util$1.tryCatch;
  var errorObj = util$1.errorObj;

  function catchFilter(instances, cb, promise) {
      return function(e) {
          var boundTo = promise._boundValue();
          predicateLoop: for (var i = 0; i < instances.length; ++i) {
              var item = instances[i];

              if (item === Error ||
                  (item != null && item.prototype instanceof Error)) {
                  if (e instanceof item) {
                      return tryCatch(cb).call(boundTo, e);
                  }
              } else if (typeof item === "function") {
                  var matchesPredicate = tryCatch(item).call(boundTo, e);
                  if (matchesPredicate === errorObj) {
                      return matchesPredicate;
                  } else if (matchesPredicate) {
                      return tryCatch(cb).call(boundTo, e);
                  }
              } else if (util$1.isObject(e)) {
                  var keys = getKeys(item);
                  for (var j = 0; j < keys.length; ++j) {
                      var key = keys[j];
                      if (item[key] != e[key]) {
                          continue predicateLoop;
                      }
                  }
                  return tryCatch(cb).call(boundTo, e);
              }
          }
          return NEXT_FILTER;
      };
  }

  return catchFilter;
  };

  var _finally = function(Promise, tryConvertToPromise, NEXT_FILTER) {
  var util$1 = util;
  var CancellationError = Promise.CancellationError;
  var errorObj = util$1.errorObj;
  var catchFilter = catch_filter(NEXT_FILTER);

  function PassThroughHandlerContext(promise, type, handler) {
      this.promise = promise;
      this.type = type;
      this.handler = handler;
      this.called = false;
      this.cancelPromise = null;
  }

  PassThroughHandlerContext.prototype.isFinallyHandler = function() {
      return this.type === 0;
  };

  function FinallyHandlerCancelReaction(finallyHandler) {
      this.finallyHandler = finallyHandler;
  }

  FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
      checkCancel(this.finallyHandler);
  };

  function checkCancel(ctx, reason) {
      if (ctx.cancelPromise != null) {
          if (arguments.length > 1) {
              ctx.cancelPromise._reject(reason);
          } else {
              ctx.cancelPromise._cancel();
          }
          ctx.cancelPromise = null;
          return true;
      }
      return false;
  }

  function succeed() {
      return finallyHandler.call(this, this.promise._target()._settledValue());
  }
  function fail(reason) {
      if (checkCancel(this, reason)) return;
      errorObj.e = reason;
      return errorObj;
  }
  function finallyHandler(reasonOrValue) {
      var promise = this.promise;
      var handler = this.handler;

      if (!this.called) {
          this.called = true;
          var ret = this.isFinallyHandler()
              ? handler.call(promise._boundValue())
              : handler.call(promise._boundValue(), reasonOrValue);
          if (ret === NEXT_FILTER) {
              return ret;
          } else if (ret !== undefined) {
              promise._setReturnedNonUndefined();
              var maybePromise = tryConvertToPromise(ret, promise);
              if (maybePromise instanceof Promise) {
                  if (this.cancelPromise != null) {
                      if (maybePromise._isCancelled()) {
                          var reason =
                              new CancellationError("late cancellation observer");
                          promise._attachExtraTrace(reason);
                          errorObj.e = reason;
                          return errorObj;
                      } else if (maybePromise.isPending()) {
                          maybePromise._attachCancellationCallback(
                              new FinallyHandlerCancelReaction(this));
                      }
                  }
                  return maybePromise._then(
                      succeed, fail, undefined, this, undefined);
              }
          }
      }

      if (promise.isRejected()) {
          checkCancel(this);
          errorObj.e = reasonOrValue;
          return errorObj;
      } else {
          checkCancel(this);
          return reasonOrValue;
      }
  }

  Promise.prototype._passThrough = function(handler, type, success, fail) {
      if (typeof handler !== "function") return this.then();
      return this._then(success,
                        fail,
                        undefined,
                        new PassThroughHandlerContext(this, type, handler),
                        undefined);
  };

  Promise.prototype.lastly =
  Promise.prototype["finally"] = function (handler) {
      return this._passThrough(handler,
                               0,
                               finallyHandler,
                               finallyHandler);
  };


  Promise.prototype.tap = function (handler) {
      return this._passThrough(handler, 1, finallyHandler);
  };

  Promise.prototype.tapCatch = function (handlerOrPredicate) {
      var len = arguments.length;
      if(len === 1) {
          return this._passThrough(handlerOrPredicate,
                                   1,
                                   undefined,
                                   finallyHandler);
      } else {
           var catchInstances = new Array(len - 1),
              j = 0, i;
          for (i = 0; i < len - 1; ++i) {
              var item = arguments[i];
              if (util$1.isObject(item)) {
                  catchInstances[j++] = item;
              } else {
                  return Promise.reject(new TypeError(
                      "tapCatch statement predicate: "
                      + "expecting an object but got " + util$1.classString(item)
                  ));
              }
          }
          catchInstances.length = j;
          var handler = arguments[i];
          return this._passThrough(catchFilter(catchInstances, handler, this),
                                   1,
                                   undefined,
                                   finallyHandler);
      }

  };

  return PassThroughHandlerContext;
  };

  var maybeWrapAsError$1 = util.maybeWrapAsError;

  var OperationalError$1 = errors.OperationalError;


  function isUntypedError(obj) {
      return obj instanceof Error &&
          es5.getPrototypeOf(obj) === Error.prototype;
  }

  var rErrorKey = /^(?:name|message|stack|cause)$/;
  function wrapAsOperationalError(obj) {
      var ret;
      if (isUntypedError(obj)) {
          ret = new OperationalError$1(obj);
          ret.name = obj.name;
          ret.message = obj.message;
          ret.stack = obj.stack;
          var keys = es5.keys(obj);
          for (var i = 0; i < keys.length; ++i) {
              var key = keys[i];
              if (!rErrorKey.test(key)) {
                  ret[key] = obj[key];
              }
          }
          return ret;
      }
      util.markAsOriginatingFromRejection(obj);
      return obj;
  }

  function nodebackForPromise(promise, multiArgs) {
      return function(err, value) {
          if (promise === null) return;
          if (err) {
              var wrapped = wrapAsOperationalError(maybeWrapAsError$1(err));
              promise._attachExtraTrace(wrapped);
              promise._reject(wrapped);
          } else if (!multiArgs) {
              promise._fulfill(value);
          } else {
              var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0)); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}            promise._fulfill(args);
          }
          promise = null;
      };
  }

  var nodeback = nodebackForPromise;

  var method =
  function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
  var util$1 = util;
  var tryCatch = util$1.tryCatch;

  Promise.method = function (fn) {
      if (typeof fn !== "function") {
          throw new Promise.TypeError("expecting a function but got " + util$1.classString(fn));
      }
      return function () {
          var ret = new Promise(INTERNAL);
          ret._captureStackTrace();
          ret._pushContext();
          var value = tryCatch(fn).apply(this, arguments);
          var promiseCreated = ret._popContext();
          debug.checkForgottenReturns(
              value, promiseCreated, "Promise.method", ret);
          ret._resolveFromSyncValue(value);
          return ret;
      };
  };

  Promise.attempt = Promise["try"] = function (fn) {
      if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util$1.classString(fn));
      }
      var ret = new Promise(INTERNAL);
      ret._captureStackTrace();
      ret._pushContext();
      var value;
      if (arguments.length > 1) {
          debug.deprecated("calling Promise.try with more than 1 argument");
          var arg = arguments[1];
          var ctx = arguments[2];
          value = util$1.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
                                    : tryCatch(fn).call(ctx, arg);
      } else {
          value = tryCatch(fn)();
      }
      var promiseCreated = ret._popContext();
      debug.checkForgottenReturns(
          value, promiseCreated, "Promise.try", ret);
      ret._resolveFromSyncValue(value);
      return ret;
  };

  Promise.prototype._resolveFromSyncValue = function (value) {
      if (value === util$1.errorObj) {
          this._rejectCallback(value.e, false);
      } else {
          this._resolveCallback(value, true);
      }
  };
  };

  var bind$1 = function(Promise, INTERNAL, tryConvertToPromise, debug) {
  var calledBind = false;
  var rejectThis = function(_, e) {
      this._reject(e);
  };

  var targetRejected = function(e, context) {
      context.promiseRejectionQueued = true;
      context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
  };

  var bindingResolved = function(thisArg, context) {
      if (((this._bitField & 50397184) === 0)) {
          this._resolveCallback(context.target);
      }
  };

  var bindingRejected = function(e, context) {
      if (!context.promiseRejectionQueued) this._reject(e);
  };

  Promise.prototype.bind = function (thisArg) {
      if (!calledBind) {
          calledBind = true;
          Promise.prototype._propagateFrom = debug.propagateFromFunction();
          Promise.prototype._boundValue = debug.boundValueFunction();
      }
      var maybePromise = tryConvertToPromise(thisArg);
      var ret = new Promise(INTERNAL);
      ret._propagateFrom(this, 1);
      var target = this._target();
      ret._setBoundTo(maybePromise);
      if (maybePromise instanceof Promise) {
          var context = {
              promiseRejectionQueued: false,
              promise: ret,
              target: target,
              bindingPromise: maybePromise
          };
          target._then(INTERNAL, targetRejected, undefined, ret, context);
          maybePromise._then(
              bindingResolved, bindingRejected, undefined, ret, context);
          ret._setOnCancel(maybePromise);
      } else {
          ret._resolveCallback(target);
      }
      return ret;
  };

  Promise.prototype._setBoundTo = function (obj) {
      if (obj !== undefined) {
          this._bitField = this._bitField | 2097152;
          this._boundTo = obj;
      } else {
          this._bitField = this._bitField & (~2097152);
      }
  };

  Promise.prototype._isBound = function () {
      return (this._bitField & 2097152) === 2097152;
  };

  Promise.bind = function (thisArg, value) {
      return Promise.resolve(value).bind(thisArg);
  };
  };

  var cancel = function(Promise, PromiseArray, apiRejection, debug) {
  var util$1 = util;
  var tryCatch = util$1.tryCatch;
  var errorObj = util$1.errorObj;
  var async = Promise._async;

  Promise.prototype["break"] = Promise.prototype.cancel = function() {
      if (!debug.cancellation()) return this._warn("cancellation is disabled");

      var promise = this;
      var child = promise;
      while (promise._isCancellable()) {
          if (!promise._cancelBy(child)) {
              if (child._isFollowing()) {
                  child._followee().cancel();
              } else {
                  child._cancelBranched();
              }
              break;
          }

          var parent = promise._cancellationParent;
          if (parent == null || !parent._isCancellable()) {
              if (promise._isFollowing()) {
                  promise._followee().cancel();
              } else {
                  promise._cancelBranched();
              }
              break;
          } else {
              if (promise._isFollowing()) promise._followee().cancel();
              promise._setWillBeCancelled();
              child = promise;
              promise = parent;
          }
      }
  };

  Promise.prototype._branchHasCancelled = function() {
      this._branchesRemainingToCancel--;
  };

  Promise.prototype._enoughBranchesHaveCancelled = function() {
      return this._branchesRemainingToCancel === undefined ||
             this._branchesRemainingToCancel <= 0;
  };

  Promise.prototype._cancelBy = function(canceller) {
      if (canceller === this) {
          this._branchesRemainingToCancel = 0;
          this._invokeOnCancel();
          return true;
      } else {
          this._branchHasCancelled();
          if (this._enoughBranchesHaveCancelled()) {
              this._invokeOnCancel();
              return true;
          }
      }
      return false;
  };

  Promise.prototype._cancelBranched = function() {
      if (this._enoughBranchesHaveCancelled()) {
          this._cancel();
      }
  };

  Promise.prototype._cancel = function() {
      if (!this._isCancellable()) return;
      this._setCancelled();
      async.invoke(this._cancelPromises, this, undefined);
  };

  Promise.prototype._cancelPromises = function() {
      if (this._length() > 0) this._settlePromises();
  };

  Promise.prototype._unsetOnCancel = function() {
      this._onCancelField = undefined;
  };

  Promise.prototype._isCancellable = function() {
      return this.isPending() && !this._isCancelled();
  };

  Promise.prototype.isCancellable = function() {
      return this.isPending() && !this.isCancelled();
  };

  Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
      if (util$1.isArray(onCancelCallback)) {
          for (var i = 0; i < onCancelCallback.length; ++i) {
              this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
          }
      } else if (onCancelCallback !== undefined) {
          if (typeof onCancelCallback === "function") {
              if (!internalOnly) {
                  var e = tryCatch(onCancelCallback).call(this._boundValue());
                  if (e === errorObj) {
                      this._attachExtraTrace(e.e);
                      async.throwLater(e.e);
                  }
              }
          } else {
              onCancelCallback._resultCancelled(this);
          }
      }
  };

  Promise.prototype._invokeOnCancel = function() {
      var onCancelCallback = this._onCancel();
      this._unsetOnCancel();
      async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
  };

  Promise.prototype._invokeInternalOnCancel = function() {
      if (this._isCancellable()) {
          this._doInvokeOnCancel(this._onCancel(), true);
          this._unsetOnCancel();
      }
  };

  Promise.prototype._resultCancelled = function() {
      this.cancel();
  };

  };

  var direct_resolve = function(Promise) {
  function returner() {
      return this.value;
  }
  function thrower() {
      throw this.reason;
  }

  Promise.prototype["return"] =
  Promise.prototype.thenReturn = function (value) {
      if (value instanceof Promise) value.suppressUnhandledRejections();
      return this._then(
          returner, undefined, undefined, {value: value}, undefined);
  };

  Promise.prototype["throw"] =
  Promise.prototype.thenThrow = function (reason) {
      return this._then(
          thrower, undefined, undefined, {reason: reason}, undefined);
  };

  Promise.prototype.catchThrow = function (reason) {
      if (arguments.length <= 1) {
          return this._then(
              undefined, thrower, undefined, {reason: reason}, undefined);
      } else {
          var _reason = arguments[1];
          var handler = function() {throw _reason;};
          return this.caught(reason, handler);
      }
  };

  Promise.prototype.catchReturn = function (value) {
      if (arguments.length <= 1) {
          if (value instanceof Promise) value.suppressUnhandledRejections();
          return this._then(
              undefined, returner, undefined, {value: value}, undefined);
      } else {
          var _value = arguments[1];
          if (_value instanceof Promise) _value.suppressUnhandledRejections();
          var handler = function() {return _value;};
          return this.caught(value, handler);
      }
  };
  };

  var synchronous_inspection = function(Promise) {
  function PromiseInspection(promise) {
      if (promise !== undefined) {
          promise = promise._target();
          this._bitField = promise._bitField;
          this._settledValueField = promise._isFateSealed()
              ? promise._settledValue() : undefined;
      }
      else {
          this._bitField = 0;
          this._settledValueField = undefined;
      }
  }

  PromiseInspection.prototype._settledValue = function() {
      return this._settledValueField;
  };

  var value = PromiseInspection.prototype.value = function () {
      if (!this.isFulfilled()) {
          throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      return this._settledValue();
  };

  var reason = PromiseInspection.prototype.error =
  PromiseInspection.prototype.reason = function () {
      if (!this.isRejected()) {
          throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      return this._settledValue();
  };

  var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
      return (this._bitField & 33554432) !== 0;
  };

  var isRejected = PromiseInspection.prototype.isRejected = function () {
      return (this._bitField & 16777216) !== 0;
  };

  var isPending = PromiseInspection.prototype.isPending = function () {
      return (this._bitField & 50397184) === 0;
  };

  var isResolved = PromiseInspection.prototype.isResolved = function () {
      return (this._bitField & 50331648) !== 0;
  };

  PromiseInspection.prototype.isCancelled = function() {
      return (this._bitField & 8454144) !== 0;
  };

  Promise.prototype.__isCancelled = function() {
      return (this._bitField & 65536) === 65536;
  };

  Promise.prototype._isCancelled = function() {
      return this._target().__isCancelled();
  };

  Promise.prototype.isCancelled = function() {
      return (this._target()._bitField & 8454144) !== 0;
  };

  Promise.prototype.isPending = function() {
      return isPending.call(this._target());
  };

  Promise.prototype.isRejected = function() {
      return isRejected.call(this._target());
  };

  Promise.prototype.isFulfilled = function() {
      return isFulfilled.call(this._target());
  };

  Promise.prototype.isResolved = function() {
      return isResolved.call(this._target());
  };

  Promise.prototype.value = function() {
      return value.call(this._target());
  };

  Promise.prototype.reason = function() {
      var target = this._target();
      target._unsetRejectionIsUnhandled();
      return reason.call(target);
  };

  Promise.prototype._value = function() {
      return this._settledValue();
  };

  Promise.prototype._reason = function() {
      this._unsetRejectionIsUnhandled();
      return this._settledValue();
  };

  Promise.PromiseInspection = PromiseInspection;
  };

  var join =
  function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
           getDomain) {
  var util$1 = util;
  var canEvaluate = util$1.canEvaluate;
  var tryCatch = util$1.tryCatch;
  var errorObj = util$1.errorObj;
  var reject;

  {
  if (canEvaluate) {
      var thenCallback = function(i) {
          return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
      };

      var promiseSetter = function(i) {
          return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
      };

      var generateHolderClass = function(total) {
          var props = new Array(total);
          for (var i = 0; i < props.length; ++i) {
              props[i] = "this.p" + (i+1);
          }
          var assignment = props.join(" = ") + " = null;";
          var cancellationCode= "var promise;\n" + props.map(function(prop) {
              return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
          }).join("\n");
          var passedArguments = props.join(", ");
          var name = "Holder$" + total;


          var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.asyncNeeded = true;                                     \n\
                this.now = 0;                                                \n\
            }                                                                \n\
                                                                             \n\
            [TheName].prototype._callFunction = function(promise) {          \n\
                promise._pushContext();                                      \n\
                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
                promise._popContext();                                       \n\
                if (ret === errorObj) {                                      \n\
                    promise._rejectCallback(ret.e, false);                   \n\
                } else {                                                     \n\
                    promise._resolveCallback(ret);                           \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    if (this.asyncNeeded) {                                  \n\
                        async.invoke(this._callFunction, this, promise);     \n\
                    } else {                                                 \n\
                        this._callFunction(promise);                         \n\
                    }                                                        \n\
                                                                             \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise, async);                               \n\
        ";

          code = code.replace(/\[TheName\]/g, name)
              .replace(/\[TheTotal\]/g, total)
              .replace(/\[ThePassedArguments\]/g, passedArguments)
              .replace(/\[TheProperties\]/g, assignment)
              .replace(/\[CancellationCode\]/g, cancellationCode);

          return new Function("tryCatch", "errorObj", "Promise", "async", code)
                             (tryCatch, errorObj, Promise, async);
      };

      var holderClasses = [];
      var thenCallbacks = [];
      var promiseSetters = [];

      for (var i = 0; i < 8; ++i) {
          holderClasses.push(generateHolderClass(i + 1));
          thenCallbacks.push(thenCallback(i + 1));
          promiseSetters.push(promiseSetter(i + 1));
      }

      reject = function (reason) {
          this._reject(reason);
      };
  }}

  Promise.join = function () {
      var last = arguments.length - 1;
      var fn;
      if (last > 0 && typeof arguments[last] === "function") {
          fn = arguments[last];
          {
              if (last <= 8 && canEvaluate) {
                  var ret = new Promise(INTERNAL);
                  ret._captureStackTrace();
                  var HolderClass = holderClasses[last - 1];
                  var holder = new HolderClass(fn);
                  var callbacks = thenCallbacks;

                  for (var i = 0; i < last; ++i) {
                      var maybePromise = tryConvertToPromise(arguments[i], ret);
                      if (maybePromise instanceof Promise) {
                          maybePromise = maybePromise._target();
                          var bitField = maybePromise._bitField;
                          if (((bitField & 50397184) === 0)) {
                              maybePromise._then(callbacks[i], reject,
                                                 undefined, ret, holder);
                              promiseSetters[i](maybePromise, holder);
                              holder.asyncNeeded = false;
                          } else if (((bitField & 33554432) !== 0)) {
                              callbacks[i].call(ret,
                                                maybePromise._value(), holder);
                          } else if (((bitField & 16777216) !== 0)) {
                              ret._reject(maybePromise._reason());
                          } else {
                              ret._cancel();
                          }
                      } else {
                          callbacks[i].call(ret, maybePromise, holder);
                      }
                  }

                  if (!ret._isFateSealed()) {
                      if (holder.asyncNeeded) {
                          var domain = getDomain();
                          if (domain !== null) {
                              holder.fn = util$1.domainBind(domain, holder.fn);
                          }
                      }
                      ret._setAsyncGuaranteed();
                      ret._setOnCancel(holder);
                  }
                  return ret;
              }
          }
      }
      var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];}    if (fn) args.pop();
      var ret = new PromiseArray(args).promise();
      return fn !== undefined ? ret.spread(fn) : ret;
  };

  };

  var map = function(Promise,
                            PromiseArray,
                            apiRejection,
                            tryConvertToPromise,
                            INTERNAL,
                            debug) {
  var getDomain = Promise._getDomain;
  var util$1 = util;
  var tryCatch = util$1.tryCatch;
  var errorObj = util$1.errorObj;
  var async = Promise._async;

  function MappingPromiseArray(promises, fn, limit, _filter) {
      this.constructor$(promises);
      this._promise._captureStackTrace();
      var domain = getDomain();
      this._callback = domain === null ? fn : util$1.domainBind(domain, fn);
      this._preservedValues = _filter === INTERNAL
          ? new Array(this.length())
          : null;
      this._limit = limit;
      this._inFlight = 0;
      this._queue = [];
      async.invoke(this._asyncInit, this, undefined);
  }
  util$1.inherits(MappingPromiseArray, PromiseArray);

  MappingPromiseArray.prototype._asyncInit = function() {
      this._init$(undefined, -2);
  };

  MappingPromiseArray.prototype._init = function () {};

  MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
      var values = this._values;
      var length = this.length();
      var preservedValues = this._preservedValues;
      var limit = this._limit;

      if (index < 0) {
          index = (index * -1) - 1;
          values[index] = value;
          if (limit >= 1) {
              this._inFlight--;
              this._drainQueue();
              if (this._isResolved()) return true;
          }
      } else {
          if (limit >= 1 && this._inFlight >= limit) {
              values[index] = value;
              this._queue.push(index);
              return false;
          }
          if (preservedValues !== null) preservedValues[index] = value;

          var promise = this._promise;
          var callback = this._callback;
          var receiver = promise._boundValue();
          promise._pushContext();
          var ret = tryCatch(callback).call(receiver, value, index, length);
          var promiseCreated = promise._popContext();
          debug.checkForgottenReturns(
              ret,
              promiseCreated,
              preservedValues !== null ? "Promise.filter" : "Promise.map",
              promise
          );
          if (ret === errorObj) {
              this._reject(ret.e);
              return true;
          }

          var maybePromise = tryConvertToPromise(ret, this._promise);
          if (maybePromise instanceof Promise) {
              maybePromise = maybePromise._target();
              var bitField = maybePromise._bitField;
              if (((bitField & 50397184) === 0)) {
                  if (limit >= 1) this._inFlight++;
                  values[index] = maybePromise;
                  maybePromise._proxy(this, (index + 1) * -1);
                  return false;
              } else if (((bitField & 33554432) !== 0)) {
                  ret = maybePromise._value();
              } else if (((bitField & 16777216) !== 0)) {
                  this._reject(maybePromise._reason());
                  return true;
              } else {
                  this._cancel();
                  return true;
              }
          }
          values[index] = ret;
      }
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= length) {
          if (preservedValues !== null) {
              this._filter(values, preservedValues);
          } else {
              this._resolve(values);
          }
          return true;
      }
      return false;
  };

  MappingPromiseArray.prototype._drainQueue = function () {
      var queue = this._queue;
      var limit = this._limit;
      var values = this._values;
      while (queue.length > 0 && this._inFlight < limit) {
          if (this._isResolved()) return;
          var index = queue.pop();
          this._promiseFulfilled(values[index], index);
      }
  };

  MappingPromiseArray.prototype._filter = function (booleans, values) {
      var len = values.length;
      var ret = new Array(len);
      var j = 0;
      for (var i = 0; i < len; ++i) {
          if (booleans[i]) ret[j++] = values[i];
      }
      ret.length = j;
      this._resolve(ret);
  };

  MappingPromiseArray.prototype.preservedValues = function () {
      return this._preservedValues;
  };

  function map(promises, fn, options, _filter) {
      if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util$1.classString(fn));
      }

      var limit = 0;
      if (options !== undefined) {
          if (typeof options === "object" && options !== null) {
              if (typeof options.concurrency !== "number") {
                  return Promise.reject(
                      new TypeError("'concurrency' must be a number but it is " +
                                      util$1.classString(options.concurrency)));
              }
              limit = options.concurrency;
          } else {
              return Promise.reject(new TypeError(
                              "options argument must be an object but it is " +
                               util$1.classString(options)));
          }
      }
      limit = typeof limit === "number" &&
          isFinite(limit) && limit >= 1 ? limit : 0;
      return new MappingPromiseArray(promises, fn, limit, _filter).promise();
  }

  Promise.prototype.map = function (fn, options) {
      return map(this, fn, options, null);
  };

  Promise.map = function (promises, fn, options, _filter) {
      return map(promises, fn, options, _filter);
  };


  };

  var cr = Object.create;
  if (cr) {
      var callerCache = cr(null);
      var getterCache = cr(null);
      callerCache[" size"] = getterCache[" size"] = 0;
  }

  var call_get = function(Promise) {
  var util$1 = util;
  var canEvaluate = util$1.canEvaluate;
  var isIdentifier = util$1.isIdentifier;

  var getMethodCaller;
  var getGetter;
  {
  var makeMethodCaller = function (methodName) {
      return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
  };

  var makeGetter = function (propertyName) {
      return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
  };

  var getCompiled = function(name, compiler, cache) {
      var ret = cache[name];
      if (typeof ret !== "function") {
          if (!isIdentifier(name)) {
              return null;
          }
          ret = compiler(name);
          cache[name] = ret;
          cache[" size"]++;
          if (cache[" size"] > 512) {
              var keys = Object.keys(cache);
              for (var i = 0; i < 256; ++i) delete cache[keys[i]];
              cache[" size"] = keys.length - 256;
          }
      }
      return ret;
  };

  getMethodCaller = function(name) {
      return getCompiled(name, makeMethodCaller, callerCache);
  };

  getGetter = function(name) {
      return getCompiled(name, makeGetter, getterCache);
  };
  }

  function ensureMethod(obj, methodName) {
      var fn;
      if (obj != null) fn = obj[methodName];
      if (typeof fn !== "function") {
          var message = "Object " + util$1.classString(obj) + " has no method '" +
              util$1.toString(methodName) + "'";
          throw new Promise.TypeError(message);
      }
      return fn;
  }

  function caller(obj) {
      var methodName = this.pop();
      var fn = ensureMethod(obj, methodName);
      return fn.apply(obj, this);
  }
  Promise.prototype.call = function (methodName) {
      var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0)); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}    {
          if (canEvaluate) {
              var maybeCaller = getMethodCaller(methodName);
              if (maybeCaller !== null) {
                  return this._then(
                      maybeCaller, undefined, undefined, args, undefined);
              }
          }
      }
      args.push(methodName);
      return this._then(caller, undefined, undefined, args, undefined);
  };

  function namedGetter(obj) {
      return obj[this];
  }
  function indexedGetter(obj) {
      var index = +this;
      if (index < 0) index = Math.max(0, index + obj.length);
      return obj[index];
  }
  Promise.prototype.get = function (propertyName) {
      var isIndex = (typeof propertyName === "number");
      var getter;
      if (!isIndex) {
          if (canEvaluate) {
              var maybeGetter = getGetter(propertyName);
              getter = maybeGetter !== null ? maybeGetter : namedGetter;
          } else {
              getter = namedGetter;
          }
      } else {
          getter = indexedGetter;
      }
      return this._then(getter, undefined, undefined, propertyName, undefined);
  };
  };

  var using = function (Promise, apiRejection, tryConvertToPromise,
      createContext, INTERNAL, debug) {
      var util$1 = util;
      var TypeError = errors.TypeError;
      var inherits = util.inherits;
      var errorObj = util$1.errorObj;
      var tryCatch = util$1.tryCatch;
      var NULL = {};

      function thrower(e) {
          setTimeout(function(){throw e;}, 0);
      }

      function castPreservingDisposable(thenable) {
          var maybePromise = tryConvertToPromise(thenable);
          if (maybePromise !== thenable &&
              typeof thenable._isDisposable === "function" &&
              typeof thenable._getDisposer === "function" &&
              thenable._isDisposable()) {
              maybePromise._setDisposable(thenable._getDisposer());
          }
          return maybePromise;
      }
      function dispose(resources, inspection) {
          var i = 0;
          var len = resources.length;
          var ret = new Promise(INTERNAL);
          function iterator() {
              if (i >= len) return ret._fulfill();
              var maybePromise = castPreservingDisposable(resources[i++]);
              if (maybePromise instanceof Promise &&
                  maybePromise._isDisposable()) {
                  try {
                      maybePromise = tryConvertToPromise(
                          maybePromise._getDisposer().tryDispose(inspection),
                          resources.promise);
                  } catch (e) {
                      return thrower(e);
                  }
                  if (maybePromise instanceof Promise) {
                      return maybePromise._then(iterator, thrower,
                                                null, null, null);
                  }
              }
              iterator();
          }
          iterator();
          return ret;
      }

      function Disposer(data, promise, context) {
          this._data = data;
          this._promise = promise;
          this._context = context;
      }

      Disposer.prototype.data = function () {
          return this._data;
      };

      Disposer.prototype.promise = function () {
          return this._promise;
      };

      Disposer.prototype.resource = function () {
          if (this.promise().isFulfilled()) {
              return this.promise().value();
          }
          return NULL;
      };

      Disposer.prototype.tryDispose = function(inspection) {
          var resource = this.resource();
          var context = this._context;
          if (context !== undefined) context._pushContext();
          var ret = resource !== NULL
              ? this.doDispose(resource, inspection) : null;
          if (context !== undefined) context._popContext();
          this._promise._unsetDisposable();
          this._data = null;
          return ret;
      };

      Disposer.isDisposer = function (d) {
          return (d != null &&
                  typeof d.resource === "function" &&
                  typeof d.tryDispose === "function");
      };

      function FunctionDisposer(fn, promise, context) {
          this.constructor$(fn, promise, context);
      }
      inherits(FunctionDisposer, Disposer);

      FunctionDisposer.prototype.doDispose = function (resource, inspection) {
          var fn = this.data();
          return fn.call(resource, resource, inspection);
      };

      function maybeUnwrapDisposer(value) {
          if (Disposer.isDisposer(value)) {
              this.resources[this.index]._setDisposable(value);
              return value.promise();
          }
          return value;
      }

      function ResourceList(length) {
          this.length = length;
          this.promise = null;
          this[length-1] = null;
      }

      ResourceList.prototype._resultCancelled = function() {
          var len = this.length;
          for (var i = 0; i < len; ++i) {
              var item = this[i];
              if (item instanceof Promise) {
                  item.cancel();
              }
          }
      };

      Promise.using = function () {
          var len = arguments.length;
          if (len < 2) return apiRejection(
                          "you must pass at least 2 arguments to Promise.using");
          var fn = arguments[len - 1];
          if (typeof fn !== "function") {
              return apiRejection("expecting a function but got " + util$1.classString(fn));
          }
          var input;
          var spreadArgs = true;
          if (len === 2 && Array.isArray(arguments[0])) {
              input = arguments[0];
              len = input.length;
              spreadArgs = false;
          } else {
              input = arguments;
              len--;
          }
          var resources = new ResourceList(len);
          for (var i = 0; i < len; ++i) {
              var resource = input[i];
              if (Disposer.isDisposer(resource)) {
                  var disposer = resource;
                  resource = resource.promise();
                  resource._setDisposable(disposer);
              } else {
                  var maybePromise = tryConvertToPromise(resource);
                  if (maybePromise instanceof Promise) {
                      resource =
                          maybePromise._then(maybeUnwrapDisposer, null, null, {
                              resources: resources,
                              index: i
                      }, undefined);
                  }
              }
              resources[i] = resource;
          }

          var reflectedResources = new Array(resources.length);
          for (var i = 0; i < reflectedResources.length; ++i) {
              reflectedResources[i] = Promise.resolve(resources[i]).reflect();
          }

          var resultPromise = Promise.all(reflectedResources)
              .then(function(inspections) {
                  for (var i = 0; i < inspections.length; ++i) {
                      var inspection = inspections[i];
                      if (inspection.isRejected()) {
                          errorObj.e = inspection.error();
                          return errorObj;
                      } else if (!inspection.isFulfilled()) {
                          resultPromise.cancel();
                          return;
                      }
                      inspections[i] = inspection.value();
                  }
                  promise._pushContext();

                  fn = tryCatch(fn);
                  var ret = spreadArgs
                      ? fn.apply(undefined, inspections) : fn(inspections);
                  var promiseCreated = promise._popContext();
                  debug.checkForgottenReturns(
                      ret, promiseCreated, "Promise.using", promise);
                  return ret;
              });

          var promise = resultPromise.lastly(function() {
              var inspection = new Promise.PromiseInspection(resultPromise);
              return dispose(resources, inspection);
          });
          resources.promise = promise;
          promise._setOnCancel(resources);
          return promise;
      };

      Promise.prototype._setDisposable = function (disposer) {
          this._bitField = this._bitField | 131072;
          this._disposer = disposer;
      };

      Promise.prototype._isDisposable = function () {
          return (this._bitField & 131072) > 0;
      };

      Promise.prototype._getDisposer = function () {
          return this._disposer;
      };

      Promise.prototype._unsetDisposable = function () {
          this._bitField = this._bitField & (~131072);
          this._disposer = undefined;
      };

      Promise.prototype.disposer = function (fn) {
          if (typeof fn === "function") {
              return new FunctionDisposer(fn, this, createContext());
          }
          throw new TypeError();
      };

  };

  var timers = function(Promise, INTERNAL, debug) {
  var util$1 = util;
  var TimeoutError = Promise.TimeoutError;

  function HandleWrapper(handle)  {
      this.handle = handle;
  }

  HandleWrapper.prototype._resultCancelled = function() {
      clearTimeout(this.handle);
  };

  var afterValue = function(value) { return delay(+this).thenReturn(value); };
  var delay = Promise.delay = function (ms, value) {
      var ret;
      var handle;
      if (value !== undefined) {
          ret = Promise.resolve(value)
                  ._then(afterValue, null, null, ms, undefined);
          if (debug.cancellation() && value instanceof Promise) {
              ret._setOnCancel(value);
          }
      } else {
          ret = new Promise(INTERNAL);
          handle = setTimeout(function() { ret._fulfill(); }, +ms);
          if (debug.cancellation()) {
              ret._setOnCancel(new HandleWrapper(handle));
          }
          ret._captureStackTrace();
      }
      ret._setAsyncGuaranteed();
      return ret;
  };

  Promise.prototype.delay = function (ms) {
      return delay(ms, this);
  };

  var afterTimeout = function (promise, message, parent) {
      var err;
      if (typeof message !== "string") {
          if (message instanceof Error) {
              err = message;
          } else {
              err = new TimeoutError("operation timed out");
          }
      } else {
          err = new TimeoutError(message);
      }
      util$1.markAsOriginatingFromRejection(err);
      promise._attachExtraTrace(err);
      promise._reject(err);

      if (parent != null) {
          parent.cancel();
      }
  };

  function successClear(value) {
      clearTimeout(this.handle);
      return value;
  }

  function failureClear(reason) {
      clearTimeout(this.handle);
      throw reason;
  }

  Promise.prototype.timeout = function (ms, message) {
      ms = +ms;
      var ret, parent;

      var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
          if (ret.isPending()) {
              afterTimeout(ret, message, parent);
          }
      }, ms));

      if (debug.cancellation()) {
          parent = this.then();
          ret = parent._then(successClear, failureClear,
                              undefined, handleWrapper, undefined);
          ret._setOnCancel(handleWrapper);
      } else {
          ret = this._then(successClear, failureClear,
                              undefined, handleWrapper, undefined);
      }

      return ret;
  };

  };

  var generators = function(Promise,
                            apiRejection,
                            INTERNAL,
                            tryConvertToPromise,
                            Proxyable,
                            debug) {
  var errors$1 = errors;
  var TypeError = errors$1.TypeError;
  var util$1 = util;
  var errorObj = util$1.errorObj;
  var tryCatch = util$1.tryCatch;
  var yieldHandlers = [];

  function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
      for (var i = 0; i < yieldHandlers.length; ++i) {
          traceParent._pushContext();
          var result = tryCatch(yieldHandlers[i])(value);
          traceParent._popContext();
          if (result === errorObj) {
              traceParent._pushContext();
              var ret = Promise.reject(errorObj.e);
              traceParent._popContext();
              return ret;
          }
          var maybePromise = tryConvertToPromise(result, traceParent);
          if (maybePromise instanceof Promise) return maybePromise;
      }
      return null;
  }

  function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
      if (debug.cancellation()) {
          var internal = new Promise(INTERNAL);
          var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
          this._promise = internal.lastly(function() {
              return _finallyPromise;
          });
          internal._captureStackTrace();
          internal._setOnCancel(this);
      } else {
          var promise = this._promise = new Promise(INTERNAL);
          promise._captureStackTrace();
      }
      this._stack = stack;
      this._generatorFunction = generatorFunction;
      this._receiver = receiver;
      this._generator = undefined;
      this._yieldHandlers = typeof yieldHandler === "function"
          ? [yieldHandler].concat(yieldHandlers)
          : yieldHandlers;
      this._yieldedPromise = null;
      this._cancellationPhase = false;
  }
  util$1.inherits(PromiseSpawn, Proxyable);

  PromiseSpawn.prototype._isResolved = function() {
      return this._promise === null;
  };

  PromiseSpawn.prototype._cleanup = function() {
      this._promise = this._generator = null;
      if (debug.cancellation() && this._finallyPromise !== null) {
          this._finallyPromise._fulfill();
          this._finallyPromise = null;
      }
  };

  PromiseSpawn.prototype._promiseCancelled = function() {
      if (this._isResolved()) return;
      var implementsReturn = typeof this._generator["return"] !== "undefined";

      var result;
      if (!implementsReturn) {
          var reason = new Promise.CancellationError(
              "generator .return() sentinel");
          Promise.coroutine.returnSentinel = reason;
          this._promise._attachExtraTrace(reason);
          this._promise._pushContext();
          result = tryCatch(this._generator["throw"]).call(this._generator,
                                                           reason);
          this._promise._popContext();
      } else {
          this._promise._pushContext();
          result = tryCatch(this._generator["return"]).call(this._generator,
                                                            undefined);
          this._promise._popContext();
      }
      this._cancellationPhase = true;
      this._yieldedPromise = null;
      this._continue(result);
  };

  PromiseSpawn.prototype._promiseFulfilled = function(value) {
      this._yieldedPromise = null;
      this._promise._pushContext();
      var result = tryCatch(this._generator.next).call(this._generator, value);
      this._promise._popContext();
      this._continue(result);
  };

  PromiseSpawn.prototype._promiseRejected = function(reason) {
      this._yieldedPromise = null;
      this._promise._attachExtraTrace(reason);
      this._promise._pushContext();
      var result = tryCatch(this._generator["throw"])
          .call(this._generator, reason);
      this._promise._popContext();
      this._continue(result);
  };

  PromiseSpawn.prototype._resultCancelled = function() {
      if (this._yieldedPromise instanceof Promise) {
          var promise = this._yieldedPromise;
          this._yieldedPromise = null;
          promise.cancel();
      }
  };

  PromiseSpawn.prototype.promise = function () {
      return this._promise;
  };

  PromiseSpawn.prototype._run = function () {
      this._generator = this._generatorFunction.call(this._receiver);
      this._receiver =
          this._generatorFunction = undefined;
      this._promiseFulfilled(undefined);
  };

  PromiseSpawn.prototype._continue = function (result) {
      var promise = this._promise;
      if (result === errorObj) {
          this._cleanup();
          if (this._cancellationPhase) {
              return promise.cancel();
          } else {
              return promise._rejectCallback(result.e, false);
          }
      }

      var value = result.value;
      if (result.done === true) {
          this._cleanup();
          if (this._cancellationPhase) {
              return promise.cancel();
          } else {
              return promise._resolveCallback(value);
          }
      } else {
          var maybePromise = tryConvertToPromise(value, this._promise);
          if (!(maybePromise instanceof Promise)) {
              maybePromise =
                  promiseFromYieldHandler(maybePromise,
                                          this._yieldHandlers,
                                          this._promise);
              if (maybePromise === null) {
                  this._promiseRejected(
                      new TypeError(
                          "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", String(value)) +
                          "From coroutine:\u000a" +
                          this._stack.split("\n").slice(1, -7).join("\n")
                      )
                  );
                  return;
              }
          }
          maybePromise = maybePromise._target();
          var bitField = maybePromise._bitField;
          if (((bitField & 50397184) === 0)) {
              this._yieldedPromise = maybePromise;
              maybePromise._proxy(this, null);
          } else if (((bitField & 33554432) !== 0)) {
              Promise._async.invoke(
                  this._promiseFulfilled, this, maybePromise._value()
              );
          } else if (((bitField & 16777216) !== 0)) {
              Promise._async.invoke(
                  this._promiseRejected, this, maybePromise._reason()
              );
          } else {
              this._promiseCancelled();
          }
      }
  };

  Promise.coroutine = function (generatorFunction, options) {
      if (typeof generatorFunction !== "function") {
          throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      var yieldHandler = Object(options).yieldHandler;
      var PromiseSpawn$ = PromiseSpawn;
      var stack = new Error().stack;
      return function () {
          var generator = generatorFunction.apply(this, arguments);
          var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
                                        stack);
          var ret = spawn.promise();
          spawn._generator = generator;
          spawn._promiseFulfilled(undefined);
          return ret;
      };
  };

  Promise.coroutine.addYieldHandler = function(fn) {
      if (typeof fn !== "function") {
          throw new TypeError("expecting a function but got " + util$1.classString(fn));
      }
      yieldHandlers.push(fn);
  };

  Promise.spawn = function (generatorFunction) {
      debug.deprecated("Promise.spawn()", "Promise.coroutine()");
      if (typeof generatorFunction !== "function") {
          return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      var spawn = new PromiseSpawn(generatorFunction, this);
      var ret = spawn.promise();
      spawn._run(Promise.spawn);
      return ret;
  };
  };

  var nodeify = function(Promise) {
  var util$1 = util;
  var async = Promise._async;
  var tryCatch = util$1.tryCatch;
  var errorObj = util$1.errorObj;

  function spreadAdapter(val, nodeback) {
      var promise = this;
      if (!util$1.isArray(val)) return successAdapter.call(promise, val, nodeback);
      var ret =
          tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
      if (ret === errorObj) {
          async.throwLater(ret.e);
      }
  }

  function successAdapter(val, nodeback) {
      var promise = this;
      var receiver = promise._boundValue();
      var ret = val === undefined
          ? tryCatch(nodeback).call(receiver, null)
          : tryCatch(nodeback).call(receiver, null, val);
      if (ret === errorObj) {
          async.throwLater(ret.e);
      }
  }
  function errorAdapter(reason, nodeback) {
      var promise = this;
      if (!reason) {
          var newReason = new Error(reason + "");
          newReason.cause = reason;
          reason = newReason;
      }
      var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
      if (ret === errorObj) {
          async.throwLater(ret.e);
      }
  }

  Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
                                                                       options) {
      if (typeof nodeback == "function") {
          var adapter = successAdapter;
          if (options !== undefined && Object(options).spread) {
              adapter = spreadAdapter;
          }
          this._then(
              adapter,
              errorAdapter,
              undefined,
              this,
              nodeback
          );
      }
      return this;
  };
  };

  var promisify = function(Promise, INTERNAL) {
  var THIS = {};
  var util$1 = util;
  var nodebackForPromise = nodeback;
  var withAppended = util$1.withAppended;
  var maybeWrapAsError = util$1.maybeWrapAsError;
  var canEvaluate = util$1.canEvaluate;
  var TypeError = errors.TypeError;
  var defaultSuffix = "Async";
  var defaultPromisified = {__isPromisified__: true};
  var noCopyProps = [
      "arity",    "length",
      "name",
      "arguments",
      "caller",
      "callee",
      "prototype",
      "__isPromisified__"
  ];
  var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

  var defaultFilter = function(name) {
      return util$1.isIdentifier(name) &&
          name.charAt(0) !== "_" &&
          name !== "constructor";
  };

  function propsFilter(key) {
      return !noCopyPropsPattern.test(key);
  }

  function isPromisified(fn) {
      try {
          return fn.__isPromisified__ === true;
      }
      catch (e) {
          return false;
      }
  }

  function hasPromisified(obj, key, suffix) {
      var val = util$1.getDataPropertyOrDefault(obj, key + suffix,
                                              defaultPromisified);
      return val ? isPromisified(val) : false;
  }
  function checkValid(ret, suffix, suffixRegexp) {
      for (var i = 0; i < ret.length; i += 2) {
          var key = ret[i];
          if (suffixRegexp.test(key)) {
              var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
              for (var j = 0; j < ret.length; j += 2) {
                  if (ret[j] === keyWithoutAsyncSuffix) {
                      throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
                          .replace("%s", suffix));
                  }
              }
          }
      }
  }

  function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
      var keys = util$1.inheritedDataKeys(obj);
      var ret = [];
      for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var value = obj[key];
          var passesDefaultFilter = filter === defaultFilter
              ? true : defaultFilter(key, value, obj);
          if (typeof value === "function" &&
              !isPromisified(value) &&
              !hasPromisified(obj, key, suffix) &&
              filter(key, value, obj, passesDefaultFilter)) {
              ret.push(key, value);
          }
      }
      checkValid(ret, suffix, suffixRegexp);
      return ret;
  }

  var escapeIdentRegex = function(str) {
      return str.replace(/([$])/, "\\$");
  };

  var makeNodePromisifiedEval;
  {
  var switchCaseArgumentOrder = function(likelyArgumentCount) {
      var ret = [likelyArgumentCount];
      var min = Math.max(0, likelyArgumentCount - 1 - 3);
      for(var i = likelyArgumentCount - 1; i >= min; --i) {
          ret.push(i);
      }
      for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
          ret.push(i);
      }
      return ret;
  };

  var argumentSequence = function(argumentCount) {
      return util$1.filledRange(argumentCount, "_arg", "");
  };

  var parameterDeclaration = function(parameterCount) {
      return util$1.filledRange(
          Math.max(parameterCount, 3), "_arg", "");
  };

  var parameterCount = function(fn) {
      if (typeof fn.length === "number") {
          return Math.max(Math.min(fn.length, 1023 + 1), 0);
      }
      return 0;
  };

  makeNodePromisifiedEval =
  function(callback, receiver, originalName, fn, _, multiArgs) {
      var newParameterCount = Math.max(0, parameterCount(fn) - 1);
      var argumentOrder = switchCaseArgumentOrder(newParameterCount);
      var shouldProxyThis = typeof callback === "string" || receiver === THIS;

      function generateCallForArgumentCount(count) {
          var args = argumentSequence(count).join(", ");
          var comma = count > 0 ? ", " : "";
          var ret;
          if (shouldProxyThis) {
              ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
          } else {
              ret = receiver === undefined
                  ? "ret = callback({{args}}, nodeback); break;\n"
                  : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
          }
          return ret.replace("{{args}}", args).replace(", ", comma);
      }

      function generateArgumentSwitchCase() {
          var ret = "";
          for (var i = 0; i < argumentOrder.length; ++i) {
              ret += "case " + argumentOrder[i] +":" +
                  generateCallForArgumentCount(argumentOrder[i]);
          }

          ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", (shouldProxyThis
                                  ? "ret = callback.apply(this, args);\n"
                                  : "ret = callback.apply(receiver, args);\n"));
          return ret;
      }

      var getFunctionCode = typeof callback === "string"
                                  ? ("this != null ? this['"+callback+"'] : fn")
                                  : "fn";
      var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
          .replace("[GetFunctionCode]", getFunctionCode);
      body = body.replace("Parameters", parameterDeclaration(newParameterCount));
      return new Function("Promise",
                          "fn",
                          "receiver",
                          "withAppended",
                          "maybeWrapAsError",
                          "nodebackForPromise",
                          "tryCatch",
                          "errorObj",
                          "notEnumerableProp",
                          "INTERNAL",
                          body)(
                      Promise,
                      fn,
                      receiver,
                      withAppended,
                      maybeWrapAsError,
                      nodebackForPromise,
                      util$1.tryCatch,
                      util$1.errorObj,
                      util$1.notEnumerableProp,
                      INTERNAL);
  };
  }

  function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
      var defaultThis = (function() {return this;})();
      var method = callback;
      if (typeof method === "string") {
          callback = fn;
      }
      function promisified() {
          var _receiver = receiver;
          if (receiver === THIS) _receiver = this;
          var promise = new Promise(INTERNAL);
          promise._captureStackTrace();
          var cb = typeof method === "string" && this !== defaultThis
              ? this[method] : callback;
          var fn = nodebackForPromise(promise, multiArgs);
          try {
              cb.apply(_receiver, withAppended(arguments, fn));
          } catch(e) {
              promise._rejectCallback(maybeWrapAsError(e), true, true);
          }
          if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
          return promise;
      }
      util$1.notEnumerableProp(promisified, "__isPromisified__", true);
      return promisified;
  }

  var makeNodePromisified = canEvaluate
      ? makeNodePromisifiedEval
      : makeNodePromisifiedClosure;

  function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
      var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
      var methods =
          promisifiableMethods(obj, suffix, suffixRegexp, filter);

      for (var i = 0, len = methods.length; i < len; i+= 2) {
          var key = methods[i];
          var fn = methods[i+1];
          var promisifiedKey = key + suffix;
          if (promisifier === makeNodePromisified) {
              obj[promisifiedKey] =
                  makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
          } else {
              var promisified = promisifier(fn, function() {
                  return makeNodePromisified(key, THIS, key,
                                             fn, suffix, multiArgs);
              });
              util$1.notEnumerableProp(promisified, "__isPromisified__", true);
              obj[promisifiedKey] = promisified;
          }
      }
      util$1.toFastProperties(obj);
      return obj;
  }

  function promisify(callback, receiver, multiArgs) {
      return makeNodePromisified(callback, receiver, undefined,
                                  callback, null, multiArgs);
  }

  Promise.promisify = function (fn, options) {
      if (typeof fn !== "function") {
          throw new TypeError("expecting a function but got " + util$1.classString(fn));
      }
      if (isPromisified(fn)) {
          return fn;
      }
      options = Object(options);
      var receiver = options.context === undefined ? THIS : options.context;
      var multiArgs = !!options.multiArgs;
      var ret = promisify(fn, receiver, multiArgs);
      util$1.copyDescriptors(fn, ret, propsFilter);
      return ret;
  };

  Promise.promisifyAll = function (target, options) {
      if (typeof target !== "function" && typeof target !== "object") {
          throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      options = Object(options);
      var multiArgs = !!options.multiArgs;
      var suffix = options.suffix;
      if (typeof suffix !== "string") suffix = defaultSuffix;
      var filter = options.filter;
      if (typeof filter !== "function") filter = defaultFilter;
      var promisifier = options.promisifier;
      if (typeof promisifier !== "function") promisifier = makeNodePromisified;

      if (!util$1.isIdentifier(suffix)) {
          throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }

      var keys = util$1.inheritedDataKeys(target);
      for (var i = 0; i < keys.length; ++i) {
          var value = target[keys[i]];
          if (keys[i] !== "constructor" &&
              util$1.isClass(value)) {
              promisifyAll(value.prototype, suffix, filter, promisifier,
                  multiArgs);
              promisifyAll(value, suffix, filter, promisifier, multiArgs);
          }
      }

      return promisifyAll(target, suffix, filter, promisifier, multiArgs);
  };
  };

  var props = function(
      Promise, PromiseArray, tryConvertToPromise, apiRejection) {
  var util$1 = util;
  var isObject = util$1.isObject;
  var es5$1 = es5;
  var Es6Map;
  if (typeof Map === "function") Es6Map = Map;

  var mapToEntries = (function() {
      var index = 0;
      var size = 0;

      function extractEntry(value, key) {
          this[index] = value;
          this[index + size] = key;
          index++;
      }

      return function mapToEntries(map) {
          size = map.size;
          index = 0;
          var ret = new Array(map.size * 2);
          map.forEach(extractEntry, ret);
          return ret;
      };
  })();

  var entriesToMap = function(entries) {
      var ret = new Es6Map();
      var length = entries.length / 2 | 0;
      for (var i = 0; i < length; ++i) {
          var key = entries[length + i];
          var value = entries[i];
          ret.set(key, value);
      }
      return ret;
  };

  function PropertiesPromiseArray(obj) {
      var isMap = false;
      var entries;
      if (Es6Map !== undefined && obj instanceof Es6Map) {
          entries = mapToEntries(obj);
          isMap = true;
      } else {
          var keys = es5$1.keys(obj);
          var len = keys.length;
          entries = new Array(len * 2);
          for (var i = 0; i < len; ++i) {
              var key = keys[i];
              entries[i] = obj[key];
              entries[i + len] = key;
          }
      }
      this.constructor$(entries);
      this._isMap = isMap;
      this._init$(undefined, isMap ? -6 : -3);
  }
  util$1.inherits(PropertiesPromiseArray, PromiseArray);

  PropertiesPromiseArray.prototype._init = function () {};

  PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
      this._values[index] = value;
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= this._length) {
          var val;
          if (this._isMap) {
              val = entriesToMap(this._values);
          } else {
              val = {};
              var keyOffset = this.length();
              for (var i = 0, len = this.length(); i < len; ++i) {
                  val[this._values[i + keyOffset]] = this._values[i];
              }
          }
          this._resolve(val);
          return true;
      }
      return false;
  };

  PropertiesPromiseArray.prototype.shouldCopyValues = function () {
      return false;
  };

  PropertiesPromiseArray.prototype.getActualLength = function (len) {
      return len >> 1;
  };

  function props(promises) {
      var ret;
      var castValue = tryConvertToPromise(promises);

      if (!isObject(castValue)) {
          return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      } else if (castValue instanceof Promise) {
          ret = castValue._then(
              Promise.props, undefined, undefined, undefined, undefined);
      } else {
          ret = new PropertiesPromiseArray(castValue).promise();
      }

      if (castValue instanceof Promise) {
          ret._propagateFrom(castValue, 2);
      }
      return ret;
  }

  Promise.prototype.props = function () {
      return props(this);
  };

  Promise.props = function (promises) {
      return props(promises);
  };
  };

  var race = function(
      Promise, INTERNAL, tryConvertToPromise, apiRejection) {
  var util$1 = util;

  var raceLater = function (promise) {
      return promise.then(function(array) {
          return race(array, promise);
      });
  };

  function race(promises, parent) {
      var maybePromise = tryConvertToPromise(promises);

      if (maybePromise instanceof Promise) {
          return raceLater(maybePromise);
      } else {
          promises = util$1.asArray(promises);
          if (promises === null)
              return apiRejection("expecting an array or an iterable object but got " + util$1.classString(promises));
      }

      var ret = new Promise(INTERNAL);
      if (parent !== undefined) {
          ret._propagateFrom(parent, 3);
      }
      var fulfill = ret._fulfill;
      var reject = ret._reject;
      for (var i = 0, len = promises.length; i < len; ++i) {
          var val = promises[i];

          if (val === undefined && !(i in promises)) {
              continue;
          }

          Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
      }
      return ret;
  }

  Promise.race = function (promises) {
      return race(promises, undefined);
  };

  Promise.prototype.race = function () {
      return race(this, undefined);
  };

  };

  var reduce = function(Promise,
                            PromiseArray,
                            apiRejection,
                            tryConvertToPromise,
                            INTERNAL,
                            debug) {
  var getDomain = Promise._getDomain;
  var util$1 = util;
  var tryCatch = util$1.tryCatch;

  function ReductionPromiseArray(promises, fn, initialValue, _each) {
      this.constructor$(promises);
      var domain = getDomain();
      this._fn = domain === null ? fn : util$1.domainBind(domain, fn);
      if (initialValue !== undefined) {
          initialValue = Promise.resolve(initialValue);
          initialValue._attachCancellationCallback(this);
      }
      this._initialValue = initialValue;
      this._currentCancellable = null;
      if(_each === INTERNAL) {
          this._eachValues = Array(this._length);
      } else if (_each === 0) {
          this._eachValues = null;
      } else {
          this._eachValues = undefined;
      }
      this._promise._captureStackTrace();
      this._init$(undefined, -5);
  }
  util$1.inherits(ReductionPromiseArray, PromiseArray);

  ReductionPromiseArray.prototype._gotAccum = function(accum) {
      if (this._eachValues !== undefined && 
          this._eachValues !== null && 
          accum !== INTERNAL) {
          this._eachValues.push(accum);
      }
  };

  ReductionPromiseArray.prototype._eachComplete = function(value) {
      if (this._eachValues !== null) {
          this._eachValues.push(value);
      }
      return this._eachValues;
  };

  ReductionPromiseArray.prototype._init = function() {};

  ReductionPromiseArray.prototype._resolveEmptyArray = function() {
      this._resolve(this._eachValues !== undefined ? this._eachValues
                                                   : this._initialValue);
  };

  ReductionPromiseArray.prototype.shouldCopyValues = function () {
      return false;
  };

  ReductionPromiseArray.prototype._resolve = function(value) {
      this._promise._resolveCallback(value);
      this._values = null;
  };

  ReductionPromiseArray.prototype._resultCancelled = function(sender) {
      if (sender === this._initialValue) return this._cancel();
      if (this._isResolved()) return;
      this._resultCancelled$();
      if (this._currentCancellable instanceof Promise) {
          this._currentCancellable.cancel();
      }
      if (this._initialValue instanceof Promise) {
          this._initialValue.cancel();
      }
  };

  ReductionPromiseArray.prototype._iterate = function (values) {
      this._values = values;
      var value;
      var i;
      var length = values.length;
      if (this._initialValue !== undefined) {
          value = this._initialValue;
          i = 0;
      } else {
          value = Promise.resolve(values[0]);
          i = 1;
      }

      this._currentCancellable = value;

      if (!value.isRejected()) {
          for (; i < length; ++i) {
              var ctx = {
                  accum: null,
                  value: values[i],
                  index: i,
                  length: length,
                  array: this
              };
              value = value._then(gotAccum, undefined, undefined, ctx, undefined);
          }
      }

      if (this._eachValues !== undefined) {
          value = value
              ._then(this._eachComplete, undefined, undefined, this, undefined);
      }
      value._then(completed, completed, undefined, value, this);
  };

  Promise.prototype.reduce = function (fn, initialValue) {
      return reduce(this, fn, initialValue, null);
  };

  Promise.reduce = function (promises, fn, initialValue, _each) {
      return reduce(promises, fn, initialValue, _each);
  };

  function completed(valueOrReason, array) {
      if (this.isFulfilled()) {
          array._resolve(valueOrReason);
      } else {
          array._reject(valueOrReason);
      }
  }

  function reduce(promises, fn, initialValue, _each) {
      if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util$1.classString(fn));
      }
      var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
      return array.promise();
  }

  function gotAccum(accum) {
      this.accum = accum;
      this.array._gotAccum(accum);
      var value = tryConvertToPromise(this.value, this.array._promise);
      if (value instanceof Promise) {
          this.array._currentCancellable = value;
          return value._then(gotValue, undefined, undefined, this, undefined);
      } else {
          return gotValue.call(this, value);
      }
  }

  function gotValue(value) {
      var array = this.array;
      var promise = array._promise;
      var fn = tryCatch(array._fn);
      promise._pushContext();
      var ret;
      if (array._eachValues !== undefined) {
          ret = fn.call(promise._boundValue(), value, this.index, this.length);
      } else {
          ret = fn.call(promise._boundValue(),
                                this.accum, value, this.index, this.length);
      }
      if (ret instanceof Promise) {
          array._currentCancellable = ret;
      }
      var promiseCreated = promise._popContext();
      debug.checkForgottenReturns(
          ret,
          promiseCreated,
          array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
          promise
      );
      return ret;
  }
  };

  var settle$1 =
      function(Promise, PromiseArray, debug) {
  var PromiseInspection = Promise.PromiseInspection;
  var util$1 = util;

  function SettledPromiseArray(values) {
      this.constructor$(values);
  }
  util$1.inherits(SettledPromiseArray, PromiseArray);

  SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
      this._values[index] = inspection;
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= this._length) {
          this._resolve(this._values);
          return true;
      }
      return false;
  };

  SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
      var ret = new PromiseInspection();
      ret._bitField = 33554432;
      ret._settledValueField = value;
      return this._promiseResolved(index, ret);
  };
  SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
      var ret = new PromiseInspection();
      ret._bitField = 16777216;
      ret._settledValueField = reason;
      return this._promiseResolved(index, ret);
  };

  Promise.settle = function (promises) {
      debug.deprecated(".settle()", ".reflect()");
      return new SettledPromiseArray(promises).promise();
  };

  Promise.prototype.settle = function () {
      return Promise.settle(this);
  };
  };

  var some =
  function(Promise, PromiseArray, apiRejection) {
  var util$1 = util;
  var RangeError = errors.RangeError;
  var AggregateError = errors.AggregateError;
  var isArray = util$1.isArray;
  var CANCELLATION = {};


  function SomePromiseArray(values) {
      this.constructor$(values);
      this._howMany = 0;
      this._unwrap = false;
      this._initialized = false;
  }
  util$1.inherits(SomePromiseArray, PromiseArray);

  SomePromiseArray.prototype._init = function () {
      if (!this._initialized) {
          return;
      }
      if (this._howMany === 0) {
          this._resolve([]);
          return;
      }
      this._init$(undefined, -5);
      var isArrayResolved = isArray(this._values);
      if (!this._isResolved() &&
          isArrayResolved &&
          this._howMany > this._canPossiblyFulfill()) {
          this._reject(this._getRangeError(this.length()));
      }
  };

  SomePromiseArray.prototype.init = function () {
      this._initialized = true;
      this._init();
  };

  SomePromiseArray.prototype.setUnwrap = function () {
      this._unwrap = true;
  };

  SomePromiseArray.prototype.howMany = function () {
      return this._howMany;
  };

  SomePromiseArray.prototype.setHowMany = function (count) {
      this._howMany = count;
  };

  SomePromiseArray.prototype._promiseFulfilled = function (value) {
      this._addFulfilled(value);
      if (this._fulfilled() === this.howMany()) {
          this._values.length = this.howMany();
          if (this.howMany() === 1 && this._unwrap) {
              this._resolve(this._values[0]);
          } else {
              this._resolve(this._values);
          }
          return true;
      }
      return false;

  };
  SomePromiseArray.prototype._promiseRejected = function (reason) {
      this._addRejected(reason);
      return this._checkOutcome();
  };

  SomePromiseArray.prototype._promiseCancelled = function () {
      if (this._values instanceof Promise || this._values == null) {
          return this._cancel();
      }
      this._addRejected(CANCELLATION);
      return this._checkOutcome();
  };

  SomePromiseArray.prototype._checkOutcome = function() {
      if (this.howMany() > this._canPossiblyFulfill()) {
          var e = new AggregateError();
          for (var i = this.length(); i < this._values.length; ++i) {
              if (this._values[i] !== CANCELLATION) {
                  e.push(this._values[i]);
              }
          }
          if (e.length > 0) {
              this._reject(e);
          } else {
              this._cancel();
          }
          return true;
      }
      return false;
  };

  SomePromiseArray.prototype._fulfilled = function () {
      return this._totalResolved;
  };

  SomePromiseArray.prototype._rejected = function () {
      return this._values.length - this.length();
  };

  SomePromiseArray.prototype._addRejected = function (reason) {
      this._values.push(reason);
  };

  SomePromiseArray.prototype._addFulfilled = function (value) {
      this._values[this._totalResolved++] = value;
  };

  SomePromiseArray.prototype._canPossiblyFulfill = function () {
      return this.length() - this._rejected();
  };

  SomePromiseArray.prototype._getRangeError = function (count) {
      var message = "Input array must contain at least " +
              this._howMany + " items but contains only " + count + " items";
      return new RangeError(message);
  };

  SomePromiseArray.prototype._resolveEmptyArray = function () {
      this._reject(this._getRangeError(0));
  };

  function some(promises, howMany) {
      if ((howMany | 0) !== howMany || howMany < 0) {
          return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      var ret = new SomePromiseArray(promises);
      var promise = ret.promise();
      ret.setHowMany(howMany);
      ret.init();
      return promise;
  }

  Promise.some = function (promises, howMany) {
      return some(promises, howMany);
  };

  Promise.prototype.some = function (howMany) {
      return some(this, howMany);
  };

  Promise._SomePromiseArray = SomePromiseArray;
  };

  var filter = function(Promise, INTERNAL) {
  var PromiseMap = Promise.map;

  Promise.prototype.filter = function (fn, options) {
      return PromiseMap(this, fn, options, INTERNAL);
  };

  Promise.filter = function (promises, fn, options) {
      return PromiseMap(promises, fn, options, INTERNAL);
  };
  };

  var each = function(Promise, INTERNAL) {
  var PromiseReduce = Promise.reduce;
  var PromiseAll = Promise.all;

  function promiseAllThis() {
      return PromiseAll(this);
  }

  function PromiseMapSeries(promises, fn) {
      return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
  }

  Promise.prototype.each = function (fn) {
      return PromiseReduce(this, fn, INTERNAL, 0)
                ._then(promiseAllThis, undefined, undefined, this, undefined);
  };

  Promise.prototype.mapSeries = function (fn) {
      return PromiseReduce(this, fn, INTERNAL, INTERNAL);
  };

  Promise.each = function (promises, fn) {
      return PromiseReduce(promises, fn, INTERNAL, 0)
                ._then(promiseAllThis, undefined, undefined, promises, undefined);
  };

  Promise.mapSeries = PromiseMapSeries;
  };

  var any = function(Promise) {
  var SomePromiseArray = Promise._SomePromiseArray;
  function any(promises) {
      var ret = new SomePromiseArray(promises);
      var promise = ret.promise();
      ret.setHowMany(1);
      ret.setUnwrap();
      ret.init();
      return promise;
  }

  Promise.any = function (promises) {
      return any(promises);
  };

  Promise.prototype.any = function () {
      return any(this);
  };

  };

  var promise = createCommonjsModule(function (module) {
  module.exports = function() {
  var makeSelfResolutionError = function () {
      return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
  };
  var reflectHandler = function() {
      return new Promise.PromiseInspection(this._target());
  };
  var apiRejection = function(msg) {
      return Promise.reject(new TypeError(msg));
  };
  function Proxyable() {}
  var UNDEFINED_BINDING = {};
  var util$1 = util;

  var getDomain;
  if (util$1.isNode) {
      getDomain = function() {
          var ret = process.domain;
          if (ret === undefined) ret = null;
          return ret;
      };
  } else {
      getDomain = function() {
          return null;
      };
  }
  util$1.notEnumerableProp(Promise, "_getDomain", getDomain);

  var es5$1 = es5;
  var Async = async;
  var async$1 = new Async();
  es5$1.defineProperty(Promise, "_async", {value: async$1});
  var errors$1 = errors;
  var TypeError = Promise.TypeError = errors$1.TypeError;
  Promise.RangeError = errors$1.RangeError;
  var CancellationError = Promise.CancellationError = errors$1.CancellationError;
  Promise.TimeoutError = errors$1.TimeoutError;
  Promise.OperationalError = errors$1.OperationalError;
  Promise.RejectionError = errors$1.OperationalError;
  Promise.AggregateError = errors$1.AggregateError;
  var INTERNAL = function(){};
  var APPLY = {};
  var NEXT_FILTER = {};
  var tryConvertToPromise = thenables(Promise, INTERNAL);
  var PromiseArray =
      promise_array(Promise, INTERNAL,
                                 tryConvertToPromise, apiRejection, Proxyable);
  var Context = context(Promise);
   /*jshint unused:false*/
  var createContext = Context.create;
  var debug = debuggability(Promise, Context);
  var PassThroughHandlerContext =
      _finally(Promise, tryConvertToPromise, NEXT_FILTER);
  var catchFilter = catch_filter(NEXT_FILTER);
  var nodebackForPromise = nodeback;
  var errorObj = util$1.errorObj;
  var tryCatch = util$1.tryCatch;
  function check(self, executor) {
      if (self == null || self.constructor !== Promise) {
          throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      if (typeof executor !== "function") {
          throw new TypeError("expecting a function but got " + util$1.classString(executor));
      }

  }

  function Promise(executor) {
      if (executor !== INTERNAL) {
          check(this, executor);
      }
      this._bitField = 0;
      this._fulfillmentHandler0 = undefined;
      this._rejectionHandler0 = undefined;
      this._promise0 = undefined;
      this._receiver0 = undefined;
      this._resolveFromExecutor(executor);
      this._promiseCreated();
      this._fireEvent("promiseCreated", this);
  }

  Promise.prototype.toString = function () {
      return "[object Promise]";
  };

  Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
      var len = arguments.length;
      if (len > 1) {
          var catchInstances = new Array(len - 1),
              j = 0, i;
          for (i = 0; i < len - 1; ++i) {
              var item = arguments[i];
              if (util$1.isObject(item)) {
                  catchInstances[j++] = item;
              } else {
                  return apiRejection("Catch statement predicate: " +
                      "expecting an object but got " + util$1.classString(item));
              }
          }
          catchInstances.length = j;
          fn = arguments[i];
          return this.then(undefined, catchFilter(catchInstances, fn, this));
      }
      return this.then(undefined, fn);
  };

  Promise.prototype.reflect = function () {
      return this._then(reflectHandler,
          reflectHandler, undefined, this, undefined);
  };

  Promise.prototype.then = function (didFulfill, didReject) {
      if (debug.warnings() && arguments.length > 0 &&
          typeof didFulfill !== "function" &&
          typeof didReject !== "function") {
          var msg = ".then() only accepts functions but was passed: " +
                  util$1.classString(didFulfill);
          if (arguments.length > 1) {
              msg += ", " + util$1.classString(didReject);
          }
          this._warn(msg);
      }
      return this._then(didFulfill, didReject, undefined, undefined, undefined);
  };

  Promise.prototype.done = function (didFulfill, didReject) {
      var promise =
          this._then(didFulfill, didReject, undefined, undefined, undefined);
      promise._setIsFinal();
  };

  Promise.prototype.spread = function (fn) {
      if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util$1.classString(fn));
      }
      return this.all()._then(fn, undefined, undefined, APPLY, undefined);
  };

  Promise.prototype.toJSON = function () {
      var ret = {
          isFulfilled: false,
          isRejected: false,
          fulfillmentValue: undefined,
          rejectionReason: undefined
      };
      if (this.isFulfilled()) {
          ret.fulfillmentValue = this.value();
          ret.isFulfilled = true;
      } else if (this.isRejected()) {
          ret.rejectionReason = this.reason();
          ret.isRejected = true;
      }
      return ret;
  };

  Promise.prototype.all = function () {
      if (arguments.length > 0) {
          this._warn(".all() was passed arguments but it does not take any");
      }
      return new PromiseArray(this).promise();
  };

  Promise.prototype.error = function (fn) {
      return this.caught(util$1.originatesFromRejection, fn);
  };

  Promise.getNewLibraryCopy = module.exports;

  Promise.is = function (val) {
      return val instanceof Promise;
  };

  Promise.fromNode = Promise.fromCallback = function(fn) {
      var ret = new Promise(INTERNAL);
      ret._captureStackTrace();
      var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
                                           : false;
      var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
      if (result === errorObj) {
          ret._rejectCallback(result.e, true);
      }
      if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
      return ret;
  };

  Promise.all = function (promises) {
      return new PromiseArray(promises).promise();
  };

  Promise.cast = function (obj) {
      var ret = tryConvertToPromise(obj);
      if (!(ret instanceof Promise)) {
          ret = new Promise(INTERNAL);
          ret._captureStackTrace();
          ret._setFulfilled();
          ret._rejectionHandler0 = obj;
      }
      return ret;
  };

  Promise.resolve = Promise.fulfilled = Promise.cast;

  Promise.reject = Promise.rejected = function (reason) {
      var ret = new Promise(INTERNAL);
      ret._captureStackTrace();
      ret._rejectCallback(reason, true);
      return ret;
  };

  Promise.setScheduler = function(fn) {
      if (typeof fn !== "function") {
          throw new TypeError("expecting a function but got " + util$1.classString(fn));
      }
      return async$1.setScheduler(fn);
  };

  Promise.prototype._then = function (
      didFulfill,
      didReject,
      _,    receiver,
      internalData
  ) {
      var haveInternalData = internalData !== undefined;
      var promise = haveInternalData ? internalData : new Promise(INTERNAL);
      var target = this._target();
      var bitField = target._bitField;

      if (!haveInternalData) {
          promise._propagateFrom(this, 3);
          promise._captureStackTrace();
          if (receiver === undefined &&
              ((this._bitField & 2097152) !== 0)) {
              if (!((bitField & 50397184) === 0)) {
                  receiver = this._boundValue();
              } else {
                  receiver = target === this ? undefined : this._boundTo;
              }
          }
          this._fireEvent("promiseChained", this, promise);
      }

      var domain = getDomain();
      if (!((bitField & 50397184) === 0)) {
          var handler, value, settler = target._settlePromiseCtx;
          if (((bitField & 33554432) !== 0)) {
              value = target._rejectionHandler0;
              handler = didFulfill;
          } else if (((bitField & 16777216) !== 0)) {
              value = target._fulfillmentHandler0;
              handler = didReject;
              target._unsetRejectionIsUnhandled();
          } else {
              settler = target._settlePromiseLateCancellationObserver;
              value = new CancellationError("late cancellation observer");
              target._attachExtraTrace(value);
              handler = didReject;
          }

          async$1.invoke(settler, target, {
              handler: domain === null ? handler
                  : (typeof handler === "function" &&
                      util$1.domainBind(domain, handler)),
              promise: promise,
              receiver: receiver,
              value: value
          });
      } else {
          target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
      }

      return promise;
  };

  Promise.prototype._length = function () {
      return this._bitField & 65535;
  };

  Promise.prototype._isFateSealed = function () {
      return (this._bitField & 117506048) !== 0;
  };

  Promise.prototype._isFollowing = function () {
      return (this._bitField & 67108864) === 67108864;
  };

  Promise.prototype._setLength = function (len) {
      this._bitField = (this._bitField & -65536) |
          (len & 65535);
  };

  Promise.prototype._setFulfilled = function () {
      this._bitField = this._bitField | 33554432;
      this._fireEvent("promiseFulfilled", this);
  };

  Promise.prototype._setRejected = function () {
      this._bitField = this._bitField | 16777216;
      this._fireEvent("promiseRejected", this);
  };

  Promise.prototype._setFollowing = function () {
      this._bitField = this._bitField | 67108864;
      this._fireEvent("promiseResolved", this);
  };

  Promise.prototype._setIsFinal = function () {
      this._bitField = this._bitField | 4194304;
  };

  Promise.prototype._isFinal = function () {
      return (this._bitField & 4194304) > 0;
  };

  Promise.prototype._unsetCancelled = function() {
      this._bitField = this._bitField & (~65536);
  };

  Promise.prototype._setCancelled = function() {
      this._bitField = this._bitField | 65536;
      this._fireEvent("promiseCancelled", this);
  };

  Promise.prototype._setWillBeCancelled = function() {
      this._bitField = this._bitField | 8388608;
  };

  Promise.prototype._setAsyncGuaranteed = function() {
      if (async$1.hasCustomScheduler()) return;
      this._bitField = this._bitField | 134217728;
  };

  Promise.prototype._receiverAt = function (index) {
      var ret = index === 0 ? this._receiver0 : this[
              index * 4 - 4 + 3];
      if (ret === UNDEFINED_BINDING) {
          return undefined;
      } else if (ret === undefined && this._isBound()) {
          return this._boundValue();
      }
      return ret;
  };

  Promise.prototype._promiseAt = function (index) {
      return this[
              index * 4 - 4 + 2];
  };

  Promise.prototype._fulfillmentHandlerAt = function (index) {
      return this[
              index * 4 - 4 + 0];
  };

  Promise.prototype._rejectionHandlerAt = function (index) {
      return this[
              index * 4 - 4 + 1];
  };

  Promise.prototype._boundValue = function() {};

  Promise.prototype._migrateCallback0 = function (follower) {
      var bitField = follower._bitField;
      var fulfill = follower._fulfillmentHandler0;
      var reject = follower._rejectionHandler0;
      var promise = follower._promise0;
      var receiver = follower._receiverAt(0);
      if (receiver === undefined) receiver = UNDEFINED_BINDING;
      this._addCallbacks(fulfill, reject, promise, receiver, null);
  };

  Promise.prototype._migrateCallbackAt = function (follower, index) {
      var fulfill = follower._fulfillmentHandlerAt(index);
      var reject = follower._rejectionHandlerAt(index);
      var promise = follower._promiseAt(index);
      var receiver = follower._receiverAt(index);
      if (receiver === undefined) receiver = UNDEFINED_BINDING;
      this._addCallbacks(fulfill, reject, promise, receiver, null);
  };

  Promise.prototype._addCallbacks = function (
      fulfill,
      reject,
      promise,
      receiver,
      domain
  ) {
      var index = this._length();

      if (index >= 65535 - 4) {
          index = 0;
          this._setLength(0);
      }

      if (index === 0) {
          this._promise0 = promise;
          this._receiver0 = receiver;
          if (typeof fulfill === "function") {
              this._fulfillmentHandler0 =
                  domain === null ? fulfill : util$1.domainBind(domain, fulfill);
          }
          if (typeof reject === "function") {
              this._rejectionHandler0 =
                  domain === null ? reject : util$1.domainBind(domain, reject);
          }
      } else {
          var base = index * 4 - 4;
          this[base + 2] = promise;
          this[base + 3] = receiver;
          if (typeof fulfill === "function") {
              this[base + 0] =
                  domain === null ? fulfill : util$1.domainBind(domain, fulfill);
          }
          if (typeof reject === "function") {
              this[base + 1] =
                  domain === null ? reject : util$1.domainBind(domain, reject);
          }
      }
      this._setLength(index + 1);
      return index;
  };

  Promise.prototype._proxy = function (proxyable, arg) {
      this._addCallbacks(undefined, undefined, arg, proxyable, null);
  };

  Promise.prototype._resolveCallback = function(value, shouldBind) {
      if (((this._bitField & 117506048) !== 0)) return;
      if (value === this)
          return this._rejectCallback(makeSelfResolutionError(), false);
      var maybePromise = tryConvertToPromise(value, this);
      if (!(maybePromise instanceof Promise)) return this._fulfill(value);

      if (shouldBind) this._propagateFrom(maybePromise, 2);

      var promise = maybePromise._target();

      if (promise === this) {
          this._reject(makeSelfResolutionError());
          return;
      }

      var bitField = promise._bitField;
      if (((bitField & 50397184) === 0)) {
          var len = this._length();
          if (len > 0) promise._migrateCallback0(this);
          for (var i = 1; i < len; ++i) {
              promise._migrateCallbackAt(this, i);
          }
          this._setFollowing();
          this._setLength(0);
          this._setFollowee(promise);
      } else if (((bitField & 33554432) !== 0)) {
          this._fulfill(promise._value());
      } else if (((bitField & 16777216) !== 0)) {
          this._reject(promise._reason());
      } else {
          var reason = new CancellationError("late cancellation observer");
          promise._attachExtraTrace(reason);
          this._reject(reason);
      }
  };

  Promise.prototype._rejectCallback =
  function(reason, synchronous, ignoreNonErrorWarnings) {
      var trace = util$1.ensureErrorObject(reason);
      var hasStack = trace === reason;
      if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
          var message = "a promise was rejected with a non-error: " +
              util$1.classString(reason);
          this._warn(message, true);
      }
      this._attachExtraTrace(trace, synchronous ? hasStack : false);
      this._reject(reason);
  };

  Promise.prototype._resolveFromExecutor = function (executor) {
      if (executor === INTERNAL) return;
      var promise = this;
      this._captureStackTrace();
      this._pushContext();
      var synchronous = true;
      var r = this._execute(executor, function(value) {
          promise._resolveCallback(value);
      }, function (reason) {
          promise._rejectCallback(reason, synchronous);
      });
      synchronous = false;
      this._popContext();

      if (r !== undefined) {
          promise._rejectCallback(r, true);
      }
  };

  Promise.prototype._settlePromiseFromHandler = function (
      handler, receiver, value, promise
  ) {
      var bitField = promise._bitField;
      if (((bitField & 65536) !== 0)) return;
      promise._pushContext();
      var x;
      if (receiver === APPLY) {
          if (!value || typeof value.length !== "number") {
              x = errorObj;
              x.e = new TypeError("cannot .spread() a non-array: " +
                                      util$1.classString(value));
          } else {
              x = tryCatch(handler).apply(this._boundValue(), value);
          }
      } else {
          x = tryCatch(handler).call(receiver, value);
      }
      var promiseCreated = promise._popContext();
      bitField = promise._bitField;
      if (((bitField & 65536) !== 0)) return;

      if (x === NEXT_FILTER) {
          promise._reject(value);
      } else if (x === errorObj) {
          promise._rejectCallback(x.e, false);
      } else {
          debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
          promise._resolveCallback(x);
      }
  };

  Promise.prototype._target = function() {
      var ret = this;
      while (ret._isFollowing()) ret = ret._followee();
      return ret;
  };

  Promise.prototype._followee = function() {
      return this._rejectionHandler0;
  };

  Promise.prototype._setFollowee = function(promise) {
      this._rejectionHandler0 = promise;
  };

  Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
      var isPromise = promise instanceof Promise;
      var bitField = this._bitField;
      var asyncGuaranteed = ((bitField & 134217728) !== 0);
      if (((bitField & 65536) !== 0)) {
          if (isPromise) promise._invokeInternalOnCancel();

          if (receiver instanceof PassThroughHandlerContext &&
              receiver.isFinallyHandler()) {
              receiver.cancelPromise = promise;
              if (tryCatch(handler).call(receiver, value) === errorObj) {
                  promise._reject(errorObj.e);
              }
          } else if (handler === reflectHandler) {
              promise._fulfill(reflectHandler.call(receiver));
          } else if (receiver instanceof Proxyable) {
              receiver._promiseCancelled(promise);
          } else if (isPromise || promise instanceof PromiseArray) {
              promise._cancel();
          } else {
              receiver.cancel();
          }
      } else if (typeof handler === "function") {
          if (!isPromise) {
              handler.call(receiver, value, promise);
          } else {
              if (asyncGuaranteed) promise._setAsyncGuaranteed();
              this._settlePromiseFromHandler(handler, receiver, value, promise);
          }
      } else if (receiver instanceof Proxyable) {
          if (!receiver._isResolved()) {
              if (((bitField & 33554432) !== 0)) {
                  receiver._promiseFulfilled(value, promise);
              } else {
                  receiver._promiseRejected(value, promise);
              }
          }
      } else if (isPromise) {
          if (asyncGuaranteed) promise._setAsyncGuaranteed();
          if (((bitField & 33554432) !== 0)) {
              promise._fulfill(value);
          } else {
              promise._reject(value);
          }
      }
  };

  Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
      var handler = ctx.handler;
      var promise = ctx.promise;
      var receiver = ctx.receiver;
      var value = ctx.value;
      if (typeof handler === "function") {
          if (!(promise instanceof Promise)) {
              handler.call(receiver, value, promise);
          } else {
              this._settlePromiseFromHandler(handler, receiver, value, promise);
          }
      } else if (promise instanceof Promise) {
          promise._reject(value);
      }
  };

  Promise.prototype._settlePromiseCtx = function(ctx) {
      this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
  };

  Promise.prototype._settlePromise0 = function(handler, value, bitField) {
      var promise = this._promise0;
      var receiver = this._receiverAt(0);
      this._promise0 = undefined;
      this._receiver0 = undefined;
      this._settlePromise(promise, handler, receiver, value);
  };

  Promise.prototype._clearCallbackDataAtIndex = function(index) {
      var base = index * 4 - 4;
      this[base + 2] =
      this[base + 3] =
      this[base + 0] =
      this[base + 1] = undefined;
  };

  Promise.prototype._fulfill = function (value) {
      var bitField = this._bitField;
      if (((bitField & 117506048) >>> 16)) return;
      if (value === this) {
          var err = makeSelfResolutionError();
          this._attachExtraTrace(err);
          return this._reject(err);
      }
      this._setFulfilled();
      this._rejectionHandler0 = value;

      if ((bitField & 65535) > 0) {
          if (((bitField & 134217728) !== 0)) {
              this._settlePromises();
          } else {
              async$1.settlePromises(this);
          }
          this._dereferenceTrace();
      }
  };

  Promise.prototype._reject = function (reason) {
      var bitField = this._bitField;
      if (((bitField & 117506048) >>> 16)) return;
      this._setRejected();
      this._fulfillmentHandler0 = reason;

      if (this._isFinal()) {
          return async$1.fatalError(reason, util$1.isNode);
      }

      if ((bitField & 65535) > 0) {
          async$1.settlePromises(this);
      } else {
          this._ensurePossibleRejectionHandled();
      }
  };

  Promise.prototype._fulfillPromises = function (len, value) {
      for (var i = 1; i < len; i++) {
          var handler = this._fulfillmentHandlerAt(i);
          var promise = this._promiseAt(i);
          var receiver = this._receiverAt(i);
          this._clearCallbackDataAtIndex(i);
          this._settlePromise(promise, handler, receiver, value);
      }
  };

  Promise.prototype._rejectPromises = function (len, reason) {
      for (var i = 1; i < len; i++) {
          var handler = this._rejectionHandlerAt(i);
          var promise = this._promiseAt(i);
          var receiver = this._receiverAt(i);
          this._clearCallbackDataAtIndex(i);
          this._settlePromise(promise, handler, receiver, reason);
      }
  };

  Promise.prototype._settlePromises = function () {
      var bitField = this._bitField;
      var len = (bitField & 65535);

      if (len > 0) {
          if (((bitField & 16842752) !== 0)) {
              var reason = this._fulfillmentHandler0;
              this._settlePromise0(this._rejectionHandler0, reason, bitField);
              this._rejectPromises(len, reason);
          } else {
              var value = this._rejectionHandler0;
              this._settlePromise0(this._fulfillmentHandler0, value, bitField);
              this._fulfillPromises(len, value);
          }
          this._setLength(0);
      }
      this._clearCancellationData();
  };

  Promise.prototype._settledValue = function() {
      var bitField = this._bitField;
      if (((bitField & 33554432) !== 0)) {
          return this._rejectionHandler0;
      } else if (((bitField & 16777216) !== 0)) {
          return this._fulfillmentHandler0;
      }
  };

  function deferResolve(v) {this.promise._resolveCallback(v);}
  function deferReject(v) {this.promise._rejectCallback(v, false);}

  Promise.defer = Promise.pending = function() {
      debug.deprecated("Promise.defer", "new Promise");
      var promise = new Promise(INTERNAL);
      return {
          promise: promise,
          resolve: deferResolve,
          reject: deferReject
      };
  };

  util$1.notEnumerableProp(Promise,
                         "_makeSelfResolutionError",
                         makeSelfResolutionError);

  method(Promise, INTERNAL, tryConvertToPromise, apiRejection,
      debug);
  bind$1(Promise, INTERNAL, tryConvertToPromise, debug);
  cancel(Promise, PromiseArray, apiRejection, debug);
  direct_resolve(Promise);
  synchronous_inspection(Promise);
  join(
      Promise, PromiseArray, tryConvertToPromise, INTERNAL, async$1, getDomain);
  Promise.Promise = Promise;
  Promise.version = "3.5.4";
  map(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
  call_get(Promise);
  using(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
  timers(Promise, INTERNAL, debug);
  generators(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
  nodeify(Promise);
  promisify(Promise, INTERNAL);
  props(Promise, PromiseArray, tryConvertToPromise, apiRejection);
  race(Promise, INTERNAL, tryConvertToPromise, apiRejection);
  reduce(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
  settle$1(Promise, PromiseArray, debug);
  some(Promise, PromiseArray, apiRejection);
  filter(Promise, INTERNAL);
  each(Promise, INTERNAL);
  any(Promise);
                                                           
      util$1.toFastProperties(Promise);                                          
      util$1.toFastProperties(Promise.prototype);                                
      function fillTypes(value) {                                              
          var p = new Promise(INTERNAL);                                       
          p._fulfillmentHandler0 = value;                                      
          p._rejectionHandler0 = value;                                        
          p._promise0 = value;                                                 
          p._receiver0 = value;                                                
      }                                                                        
      // Complete slack tracking, opt out of field-type tracking and           
      // stabilize map                                                         
      fillTypes({a: 1});                                                       
      fillTypes({b: 2});                                                       
      fillTypes({c: 3});                                                       
      fillTypes(1);                                                            
      fillTypes(function(){});                                                 
      fillTypes(undefined);                                                    
      fillTypes(false);                                                        
      fillTypes(new Promise(INTERNAL));                                        
      debug.setBounds(Async.firstLineError, util$1.lastLineError);               
      return Promise;                                                          

  };
  });

  var old;
  if (typeof Promise !== "undefined") old = Promise;
  function noConflict() {
      try { if (Promise === bluebird) Promise = old; }
      catch (e) {}
      return bluebird;
  }
  var bluebird = promise();
  bluebird.noConflict = noConflict;
  var bluebird_1 = bluebird;

  /**
   * The code was extracted from:
   * https://github.com/davidchambers/Base64.js
   */

  var chars$1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  function InvalidCharacterError(message) {
    this.message = message;
  }

  InvalidCharacterError.prototype = new Error();
  InvalidCharacterError.prototype.name = 'InvalidCharacterError';

  function polyfill (input) {
    var str = String(input).replace(/=+$/, '');
    if (str.length % 4 == 1) {
      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = '';
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars$1.indexOf(buffer);
    }
    return output;
  }


  var atob = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;

  function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
      var code = p.charCodeAt(0).toString(16).toUpperCase();
      if (code.length < 2) {
        code = '0' + code;
      }
      return '%' + code;
    }));
  }

  var base64_url_decode = function(str) {
    var output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw "Illegal base64url string!";
    }

    try{
      return b64DecodeUnicode(output);
    } catch (err) {
      return atob(output);
    }
  };

  function InvalidTokenError(message) {
    this.message = message;
  }

  InvalidTokenError.prototype = new Error();
  InvalidTokenError.prototype.name = 'InvalidTokenError';

  var lib$1 = function (token,options) {
    if (typeof token !== 'string') {
      throw new InvalidTokenError('Invalid token specified');
    }

    options = options || {};
    var pos = options.header === true ? 0 : 1;
    try {
      return JSON.parse(base64_url_decode(token.split('.')[pos]));
    } catch (e) {
      throw new InvalidTokenError('Invalid token specified: ' + e.message);
    }
  };

  var InvalidTokenError_1 = InvalidTokenError;
  lib$1.InvalidTokenError = InvalidTokenError_1;

  /**
   * Parses an URI
   *
   * @author Steven Levithan <stevenlevithan.com> (MIT license)
   * @api private
   */

  var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

  var parts = [
      'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
  ];

  var parseuri = function parseuri(str) {
      var src = str,
          b = str.indexOf('['),
          e = str.indexOf(']');

      if (b != -1 && e != -1) {
          str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
      }

      var m = re.exec(str || ''),
          uri = {},
          i = 14;

      while (i--) {
          uri[parts[i]] = m[i] || '';
      }

      if (b != -1 && e != -1) {
          uri.source = src;
          uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
          uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
          uri.ipv6uri = true;
      }

      return uri;
  };

  /**
   * Helpers.
   */

  var s$1 = 1000;
  var m$1 = s$1 * 60;
  var h$1 = m$1 * 60;
  var d$1 = h$1 * 24;
  var y$1 = d$1 * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms$1 = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse$2(val);
    } else if (type === 'number' && isNaN(val) === false) {
      return options.long ? fmtLong$1(val) : fmtShort$1(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse$2(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y$1;
      case 'days':
      case 'day':
      case 'd':
        return n * d$1;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h$1;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m$1;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s$1;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort$1(ms) {
    if (ms >= d$1) {
      return Math.round(ms / d$1) + 'd';
    }
    if (ms >= h$1) {
      return Math.round(ms / h$1) + 'h';
    }
    if (ms >= m$1) {
      return Math.round(ms / m$1) + 'm';
    }
    if (ms >= s$1) {
      return Math.round(ms / s$1) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong$1(ms) {
    return plural$1(ms, d$1, 'day') ||
      plural$1(ms, h$1, 'hour') ||
      plural$1(ms, m$1, 'minute') ||
      plural$1(ms, s$1, 'second') ||
      ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural$1(ms, n, name) {
    if (ms < n) {
      return;
    }
    if (ms < n * 1.5) {
      return Math.floor(ms / n) + ' ' + name;
    }
    return Math.ceil(ms / n) + ' ' + name + 's';
  }

  var debug$1 = createCommonjsModule(function (module, exports) {
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms$1;

  /**
   * Active `debug` instances.
   */
  exports.instances = [];

  /**
   * The currently active debug mode names, and names to skip.
   */

  exports.names = [];
  exports.skips = [];

  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
   */

  exports.formatters = {};

  /**
   * Select a color.
   * @param {String} namespace
   * @return {Number}
   * @api private
   */

  function selectColor(namespace) {
    var hash = 0, i;

    for (i in namespace) {
      hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return exports.colors[Math.abs(hash) % exports.colors.length];
  }

  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function createDebug(namespace) {

    var prevTime;

    function debug() {
      // disabled?
      if (!debug.enabled) return;

      var self = debug;

      // set `diff` timestamp
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;

      // turn the `arguments` into a proper Array
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %O
        args.unshift('%O');
      }

      // apply any `formatters` transformations
      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);

          // now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // apply env-specific formatting (colors, etc.)
      exports.formatArgs.call(self, args);

      var logFn = debug.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = exports.enabled(namespace);
    debug.useColors = exports.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;

    // env-specific initialization logic for debug instances
    if ('function' === typeof exports.init) {
      exports.init(debug);
    }

    exports.instances.push(debug);

    return debug;
  }

  function destroy () {
    var index = exports.instances.indexOf(this);
    if (index !== -1) {
      exports.instances.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    exports.save(namespaces);

    exports.names = [];
    exports.skips = [];

    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < exports.instances.length; i++) {
      var instance = exports.instances[i];
      instance.enabled = exports.enabled(instance.namespace);
    }
  }

  /**
   * Disable debug output.
   *
   * @api public
   */

  function disable() {
    exports.enable('');
  }

  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
  });
  var debug_1 = debug$1.coerce;
  var debug_2 = debug$1.disable;
  var debug_3 = debug$1.enable;
  var debug_4 = debug$1.enabled;
  var debug_5 = debug$1.humanize;
  var debug_6 = debug$1.instances;
  var debug_7 = debug$1.names;
  var debug_8 = debug$1.skips;
  var debug_9 = debug$1.formatters;

  var browser$2 = createCommonjsModule(function (module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug$1;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = 'undefined' != typeof chrome
                 && 'undefined' != typeof chrome.storage
                    ? chrome.storage.local
                    : localstorage();

  /**
   * Colors.
   */

  exports.colors = [
    '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
    '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
    '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
    '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
    '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
    '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
    '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
    '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
    '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
    '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
    '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
  ];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
      return true;
    }

    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }

    // is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
      // is firebug? http://stackoverflow.com/a/398120/376773
      (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
      // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
      // double check webkit in userAgent just in case we are in a worker
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  exports.formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return '[UnexpectedJSONParseError]: ' + err.message;
    }
  };


  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var useColors = this.useColors;

    args[0] = (useColors ? '%c' : '')
      + this.namespace
      + (useColors ? ' %c' : ' ')
      + args[0]
      + (useColors ? '%c ' : ' ')
      + '+' + exports.humanize(this.diff);

    if (!useColors) return;

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');

    // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
      if ('%%' === match) return;
      index++;
      if ('%c' === match) {
        // we only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });

    args.splice(lastC, 0, c);
  }

  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */

  function log() {
    // this hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return 'object' === typeof console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch(e) {}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    var r;
    try {
      r = exports.storage.debug;
    } catch(e) {}

    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }

  /**
   * Enable namespaces listed in `localStorage.debug` initially.
   */

  exports.enable(load());

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {}
  }
  });
  var browser_1$1 = browser$2.log;
  var browser_2$1 = browser$2.formatArgs;
  var browser_3$1 = browser$2.save;
  var browser_4$1 = browser$2.load;
  var browser_5$1 = browser$2.useColors;
  var browser_6$1 = browser$2.storage;
  var browser_7$1 = browser$2.colors;

  var node$1 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */




  /**
   * This is the Node.js implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug$1;
  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;

  /**
   * Colors.
   */

  exports.colors = [ 6, 2, 3, 4, 5, 1 ];

  try {
    var supportsColor = supportsColor_1;
    if (supportsColor && supportsColor.level >= 2) {
      exports.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
        69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
        135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
        172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
        205, 206, 207, 208, 209, 214, 215, 220, 221
      ];
    }
  } catch (err) {
    // swallow - we only care if `supports-color` is available; it doesn't have to be.
  }

  /**
   * Build up the default `inspectOpts` object from the environment variables.
   *
   *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
   */

  exports.inspectOpts = Object.keys(process.env).filter(function (key) {
    return /^debug_/i.test(key);
  }).reduce(function (obj, key) {
    // camel-case
    var prop = key
      .substring(6)
      .toLowerCase()
      .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

    // coerce string value into JS value
    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
    else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
    else if (val === 'null') val = null;
    else val = Number(val);

    obj[prop] = val;
    return obj;
  }, {});

  /**
   * Is stdout a TTY? Colored output is enabled when `true`.
   */

  function useColors() {
    return 'colors' in exports.inspectOpts
      ? Boolean(exports.inspectOpts.colors)
      : tty.isatty(process.stderr.fd);
  }

  /**
   * Map %o to `util.inspect()`, all on a single line.
   */

  exports.formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util$1.inspect(v, this.inspectOpts)
      .split('\n').map(function(str) {
        return str.trim()
      }).join(' ');
  };

  /**
   * Map %o to `util.inspect()`, allowing multiple lines if needed.
   */

  exports.formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util$1.inspect(v, this.inspectOpts);
  };

  /**
   * Adds ANSI color escape codes if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var name = this.namespace;
    var useColors = this.useColors;

    if (useColors) {
      var c = this.color;
      var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
      var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

      args[0] = prefix + args[0].split('\n').join('\n' + prefix);
      args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
    } else {
      args[0] = getDate() + name + ' ' + args[0];
    }
  }

  function getDate() {
    if (exports.inspectOpts.hideDate) {
      return '';
    } else {
      return new Date().toISOString() + ' ';
    }
  }

  /**
   * Invokes `util.format()` with the specified arguments and writes to stderr.
   */

  function log() {
    return process.stderr.write(util$1.format.apply(util$1, arguments) + '\n');
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    if (null == namespaces) {
      // If you set a process.env field to null or undefined, it gets cast to the
      // string 'null' or 'undefined'. Just delete instead.
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = namespaces;
    }
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    return process.env.DEBUG;
  }

  /**
   * Init logic for `debug` instances.
   *
   * Create a new `inspectOpts` object in case `useColors` is set
   * differently for a particular `debug` instance.
   */

  function init (debug) {
    debug.inspectOpts = {};

    var keys = Object.keys(exports.inspectOpts);
    for (var i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }

  /**
   * Enable namespaces listed in `process.env.DEBUG` initially.
   */

  exports.enable(load());
  });
  var node_1$1 = node$1.init;
  var node_2$1 = node$1.log;
  var node_3$1 = node$1.formatArgs;
  var node_4$1 = node$1.save;
  var node_5$1 = node$1.load;
  var node_6$1 = node$1.useColors;
  var node_7$1 = node$1.colors;
  var node_8$1 = node$1.inspectOpts;

  var src$1 = createCommonjsModule(function (module) {
  /**
   * Detect Electron renderer process, which is node, but we should
   * treat as a browser.
   */

  if (typeof process === 'undefined' || process.type === 'renderer') {
    module.exports = browser$2;
  } else {
    module.exports = node$1;
  }
  });

  /**
   * Module dependencies.
   */


  var debug$2 = src$1('socket.io-client:url');

  /**
   * Module exports.
   */

  var url_1 = url;

  /**
   * URL parser.
   *
   * @param {String} url
   * @param {Object} An object meant to mimic window.location.
   *                 Defaults to window.location.
   * @api public
   */

  function url (uri, loc) {
    var obj = uri;

    // default to window.location
    loc = loc || (typeof location !== 'undefined' && location);
    if (null == uri) uri = loc.protocol + '//' + loc.host;

    // relative path support
    if ('string' === typeof uri) {
      if ('/' === uri.charAt(0)) {
        if ('/' === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }

      if (!/^(https?|wss?):\/\//.test(uri)) {
        debug$2('protocol-less url %s', uri);
        if ('undefined' !== typeof loc) {
          uri = loc.protocol + '//' + uri;
        } else {
          uri = 'https://' + uri;
        }
      }

      // parse
      debug$2('parse %s', uri);
      obj = parseuri(uri);
    }

    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = '80';
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = '443';
      }
    }

    obj.path = obj.path || '/';

    var ipv6 = obj.host.indexOf(':') !== -1;
    var host = ipv6 ? '[' + obj.host + ']' : obj.host;

    // define unique id
    obj.id = obj.protocol + '://' + host + ':' + obj.port;
    // define href
    obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

    return obj;
  }

  /**
   * Helpers.
   */

  var s$2 = 1000;
  var m$2 = s$2 * 60;
  var h$2 = m$2 * 60;
  var d$2 = h$2 * 24;
  var y$2 = d$2 * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms$2 = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse$3(val);
    } else if (type === 'number' && isNaN(val) === false) {
      return options.long ? fmtLong$2(val) : fmtShort$2(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse$3(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y$2;
      case 'days':
      case 'day':
      case 'd':
        return n * d$2;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h$2;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m$2;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s$2;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort$2(ms) {
    if (ms >= d$2) {
      return Math.round(ms / d$2) + 'd';
    }
    if (ms >= h$2) {
      return Math.round(ms / h$2) + 'h';
    }
    if (ms >= m$2) {
      return Math.round(ms / m$2) + 'm';
    }
    if (ms >= s$2) {
      return Math.round(ms / s$2) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong$2(ms) {
    return plural$2(ms, d$2, 'day') ||
      plural$2(ms, h$2, 'hour') ||
      plural$2(ms, m$2, 'minute') ||
      plural$2(ms, s$2, 'second') ||
      ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural$2(ms, n, name) {
    if (ms < n) {
      return;
    }
    if (ms < n * 1.5) {
      return Math.floor(ms / n) + ' ' + name;
    }
    return Math.ceil(ms / n) + ' ' + name + 's';
  }

  var debug$3 = createCommonjsModule(function (module, exports) {
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms$2;

  /**
   * Active `debug` instances.
   */
  exports.instances = [];

  /**
   * The currently active debug mode names, and names to skip.
   */

  exports.names = [];
  exports.skips = [];

  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
   */

  exports.formatters = {};

  /**
   * Select a color.
   * @param {String} namespace
   * @return {Number}
   * @api private
   */

  function selectColor(namespace) {
    var hash = 0, i;

    for (i in namespace) {
      hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return exports.colors[Math.abs(hash) % exports.colors.length];
  }

  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function createDebug(namespace) {

    var prevTime;

    function debug() {
      // disabled?
      if (!debug.enabled) return;

      var self = debug;

      // set `diff` timestamp
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;

      // turn the `arguments` into a proper Array
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %O
        args.unshift('%O');
      }

      // apply any `formatters` transformations
      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);

          // now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // apply env-specific formatting (colors, etc.)
      exports.formatArgs.call(self, args);

      var logFn = debug.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = exports.enabled(namespace);
    debug.useColors = exports.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;

    // env-specific initialization logic for debug instances
    if ('function' === typeof exports.init) {
      exports.init(debug);
    }

    exports.instances.push(debug);

    return debug;
  }

  function destroy () {
    var index = exports.instances.indexOf(this);
    if (index !== -1) {
      exports.instances.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    exports.save(namespaces);

    exports.names = [];
    exports.skips = [];

    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < exports.instances.length; i++) {
      var instance = exports.instances[i];
      instance.enabled = exports.enabled(instance.namespace);
    }
  }

  /**
   * Disable debug output.
   *
   * @api public
   */

  function disable() {
    exports.enable('');
  }

  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
  });
  var debug_1$1 = debug$3.coerce;
  var debug_2$1 = debug$3.disable;
  var debug_3$1 = debug$3.enable;
  var debug_4$1 = debug$3.enabled;
  var debug_5$1 = debug$3.humanize;
  var debug_6$1 = debug$3.instances;
  var debug_7$1 = debug$3.names;
  var debug_8$1 = debug$3.skips;
  var debug_9$1 = debug$3.formatters;

  var browser$3 = createCommonjsModule(function (module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug$3;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = 'undefined' != typeof chrome
                 && 'undefined' != typeof chrome.storage
                    ? chrome.storage.local
                    : localstorage();

  /**
   * Colors.
   */

  exports.colors = [
    '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
    '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
    '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
    '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
    '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
    '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
    '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
    '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
    '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
    '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
    '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
  ];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
      return true;
    }

    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }

    // is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
      // is firebug? http://stackoverflow.com/a/398120/376773
      (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
      // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
      // double check webkit in userAgent just in case we are in a worker
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  exports.formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return '[UnexpectedJSONParseError]: ' + err.message;
    }
  };


  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var useColors = this.useColors;

    args[0] = (useColors ? '%c' : '')
      + this.namespace
      + (useColors ? ' %c' : ' ')
      + args[0]
      + (useColors ? '%c ' : ' ')
      + '+' + exports.humanize(this.diff);

    if (!useColors) return;

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');

    // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
      if ('%%' === match) return;
      index++;
      if ('%c' === match) {
        // we only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });

    args.splice(lastC, 0, c);
  }

  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */

  function log() {
    // this hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return 'object' === typeof console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch(e) {}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    var r;
    try {
      r = exports.storage.debug;
    } catch(e) {}

    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }

  /**
   * Enable namespaces listed in `localStorage.debug` initially.
   */

  exports.enable(load());

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {}
  }
  });
  var browser_1$2 = browser$3.log;
  var browser_2$2 = browser$3.formatArgs;
  var browser_3$2 = browser$3.save;
  var browser_4$2 = browser$3.load;
  var browser_5$2 = browser$3.useColors;
  var browser_6$2 = browser$3.storage;
  var browser_7$2 = browser$3.colors;

  var node$2 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */




  /**
   * This is the Node.js implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug$3;
  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;

  /**
   * Colors.
   */

  exports.colors = [ 6, 2, 3, 4, 5, 1 ];

  try {
    var supportsColor = supportsColor_1;
    if (supportsColor && supportsColor.level >= 2) {
      exports.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
        69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
        135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
        172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
        205, 206, 207, 208, 209, 214, 215, 220, 221
      ];
    }
  } catch (err) {
    // swallow - we only care if `supports-color` is available; it doesn't have to be.
  }

  /**
   * Build up the default `inspectOpts` object from the environment variables.
   *
   *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
   */

  exports.inspectOpts = Object.keys(process.env).filter(function (key) {
    return /^debug_/i.test(key);
  }).reduce(function (obj, key) {
    // camel-case
    var prop = key
      .substring(6)
      .toLowerCase()
      .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

    // coerce string value into JS value
    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
    else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
    else if (val === 'null') val = null;
    else val = Number(val);

    obj[prop] = val;
    return obj;
  }, {});

  /**
   * Is stdout a TTY? Colored output is enabled when `true`.
   */

  function useColors() {
    return 'colors' in exports.inspectOpts
      ? Boolean(exports.inspectOpts.colors)
      : tty.isatty(process.stderr.fd);
  }

  /**
   * Map %o to `util.inspect()`, all on a single line.
   */

  exports.formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util$1.inspect(v, this.inspectOpts)
      .split('\n').map(function(str) {
        return str.trim()
      }).join(' ');
  };

  /**
   * Map %o to `util.inspect()`, allowing multiple lines if needed.
   */

  exports.formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util$1.inspect(v, this.inspectOpts);
  };

  /**
   * Adds ANSI color escape codes if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var name = this.namespace;
    var useColors = this.useColors;

    if (useColors) {
      var c = this.color;
      var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
      var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

      args[0] = prefix + args[0].split('\n').join('\n' + prefix);
      args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
    } else {
      args[0] = getDate() + name + ' ' + args[0];
    }
  }

  function getDate() {
    if (exports.inspectOpts.hideDate) {
      return '';
    } else {
      return new Date().toISOString() + ' ';
    }
  }

  /**
   * Invokes `util.format()` with the specified arguments and writes to stderr.
   */

  function log() {
    return process.stderr.write(util$1.format.apply(util$1, arguments) + '\n');
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    if (null == namespaces) {
      // If you set a process.env field to null or undefined, it gets cast to the
      // string 'null' or 'undefined'. Just delete instead.
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = namespaces;
    }
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    return process.env.DEBUG;
  }

  /**
   * Init logic for `debug` instances.
   *
   * Create a new `inspectOpts` object in case `useColors` is set
   * differently for a particular `debug` instance.
   */

  function init (debug) {
    debug.inspectOpts = {};

    var keys = Object.keys(exports.inspectOpts);
    for (var i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }

  /**
   * Enable namespaces listed in `process.env.DEBUG` initially.
   */

  exports.enable(load());
  });
  var node_1$2 = node$2.init;
  var node_2$2 = node$2.log;
  var node_3$2 = node$2.formatArgs;
  var node_4$2 = node$2.save;
  var node_5$2 = node$2.load;
  var node_6$2 = node$2.useColors;
  var node_7$2 = node$2.colors;
  var node_8$2 = node$2.inspectOpts;

  var src$2 = createCommonjsModule(function (module) {
  /**
   * Detect Electron renderer process, which is node, but we should
   * treat as a browser.
   */

  if (typeof process === 'undefined' || process.type === 'renderer') {
    module.exports = browser$3;
  } else {
    module.exports = node$2;
  }
  });

  var componentEmitter = createCommonjsModule(function (module) {
  /**
   * Expose `Emitter`.
   */

  {
    module.exports = Emitter;
  }

  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */

  function Emitter(obj) {
    if (obj) return mixin(obj);
  }
  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }

  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.on =
  Emitter.prototype.addEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
      .push(fn);
    return this;
  };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.once = function(event, fn){
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };

  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.off =
  Emitter.prototype.removeListener =
  Emitter.prototype.removeAllListeners =
  Emitter.prototype.removeEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};

    // all
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }

    // specific event
    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this;

    // remove all handlers
    if (1 == arguments.length) {
      delete this._callbacks['$' + event];
      return this;
    }

    // remove specific handler
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }
    return this;
  };

  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */

  Emitter.prototype.emit = function(event){
    this._callbacks = this._callbacks || {};
    var args = [].slice.call(arguments, 1)
      , callbacks = this._callbacks['$' + event];

    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  };

  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

  Emitter.prototype.listeners = function(event){
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
  };

  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */

  Emitter.prototype.hasListeners = function(event){
    return !! this.listeners(event).length;
  };
  });

  var toString$2 = {}.toString;

  var isarray = Array.isArray || function (arr) {
    return toString$2.call(arr) == '[object Array]';
  };

  var isBuffer$2 = isBuf;

  var withNativeBuffer = typeof Buffer === 'function' && typeof Buffer.isBuffer === 'function';
  var withNativeArrayBuffer = typeof ArrayBuffer === 'function';

  var isView = function (obj) {
    return typeof ArrayBuffer.isView === 'function' ? ArrayBuffer.isView(obj) : (obj.buffer instanceof ArrayBuffer);
  };

  /**
   * Returns true if obj is a buffer or an arraybuffer.
   *
   * @api private
   */

  function isBuf(obj) {
    return (withNativeBuffer && Buffer.isBuffer(obj)) ||
            (withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)));
  }

  /*global Blob,File*/

  /**
   * Module requirements
   */



  var toString$3 = Object.prototype.toString;
  var withNativeBlob = typeof Blob === 'function' || (typeof Blob !== 'undefined' && toString$3.call(Blob) === '[object BlobConstructor]');
  var withNativeFile = typeof File === 'function' || (typeof File !== 'undefined' && toString$3.call(File) === '[object FileConstructor]');

  /**
   * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
   * Anything with blobs or files should be fed through removeBlobs before coming
   * here.
   *
   * @param {Object} packet - socket.io event packet
   * @return {Object} with deconstructed packet and list of buffers
   * @api public
   */

  var deconstructPacket = function(packet) {
    var buffers = [];
    var packetData = packet.data;
    var pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return {packet: pack, buffers: buffers};
  };

  function _deconstructPacket(data, buffers) {
    if (!data) return data;

    if (isBuffer$2(data)) {
      var placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (isarray(data)) {
      var newData = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i], buffers);
      }
      return newData;
    } else if (typeof data === 'object' && !(data instanceof Date)) {
      var newData = {};
      for (var key in data) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
      return newData;
    }
    return data;
  }

  /**
   * Reconstructs a binary packet from its placeholder packet and buffers
   *
   * @param {Object} packet - event packet with placeholders
   * @param {Array} buffers - binary buffers to put in placeholder positions
   * @return {Object} reconstructed packet
   * @api public
   */

  var reconstructPacket = function(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = undefined; // no longer useful
    return packet;
  };

  function _reconstructPacket(data, buffers) {
    if (!data) return data;

    if (data && data._placeholder) {
      return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    } else if (isarray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i], buffers);
      }
    } else if (typeof data === 'object') {
      for (var key in data) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }

    return data;
  }

  /**
   * Asynchronously removes Blobs or Files from data via
   * FileReader's readAsArrayBuffer method. Used before encoding
   * data as msgpack. Calls callback with the blobless data.
   *
   * @param {Object} data
   * @param {Function} callback
   * @api private
   */

  var removeBlobs = function(data, callback) {
    function _removeBlobs(obj, curKey, containingObject) {
      if (!obj) return obj;

      // convert any blob
      if ((withNativeBlob && obj instanceof Blob) ||
          (withNativeFile && obj instanceof File)) {
        pendingBlobs++;

        // async filereader
        var fileReader = new FileReader();
        fileReader.onload = function() { // this.result == arraybuffer
          if (containingObject) {
            containingObject[curKey] = this.result;
          }
          else {
            bloblessData = this.result;
          }

          // if nothing pending its callback time
          if(! --pendingBlobs) {
            callback(bloblessData);
          }
        };

        fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
      } else if (isarray(obj)) { // handle array
        for (var i = 0; i < obj.length; i++) {
          _removeBlobs(obj[i], i, obj);
        }
      } else if (typeof obj === 'object' && !isBuffer$2(obj)) { // and object
        for (var key in obj) {
          _removeBlobs(obj[key], key, obj);
        }
      }
    }

    var pendingBlobs = 0;
    var bloblessData = data;
    _removeBlobs(bloblessData);
    if (!pendingBlobs) {
      callback(bloblessData);
    }
  };

  var binary = {
  	deconstructPacket: deconstructPacket,
  	reconstructPacket: reconstructPacket,
  	removeBlobs: removeBlobs
  };

  var socket_ioParser = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */

  var debug = src$2('socket.io-parser');





  /**
   * Protocol version.
   *
   * @api public
   */

  exports.protocol = 4;

  /**
   * Packet types.
   *
   * @api public
   */

  exports.types = [
    'CONNECT',
    'DISCONNECT',
    'EVENT',
    'ACK',
    'ERROR',
    'BINARY_EVENT',
    'BINARY_ACK'
  ];

  /**
   * Packet type `connect`.
   *
   * @api public
   */

  exports.CONNECT = 0;

  /**
   * Packet type `disconnect`.
   *
   * @api public
   */

  exports.DISCONNECT = 1;

  /**
   * Packet type `event`.
   *
   * @api public
   */

  exports.EVENT = 2;

  /**
   * Packet type `ack`.
   *
   * @api public
   */

  exports.ACK = 3;

  /**
   * Packet type `error`.
   *
   * @api public
   */

  exports.ERROR = 4;

  /**
   * Packet type 'binary event'
   *
   * @api public
   */

  exports.BINARY_EVENT = 5;

  /**
   * Packet type `binary ack`. For acks with binary arguments.
   *
   * @api public
   */

  exports.BINARY_ACK = 6;

  /**
   * Encoder constructor.
   *
   * @api public
   */

  exports.Encoder = Encoder;

  /**
   * Decoder constructor.
   *
   * @api public
   */

  exports.Decoder = Decoder;

  /**
   * A socket.io Encoder instance
   *
   * @api public
   */

  function Encoder() {}

  var ERROR_PACKET = exports.ERROR + '"encode error"';

  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   * @param {Function} callback - function to handle encodings (likely engine.write)
   * @return Calls callback with Array of encodings
   * @api public
   */

  Encoder.prototype.encode = function(obj, callback){
    debug('encoding packet %j', obj);

    if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
      encodeAsBinary(obj, callback);
    } else {
      var encoding = encodeAsString(obj);
      callback([encoding]);
    }
  };

  /**
   * Encode packet as string.
   *
   * @param {Object} packet
   * @return {String} encoded
   * @api private
   */

  function encodeAsString(obj) {

    // first is type
    var str = '' + obj.type;

    // attachments if we have them
    if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
      str += obj.attachments + '-';
    }

    // if we have a namespace other than `/`
    // we append it followed by a comma `,`
    if (obj.nsp && '/' !== obj.nsp) {
      str += obj.nsp + ',';
    }

    // immediately followed by the id
    if (null != obj.id) {
      str += obj.id;
    }

    // json data
    if (null != obj.data) {
      var payload = tryStringify(obj.data);
      if (payload !== false) {
        str += payload;
      } else {
        return ERROR_PACKET;
      }
    }

    debug('encoded %j as %s', obj, str);
    return str;
  }

  function tryStringify(str) {
    try {
      return JSON.stringify(str);
    } catch(e){
      return false;
    }
  }

  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   *
   * @param {Object} packet
   * @return {Buffer} encoded
   * @api private
   */

  function encodeAsBinary(obj, callback) {

    function writeEncoding(bloblessData) {
      var deconstruction = binary.deconstructPacket(bloblessData);
      var pack = encodeAsString(deconstruction.packet);
      var buffers = deconstruction.buffers;

      buffers.unshift(pack); // add packet info to beginning of data list
      callback(buffers); // write all the buffers
    }

    binary.removeBlobs(obj, writeEncoding);
  }

  /**
   * A socket.io Decoder instance
   *
   * @return {Object} decoder
   * @api public
   */

  function Decoder() {
    this.reconstructor = null;
  }

  /**
   * Mix in `Emitter` with Decoder.
   */

  componentEmitter(Decoder.prototype);

  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   * @return {Object} packet
   * @api public
   */

  Decoder.prototype.add = function(obj) {
    var packet;
    if (typeof obj === 'string') {
      packet = decodeString(obj);
      if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
        this.reconstructor = new BinaryReconstructor(packet);

        // no attachments, labeled binary but no binary data to follow
        if (this.reconstructor.reconPack.attachments === 0) {
          this.emit('decoded', packet);
        }
      } else { // non-binary full packet
        this.emit('decoded', packet);
      }
    } else if (isBuffer$2(obj) || obj.base64) { // raw binary data
      if (!this.reconstructor) {
        throw new Error('got binary data when not reconstructing a packet');
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) { // received final buffer
          this.reconstructor = null;
          this.emit('decoded', packet);
        }
      }
    } else {
      throw new Error('Unknown type: ' + obj);
    }
  };

  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   * @api private
   */

  function decodeString(str) {
    var i = 0;
    // look up type
    var p = {
      type: Number(str.charAt(0))
    };

    if (null == exports.types[p.type]) {
      return error('unknown packet type ' + p.type);
    }

    // look up attachments if type binary
    if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
      var buf = '';
      while (str.charAt(++i) !== '-') {
        buf += str.charAt(i);
        if (i == str.length) break;
      }
      if (buf != Number(buf) || str.charAt(i) !== '-') {
        throw new Error('Illegal attachments');
      }
      p.attachments = Number(buf);
    }

    // look up namespace (if any)
    if ('/' === str.charAt(i + 1)) {
      p.nsp = '';
      while (++i) {
        var c = str.charAt(i);
        if (',' === c) break;
        p.nsp += c;
        if (i === str.length) break;
      }
    } else {
      p.nsp = '/';
    }

    // look up id
    var next = str.charAt(i + 1);
    if ('' !== next && Number(next) == next) {
      p.id = '';
      while (++i) {
        var c = str.charAt(i);
        if (null == c || Number(c) != c) {
          --i;
          break;
        }
        p.id += str.charAt(i);
        if (i === str.length) break;
      }
      p.id = Number(p.id);
    }

    // look up json data
    if (str.charAt(++i)) {
      var payload = tryParse(str.substr(i));
      var isPayloadValid = payload !== false && (p.type === exports.ERROR || isarray(payload));
      if (isPayloadValid) {
        p.data = payload;
      } else {
        return error('invalid payload');
      }
    }

    debug('decoded %s as %j', str, p);
    return p;
  }

  function tryParse(str) {
    try {
      return JSON.parse(str);
    } catch(e){
      return false;
    }
  }

  /**
   * Deallocates a parser's resources
   *
   * @api public
   */

  Decoder.prototype.destroy = function() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
    }
  };

  /**
   * A manager of a binary event's 'buffer sequence'. Should
   * be constructed whenever a packet of type BINARY_EVENT is
   * decoded.
   *
   * @param {Object} packet
   * @return {BinaryReconstructor} initialized reconstructor
   * @api private
   */

  function BinaryReconstructor(packet) {
    this.reconPack = packet;
    this.buffers = [];
  }

  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   * @api private
   */

  BinaryReconstructor.prototype.takeBinaryData = function(binData) {
    this.buffers.push(binData);
    if (this.buffers.length === this.reconPack.attachments) { // done with buffer list
      var packet = binary.reconstructPacket(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }
    return null;
  };

  /**
   * Cleans up binary packet reconstruction variables.
   *
   * @api private
   */

  BinaryReconstructor.prototype.finishedReconstruction = function() {
    this.reconPack = null;
    this.buffers = [];
  };

  function error(msg) {
    return {
      type: exports.ERROR,
      data: 'parser error: ' + msg
    };
  }
  });
  var socket_ioParser_1 = socket_ioParser.protocol;
  var socket_ioParser_2 = socket_ioParser.types;
  var socket_ioParser_3 = socket_ioParser.CONNECT;
  var socket_ioParser_4 = socket_ioParser.DISCONNECT;
  var socket_ioParser_5 = socket_ioParser.EVENT;
  var socket_ioParser_6 = socket_ioParser.ACK;
  var socket_ioParser_7 = socket_ioParser.ERROR;
  var socket_ioParser_8 = socket_ioParser.BINARY_EVENT;
  var socket_ioParser_9 = socket_ioParser.BINARY_ACK;
  var socket_ioParser_10 = socket_ioParser.Encoder;
  var socket_ioParser_11 = socket_ioParser.Decoder;

  /**
   * Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
   *
   * This can be used with JS designed for browsers to improve reuse of code and
   * allow the use of existing libraries.
   *
   * Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
   *
   * @author Dan DeFelippi <dan@driverdan.com>
   * @contributor David Ellis <d.f.ellis@ieee.org>
   * @license MIT
   */



  var spawn = child_process.spawn;

  /**
   * Module exports.
   */

  var XMLHttpRequest_1 = XMLHttpRequest$1;

  // backwards-compat
  XMLHttpRequest$1.XMLHttpRequest = XMLHttpRequest$1;

  /**
   * `XMLHttpRequest` constructor.
   *
   * Supported options for the `opts` object are:
   *
   *  - `agent`: An http.Agent instance; http.globalAgent may be used; if 'undefined', agent usage is disabled
   *
   * @param {Object} opts optional "options" object
   */

  function XMLHttpRequest$1(opts) {

    opts = opts || {};

    /**
     * Private variables
     */
    var self = this;
    var http$1 = http;
    var https$1 = https;

    // Holds http.js objects
    var request;
    var response;

    // Request settings
    var settings = {};

    // Disable header blacklist.
    // Not part of XHR specs.
    var disableHeaderCheck = false;

    // Set some default headers
    var defaultHeaders = {
      "User-Agent": "node-XMLHttpRequest",
      "Accept": "*/*"
    };

    var headers = Object.assign({}, defaultHeaders);

    // These headers are not user setable.
    // The following are allowed but banned in the spec:
    // * user-agent
    var forbiddenRequestHeaders = [
      "accept-charset",
      "accept-encoding",
      "access-control-request-headers",
      "access-control-request-method",
      "connection",
      "content-length",
      "content-transfer-encoding",
      "cookie",
      "cookie2",
      "date",
      "expect",
      "host",
      "keep-alive",
      "origin",
      "referer",
      "te",
      "trailer",
      "transfer-encoding",
      "upgrade",
      "via"
    ];

    // These request methods are not allowed
    var forbiddenRequestMethods = [
      "TRACE",
      "TRACK",
      "CONNECT"
    ];

    // Send flag
    var sendFlag = false;
    // Error flag, used when errors occur or abort is called
    var errorFlag = false;

    // Event listeners
    var listeners = {};

    /**
     * Constants
     */

    this.UNSENT = 0;
    this.OPENED = 1;
    this.HEADERS_RECEIVED = 2;
    this.LOADING = 3;
    this.DONE = 4;

    /**
     * Public vars
     */

    // Current state
    this.readyState = this.UNSENT;

    // default ready state change handler in case one is not set or is set late
    this.onreadystatechange = null;

    // Result & response
    this.responseText = "";
    this.responseXML = "";
    this.status = null;
    this.statusText = null;

    /**
     * Private methods
     */

    /**
     * Check if the specified header is allowed.
     *
     * @param string header Header to validate
     * @return boolean False if not allowed, otherwise true
     */
    var isAllowedHttpHeader = function(header) {
      return disableHeaderCheck || (header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1);
    };

    /**
     * Check if the specified method is allowed.
     *
     * @param string method Request method to validate
     * @return boolean False if not allowed, otherwise true
     */
    var isAllowedHttpMethod = function(method) {
      return (method && forbiddenRequestMethods.indexOf(method) === -1);
    };

    /**
     * Public methods
     */

    /**
     * Open the connection. Currently supports local server requests.
     *
     * @param string method Connection method (eg GET, POST)
     * @param string url URL for the connection.
     * @param boolean async Asynchronous connection. Default is true.
     * @param string user Username for basic authentication (optional)
     * @param string password Password for basic authentication (optional)
     */
    this.open = function(method, url, async, user, password) {
      this.abort();
      errorFlag = false;

      // Check for valid request method
      if (!isAllowedHttpMethod(method)) {
        throw "SecurityError: Request method not allowed";
      }

      settings = {
        "method": method,
        "url": url.toString(),
        "async": (typeof async !== "boolean" ? true : async),
        "user": user || null,
        "password": password || null
      };

      setState(this.OPENED);
    };

    /**
     * Disables or enables isAllowedHttpHeader() check the request. Enabled by default.
     * This does not conform to the W3C spec.
     *
     * @param boolean state Enable or disable header checking.
     */
    this.setDisableHeaderCheck = function(state) {
      disableHeaderCheck = state;
    };

    /**
     * Sets a header for the request.
     *
     * @param string header Header name
     * @param string value Header value
     * @return boolean Header added
     */
    this.setRequestHeader = function(header, value) {
      if (this.readyState != this.OPENED) {
        throw "INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN";
        return false;
      }
      if (!isAllowedHttpHeader(header)) {
        console.warn('Refused to set unsafe header "' + header + '"');
        return false;
      }
      if (sendFlag) {
        throw "INVALID_STATE_ERR: send flag is true";
        return false;
      }
      headers[header] = value;
      return true;
    };

    /**
     * Gets a header from the server response.
     *
     * @param string header Name of header to get.
     * @return string Text of the header or null if it doesn't exist.
     */
    this.getResponseHeader = function(header) {
      if (typeof header === "string"
        && this.readyState > this.OPENED
        && response.headers[header.toLowerCase()]
        && !errorFlag
      ) {
        return response.headers[header.toLowerCase()];
      }

      return null;
    };

    /**
     * Gets all the response headers.
     *
     * @return string A string with all response headers separated by CR+LF
     */
    this.getAllResponseHeaders = function() {
      if (this.readyState < this.HEADERS_RECEIVED || errorFlag) {
        return "";
      }
      var result = "";

      for (var i in response.headers) {
        // Cookie headers are excluded
        if (i !== "set-cookie" && i !== "set-cookie2") {
          result += i + ": " + response.headers[i] + "\r\n";
        }
      }
      return result.substr(0, result.length - 2);
    };

    /**
     * Gets a request header
     *
     * @param string name Name of header to get
     * @return string Returns the request header or empty string if not set
     */
    this.getRequestHeader = function(name) {
      // @TODO Make this case insensitive
      if (typeof name === "string" && headers[name]) {
        return headers[name];
      }

      return "";
    };

    /**
     * Sends the request to the server.
     *
     * @param string data Optional data to send as request body.
     */
    this.send = function(data) {
      if (this.readyState != this.OPENED) {
        throw "INVALID_STATE_ERR: connection must be opened before send() is called";
      }

      if (sendFlag) {
        throw "INVALID_STATE_ERR: send has already been called";
      }

      var ssl = false, local = false;
      var url = url$1.parse(settings.url);
      var host;
      // Determine the server
      switch (url.protocol) {
        case 'https:':
          ssl = true;
          // SSL & non-SSL both need host, no break here.
        case 'http:':
          host = url.hostname;
          break;

        case 'file:':
          local = true;
          break;

        case undefined:
        case '':
          host = "localhost";
          break;

        default:
          throw "Protocol not supported.";
      }

      // Load files off the local filesystem (file://)
      if (local) {
        if (settings.method !== "GET") {
          throw "XMLHttpRequest: Only GET method is supported";
        }

        if (settings.async) {
          fs.readFile(url.pathname, 'utf8', function(error, data) {
            if (error) {
              self.handleError(error);
            } else {
              self.status = 200;
              self.responseText = data;
              setState(self.DONE);
            }
          });
        } else {
          try {
            this.responseText = fs.readFileSync(url.pathname, 'utf8');
            this.status = 200;
            setState(self.DONE);
          } catch(e) {
            this.handleError(e);
          }
        }

        return;
      }

      // Default to port 80. If accessing localhost on another port be sure
      // to use http://localhost:port/path
      var port = url.port || (ssl ? 443 : 80);
      // Add query string if one is used
      var uri = url.pathname + (url.search ? url.search : '');

      // Set the Host header or the server may reject the request
      headers["Host"] = host;
      if (!((ssl && port === 443) || port === 80)) {
        headers["Host"] += ':' + url.port;
      }

      // Set Basic Auth if necessary
      if (settings.user) {
        if (typeof settings.password == "undefined") {
          settings.password = "";
        }
        var authBuf = new Buffer(settings.user + ":" + settings.password);
        headers["Authorization"] = "Basic " + authBuf.toString("base64");
      }

      // Set content length header
      if (settings.method === "GET" || settings.method === "HEAD") {
        data = null;
      } else if (data) {
        headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);

        if (!headers["Content-Type"]) {
          headers["Content-Type"] = "text/plain;charset=UTF-8";
        }
      } else if (settings.method === "POST") {
        // For a post with no data set Content-Length: 0.
        // This is required by buggy servers that don't meet the specs.
        headers["Content-Length"] = 0;
      }

      var agent = opts.agent || false;
      var options = {
        host: host,
        port: port,
        path: uri,
        method: settings.method,
        headers: headers,
        agent: agent
      };

      if (ssl) {
        options.pfx = opts.pfx;
        options.key = opts.key;
        options.passphrase = opts.passphrase;
        options.cert = opts.cert;
        options.ca = opts.ca;
        options.ciphers = opts.ciphers;
        options.rejectUnauthorized = opts.rejectUnauthorized;
      }

      // Reset error flag
      errorFlag = false;

      // Handle async requests
      if (settings.async) {
        // Use the proper protocol
        var doRequest = ssl ? https$1.request : http$1.request;

        // Request is being sent, set send flag
        sendFlag = true;

        // As per spec, this is called here for historical reasons.
        self.dispatchEvent("readystatechange");

        // Handler for the response
        var responseHandler = function(resp) {
          // Set response var to the response we got back
          // This is so it remains accessable outside this scope
          response = resp;
          // Check for redirect
          // @TODO Prevent looped redirects
          if (response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
            // Change URL to the redirect location
            settings.url = response.headers.location;
            var url = url$1.parse(settings.url);
            // Set host var in case it's used later
            host = url.hostname;
            // Options for the new request
            var newOptions = {
              hostname: url.hostname,
              port: url.port,
              path: url.path,
              method: response.statusCode === 303 ? 'GET' : settings.method,
              headers: headers
            };

            if (ssl) {
              newOptions.pfx = opts.pfx;
              newOptions.key = opts.key;
              newOptions.passphrase = opts.passphrase;
              newOptions.cert = opts.cert;
              newOptions.ca = opts.ca;
              newOptions.ciphers = opts.ciphers;
              newOptions.rejectUnauthorized = opts.rejectUnauthorized;
            }

            // Issue the new request
            request = doRequest(newOptions, responseHandler).on('error', errorHandler);
            request.end();
            // @TODO Check if an XHR event needs to be fired here
            return;
          }

          if (response && response.setEncoding) {
            response.setEncoding("utf8");
          }

          setState(self.HEADERS_RECEIVED);
          self.status = response.statusCode;

          response.on('data', function(chunk) {
            // Make sure there's some data
            if (chunk) {
              self.responseText += chunk;
            }
            // Don't emit state changes if the connection has been aborted.
            if (sendFlag) {
              setState(self.LOADING);
            }
          });

          response.on('end', function() {
            if (sendFlag) {
              // The sendFlag needs to be set before setState is called.  Otherwise if we are chaining callbacks
              // there can be a timing issue (the callback is called and a new call is made before the flag is reset).
              sendFlag = false;
              // Discard the 'end' event if the connection has been aborted
              setState(self.DONE);
            }
          });

          response.on('error', function(error) {
            self.handleError(error);
          });
        };

        // Error handler for the request
        var errorHandler = function(error) {
          self.handleError(error);
        };

        // Create the request
        request = doRequest(options, responseHandler).on('error', errorHandler);

        // Node 0.4 and later won't accept empty data. Make sure it's needed.
        if (data) {
          request.write(data);
        }

        request.end();

        self.dispatchEvent("loadstart");
      } else { // Synchronous
        // Create a temporary file for communication with the other Node process
        var contentFile = ".node-xmlhttprequest-content-" + process.pid;
        var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
        fs.writeFileSync(syncFile, "", "utf8");
        // The async request the other Node process executes
        var execString = "var http = require('http'), https = require('https'), fs = require('fs');"
          + "var doRequest = http" + (ssl ? "s" : "") + ".request;"
          + "var options = " + JSON.stringify(options) + ";"
          + "var responseText = '';"
          + "var req = doRequest(options, function(response) {"
          + "response.setEncoding('utf8');"
          + "response.on('data', function(chunk) {"
          + "  responseText += chunk;"
          + "});"
          + "response.on('end', function() {"
          + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-STATUS:' + response.statusCode + ',' + responseText, 'utf8');"
          + "fs.unlinkSync('" + syncFile + "');"
          + "});"
          + "response.on('error', function(error) {"
          + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');"
          + "fs.unlinkSync('" + syncFile + "');"
          + "});"
          + "}).on('error', function(error) {"
          + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');"
          + "fs.unlinkSync('" + syncFile + "');"
          + "});"
          + (data ? "req.write('" + data.replace(/'/g, "\\'") + "');":"")
          + "req.end();";
        // Start the other Node Process, executing this string
        var syncProc = spawn(process.argv[0], ["-e", execString]);
        while(fs.existsSync(syncFile)) {
          // Wait while the sync file is empty
        }
        self.responseText = fs.readFileSync(contentFile, 'utf8');
        // Kill the child process once the file has data
        syncProc.stdin.end();
        // Remove the temporary file
        fs.unlinkSync(contentFile);
        if (self.responseText.match(/^NODE-XMLHTTPREQUEST-ERROR:/)) {
          // If the file returned an error, handle it
          var errorObj = self.responseText.replace(/^NODE-XMLHTTPREQUEST-ERROR:/, "");
          self.handleError(errorObj);
        } else {
          // If the file returned okay, parse its data and move to the DONE state
          self.status = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:([0-9]*),.*/, "$1");
          self.responseText = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:[0-9]*,(.*)/, "$1");
          setState(self.DONE);
        }
      }
    };

    /**
     * Called when an error is encountered to deal with it.
     */
    this.handleError = function(error) {
      this.status = 503;
      this.statusText = error;
      this.responseText = error.stack;
      errorFlag = true;
      setState(this.DONE);
    };

    /**
     * Aborts a request.
     */
    this.abort = function() {
      if (request) {
        request.abort();
        request = null;
      }

      headers = Object.assign({}, defaultHeaders);
      this.responseText = "";
      this.responseXML = "";

      errorFlag = true;

      if (this.readyState !== this.UNSENT
          && (this.readyState !== this.OPENED || sendFlag)
          && this.readyState !== this.DONE) {
        sendFlag = false;
        setState(this.DONE);
      }
      this.readyState = this.UNSENT;
    };

    /**
     * Adds an event listener. Preferred method of binding to events.
     */
    this.addEventListener = function(event, callback) {
      if (!(event in listeners)) {
        listeners[event] = [];
      }
      // Currently allows duplicate callbacks. Should it?
      listeners[event].push(callback);
    };

    /**
     * Remove an event callback that has already been bound.
     * Only works on the matching funciton, cannot be a copy.
     */
    this.removeEventListener = function(event, callback) {
      if (event in listeners) {
        // Filter will return a new array with the callback removed
        listeners[event] = listeners[event].filter(function(ev) {
          return ev !== callback;
        });
      }
    };

    /**
     * Dispatch any events, including both "on" methods and events attached using addEventListener.
     */
    this.dispatchEvent = function(event) {
      if (typeof self["on" + event] === "function") {
        self["on" + event]();
      }
      if (event in listeners) {
        for (var i = 0, len = listeners[event].length; i < len; i++) {
          listeners[event][i].call(self);
        }
      }
    };

    /**
     * Changes readyState and calls onreadystatechange.
     *
     * @param int state New state
     */
    var setState = function(state) {
      if (self.readyState !== state) {
        self.readyState = state;

        if (settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) {
          self.dispatchEvent("readystatechange");
        }

        if (self.readyState === self.DONE && !errorFlag) {
          self.dispatchEvent("load");
          // @TODO figure out InspectorInstrumentation::didLoadXHR(cookie)
          self.dispatchEvent("loadend");
        }
      }
    };
  }

  /*! https://mths.be/utf8js v2.1.2 by @mathias */

  var stringFromCharCode = String.fromCharCode;

  // Taken from https://mths.be/punycode
  function ucs2decode(string) {
  	var output = [];
  	var counter = 0;
  	var length = string.length;
  	var value;
  	var extra;
  	while (counter < length) {
  		value = string.charCodeAt(counter++);
  		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
  			// high surrogate, and there is a next character
  			extra = string.charCodeAt(counter++);
  			if ((extra & 0xFC00) == 0xDC00) { // low surrogate
  				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
  			} else {
  				// unmatched surrogate; only append this code unit, in case the next
  				// code unit is the high surrogate of a surrogate pair
  				output.push(value);
  				counter--;
  			}
  		} else {
  			output.push(value);
  		}
  	}
  	return output;
  }

  // Taken from https://mths.be/punycode
  function ucs2encode(array) {
  	var length = array.length;
  	var index = -1;
  	var value;
  	var output = '';
  	while (++index < length) {
  		value = array[index];
  		if (value > 0xFFFF) {
  			value -= 0x10000;
  			output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
  			value = 0xDC00 | value & 0x3FF;
  		}
  		output += stringFromCharCode(value);
  	}
  	return output;
  }

  function checkScalarValue(codePoint, strict) {
  	if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
  		if (strict) {
  			throw Error(
  				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
  				' is not a scalar value'
  			);
  		}
  		return false;
  	}
  	return true;
  }
  /*--------------------------------------------------------------------------*/

  function createByte(codePoint, shift) {
  	return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
  }

  function encodeCodePoint(codePoint, strict) {
  	if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
  		return stringFromCharCode(codePoint);
  	}
  	var symbol = '';
  	if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
  		symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
  	}
  	else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
  		if (!checkScalarValue(codePoint, strict)) {
  			codePoint = 0xFFFD;
  		}
  		symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
  		symbol += createByte(codePoint, 6);
  	}
  	else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
  		symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
  		symbol += createByte(codePoint, 12);
  		symbol += createByte(codePoint, 6);
  	}
  	symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
  	return symbol;
  }

  function utf8encode(string, opts) {
  	opts = opts || {};
  	var strict = false !== opts.strict;

  	var codePoints = ucs2decode(string);
  	var length = codePoints.length;
  	var index = -1;
  	var codePoint;
  	var byteString = '';
  	while (++index < length) {
  		codePoint = codePoints[index];
  		byteString += encodeCodePoint(codePoint, strict);
  	}
  	return byteString;
  }

  /*--------------------------------------------------------------------------*/

  function readContinuationByte() {
  	if (byteIndex >= byteCount) {
  		throw Error('Invalid byte index');
  	}

  	var continuationByte = byteArray[byteIndex] & 0xFF;
  	byteIndex++;

  	if ((continuationByte & 0xC0) == 0x80) {
  		return continuationByte & 0x3F;
  	}

  	// If we end up here, it’s not a continuation byte
  	throw Error('Invalid continuation byte');
  }

  function decodeSymbol(strict) {
  	var byte1;
  	var byte2;
  	var byte3;
  	var byte4;
  	var codePoint;

  	if (byteIndex > byteCount) {
  		throw Error('Invalid byte index');
  	}

  	if (byteIndex == byteCount) {
  		return false;
  	}

  	// Read first byte
  	byte1 = byteArray[byteIndex] & 0xFF;
  	byteIndex++;

  	// 1-byte sequence (no continuation bytes)
  	if ((byte1 & 0x80) == 0) {
  		return byte1;
  	}

  	// 2-byte sequence
  	if ((byte1 & 0xE0) == 0xC0) {
  		byte2 = readContinuationByte();
  		codePoint = ((byte1 & 0x1F) << 6) | byte2;
  		if (codePoint >= 0x80) {
  			return codePoint;
  		} else {
  			throw Error('Invalid continuation byte');
  		}
  	}

  	// 3-byte sequence (may include unpaired surrogates)
  	if ((byte1 & 0xF0) == 0xE0) {
  		byte2 = readContinuationByte();
  		byte3 = readContinuationByte();
  		codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
  		if (codePoint >= 0x0800) {
  			return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
  		} else {
  			throw Error('Invalid continuation byte');
  		}
  	}

  	// 4-byte sequence
  	if ((byte1 & 0xF8) == 0xF0) {
  		byte2 = readContinuationByte();
  		byte3 = readContinuationByte();
  		byte4 = readContinuationByte();
  		codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
  			(byte3 << 0x06) | byte4;
  		if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
  			return codePoint;
  		}
  	}

  	throw Error('Invalid UTF-8 detected');
  }

  var byteArray;
  var byteCount;
  var byteIndex;
  function utf8decode(byteString, opts) {
  	opts = opts || {};
  	var strict = false !== opts.strict;

  	byteArray = ucs2decode(byteString);
  	byteCount = byteArray.length;
  	byteIndex = 0;
  	var codePoints = [];
  	var tmp;
  	while ((tmp = decodeSymbol(strict)) !== false) {
  		codePoints.push(tmp);
  	}
  	return ucs2encode(codePoints);
  }

  var utf8 = {
  	version: '2.1.2',
  	encode: utf8encode,
  	decode: utf8decode
  };

  var toString$4 = {}.toString;

  var isarray$1 = Array.isArray || function (arr) {
    return toString$4.call(arr) == '[object Array]';
  };

  /* global Blob File */

  /*
   * Module requirements.
   */



  var toString$5 = Object.prototype.toString;
  var withNativeBlob$1 = typeof Blob === 'function' ||
                          typeof Blob !== 'undefined' && toString$5.call(Blob) === '[object BlobConstructor]';
  var withNativeFile$1 = typeof File === 'function' ||
                          typeof File !== 'undefined' && toString$5.call(File) === '[object FileConstructor]';

  /**
   * Module exports.
   */

  var hasBinary2 = hasBinary;

  /**
   * Checks for binary data.
   *
   * Supports Buffer, ArrayBuffer, Blob and File.
   *
   * @param {Object} anything
   * @api public
   */

  function hasBinary (obj) {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    if (isarray$1(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (hasBinary(obj[i])) {
          return true;
        }
      }
      return false;
    }

    if ((typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(obj)) ||
      (typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
      (withNativeBlob$1 && obj instanceof Blob) ||
      (withNativeFile$1 && obj instanceof File)
    ) {
      return true;
    }

    // see: https://github.com/Automattic/has-binary/pull/4
    if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }

    return false;
  }

  var after_1 = after;

  function after(count, callback, err_cb) {
      var bail = false;
      err_cb = err_cb || noop$1;
      proxy.count = count;

      return (count === 0) ? callback() : proxy

      function proxy(err, result) {
          if (proxy.count <= 0) {
              throw new Error('after called too many times')
          }
          --proxy.count;

          // after first error, rest are passed to err_cb
          if (err) {
              bail = true;
              callback(err);
              // future error callbacks will go to error handler
              callback = err_cb;
          } else if (proxy.count === 0 && !bail) {
              callback(null, result);
          }
      }
  }

  function noop$1() {}

  /**
   * Gets the keys for an object.
   *
   * @return {Array} keys
   * @api private
   */

  var keys$1 = Object.keys || function keys (obj){
    var arr = [];
    var has = Object.prototype.hasOwnProperty;

    for (var i in obj) {
      if (has.call(obj, i)) {
        arr.push(i);
      }
    }
    return arr;
  };

  var lib$2 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */






  /**
   * Current protocol version.
   */
  exports.protocol = 3;

  /**
   * Packet types.
   */

  var packets = exports.packets = {
      open:     0    // non-ws
    , close:    1    // non-ws
    , ping:     2
    , pong:     3
    , message:  4
    , upgrade:  5
    , noop:     6
  };

  var packetslist = keys$1(packets);

  /**
   * Premade error packet.
   */

  var err = { type: 'error', data: 'parser error' };

  /**
   * Encodes a packet.
   *
   *     <packet type id> [ <data> ]
   *
   * Example:
   *
   *     5hello world
   *     3
   *     4
   *
   * Binary is encoded in an identical principle
   *
   * @api private
   */

  exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
    if (typeof supportsBinary === 'function') {
      callback = supportsBinary;
      supportsBinary = null;
    }

    if (typeof utf8encode === 'function') {
      callback = utf8encode;
      utf8encode = null;
    }

    if (Buffer.isBuffer(packet.data)) {
      return encodeBuffer(packet, supportsBinary, callback);
    } else if (packet.data && (packet.data.buffer || packet.data) instanceof ArrayBuffer) {
      return encodeBuffer({ type: packet.type, data: arrayBufferToBuffer(packet.data) }, supportsBinary, callback);
    }

    // Sending data as a utf-8 string
    var encoded = packets[packet.type];

    // data fragment is optional
    if (undefined !== packet.data) {
      encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
    }

    return callback('' + encoded);
  };

  /**
   * Encode Buffer data
   */

  function encodeBuffer(packet, supportsBinary, callback) {
    if (!supportsBinary) {
      return exports.encodeBase64Packet(packet, callback);
    }

    var data = packet.data;
    var typeBuffer = new Buffer(1);
    typeBuffer[0] = packets[packet.type];
    return callback(Buffer.concat([typeBuffer, data]));
  }

  /**
   * Encodes a packet with binary data in a base64 string
   *
   * @param {Object} packet, has `type` and `data`
   * @return {String} base64 encoded message
   */

  exports.encodeBase64Packet = function(packet, callback){
    var data = Buffer.isBuffer(packet.data) ? packet.data : arrayBufferToBuffer(packet.data);
    var message = 'b' + packets[packet.type];
    message += data.toString('base64');
    return callback(message);
  };

  /**
   * Decodes a packet. Data also available as an ArrayBuffer if requested.
   *
   * @return {Object} with `type` and `data` (if any)
   * @api private
   */

  exports.decodePacket = function (data, binaryType, utf8decode) {
    if (data === undefined) {
      return err;
    }

    var type;

    // String data
    if (typeof data === 'string') {

      type = data.charAt(0);

      if (type === 'b') {
        return exports.decodeBase64Packet(data.substr(1), binaryType);
      }

      if (utf8decode) {
        data = tryDecode(data);
        if (data === false) {
          return err;
        }
      }

      if (Number(type) != type || !packetslist[type]) {
        return err;
      }

      if (data.length > 1) {
        return { type: packetslist[type], data: data.substring(1) };
      } else {
        return { type: packetslist[type] };
      }
    }

    // Binary data
    if (binaryType === 'arraybuffer') {
      // wrap Buffer/ArrayBuffer data into an Uint8Array
      var intArray = new Uint8Array(data);
      type = intArray[0];
      return { type: packetslist[type], data: intArray.buffer.slice(1) };
    }

    if (data instanceof ArrayBuffer) {
      data = arrayBufferToBuffer(data);
    }
    type = data[0];
    return { type: packetslist[type], data: data.slice(1) };
  };

  function tryDecode(data) {
    try {
      data = utf8.decode(data, { strict: false });
    } catch (e) {
      return false;
    }
    return data;
  }

  /**
   * Decodes a packet encoded in a base64 string.
   *
   * @param {String} base64 encoded message
   * @return {Object} with `type` and `data` (if any)
   */

  exports.decodeBase64Packet = function(msg, binaryType) {
    var type = packetslist[msg.charAt(0)];
    var data = new Buffer(msg.substr(1), 'base64');
    if (binaryType === 'arraybuffer') {
      var abv = new Uint8Array(data.length);
      for (var i = 0; i < abv.length; i++){
        abv[i] = data[i];
      }
      data = abv.buffer;
    }
    return { type: type, data: data };
  };

  /**
   * Encodes multiple messages (payload).
   *
   *     <length>:data
   *
   * Example:
   *
   *     11:hello world2:hi
   *
   * If any contents are binary, they will be encoded as base64 strings. Base64
   * encoded strings are marked with a b before the length specifier
   *
   * @param {Array} packets
   * @api private
   */

  exports.encodePayload = function (packets, supportsBinary, callback) {
    if (typeof supportsBinary === 'function') {
      callback = supportsBinary;
      supportsBinary = null;
    }

    if (supportsBinary && hasBinary2(packets)) {
      return exports.encodePayloadAsBinary(packets, callback);
    }

    if (!packets.length) {
      return callback('0:');
    }

    function encodeOne(packet, doneCallback) {
      exports.encodePacket(packet, supportsBinary, false, function(message) {
        doneCallback(null, setLengthHeader(message));
      });
    }

    map(packets, encodeOne, function(err, results) {
      return callback(results.join(''));
    });
  };

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  /**
   * Async array map using after
   */

  function map(ary, each, done) {
    var result = new Array(ary.length);
    var next = after_1(ary.length, done);

    for (var i = 0; i < ary.length; i++) {
      each(ary[i], function(error, msg) {
        result[i] = msg;
        next(error, result);
      });
    }
  }

  /*
   * Decodes data when a payload is maybe expected. Possible binary contents are
   * decoded from their base64 representation
   *
   * @param {String} data, callback method
   * @api public
   */

  exports.decodePayload = function (data, binaryType, callback) {
    if (typeof data !== 'string') {
      return exports.decodePayloadAsBinary(data, binaryType, callback);
    }

    if (typeof binaryType === 'function') {
      callback = binaryType;
      binaryType = null;
    }

    if (data === '') {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    var length = '', n, msg, packet;

    for (var i = 0, l = data.length; i < l; i++) {
      var chr = data.charAt(i);

      if (chr !== ':') {
        length += chr;
        continue;
      }

      if (length === '' || (length != (n = Number(length)))) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      msg = data.substr(i + 1, n);

      if (length != msg.length) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      if (msg.length) {
        packet = exports.decodePacket(msg, binaryType, false);

        if (err.type === packet.type && err.data === packet.data) {
          // parser error in individual packet - ignoring payload
          return callback(err, 0, 1);
        }

        var more = callback(packet, i + n, l);
        if (false === more) return;
      }

      // advance cursor
      i += n;
      length = '';
    }

    if (length !== '') {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

  };

  /**
   *
   * Converts a buffer to a utf8.js encoded string
   *
   * @api private
   */

  function bufferToString(buffer) {
    var str = '';
    for (var i = 0, l = buffer.length; i < l; i++) {
      str += String.fromCharCode(buffer[i]);
    }
    return str;
  }

  /**
   *
   * Converts a utf8.js encoded string to a buffer
   *
   * @api private
   */

  function stringToBuffer(string) {
    var buf = new Buffer(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
      buf.writeUInt8(string.charCodeAt(i), i);
    }
    return buf;
  }

  /**
   *
   * Converts an ArrayBuffer to a Buffer
   *
   * @api private
   */

  function arrayBufferToBuffer(data) {
    // data is either an ArrayBuffer or ArrayBufferView.
    var array = new Uint8Array(data.buffer || data);
    var length = data.byteLength || data.length;
    var offset = data.byteOffset || 0;
    var buffer = new Buffer(length);

    for (var i = 0; i < length; i++) {
      buffer[i] = array[offset + i];
    }
    return buffer;
  }

  /**
   * Encodes multiple messages (payload) as binary.
   *
   * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
   * 255><data>
   *
   * Example:
   * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
   *
   * @param {Array} packets
   * @return {Buffer} encoded payload
   * @api private
   */

  exports.encodePayloadAsBinary = function (packets, callback) {
    if (!packets.length) {
      return callback(new Buffer(0));
    }

    map(packets, encodeOneBinaryPacket, function(err, results) {
      return callback(Buffer.concat(results));
    });
  };

  function encodeOneBinaryPacket(p, doneCallback) {

    function onBinaryPacketEncode(packet) {

      var encodingLength = '' + packet.length;
      var sizeBuffer;

      if (typeof packet === 'string') {
        sizeBuffer = new Buffer(encodingLength.length + 2);
        sizeBuffer[0] = 0; // is a string (not true binary = 0)
        for (var i = 0; i < encodingLength.length; i++) {
          sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
        }
        sizeBuffer[sizeBuffer.length - 1] = 255;
        return doneCallback(null, Buffer.concat([sizeBuffer, stringToBuffer(packet)]));
      }

      sizeBuffer = new Buffer(encodingLength.length + 2);
      sizeBuffer[0] = 1; // is binary (true binary = 1)
      for (var i = 0; i < encodingLength.length; i++) {
        sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
      }
      sizeBuffer[sizeBuffer.length - 1] = 255;

      doneCallback(null, Buffer.concat([sizeBuffer, packet]));
    }

    exports.encodePacket(p, true, true, onBinaryPacketEncode);

  }


  /*
   * Decodes data when a payload is maybe expected. Strings are decoded by
   * interpreting each byte as a key code for entries marked to start with 0. See
   * description of encodePayloadAsBinary

   * @param {Buffer} data, callback method
   * @api public
   */

  exports.decodePayloadAsBinary = function (data, binaryType, callback) {
    if (typeof binaryType === 'function') {
      callback = binaryType;
      binaryType = null;
    }

    var bufferTail = data;
    var buffers = [];
    var i;

    while (bufferTail.length > 0) {
      var strLen = '';
      var isString = bufferTail[0] === 0;
      for (i = 1; ; i++) {
        if (bufferTail[i] === 255)  break;
        // 310 = char length of Number.MAX_VALUE
        if (strLen.length > 310) {
          return callback(err, 0, 1);
        }
        strLen += '' + bufferTail[i];
      }
      bufferTail = bufferTail.slice(strLen.length + 1);

      var msgLength = parseInt(strLen, 10);

      var msg = bufferTail.slice(1, msgLength + 1);
      if (isString) msg = bufferToString(msg);
      buffers.push(msg);
      bufferTail = bufferTail.slice(msgLength + 1);
    }

    var total = buffers.length;
    for (i = 0; i < total; i++) {
      var buffer = buffers[i];
      callback(exports.decodePacket(buffer, binaryType, true), i, total);
    }
  };
  });
  var lib_1 = lib$2.protocol;
  var lib_2 = lib$2.packets;
  var lib_3 = lib$2.encodePacket;
  var lib_4 = lib$2.encodeBase64Packet;
  var lib_5 = lib$2.decodePacket;
  var lib_6 = lib$2.decodeBase64Packet;
  var lib_7 = lib$2.encodePayload;
  var lib_8 = lib$2.decodePayload;
  var lib_9 = lib$2.encodePayloadAsBinary;
  var lib_10 = lib$2.decodePayloadAsBinary;

  /**
   * Module dependencies.
   */




  /**
   * Module exports.
   */

  var transport = Transport;

  /**
   * Transport abstract constructor.
   *
   * @param {Object} options.
   * @api private
   */

  function Transport (opts) {
    this.path = opts.path;
    this.hostname = opts.hostname;
    this.port = opts.port;
    this.secure = opts.secure;
    this.query = opts.query;
    this.timestampParam = opts.timestampParam;
    this.timestampRequests = opts.timestampRequests;
    this.readyState = '';
    this.agent = opts.agent || false;
    this.socket = opts.socket;
    this.enablesXDR = opts.enablesXDR;

    // SSL options for Node.js client
    this.pfx = opts.pfx;
    this.key = opts.key;
    this.passphrase = opts.passphrase;
    this.cert = opts.cert;
    this.ca = opts.ca;
    this.ciphers = opts.ciphers;
    this.rejectUnauthorized = opts.rejectUnauthorized;
    this.forceNode = opts.forceNode;

    // results of ReactNative environment detection
    this.isReactNative = opts.isReactNative;

    // other options for Node.js client
    this.extraHeaders = opts.extraHeaders;
    this.localAddress = opts.localAddress;
  }

  /**
   * Mix in `Emitter`.
   */

  componentEmitter(Transport.prototype);

  /**
   * Emits an error.
   *
   * @param {String} str
   * @return {Transport} for chaining
   * @api public
   */

  Transport.prototype.onError = function (msg, desc) {
    var err = new Error(msg);
    err.type = 'TransportError';
    err.description = desc;
    this.emit('error', err);
    return this;
  };

  /**
   * Opens the transport.
   *
   * @api public
   */

  Transport.prototype.open = function () {
    if ('closed' === this.readyState || '' === this.readyState) {
      this.readyState = 'opening';
      this.doOpen();
    }

    return this;
  };

  /**
   * Closes the transport.
   *
   * @api private
   */

  Transport.prototype.close = function () {
    if ('opening' === this.readyState || 'open' === this.readyState) {
      this.doClose();
      this.onClose();
    }

    return this;
  };

  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   * @api private
   */

  Transport.prototype.send = function (packets) {
    if ('open' === this.readyState) {
      this.write(packets);
    } else {
      throw new Error('Transport not open');
    }
  };

  /**
   * Called upon open
   *
   * @api private
   */

  Transport.prototype.onOpen = function () {
    this.readyState = 'open';
    this.writable = true;
    this.emit('open');
  };

  /**
   * Called with data.
   *
   * @param {String} data
   * @api private
   */

  Transport.prototype.onData = function (data) {
    var packet = lib$2.decodePacket(data, this.socket.binaryType);
    this.onPacket(packet);
  };

  /**
   * Called with a decoded packet.
   */

  Transport.prototype.onPacket = function (packet) {
    this.emit('packet', packet);
  };

  /**
   * Called upon close.
   *
   * @api private
   */

  Transport.prototype.onClose = function () {
    this.readyState = 'closed';
    this.emit('close');
  };

  /**
   * Compiles a querystring
   * Returns string representation of the object
   *
   * @param {Object}
   * @api private
   */

  var encode$2 = function (obj) {
    var str = '';

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (str.length) str += '&';
        str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
      }
    }

    return str;
  };

  /**
   * Parses a simple querystring into an object
   *
   * @param {String} qs
   * @api private
   */

  var decode$1 = function(qs){
    var qry = {};
    var pairs = qs.split('&');
    for (var i = 0, l = pairs.length; i < l; i++) {
      var pair = pairs[i].split('=');
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
  };

  var parseqs = {
  	encode: encode$2,
  	decode: decode$1
  };

  var componentInherit = function(a, b){
    var fn = function(){};
    fn.prototype = b.prototype;
    a.prototype = new fn;
    a.prototype.constructor = a;
  };

  var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
    , length = 64
    , map$1 = {}
    , seed = 0
    , i$1 = 0
    , prev;

  /**
   * Return a string representing the specified number.
   *
   * @param {Number} num The number to convert.
   * @returns {String} The string representation of the number.
   * @api public
   */
  function encode$3(num) {
    var encoded = '';

    do {
      encoded = alphabet[num % length] + encoded;
      num = Math.floor(num / length);
    } while (num > 0);

    return encoded;
  }

  /**
   * Return the integer value specified by the given string.
   *
   * @param {String} str The string to convert.
   * @returns {Number} The integer value represented by the string.
   * @api public
   */
  function decode$2(str) {
    var decoded = 0;

    for (i$1 = 0; i$1 < str.length; i$1++) {
      decoded = decoded * length + map$1[str.charAt(i$1)];
    }

    return decoded;
  }

  /**
   * Yeast: A tiny growing id generator.
   *
   * @returns {String} A unique id.
   * @api public
   */
  function yeast() {
    var now = encode$3(+new Date());

    if (now !== prev) return seed = 0, prev = now;
    return now +'.'+ encode$3(seed++);
  }

  //
  // Map each character to its index.
  //
  for (; i$1 < length; i$1++) map$1[alphabet[i$1]] = i$1;

  //
  // Expose the `yeast`, `encode` and `decode` functions.
  //
  yeast.encode = encode$3;
  yeast.decode = decode$2;
  var yeast_1 = yeast;

  /**
   * Helpers.
   */

  var s$3 = 1000;
  var m$3 = s$3 * 60;
  var h$3 = m$3 * 60;
  var d$3 = h$3 * 24;
  var y$3 = d$3 * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms$3 = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse$4(val);
    } else if (type === 'number' && isNaN(val) === false) {
      return options.long ? fmtLong$3(val) : fmtShort$3(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse$4(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y$3;
      case 'days':
      case 'day':
      case 'd':
        return n * d$3;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h$3;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m$3;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s$3;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort$3(ms) {
    if (ms >= d$3) {
      return Math.round(ms / d$3) + 'd';
    }
    if (ms >= h$3) {
      return Math.round(ms / h$3) + 'h';
    }
    if (ms >= m$3) {
      return Math.round(ms / m$3) + 'm';
    }
    if (ms >= s$3) {
      return Math.round(ms / s$3) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong$3(ms) {
    return plural$3(ms, d$3, 'day') ||
      plural$3(ms, h$3, 'hour') ||
      plural$3(ms, m$3, 'minute') ||
      plural$3(ms, s$3, 'second') ||
      ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural$3(ms, n, name) {
    if (ms < n) {
      return;
    }
    if (ms < n * 1.5) {
      return Math.floor(ms / n) + ' ' + name;
    }
    return Math.ceil(ms / n) + ' ' + name + 's';
  }

  var debug$4 = createCommonjsModule(function (module, exports) {
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms$3;

  /**
   * Active `debug` instances.
   */
  exports.instances = [];

  /**
   * The currently active debug mode names, and names to skip.
   */

  exports.names = [];
  exports.skips = [];

  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
   */

  exports.formatters = {};

  /**
   * Select a color.
   * @param {String} namespace
   * @return {Number}
   * @api private
   */

  function selectColor(namespace) {
    var hash = 0, i;

    for (i in namespace) {
      hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return exports.colors[Math.abs(hash) % exports.colors.length];
  }

  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function createDebug(namespace) {

    var prevTime;

    function debug() {
      // disabled?
      if (!debug.enabled) return;

      var self = debug;

      // set `diff` timestamp
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;

      // turn the `arguments` into a proper Array
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %O
        args.unshift('%O');
      }

      // apply any `formatters` transformations
      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);

          // now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // apply env-specific formatting (colors, etc.)
      exports.formatArgs.call(self, args);

      var logFn = debug.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = exports.enabled(namespace);
    debug.useColors = exports.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;

    // env-specific initialization logic for debug instances
    if ('function' === typeof exports.init) {
      exports.init(debug);
    }

    exports.instances.push(debug);

    return debug;
  }

  function destroy () {
    var index = exports.instances.indexOf(this);
    if (index !== -1) {
      exports.instances.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    exports.save(namespaces);

    exports.names = [];
    exports.skips = [];

    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < exports.instances.length; i++) {
      var instance = exports.instances[i];
      instance.enabled = exports.enabled(instance.namespace);
    }
  }

  /**
   * Disable debug output.
   *
   * @api public
   */

  function disable() {
    exports.enable('');
  }

  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
  });
  var debug_1$2 = debug$4.coerce;
  var debug_2$2 = debug$4.disable;
  var debug_3$2 = debug$4.enable;
  var debug_4$2 = debug$4.enabled;
  var debug_5$2 = debug$4.humanize;
  var debug_6$2 = debug$4.instances;
  var debug_7$2 = debug$4.names;
  var debug_8$2 = debug$4.skips;
  var debug_9$2 = debug$4.formatters;

  var browser$4 = createCommonjsModule(function (module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug$4;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = 'undefined' != typeof chrome
                 && 'undefined' != typeof chrome.storage
                    ? chrome.storage.local
                    : localstorage();

  /**
   * Colors.
   */

  exports.colors = [
    '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
    '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
    '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
    '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
    '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
    '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
    '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
    '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
    '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
    '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
    '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
  ];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
      return true;
    }

    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }

    // is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
      // is firebug? http://stackoverflow.com/a/398120/376773
      (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
      // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
      // double check webkit in userAgent just in case we are in a worker
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  exports.formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return '[UnexpectedJSONParseError]: ' + err.message;
    }
  };


  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var useColors = this.useColors;

    args[0] = (useColors ? '%c' : '')
      + this.namespace
      + (useColors ? ' %c' : ' ')
      + args[0]
      + (useColors ? '%c ' : ' ')
      + '+' + exports.humanize(this.diff);

    if (!useColors) return;

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');

    // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
      if ('%%' === match) return;
      index++;
      if ('%c' === match) {
        // we only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });

    args.splice(lastC, 0, c);
  }

  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */

  function log() {
    // this hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return 'object' === typeof console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch(e) {}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    var r;
    try {
      r = exports.storage.debug;
    } catch(e) {}

    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }

  /**
   * Enable namespaces listed in `localStorage.debug` initially.
   */

  exports.enable(load());

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {}
  }
  });
  var browser_1$3 = browser$4.log;
  var browser_2$3 = browser$4.formatArgs;
  var browser_3$3 = browser$4.save;
  var browser_4$3 = browser$4.load;
  var browser_5$3 = browser$4.useColors;
  var browser_6$3 = browser$4.storage;
  var browser_7$3 = browser$4.colors;

  var node$3 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */




  /**
   * This is the Node.js implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug$4;
  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;

  /**
   * Colors.
   */

  exports.colors = [ 6, 2, 3, 4, 5, 1 ];

  try {
    var supportsColor = supportsColor_1;
    if (supportsColor && supportsColor.level >= 2) {
      exports.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
        69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
        135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
        172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
        205, 206, 207, 208, 209, 214, 215, 220, 221
      ];
    }
  } catch (err) {
    // swallow - we only care if `supports-color` is available; it doesn't have to be.
  }

  /**
   * Build up the default `inspectOpts` object from the environment variables.
   *
   *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
   */

  exports.inspectOpts = Object.keys(process.env).filter(function (key) {
    return /^debug_/i.test(key);
  }).reduce(function (obj, key) {
    // camel-case
    var prop = key
      .substring(6)
      .toLowerCase()
      .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

    // coerce string value into JS value
    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
    else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
    else if (val === 'null') val = null;
    else val = Number(val);

    obj[prop] = val;
    return obj;
  }, {});

  /**
   * Is stdout a TTY? Colored output is enabled when `true`.
   */

  function useColors() {
    return 'colors' in exports.inspectOpts
      ? Boolean(exports.inspectOpts.colors)
      : tty.isatty(process.stderr.fd);
  }

  /**
   * Map %o to `util.inspect()`, all on a single line.
   */

  exports.formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util$1.inspect(v, this.inspectOpts)
      .split('\n').map(function(str) {
        return str.trim()
      }).join(' ');
  };

  /**
   * Map %o to `util.inspect()`, allowing multiple lines if needed.
   */

  exports.formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util$1.inspect(v, this.inspectOpts);
  };

  /**
   * Adds ANSI color escape codes if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var name = this.namespace;
    var useColors = this.useColors;

    if (useColors) {
      var c = this.color;
      var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
      var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

      args[0] = prefix + args[0].split('\n').join('\n' + prefix);
      args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
    } else {
      args[0] = getDate() + name + ' ' + args[0];
    }
  }

  function getDate() {
    if (exports.inspectOpts.hideDate) {
      return '';
    } else {
      return new Date().toISOString() + ' ';
    }
  }

  /**
   * Invokes `util.format()` with the specified arguments and writes to stderr.
   */

  function log() {
    return process.stderr.write(util$1.format.apply(util$1, arguments) + '\n');
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    if (null == namespaces) {
      // If you set a process.env field to null or undefined, it gets cast to the
      // string 'null' or 'undefined'. Just delete instead.
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = namespaces;
    }
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    return process.env.DEBUG;
  }

  /**
   * Init logic for `debug` instances.
   *
   * Create a new `inspectOpts` object in case `useColors` is set
   * differently for a particular `debug` instance.
   */

  function init (debug) {
    debug.inspectOpts = {};

    var keys = Object.keys(exports.inspectOpts);
    for (var i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }

  /**
   * Enable namespaces listed in `process.env.DEBUG` initially.
   */

  exports.enable(load());
  });
  var node_1$3 = node$3.init;
  var node_2$3 = node$3.log;
  var node_3$3 = node$3.formatArgs;
  var node_4$3 = node$3.save;
  var node_5$3 = node$3.load;
  var node_6$3 = node$3.useColors;
  var node_7$3 = node$3.colors;
  var node_8$3 = node$3.inspectOpts;

  var src$3 = createCommonjsModule(function (module) {
  /**
   * Detect Electron renderer process, which is node, but we should
   * treat as a browser.
   */

  if (typeof process === 'undefined' || process.type === 'renderer') {
    module.exports = browser$4;
  } else {
    module.exports = node$3;
  }
  });

  /**
   * Module dependencies.
   */






  var debug$5 = src$3('engine.io-client:polling');

  /**
   * Module exports.
   */

  var polling = Polling;

  /**
   * Is XHR2 supported?
   */

  var hasXHR2 = (function () {
    var XMLHttpRequest = XMLHttpRequest_1;
    var xhr = new XMLHttpRequest({ xdomain: false });
    return null != xhr.responseType;
  })();

  /**
   * Polling interface.
   *
   * @param {Object} opts
   * @api private
   */

  function Polling (opts) {
    var forceBase64 = (opts && opts.forceBase64);
    if (!hasXHR2 || forceBase64) {
      this.supportsBinary = false;
    }
    transport.call(this, opts);
  }

  /**
   * Inherits from Transport.
   */

  componentInherit(Polling, transport);

  /**
   * Transport name.
   */

  Polling.prototype.name = 'polling';

  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @api private
   */

  Polling.prototype.doOpen = function () {
    this.poll();
  };

  /**
   * Pauses polling.
   *
   * @param {Function} callback upon buffers are flushed and transport is paused
   * @api private
   */

  Polling.prototype.pause = function (onPause) {
    var self = this;

    this.readyState = 'pausing';

    function pause () {
      debug$5('paused');
      self.readyState = 'paused';
      onPause();
    }

    if (this.polling || !this.writable) {
      var total = 0;

      if (this.polling) {
        debug$5('we are currently polling - waiting to pause');
        total++;
        this.once('pollComplete', function () {
          debug$5('pre-pause polling complete');
          --total || pause();
        });
      }

      if (!this.writable) {
        debug$5('we are currently writing - waiting to pause');
        total++;
        this.once('drain', function () {
          debug$5('pre-pause writing complete');
          --total || pause();
        });
      }
    } else {
      pause();
    }
  };

  /**
   * Starts polling cycle.
   *
   * @api public
   */

  Polling.prototype.poll = function () {
    debug$5('polling');
    this.polling = true;
    this.doPoll();
    this.emit('poll');
  };

  /**
   * Overloads onData to detect payloads.
   *
   * @api private
   */

  Polling.prototype.onData = function (data) {
    var self = this;
    debug$5('polling got data %s', data);
    var callback = function (packet, index, total) {
      // if its the first message we consider the transport open
      if ('opening' === self.readyState) {
        self.onOpen();
      }

      // if its a close packet, we close the ongoing requests
      if ('close' === packet.type) {
        self.onClose();
        return false;
      }

      // otherwise bypass onData and handle the message
      self.onPacket(packet);
    };

    // decode payload
    lib$2.decodePayload(data, this.socket.binaryType, callback);

    // if an event did not trigger closing
    if ('closed' !== this.readyState) {
      // if we got data we're not polling
      this.polling = false;
      this.emit('pollComplete');

      if ('open' === this.readyState) {
        this.poll();
      } else {
        debug$5('ignoring poll - transport state "%s"', this.readyState);
      }
    }
  };

  /**
   * For polling, send a close packet.
   *
   * @api private
   */

  Polling.prototype.doClose = function () {
    var self = this;

    function close () {
      debug$5('writing close packet');
      self.write([{ type: 'close' }]);
    }

    if ('open' === this.readyState) {
      debug$5('transport open - closing');
      close();
    } else {
      // in case we're trying to close while
      // handshaking is in progress (GH-164)
      debug$5('transport not open - deferring close');
      this.once('open', close);
    }
  };

  /**
   * Writes a packets payload.
   *
   * @param {Array} data packets
   * @param {Function} drain callback
   * @api private
   */

  Polling.prototype.write = function (packets) {
    var self = this;
    this.writable = false;
    var callbackfn = function () {
      self.writable = true;
      self.emit('drain');
    };

    lib$2.encodePayload(packets, this.supportsBinary, function (data) {
      self.doWrite(data, callbackfn);
    });
  };

  /**
   * Generates uri for connection.
   *
   * @api private
   */

  Polling.prototype.uri = function () {
    var query = this.query || {};
    var schema = this.secure ? 'https' : 'http';
    var port = '';

    // cache busting is forced
    if (false !== this.timestampRequests) {
      query[this.timestampParam] = yeast_1();
    }

    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }

    query = parseqs.encode(query);

    // avoid port if default for schema
    if (this.port && (('https' === schema && Number(this.port) !== 443) ||
       ('http' === schema && Number(this.port) !== 80))) {
      port = ':' + this.port;
    }

    // prepend ? to query
    if (query.length) {
      query = '?' + query;
    }

    var ipv6 = this.hostname.indexOf(':') !== -1;
    return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
  };

  /* global attachEvent */

  /**
   * Module requirements.
   */





  var debug$6 = src$3('engine.io-client:polling-xhr');

  /**
   * Module exports.
   */

  var pollingXhr = XHR;
  var Request_1 = Request;

  /**
   * Empty function
   */

  function empty () {}

  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @api public
   */

  function XHR (opts) {
    polling.call(this, opts);
    this.requestTimeout = opts.requestTimeout;
    this.extraHeaders = opts.extraHeaders;

    if (typeof location !== 'undefined') {
      var isSSL = 'https:' === location.protocol;
      var port = location.port;

      // some user agents have empty `location.port`
      if (!port) {
        port = isSSL ? 443 : 80;
      }

      this.xd = (typeof location !== 'undefined' && opts.hostname !== location.hostname) ||
        port !== opts.port;
      this.xs = opts.secure !== isSSL;
    }
  }

  /**
   * Inherits from Polling.
   */

  componentInherit(XHR, polling);

  /**
   * XHR supports binary
   */

  XHR.prototype.supportsBinary = true;

  /**
   * Creates a request.
   *
   * @param {String} method
   * @api private
   */

  XHR.prototype.request = function (opts) {
    opts = opts || {};
    opts.uri = this.uri();
    opts.xd = this.xd;
    opts.xs = this.xs;
    opts.agent = this.agent || false;
    opts.supportsBinary = this.supportsBinary;
    opts.enablesXDR = this.enablesXDR;

    // SSL options for Node.js client
    opts.pfx = this.pfx;
    opts.key = this.key;
    opts.passphrase = this.passphrase;
    opts.cert = this.cert;
    opts.ca = this.ca;
    opts.ciphers = this.ciphers;
    opts.rejectUnauthorized = this.rejectUnauthorized;
    opts.requestTimeout = this.requestTimeout;

    // other options for Node.js client
    opts.extraHeaders = this.extraHeaders;

    return new Request(opts);
  };

  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @api private
   */

  XHR.prototype.doWrite = function (data, fn) {
    var isBinary = typeof data !== 'string' && data !== undefined;
    var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
    var self = this;
    req.on('success', fn);
    req.on('error', function (err) {
      self.onError('xhr post error', err);
    });
    this.sendXhr = req;
  };

  /**
   * Starts a poll cycle.
   *
   * @api private
   */

  XHR.prototype.doPoll = function () {
    debug$6('xhr poll');
    var req = this.request();
    var self = this;
    req.on('data', function (data) {
      self.onData(data);
    });
    req.on('error', function (err) {
      self.onError('xhr poll error', err);
    });
    this.pollXhr = req;
  };

  /**
   * Request constructor
   *
   * @param {Object} options
   * @api public
   */

  function Request (opts) {
    this.method = opts.method || 'GET';
    this.uri = opts.uri;
    this.xd = !!opts.xd;
    this.xs = !!opts.xs;
    this.async = false !== opts.async;
    this.data = undefined !== opts.data ? opts.data : null;
    this.agent = opts.agent;
    this.isBinary = opts.isBinary;
    this.supportsBinary = opts.supportsBinary;
    this.enablesXDR = opts.enablesXDR;
    this.requestTimeout = opts.requestTimeout;

    // SSL options for Node.js client
    this.pfx = opts.pfx;
    this.key = opts.key;
    this.passphrase = opts.passphrase;
    this.cert = opts.cert;
    this.ca = opts.ca;
    this.ciphers = opts.ciphers;
    this.rejectUnauthorized = opts.rejectUnauthorized;

    // other options for Node.js client
    this.extraHeaders = opts.extraHeaders;

    this.create();
  }

  /**
   * Mix in `Emitter`.
   */

  componentEmitter(Request.prototype);

  /**
   * Creates the XHR object and sends the request.
   *
   * @api private
   */

  Request.prototype.create = function () {
    var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

    // SSL options for Node.js client
    opts.pfx = this.pfx;
    opts.key = this.key;
    opts.passphrase = this.passphrase;
    opts.cert = this.cert;
    opts.ca = this.ca;
    opts.ciphers = this.ciphers;
    opts.rejectUnauthorized = this.rejectUnauthorized;

    var xhr = this.xhr = new XMLHttpRequest_1(opts);
    var self = this;

    try {
      debug$6('xhr open %s: %s', this.method, this.uri);
      xhr.open(this.method, this.uri, this.async);
      try {
        if (this.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (var i in this.extraHeaders) {
            if (this.extraHeaders.hasOwnProperty(i)) {
              xhr.setRequestHeader(i, this.extraHeaders[i]);
            }
          }
        }
      } catch (e) {}

      if ('POST' === this.method) {
        try {
          if (this.isBinary) {
            xhr.setRequestHeader('Content-type', 'application/octet-stream');
          } else {
            xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
          }
        } catch (e) {}
      }

      try {
        xhr.setRequestHeader('Accept', '*/*');
      } catch (e) {}

      // ie6 check
      if ('withCredentials' in xhr) {
        xhr.withCredentials = true;
      }

      if (this.requestTimeout) {
        xhr.timeout = this.requestTimeout;
      }

      if (this.hasXDR()) {
        xhr.onload = function () {
          self.onLoad();
        };
        xhr.onerror = function () {
          self.onError(xhr.responseText);
        };
      } else {
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 2) {
            try {
              var contentType = xhr.getResponseHeader('Content-Type');
              if (self.supportsBinary && contentType === 'application/octet-stream') {
                xhr.responseType = 'arraybuffer';
              }
            } catch (e) {}
          }
          if (4 !== xhr.readyState) return;
          if (200 === xhr.status || 1223 === xhr.status) {
            self.onLoad();
          } else {
            // make sure the `error` event handler that's user-set
            // does not throw in the same tick and gets caught here
            setTimeout(function () {
              self.onError(xhr.status);
            }, 0);
          }
        };
      }

      debug$6('xhr data %s', this.data);
      xhr.send(this.data);
    } catch (e) {
      // Need to defer since .create() is called directly fhrom the constructor
      // and thus the 'error' event can only be only bound *after* this exception
      // occurs.  Therefore, also, we cannot throw here at all.
      setTimeout(function () {
        self.onError(e);
      }, 0);
      return;
    }

    if (typeof document !== 'undefined') {
      this.index = Request.requestsCount++;
      Request.requests[this.index] = this;
    }
  };

  /**
   * Called upon successful response.
   *
   * @api private
   */

  Request.prototype.onSuccess = function () {
    this.emit('success');
    this.cleanup();
  };

  /**
   * Called if we have data.
   *
   * @api private
   */

  Request.prototype.onData = function (data) {
    this.emit('data', data);
    this.onSuccess();
  };

  /**
   * Called upon error.
   *
   * @api private
   */

  Request.prototype.onError = function (err) {
    this.emit('error', err);
    this.cleanup(true);
  };

  /**
   * Cleans up house.
   *
   * @api private
   */

  Request.prototype.cleanup = function (fromError) {
    if ('undefined' === typeof this.xhr || null === this.xhr) {
      return;
    }
    // xmlhttprequest
    if (this.hasXDR()) {
      this.xhr.onload = this.xhr.onerror = empty;
    } else {
      this.xhr.onreadystatechange = empty;
    }

    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {}
    }

    if (typeof document !== 'undefined') {
      delete Request.requests[this.index];
    }

    this.xhr = null;
  };

  /**
   * Called upon load.
   *
   * @api private
   */

  Request.prototype.onLoad = function () {
    var data;
    try {
      var contentType;
      try {
        contentType = this.xhr.getResponseHeader('Content-Type');
      } catch (e) {}
      if (contentType === 'application/octet-stream') {
        data = this.xhr.response || this.xhr.responseText;
      } else {
        data = this.xhr.responseText;
      }
    } catch (e) {
      this.onError(e);
    }
    if (null != data) {
      this.onData(data);
    }
  };

  /**
   * Check if it has XDomainRequest.
   *
   * @api private
   */

  Request.prototype.hasXDR = function () {
    return typeof XDomainRequest !== 'undefined' && !this.xs && this.enablesXDR;
  };

  /**
   * Aborts the request.
   *
   * @api public
   */

  Request.prototype.abort = function () {
    this.cleanup();
  };

  /**
   * Aborts pending requests when unloading the window. This is needed to prevent
   * memory leaks (e.g. when using IE) and to ensure that no spurious error is
   * emitted.
   */

  Request.requestsCount = 0;
  Request.requests = {};

  if (typeof document !== 'undefined') {
    if (typeof attachEvent === 'function') {
      attachEvent('onunload', unloadHandler);
    } else if (typeof addEventListener === 'function') {
      var terminationEvent = 'onpagehide' in self ? 'pagehide' : 'unload';
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }

  function unloadHandler () {
    for (var i in Request.requests) {
      if (Request.requests.hasOwnProperty(i)) {
        Request.requests[i].abort();
      }
    }
  }
  pollingXhr.Request = Request_1;

  /**
   * Module requirements.
   */




  /**
   * Module exports.
   */

  var pollingJsonp = JSONPPolling;

  /**
   * Cached regular expressions.
   */

  var rNewline = /\n/g;
  var rEscapedNewline = /\\n/g;

  /**
   * Global JSONP callbacks.
   */

  var callbacks;

  /**
   * Noop.
   */

  function empty$1 () { }

  /**
   * Until https://github.com/tc39/proposal-global is shipped.
   */
  function glob () {
    return typeof self !== 'undefined' ? self
        : typeof window !== 'undefined' ? window
        : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : {};
  }

  /**
   * JSONP Polling constructor.
   *
   * @param {Object} opts.
   * @api public
   */

  function JSONPPolling (opts) {
    polling.call(this, opts);

    this.query = this.query || {};

    // define global callbacks array if not present
    // we do this here (lazily) to avoid unneeded global pollution
    if (!callbacks) {
      // we need to consider multiple engines in the same page
      var global = glob();
      callbacks = global.___eio = (global.___eio || []);
    }

    // callback identifier
    this.index = callbacks.length;

    // add callback to jsonp global
    var self = this;
    callbacks.push(function (msg) {
      self.onData(msg);
    });

    // append to query string
    this.query.j = this.index;

    // prevent spurious errors from being emitted when the window is unloaded
    if (typeof addEventListener === 'function') {
      addEventListener('beforeunload', function () {
        if (self.script) self.script.onerror = empty$1;
      }, false);
    }
  }

  /**
   * Inherits from Polling.
   */

  componentInherit(JSONPPolling, polling);

  /*
   * JSONP only supports binary as base64 encoded strings
   */

  JSONPPolling.prototype.supportsBinary = false;

  /**
   * Closes the socket.
   *
   * @api private
   */

  JSONPPolling.prototype.doClose = function () {
    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    if (this.form) {
      this.form.parentNode.removeChild(this.form);
      this.form = null;
      this.iframe = null;
    }

    polling.prototype.doClose.call(this);
  };

  /**
   * Starts a poll cycle.
   *
   * @api private
   */

  JSONPPolling.prototype.doPoll = function () {
    var self = this;
    var script = document.createElement('script');

    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    script.async = true;
    script.src = this.uri();
    script.onerror = function (e) {
      self.onError('jsonp poll error', e);
    };

    var insertAt = document.getElementsByTagName('script')[0];
    if (insertAt) {
      insertAt.parentNode.insertBefore(script, insertAt);
    } else {
      (document.head || document.body).appendChild(script);
    }
    this.script = script;

    var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

    if (isUAgecko) {
      setTimeout(function () {
        var iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        document.body.removeChild(iframe);
      }, 100);
    }
  };

  /**
   * Writes with a hidden iframe.
   *
   * @param {String} data to send
   * @param {Function} called upon flush.
   * @api private
   */

  JSONPPolling.prototype.doWrite = function (data, fn) {
    var self = this;

    if (!this.form) {
      var form = document.createElement('form');
      var area = document.createElement('textarea');
      var id = this.iframeId = 'eio_iframe_' + this.index;
      var iframe;

      form.className = 'socketio';
      form.style.position = 'absolute';
      form.style.top = '-1000px';
      form.style.left = '-1000px';
      form.target = id;
      form.method = 'POST';
      form.setAttribute('accept-charset', 'utf-8');
      area.name = 'd';
      form.appendChild(area);
      document.body.appendChild(form);

      this.form = form;
      this.area = area;
    }

    this.form.action = this.uri();

    function complete () {
      initIframe();
      fn();
    }

    function initIframe () {
      if (self.iframe) {
        try {
          self.form.removeChild(self.iframe);
        } catch (e) {
          self.onError('jsonp polling iframe removal error', e);
        }
      }

      try {
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
        var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
        iframe = document.createElement(html);
      } catch (e) {
        iframe = document.createElement('iframe');
        iframe.name = self.iframeId;
        iframe.src = 'javascript:0';
      }

      iframe.id = self.iframeId;

      self.form.appendChild(iframe);
      self.iframe = iframe;
    }

    initIframe();

    // escape \n to prevent it from being converted into \r\n by some UAs
    // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
    data = data.replace(rEscapedNewline, '\\\n');
    this.area.value = data.replace(rNewline, '\\n');

    try {
      this.form.submit();
    } catch (e) {}

    if (this.iframe.attachEvent) {
      this.iframe.onreadystatechange = function () {
        if (self.iframe.readyState === 'complete') {
          complete();
        }
      };
    } else {
      this.iframe.onload = complete;
    }
  };

  function Queue$1(options) {
    if (!(this instanceof Queue$1)) {
      return new Queue$1(options);
    }

    options = options || {};
    this.concurrency = options.concurrency || Infinity;
    this.pending = 0;
    this.jobs = [];
    this.cbs = [];
    this._done = done.bind(this);
  }

  var arrayAddMethods = [
    'push',
    'unshift',
    'splice'
  ];

  arrayAddMethods.forEach(function(method) {
    Queue$1.prototype[method] = function() {
      var methodResult = Array.prototype[method].apply(this.jobs, arguments);
      this._run();
      return methodResult;
    };
  });

  Object.defineProperty(Queue$1.prototype, 'length', {
    get: function() {
      return this.pending + this.jobs.length;
    }
  });

  Queue$1.prototype._run = function() {
    if (this.pending === this.concurrency) {
      return;
    }
    if (this.jobs.length) {
      var job = this.jobs.shift();
      this.pending++;
      job(this._done);
      this._run();
    }

    if (this.pending === 0) {
      while (this.cbs.length !== 0) {
        var cb = this.cbs.pop();
        process.nextTick(cb);
      }
    }
  };

  Queue$1.prototype.onDone = function(cb) {
    if (typeof cb === 'function') {
      this.cbs.push(cb);
      this._run();
    }
  };

  function done() {
    this.pending--;
    this._run();
  }

  var asyncLimiter = Queue$1;

  var bufferUtil = createCommonjsModule(function (module) {

  /**
   * Merges an array of buffers into a new buffer.
   *
   * @param {Buffer[]} list The array of buffers to concat
   * @param {Number} totalLength The total length of buffers in the list
   * @return {Buffer} The resulting buffer
   * @public
   */
  function concat(list, totalLength) {
    const target = Buffer.allocUnsafe(totalLength);
    var offset = 0;

    for (var i = 0; i < list.length; i++) {
      const buf = list[i];
      buf.copy(target, offset);
      offset += buf.length;
    }

    return target;
  }

  /**
   * Masks a buffer using the given mask.
   *
   * @param {Buffer} source The buffer to mask
   * @param {Buffer} mask The mask to use
   * @param {Buffer} output The buffer where to store the result
   * @param {Number} offset The offset at which to start writing
   * @param {Number} length The number of bytes to mask.
   * @public
   */
  function _mask(source, mask, output, offset, length) {
    for (var i = 0; i < length; i++) {
      output[offset + i] = source[i] ^ mask[i & 3];
    }
  }

  /**
   * Unmasks a buffer using the given mask.
   *
   * @param {Buffer} buffer The buffer to unmask
   * @param {Buffer} mask The mask to use
   * @public
   */
  function _unmask(buffer, mask) {
    // Required until https://github.com/nodejs/node/issues/9006 is resolved.
    const length = buffer.length;
    for (var i = 0; i < length; i++) {
      buffer[i] ^= mask[i & 3];
    }
  }

  try {
    const bufferUtil = bufferutil;
    const bu = bufferUtil.BufferUtil || bufferUtil;

    module.exports = {
      mask(source, mask, output, offset, length) {
        if (length < 48) _mask(source, mask, output, offset, length);
        else bu.mask(source, mask, output, offset, length);
      },
      unmask(buffer, mask) {
        if (buffer.length < 32) _unmask(buffer, mask);
        else bu.unmask(buffer, mask);
      },
      concat
    };
  } catch (e) /* istanbul ignore next */ {
    module.exports = { concat, mask: _mask, unmask: _unmask };
  }
  });
  var bufferUtil_1 = bufferUtil.mask;
  var bufferUtil_2 = bufferUtil.unmask;
  var bufferUtil_3 = bufferUtil.concat;

  var constants = {
    BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
    GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
    kStatusCode: Symbol('status-code'),
    kWebSocket: Symbol('websocket'),
    EMPTY_BUFFER: Buffer.alloc(0),
    NOOP: () => {}
  };

  const { kStatusCode, NOOP } = constants;

  const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
  const EMPTY_BLOCK = Buffer.from([0x00]);

  const kPerMessageDeflate = Symbol('permessage-deflate');
  const kTotalLength = Symbol('total-length');
  const kCallback = Symbol('callback');
  const kBuffers = Symbol('buffers');
  const kError = Symbol('error');

  //
  // We limit zlib concurrency, which prevents severe memory fragmentation
  // as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
  // and https://github.com/websockets/ws/issues/1202
  //
  // Intentionally global; it's the global thread pool that's an issue.
  //
  let zlibLimiter;

  /**
   * permessage-deflate implementation.
   */
  class PerMessageDeflate {
    /**
     * Creates a PerMessageDeflate instance.
     *
     * @param {Object} options Configuration options
     * @param {Boolean} options.serverNoContextTakeover Request/accept disabling
     *     of server context takeover
     * @param {Boolean} options.clientNoContextTakeover Advertise/acknowledge
     *     disabling of client context takeover
     * @param {(Boolean|Number)} options.serverMaxWindowBits Request/confirm the
     *     use of a custom server window size
     * @param {(Boolean|Number)} options.clientMaxWindowBits Advertise support
     *     for, or request, a custom client window size
     * @param {Object} options.zlibDeflateOptions Options to pass to zlib on deflate
     * @param {Object} options.zlibInflateOptions Options to pass to zlib on inflate
     * @param {Number} options.threshold Size (in bytes) below which messages
     *     should not be compressed
     * @param {Number} options.concurrencyLimit The number of concurrent calls to
     *     zlib
     * @param {Boolean} isServer Create the instance in either server or client
     *     mode
     * @param {Number} maxPayload The maximum allowed message length
     */
    constructor(options, isServer, maxPayload) {
      this._maxPayload = maxPayload | 0;
      this._options = options || {};
      this._threshold =
        this._options.threshold !== undefined ? this._options.threshold : 1024;
      this._isServer = !!isServer;
      this._deflate = null;
      this._inflate = null;

      this.params = null;

      if (!zlibLimiter) {
        const concurrency =
          this._options.concurrencyLimit !== undefined
            ? this._options.concurrencyLimit
            : 10;
        zlibLimiter = new asyncLimiter({ concurrency });
      }
    }

    /**
     * @type {String}
     */
    static get extensionName() {
      return 'permessage-deflate';
    }

    /**
     * Create an extension negotiation offer.
     *
     * @return {Object} Extension parameters
     * @public
     */
    offer() {
      const params = {};

      if (this._options.serverNoContextTakeover) {
        params.server_no_context_takeover = true;
      }
      if (this._options.clientNoContextTakeover) {
        params.client_no_context_takeover = true;
      }
      if (this._options.serverMaxWindowBits) {
        params.server_max_window_bits = this._options.serverMaxWindowBits;
      }
      if (this._options.clientMaxWindowBits) {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      } else if (this._options.clientMaxWindowBits == null) {
        params.client_max_window_bits = true;
      }

      return params;
    }

    /**
     * Accept an extension negotiation offer/response.
     *
     * @param {Array} configurations The extension negotiation offers/reponse
     * @return {Object} Accepted configuration
     * @public
     */
    accept(configurations) {
      configurations = this.normalizeParams(configurations);

      this.params = this._isServer
        ? this.acceptAsServer(configurations)
        : this.acceptAsClient(configurations);

      return this.params;
    }

    /**
     * Releases all resources used by the extension.
     *
     * @public
     */
    cleanup() {
      if (this._inflate) {
        this._inflate.close();
        this._inflate = null;
      }

      if (this._deflate) {
        this._deflate.close();
        this._deflate = null;
      }
    }

    /**
     *  Accept an extension negotiation offer.
     *
     * @param {Array} offers The extension negotiation offers
     * @return {Object} Accepted configuration
     * @private
     */
    acceptAsServer(offers) {
      const opts = this._options;
      const accepted = offers.find((params) => {
        if (
          (opts.serverNoContextTakeover === false &&
            params.server_no_context_takeover) ||
          (params.server_max_window_bits &&
            (opts.serverMaxWindowBits === false ||
              (typeof opts.serverMaxWindowBits === 'number' &&
                opts.serverMaxWindowBits > params.server_max_window_bits))) ||
          (typeof opts.clientMaxWindowBits === 'number' &&
            !params.client_max_window_bits)
        ) {
          return false;
        }

        return true;
      });

      if (!accepted) {
        throw new Error('None of the extension offers can be accepted');
      }

      if (opts.serverNoContextTakeover) {
        accepted.server_no_context_takeover = true;
      }
      if (opts.clientNoContextTakeover) {
        accepted.client_no_context_takeover = true;
      }
      if (typeof opts.serverMaxWindowBits === 'number') {
        accepted.server_max_window_bits = opts.serverMaxWindowBits;
      }
      if (typeof opts.clientMaxWindowBits === 'number') {
        accepted.client_max_window_bits = opts.clientMaxWindowBits;
      } else if (
        accepted.client_max_window_bits === true ||
        opts.clientMaxWindowBits === false
      ) {
        delete accepted.client_max_window_bits;
      }

      return accepted;
    }

    /**
     * Accept the extension negotiation response.
     *
     * @param {Array} response The extension negotiation response
     * @return {Object} Accepted configuration
     * @private
     */
    acceptAsClient(response) {
      const params = response[0];

      if (
        this._options.clientNoContextTakeover === false &&
        params.client_no_context_takeover
      ) {
        throw new Error('Unexpected parameter "client_no_context_takeover"');
      }

      if (!params.client_max_window_bits) {
        if (typeof this._options.clientMaxWindowBits === 'number') {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        }
      } else if (
        this._options.clientMaxWindowBits === false ||
        (typeof this._options.clientMaxWindowBits === 'number' &&
          params.client_max_window_bits > this._options.clientMaxWindowBits)
      ) {
        throw new Error(
          'Unexpected or invalid parameter "client_max_window_bits"'
        );
      }

      return params;
    }

    /**
     * Normalize parameters.
     *
     * @param {Array} configurations The extension negotiation offers/reponse
     * @return {Array} The offers/response with normalized parameters
     * @private
     */
    normalizeParams(configurations) {
      configurations.forEach((params) => {
        Object.keys(params).forEach((key) => {
          var value = params[key];

          if (value.length > 1) {
            throw new Error(`Parameter "${key}" must have only a single value`);
          }

          value = value[0];

          if (key === 'client_max_window_bits') {
            if (value !== true) {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
              value = num;
            } else if (!this._isServer) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
          } else if (key === 'server_max_window_bits') {
            const num = +value;
            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
            value = num;
          } else if (
            key === 'client_no_context_takeover' ||
            key === 'server_no_context_takeover'
          ) {
            if (value !== true) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
          } else {
            throw new Error(`Unknown parameter "${key}"`);
          }

          params[key] = value;
        });
      });

      return configurations;
    }

    /**
     * Decompress data. Concurrency limited by async-limiter.
     *
     * @param {Buffer} data Compressed data
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @public
     */
    decompress(data, fin, callback) {
      zlibLimiter.push((done) => {
        this._decompress(data, fin, (err, result) => {
          done();
          callback(err, result);
        });
      });
    }

    /**
     * Compress data. Concurrency limited by async-limiter.
     *
     * @param {Buffer} data Data to compress
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @public
     */
    compress(data, fin, callback) {
      zlibLimiter.push((done) => {
        this._compress(data, fin, (err, result) => {
          done();
          callback(err, result);
        });
      });
    }

    /**
     * Decompress data.
     *
     * @param {Buffer} data Compressed data
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @private
     */
    _decompress(data, fin, callback) {
      const endpoint = this._isServer ? 'client' : 'server';

      if (!this._inflate) {
        const key = `${endpoint}_max_window_bits`;
        const windowBits =
          typeof this.params[key] !== 'number'
            ? zlib.Z_DEFAULT_WINDOWBITS
            : this.params[key];

        this._inflate = zlib.createInflateRaw(
          Object.assign({}, this._options.zlibInflateOptions, { windowBits })
        );
        this._inflate[kPerMessageDeflate] = this;
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];
        this._inflate.on('error', inflateOnError);
        this._inflate.on('data', inflateOnData);
      }

      this._inflate[kCallback] = callback;

      this._inflate.write(data);
      if (fin) this._inflate.write(TRAILER);

      this._inflate.flush(() => {
        const err = this._inflate[kError];

        if (err) {
          this._inflate.close();
          this._inflate = null;
          callback(err);
          return;
        }

        const data = bufferUtil.concat(
          this._inflate[kBuffers],
          this._inflate[kTotalLength]
        );

        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
          this._inflate.close();
          this._inflate = null;
        } else {
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
        }

        callback(null, data);
      });
    }

    /**
     * Compress data.
     *
     * @param {Buffer} data Data to compress
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @private
     */
    _compress(data, fin, callback) {
      if (!data || data.length === 0) {
        process.nextTick(callback, null, EMPTY_BLOCK);
        return;
      }

      const endpoint = this._isServer ? 'server' : 'client';

      if (!this._deflate) {
        const key = `${endpoint}_max_window_bits`;
        const windowBits =
          typeof this.params[key] !== 'number'
            ? zlib.Z_DEFAULT_WINDOWBITS
            : this.params[key];

        this._deflate = zlib.createDeflateRaw(
          Object.assign({}, this._options.zlibDeflateOptions, { windowBits })
        );

        this._deflate[kTotalLength] = 0;
        this._deflate[kBuffers] = [];

        //
        // An `'error'` event is emitted, only on Node.js < 10.0.0, if the
        // `zlib.DeflateRaw` instance is closed while data is being processed.
        // This can happen if `PerMessageDeflate#cleanup()` is called at the wrong
        // time due to an abnormal WebSocket closure.
        //
        this._deflate.on('error', NOOP);
        this._deflate.on('data', deflateOnData);
      }

      this._deflate.write(data);
      this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
        if (!this._deflate) {
          //
          // This `if` statement is only needed for Node.js < 10.0.0 because as of
          // commit https://github.com/nodejs/node/commit/5e3f5164, the flush
          // callback is no longer called if the deflate stream is closed while
          // data is being processed.
          //
          return;
        }

        var data = bufferUtil.concat(
          this._deflate[kBuffers],
          this._deflate[kTotalLength]
        );

        if (fin) data = data.slice(0, data.length - 4);

        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
          this._deflate.close();
          this._deflate = null;
        } else {
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
        }

        callback(null, data);
      });
    }
  }

  var permessageDeflate = PerMessageDeflate;

  /**
   * The listener of the `zlib.DeflateRaw` stream `'data'` event.
   *
   * @param {Buffer} chunk A chunk of data
   * @private
   */
  function deflateOnData(chunk) {
    this[kBuffers].push(chunk);
    this[kTotalLength] += chunk.length;
  }

  /**
   * The listener of the `zlib.InflateRaw` stream `'data'` event.
   *
   * @param {Buffer} chunk A chunk of data
   * @private
   */
  function inflateOnData(chunk) {
    this[kTotalLength] += chunk.length;

    if (
      this[kPerMessageDeflate]._maxPayload < 1 ||
      this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload
    ) {
      this[kBuffers].push(chunk);
      return;
    }

    this[kError] = new RangeError('Max payload size exceeded');
    this[kError][kStatusCode] = 1009;
    this.removeListener('data', inflateOnData);
    this.reset();
  }

  /**
   * The listener of the `zlib.InflateRaw` stream `'error'` event.
   *
   * @param {Error} err The emitted error
   * @private
   */
  function inflateOnError(err) {
    //
    // There is no need to call `Zlib#close()` as the handle is automatically
    // closed when an error is emitted.
    //
    this[kPerMessageDeflate]._inflate = null;
    err[kStatusCode] = 1007;
    this[kCallback](err);
  }

  /**
   * Class representing an event.
   *
   * @private
   */
  class Event$1 {
    /**
     * Create a new `Event`.
     *
     * @param {String} type The name of the event
     * @param {Object} target A reference to the target to which the event was dispatched
     */
    constructor(type, target) {
      this.target = target;
      this.type = type;
    }
  }

  /**
   * Class representing a message event.
   *
   * @extends Event
   * @private
   */
  class MessageEvent extends Event$1 {
    /**
     * Create a new `MessageEvent`.
     *
     * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The received data
     * @param {WebSocket} target A reference to the target to which the event was dispatched
     */
    constructor(data, target) {
      super('message', target);

      this.data = data;
    }
  }

  /**
   * Class representing a close event.
   *
   * @extends Event
   * @private
   */
  class CloseEvent extends Event$1 {
    /**
     * Create a new `CloseEvent`.
     *
     * @param {Number} code The status code explaining why the connection is being closed
     * @param {String} reason A human-readable string explaining why the connection is closing
     * @param {WebSocket} target A reference to the target to which the event was dispatched
     */
    constructor(code, reason, target) {
      super('close', target);

      this.wasClean = target._closeFrameReceived && target._closeFrameSent;
      this.reason = reason;
      this.code = code;
    }
  }

  /**
   * Class representing an open event.
   *
   * @extends Event
   * @private
   */
  class OpenEvent extends Event$1 {
    /**
     * Create a new `OpenEvent`.
     *
     * @param {WebSocket} target A reference to the target to which the event was dispatched
     */
    constructor(target) {
      super('open', target);
    }
  }

  /**
   * Class representing an error event.
   *
   * @extends Event
   * @private
   */
  class ErrorEvent extends Event$1 {
    /**
     * Create a new `ErrorEvent`.
     *
     * @param {Object} error The error that generated this event
     * @param {WebSocket} target A reference to the target to which the event was dispatched
     */
    constructor(error, target) {
      super('error', target);

      this.message = error.message;
      this.error = error;
    }
  }

  /**
   * This provides methods for emulating the `EventTarget` interface. It's not
   * meant to be used directly.
   *
   * @mixin
   */
  const EventTarget = {
    /**
     * Register an event listener.
     *
     * @param {String} method A string representing the event type to listen for
     * @param {Function} listener The listener to add
     * @public
     */
    addEventListener(method, listener) {
      if (typeof listener !== 'function') return;

      function onMessage(data) {
        listener.call(this, new MessageEvent(data, this));
      }

      function onClose(code, message) {
        listener.call(this, new CloseEvent(code, message, this));
      }

      function onError(error) {
        listener.call(this, new ErrorEvent(error, this));
      }

      function onOpen() {
        listener.call(this, new OpenEvent(this));
      }

      if (method === 'message') {
        onMessage._listener = listener;
        this.on(method, onMessage);
      } else if (method === 'close') {
        onClose._listener = listener;
        this.on(method, onClose);
      } else if (method === 'error') {
        onError._listener = listener;
        this.on(method, onError);
      } else if (method === 'open') {
        onOpen._listener = listener;
        this.on(method, onOpen);
      } else {
        this.on(method, listener);
      }
    },

    /**
     * Remove an event listener.
     *
     * @param {String} method A string representing the event type to remove
     * @param {Function} listener The listener to remove
     * @public
     */
    removeEventListener(method, listener) {
      const listeners = this.listeners(method);

      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i] === listener || listeners[i]._listener === listener) {
          this.removeListener(method, listeners[i]);
        }
      }
    }
  };

  var eventTarget = EventTarget;

  //
  // Allowed token characters:
  //
  // '!', '#', '$', '%', '&', ''', '*', '+', '-',
  // '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
  //
  // tokenChars[32] === 0 // ' '
  // tokenChars[33] === 1 // '!'
  // tokenChars[34] === 0 // '"'
  // ...
  //
  // prettier-ignore
  const tokenChars = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
    0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
  ];

  /**
   * Adds an offer to the map of extension offers or a parameter to the map of
   * parameters.
   *
   * @param {Object} dest The map of extension offers or parameters
   * @param {String} name The extension or parameter name
   * @param {(Object|Boolean|String)} elem The extension parameters or the
   *     parameter value
   * @private
   */
  function push$1(dest, name, elem) {
    if (Object.prototype.hasOwnProperty.call(dest, name)) dest[name].push(elem);
    else dest[name] = [elem];
  }

  /**
   * Parses the `Sec-WebSocket-Extensions` header into an object.
   *
   * @param {String} header The field value of the header
   * @return {Object} The parsed object
   * @public
   */
  function parse$5(header) {
    const offers = {};

    if (header === undefined || header === '') return offers;

    var params = {};
    var mustUnescape = false;
    var isEscaping = false;
    var inQuotes = false;
    var extensionName;
    var paramName;
    var start = -1;
    var end = -1;

    for (var i = 0; i < header.length; i++) {
      const code = header.charCodeAt(i);

      if (extensionName === undefined) {
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x20 /* ' ' */ || code === 0x09 /* '\t' */) {
          if (end === -1 && start !== -1) end = i;
        } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }

          if (end === -1) end = i;
          const name = header.slice(start, end);
          if (code === 0x2c) {
            push$1(offers, name, params);
            params = {};
          } else {
            extensionName = name;
          }

          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (paramName === undefined) {
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x20 || code === 0x09) {
          if (end === -1 && start !== -1) end = i;
        } else if (code === 0x3b || code === 0x2c) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }

          if (end === -1) end = i;
          push$1(params, header.slice(start, end), true);
          if (code === 0x2c) {
            push$1(offers, extensionName, params);
            params = {};
            extensionName = undefined;
          }

          start = end = -1;
        } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
          paramName = header.slice(start, i);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else {
        //
        // The value of a quoted-string after unescaping must conform to the
        // token ABNF, so only token characters are valid.
        // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
        //
        if (isEscaping) {
          if (tokenChars[code] !== 1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (start === -1) start = i;
          else if (!mustUnescape) mustUnescape = true;
          isEscaping = false;
        } else if (inQuotes) {
          if (tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (code === 0x22 /* '"' */ && start !== -1) {
            inQuotes = false;
            end = i;
          } else if (code === 0x5c /* '\' */) {
            isEscaping = true;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
          inQuotes = true;
        } else if (end === -1 && tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
          if (end === -1) end = i;
        } else if (code === 0x3b || code === 0x2c) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }

          if (end === -1) end = i;
          var value = header.slice(start, end);
          if (mustUnescape) {
            value = value.replace(/\\/g, '');
            mustUnescape = false;
          }
          push$1(params, paramName, value);
          if (code === 0x2c) {
            push$1(offers, extensionName, params);
            params = {};
            extensionName = undefined;
          }

          paramName = undefined;
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
    }

    if (start === -1 || inQuotes) {
      throw new SyntaxError('Unexpected end of input');
    }

    if (end === -1) end = i;
    const token = header.slice(start, end);
    if (extensionName === undefined) {
      push$1(offers, token, {});
    } else {
      if (paramName === undefined) {
        push$1(params, token, true);
      } else if (mustUnescape) {
        push$1(params, paramName, token.replace(/\\/g, ''));
      } else {
        push$1(params, paramName, token);
      }
      push$1(offers, extensionName, params);
    }

    return offers;
  }

  /**
   * Builds the `Sec-WebSocket-Extensions` header field value.
   *
   * @param {Object} extensions The map of extensions and parameters to format
   * @return {String} A string representing the given object
   * @public
   */
  function format(extensions) {
    return Object.keys(extensions)
      .map((extension) => {
        var configurations = extensions[extension];
        if (!Array.isArray(configurations)) configurations = [configurations];
        return configurations
          .map((params) => {
            return [extension]
              .concat(
                Object.keys(params).map((k) => {
                  var values = params[k];
                  if (!Array.isArray(values)) values = [values];
                  return values
                    .map((v) => (v === true ? k : `${k}=${v}`))
                    .join('; ');
                })
              )
              .join('; ');
          })
          .join(', ');
      })
      .join(', ');
  }

  var extension = { format, parse: parse$5 };

  var validation = createCommonjsModule(function (module, exports) {

  try {
    const isValidUTF8 = utf8Validate;

    exports.isValidUTF8 =
      typeof isValidUTF8 === 'object'
        ? isValidUTF8.Validation.isValidUTF8 // utf-8-validate@<3.0.0
        : isValidUTF8;
  } catch (e) /* istanbul ignore next */ {
    exports.isValidUTF8 = () => true;
  }

  /**
   * Checks if a status code is allowed in a close frame.
   *
   * @param {Number} code The status code
   * @return {Boolean} `true` if the status code is valid, else `false`
   * @public
   */
  exports.isValidStatusCode = (code) => {
    return (
      (code >= 1000 &&
        code <= 1013 &&
        code !== 1004 &&
        code !== 1005 &&
        code !== 1006) ||
      (code >= 3000 && code <= 4999)
    );
  };
  });
  var validation_1 = validation.isValidUTF8;
  var validation_2 = validation.isValidStatusCode;

  const GET_INFO = 0;
  const GET_PAYLOAD_LENGTH_16 = 1;
  const GET_PAYLOAD_LENGTH_64 = 2;
  const GET_MASK = 3;
  const GET_DATA = 4;
  const INFLATING = 5;

  /**
   * HyBi Receiver implementation.
   *
   * @extends stream.Writable
   */
  class Receiver extends stream.Writable {
    /**
     * Creates a Receiver instance.
     *
     * @param {String} binaryType The type for binary data
     * @param {Object} extensions An object containing the negotiated extensions
     * @param {Number} maxPayload The maximum allowed message length
     */
    constructor(binaryType, extensions, maxPayload) {
      super();

      this._binaryType = binaryType || constants.BINARY_TYPES[0];
      this[constants.kWebSocket] = undefined;
      this._extensions = extensions || {};
      this._maxPayload = maxPayload | 0;

      this._bufferedBytes = 0;
      this._buffers = [];

      this._compressed = false;
      this._payloadLength = 0;
      this._mask = undefined;
      this._fragmented = 0;
      this._masked = false;
      this._fin = false;
      this._opcode = 0;

      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragments = [];

      this._state = GET_INFO;
      this._loop = false;
    }

    /**
     * Implements `Writable.prototype._write()`.
     *
     * @param {Buffer} chunk The chunk of data to write
     * @param {String} encoding The character encoding of `chunk`
     * @param {Function} cb Callback
     */
    _write(chunk, encoding, cb) {
      if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

      this._bufferedBytes += chunk.length;
      this._buffers.push(chunk);
      this.startLoop(cb);
    }

    /**
     * Consumes `n` bytes from the buffered data.
     *
     * @param {Number} n The number of bytes to consume
     * @return {Buffer} The consumed bytes
     * @private
     */
    consume(n) {
      this._bufferedBytes -= n;

      if (n === this._buffers[0].length) return this._buffers.shift();

      if (n < this._buffers[0].length) {
        const buf = this._buffers[0];
        this._buffers[0] = buf.slice(n);
        return buf.slice(0, n);
      }

      const dst = Buffer.allocUnsafe(n);

      do {
        const buf = this._buffers[0];

        if (n >= buf.length) {
          this._buffers.shift().copy(dst, dst.length - n);
        } else {
          buf.copy(dst, dst.length - n, 0, n);
          this._buffers[0] = buf.slice(n);
        }

        n -= buf.length;
      } while (n > 0);

      return dst;
    }

    /**
     * Starts the parsing loop.
     *
     * @param {Function} cb Callback
     * @private
     */
    startLoop(cb) {
      var err;
      this._loop = true;

      do {
        switch (this._state) {
          case GET_INFO:
            err = this.getInfo();
            break;
          case GET_PAYLOAD_LENGTH_16:
            err = this.getPayloadLength16();
            break;
          case GET_PAYLOAD_LENGTH_64:
            err = this.getPayloadLength64();
            break;
          case GET_MASK:
            this.getMask();
            break;
          case GET_DATA:
            err = this.getData(cb);
            break;
          default:
            // `INFLATING`
            this._loop = false;
            return;
        }
      } while (this._loop);

      cb(err);
    }

    /**
     * Reads the first two bytes of a frame.
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */
    getInfo() {
      if (this._bufferedBytes < 2) {
        this._loop = false;
        return;
      }

      const buf = this.consume(2);

      if ((buf[0] & 0x30) !== 0x00) {
        this._loop = false;
        return error(RangeError, 'RSV2 and RSV3 must be clear', true, 1002);
      }

      const compressed = (buf[0] & 0x40) === 0x40;

      if (compressed && !this._extensions[permessageDeflate.extensionName]) {
        this._loop = false;
        return error(RangeError, 'RSV1 must be clear', true, 1002);
      }

      this._fin = (buf[0] & 0x80) === 0x80;
      this._opcode = buf[0] & 0x0f;
      this._payloadLength = buf[1] & 0x7f;

      if (this._opcode === 0x00) {
        if (compressed) {
          this._loop = false;
          return error(RangeError, 'RSV1 must be clear', true, 1002);
        }

        if (!this._fragmented) {
          this._loop = false;
          return error(RangeError, 'invalid opcode 0', true, 1002);
        }

        this._opcode = this._fragmented;
      } else if (this._opcode === 0x01 || this._opcode === 0x02) {
        if (this._fragmented) {
          this._loop = false;
          return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
        }

        this._compressed = compressed;
      } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
        if (!this._fin) {
          this._loop = false;
          return error(RangeError, 'FIN must be set', true, 1002);
        }

        if (compressed) {
          this._loop = false;
          return error(RangeError, 'RSV1 must be clear', true, 1002);
        }

        if (this._payloadLength > 0x7d) {
          this._loop = false;
          return error(
            RangeError,
            `invalid payload length ${this._payloadLength}`,
            true,
            1002
          );
        }
      } else {
        this._loop = false;
        return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
      }

      if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
      this._masked = (buf[1] & 0x80) === 0x80;

      if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
      else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
      else return this.haveLength();
    }

    /**
     * Gets extended payload length (7+16).
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */
    getPayloadLength16() {
      if (this._bufferedBytes < 2) {
        this._loop = false;
        return;
      }

      this._payloadLength = this.consume(2).readUInt16BE(0);
      return this.haveLength();
    }

    /**
     * Gets extended payload length (7+64).
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */
    getPayloadLength64() {
      if (this._bufferedBytes < 8) {
        this._loop = false;
        return;
      }

      const buf = this.consume(8);
      const num = buf.readUInt32BE(0);

      //
      // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
      // if payload length is greater than this number.
      //
      if (num > Math.pow(2, 53 - 32) - 1) {
        this._loop = false;
        return error(
          RangeError,
          'Unsupported WebSocket frame: payload length > 2^53 - 1',
          false,
          1009
        );
      }

      this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
      return this.haveLength();
    }

    /**
     * Payload length has been read.
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */
    haveLength() {
      if (this._payloadLength && this._opcode < 0x08) {
        this._totalPayloadLength += this._payloadLength;
        if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
          this._loop = false;
          return error(RangeError, 'Max payload size exceeded', false, 1009);
        }
      }

      if (this._masked) this._state = GET_MASK;
      else this._state = GET_DATA;
    }

    /**
     * Reads mask bytes.
     *
     * @private
     */
    getMask() {
      if (this._bufferedBytes < 4) {
        this._loop = false;
        return;
      }

      this._mask = this.consume(4);
      this._state = GET_DATA;
    }

    /**
     * Reads data bytes.
     *
     * @param {Function} cb Callback
     * @return {(Error|RangeError|undefined)} A possible error
     * @private
     */
    getData(cb) {
      var data = constants.EMPTY_BUFFER;

      if (this._payloadLength) {
        if (this._bufferedBytes < this._payloadLength) {
          this._loop = false;
          return;
        }

        data = this.consume(this._payloadLength);
        if (this._masked) bufferUtil.unmask(data, this._mask);
      }

      if (this._opcode > 0x07) return this.controlMessage(data);

      if (this._compressed) {
        this._state = INFLATING;
        this.decompress(data, cb);
        return;
      }

      if (data.length) {
        //
        // This message is not compressed so its lenght is the sum of the payload
        // length of all fragments.
        //
        this._messageLength = this._totalPayloadLength;
        this._fragments.push(data);
      }

      return this.dataMessage();
    }

    /**
     * Decompresses data.
     *
     * @param {Buffer} data Compressed data
     * @param {Function} cb Callback
     * @private
     */
    decompress(data, cb) {
      const perMessageDeflate = this._extensions[permessageDeflate.extensionName];

      perMessageDeflate.decompress(data, this._fin, (err, buf) => {
        if (err) return cb(err);

        if (buf.length) {
          this._messageLength += buf.length;
          if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
            return cb(
              error(RangeError, 'Max payload size exceeded', false, 1009)
            );
          }

          this._fragments.push(buf);
        }

        const er = this.dataMessage();
        if (er) return cb(er);

        this.startLoop(cb);
      });
    }

    /**
     * Handles a data message.
     *
     * @return {(Error|undefined)} A possible error
     * @private
     */
    dataMessage() {
      if (this._fin) {
        const messageLength = this._messageLength;
        const fragments = this._fragments;

        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragmented = 0;
        this._fragments = [];

        if (this._opcode === 2) {
          var data;

          if (this._binaryType === 'nodebuffer') {
            data = toBuffer(fragments, messageLength);
          } else if (this._binaryType === 'arraybuffer') {
            data = toArrayBuffer(toBuffer(fragments, messageLength));
          } else {
            data = fragments;
          }

          this.emit('message', data);
        } else {
          const buf = toBuffer(fragments, messageLength);

          if (!validation.isValidUTF8(buf)) {
            this._loop = false;
            return error(Error, 'invalid UTF-8 sequence', true, 1007);
          }

          this.emit('message', buf.toString());
        }
      }

      this._state = GET_INFO;
    }

    /**
     * Handles a control message.
     *
     * @param {Buffer} data Data to handle
     * @return {(Error|RangeError|undefined)} A possible error
     * @private
     */
    controlMessage(data) {
      if (this._opcode === 0x08) {
        this._loop = false;

        if (data.length === 0) {
          this.emit('conclude', 1005, '');
          this.end();
        } else if (data.length === 1) {
          return error(RangeError, 'invalid payload length 1', true, 1002);
        } else {
          const code = data.readUInt16BE(0);

          if (!validation.isValidStatusCode(code)) {
            return error(RangeError, `invalid status code ${code}`, true, 1002);
          }

          const buf = data.slice(2);

          if (!validation.isValidUTF8(buf)) {
            return error(Error, 'invalid UTF-8 sequence', true, 1007);
          }

          this.emit('conclude', code, buf.toString());
          this.end();
        }
      } else if (this._opcode === 0x09) {
        this.emit('ping', data);
      } else {
        this.emit('pong', data);
      }

      this._state = GET_INFO;
    }
  }

  var receiver = Receiver;

  /**
   * Builds an error object.
   *
   * @param {(Error|RangeError)} ErrorCtor The error constructor
   * @param {String} message The error message
   * @param {Boolean} prefix Specifies whether or not to add a default prefix to
   *     `message`
   * @param {Number} statusCode The status code
   * @return {(Error|RangeError)} The error
   * @private
   */
  function error(ErrorCtor, message, prefix, statusCode) {
    const err = new ErrorCtor(
      prefix ? `Invalid WebSocket frame: ${message}` : message
    );

    Error.captureStackTrace(err, error);
    err[constants.kStatusCode] = statusCode;
    return err;
  }

  /**
   * Makes a buffer from a list of fragments.
   *
   * @param {Buffer[]} fragments The list of fragments composing the message
   * @param {Number} messageLength The length of the message
   * @return {Buffer}
   * @private
   */
  function toBuffer(fragments, messageLength) {
    if (fragments.length === 1) return fragments[0];
    if (fragments.length > 1) return bufferUtil.concat(fragments, messageLength);
    return constants.EMPTY_BUFFER;
  }

  /**
   * Converts a buffer to an `ArrayBuffer`.
   *
   * @param {Buffer} buf The buffer to convert
   * @return {ArrayBuffer} Converted buffer
   */
  function toArrayBuffer(buf) {
    if (buf.byteLength === buf.buffer.byteLength) {
      return buf.buffer;
    }

    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  }

  /**
   * HyBi Sender implementation.
   */
  class Sender {
    /**
     * Creates a Sender instance.
     *
     * @param {net.Socket} socket The connection socket
     * @param {Object} extensions An object containing the negotiated extensions
     */
    constructor(socket, extensions) {
      this._extensions = extensions || {};
      this._socket = socket;

      this._firstFragment = true;
      this._compress = false;

      this._bufferedBytes = 0;
      this._deflating = false;
      this._queue = [];
    }

    /**
     * Frames a piece of data according to the HyBi WebSocket protocol.
     *
     * @param {Buffer} data The data to frame
     * @param {Object} options Options object
     * @param {Number} options.opcode The opcode
     * @param {Boolean} options.readOnly Specifies whether `data` can be modified
     * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
     * @return {Buffer[]} The framed data as a list of `Buffer` instances
     * @public
     */
    static frame(data, options) {
      const merge = data.length < 1024 || (options.mask && options.readOnly);
      var offset = options.mask ? 6 : 2;
      var payloadLength = data.length;

      if (data.length >= 65536) {
        offset += 8;
        payloadLength = 127;
      } else if (data.length > 125) {
        offset += 2;
        payloadLength = 126;
      }

      const target = Buffer.allocUnsafe(merge ? data.length + offset : offset);

      target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
      if (options.rsv1) target[0] |= 0x40;

      if (payloadLength === 126) {
        target.writeUInt16BE(data.length, 2);
      } else if (payloadLength === 127) {
        target.writeUInt32BE(0, 2);
        target.writeUInt32BE(data.length, 6);
      }

      if (!options.mask) {
        target[1] = payloadLength;
        if (merge) {
          data.copy(target, offset);
          return [target];
        }

        return [target, data];
      }

      const mask = crypto.randomBytes(4);

      target[1] = payloadLength | 0x80;
      target[offset - 4] = mask[0];
      target[offset - 3] = mask[1];
      target[offset - 2] = mask[2];
      target[offset - 1] = mask[3];

      if (merge) {
        bufferUtil.mask(data, mask, target, offset, data.length);
        return [target];
      }

      bufferUtil.mask(data, mask, data, 0, data.length);
      return [target, data];
    }

    /**
     * Sends a close message to the other peer.
     *
     * @param {(Number|undefined)} code The status code component of the body
     * @param {String} data The message component of the body
     * @param {Boolean} mask Specifies whether or not to mask the message
     * @param {Function} cb Callback
     * @public
     */
    close(code, data, mask, cb) {
      var buf;

      if (code === undefined) {
        buf = constants.EMPTY_BUFFER;
      } else if (
        typeof code !== 'number' ||
        !validation.isValidStatusCode(code)
      ) {
        throw new TypeError('First argument must be a valid error code number');
      } else if (data === undefined || data === '') {
        buf = Buffer.allocUnsafe(2);
        buf.writeUInt16BE(code, 0);
      } else {
        buf = Buffer.allocUnsafe(2 + Buffer.byteLength(data));
        buf.writeUInt16BE(code, 0);
        buf.write(data, 2);
      }

      if (this._deflating) {
        this.enqueue([this.doClose, buf, mask, cb]);
      } else {
        this.doClose(buf, mask, cb);
      }
    }

    /**
     * Frames and sends a close message.
     *
     * @param {Buffer} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback
     * @private
     */
    doClose(data, mask, cb) {
      this.sendFrame(
        Sender.frame(data, {
          fin: true,
          rsv1: false,
          opcode: 0x08,
          mask,
          readOnly: false
        }),
        cb
      );
    }

    /**
     * Sends a ping message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback
     * @public
     */
    ping(data, mask, cb) {
      var readOnly = true;

      if (!Buffer.isBuffer(data)) {
        if (data instanceof ArrayBuffer) {
          data = Buffer.from(data);
        } else if (ArrayBuffer.isView(data)) {
          data = viewToBuffer(data);
        } else {
          data = Buffer.from(data);
          readOnly = false;
        }
      }

      if (this._deflating) {
        this.enqueue([this.doPing, data, mask, readOnly, cb]);
      } else {
        this.doPing(data, mask, readOnly, cb);
      }
    }

    /**
     * Frames and sends a ping message.
     *
     * @param {*} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Boolean} readOnly Specifies whether `data` can be modified
     * @param {Function} cb Callback
     * @private
     */
    doPing(data, mask, readOnly, cb) {
      this.sendFrame(
        Sender.frame(data, {
          fin: true,
          rsv1: false,
          opcode: 0x09,
          mask,
          readOnly
        }),
        cb
      );
    }

    /**
     * Sends a pong message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback
     * @public
     */
    pong(data, mask, cb) {
      var readOnly = true;

      if (!Buffer.isBuffer(data)) {
        if (data instanceof ArrayBuffer) {
          data = Buffer.from(data);
        } else if (ArrayBuffer.isView(data)) {
          data = viewToBuffer(data);
        } else {
          data = Buffer.from(data);
          readOnly = false;
        }
      }

      if (this._deflating) {
        this.enqueue([this.doPong, data, mask, readOnly, cb]);
      } else {
        this.doPong(data, mask, readOnly, cb);
      }
    }

    /**
     * Frames and sends a pong message.
     *
     * @param {*} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Boolean} readOnly Specifies whether `data` can be modified
     * @param {Function} cb Callback
     * @private
     */
    doPong(data, mask, readOnly, cb) {
      this.sendFrame(
        Sender.frame(data, {
          fin: true,
          rsv1: false,
          opcode: 0x0a,
          mask,
          readOnly
        }),
        cb
      );
    }

    /**
     * Sends a data message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Object} options Options object
     * @param {Boolean} options.compress Specifies whether or not to compress `data`
     * @param {Boolean} options.binary Specifies whether `data` is binary or text
     * @param {Boolean} options.fin Specifies whether the fragment is the last one
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback
     * @public
     */
    send(data, options, cb) {
      var opcode = options.binary ? 2 : 1;
      var rsv1 = options.compress;
      var readOnly = true;

      if (!Buffer.isBuffer(data)) {
        if (data instanceof ArrayBuffer) {
          data = Buffer.from(data);
        } else if (ArrayBuffer.isView(data)) {
          data = viewToBuffer(data);
        } else {
          data = Buffer.from(data);
          readOnly = false;
        }
      }

      const perMessageDeflate = this._extensions[permessageDeflate.extensionName];

      if (this._firstFragment) {
        this._firstFragment = false;
        if (rsv1 && perMessageDeflate) {
          rsv1 = data.length >= perMessageDeflate._threshold;
        }
        this._compress = rsv1;
      } else {
        rsv1 = false;
        opcode = 0;
      }

      if (options.fin) this._firstFragment = true;

      if (perMessageDeflate) {
        const opts = {
          fin: options.fin,
          rsv1,
          opcode,
          mask: options.mask,
          readOnly
        };

        if (this._deflating) {
          this.enqueue([this.dispatch, data, this._compress, opts, cb]);
        } else {
          this.dispatch(data, this._compress, opts, cb);
        }
      } else {
        this.sendFrame(
          Sender.frame(data, {
            fin: options.fin,
            rsv1: false,
            opcode,
            mask: options.mask,
            readOnly
          }),
          cb
        );
      }
    }

    /**
     * Dispatches a data message.
     *
     * @param {Buffer} data The message to send
     * @param {Boolean} compress Specifies whether or not to compress `data`
     * @param {Object} options Options object
     * @param {Number} options.opcode The opcode
     * @param {Boolean} options.readOnly Specifies whether `data` can be modified
     * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
     * @param {Function} cb Callback
     * @private
     */
    dispatch(data, compress, options, cb) {
      if (!compress) {
        this.sendFrame(Sender.frame(data, options), cb);
        return;
      }

      const perMessageDeflate = this._extensions[permessageDeflate.extensionName];

      this._deflating = true;
      perMessageDeflate.compress(data, options.fin, (_, buf) => {
        this._deflating = false;
        options.readOnly = false;
        this.sendFrame(Sender.frame(buf, options), cb);
        this.dequeue();
      });
    }

    /**
     * Executes queued send operations.
     *
     * @private
     */
    dequeue() {
      while (!this._deflating && this._queue.length) {
        const params = this._queue.shift();

        this._bufferedBytes -= params[1].length;
        params[0].apply(this, params.slice(1));
      }
    }

    /**
     * Enqueues a send operation.
     *
     * @param {Array} params Send operation parameters.
     * @private
     */
    enqueue(params) {
      this._bufferedBytes += params[1].length;
      this._queue.push(params);
    }

    /**
     * Sends a frame.
     *
     * @param {Buffer[]} list The frame to send
     * @param {Function} cb Callback
     * @private
     */
    sendFrame(list, cb) {
      if (list.length === 2) {
        this._socket.write(list[0]);
        this._socket.write(list[1], cb);
      } else {
        this._socket.write(list[0], cb);
      }
    }
  }

  var sender = Sender;

  /**
   * Converts an `ArrayBuffer` view into a buffer.
   *
   * @param {(DataView|TypedArray)} view The view to convert
   * @return {Buffer} Converted view
   * @private
   */
  function viewToBuffer(view) {
    const buf = Buffer.from(view.buffer);

    if (view.byteLength !== view.buffer.byteLength) {
      return buf.slice(view.byteOffset, view.byteOffset + view.byteLength);
    }

    return buf;
  }

  const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
  const kWebSocket = constants.kWebSocket;
  const protocolVersions = [8, 13];
  const closeTimeout = 30 * 1000; // Allow 30 seconds to terminate the connection cleanly.

  /**
   * Class representing a WebSocket.
   *
   * @extends EventEmitter
   */
  class WebSocket$1 extends events__default {
    /**
     * Create a new `WebSocket`.
     *
     * @param {(String|url.Url|url.URL)} address The URL to which to connect
     * @param {(String|String[])} protocols The subprotocols
     * @param {Object} options Connection options
     */
    constructor(address, protocols, options) {
      super();

      this.readyState = WebSocket$1.CONNECTING;
      this.protocol = '';

      this._binaryType = constants.BINARY_TYPES[0];
      this._closeFrameReceived = false;
      this._closeFrameSent = false;
      this._closeMessage = '';
      this._closeTimer = null;
      this._closeCode = 1006;
      this._extensions = {};
      this._isServer = true;
      this._receiver = null;
      this._sender = null;
      this._socket = null;

      if (address !== null) {
        if (Array.isArray(protocols)) {
          protocols = protocols.join(', ');
        } else if (typeof protocols === 'object' && protocols !== null) {
          options = protocols;
          protocols = undefined;
        }

        initAsClient.call(this, address, protocols, options);
      }
    }

    get CONNECTING() {
      return WebSocket$1.CONNECTING;
    }
    get CLOSING() {
      return WebSocket$1.CLOSING;
    }
    get CLOSED() {
      return WebSocket$1.CLOSED;
    }
    get OPEN() {
      return WebSocket$1.OPEN;
    }

    /**
     * This deviates from the WHATWG interface since ws doesn't support the required
     * default "blob" type (instead we define a custom "nodebuffer" type).
     *
     * @type {String}
     */
    get binaryType() {
      return this._binaryType;
    }

    set binaryType(type) {
      if (!constants.BINARY_TYPES.includes(type)) return;

      this._binaryType = type;

      //
      // Allow to change `binaryType` on the fly.
      //
      if (this._receiver) this._receiver._binaryType = type;
    }

    /**
     * @type {Number}
     */
    get bufferedAmount() {
      if (!this._socket) return 0;

      //
      // `socket.bufferSize` is `undefined` if the socket is closed.
      //
      return (this._socket.bufferSize || 0) + this._sender._bufferedBytes;
    }

    /**
     * @type {String}
     */
    get extensions() {
      return Object.keys(this._extensions).join();
    }

    /**
     * Set up the socket and the internal resources.
     *
     * @param {net.Socket} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Number} maxPayload The maximum allowed message size
     * @private
     */
    setSocket(socket, head, maxPayload) {
      const receiver$1 = new receiver(
        this._binaryType,
        this._extensions,
        maxPayload
      );

      this._sender = new sender(socket, this._extensions);
      this._receiver = receiver$1;
      this._socket = socket;

      receiver$1[kWebSocket] = this;
      socket[kWebSocket] = this;

      receiver$1.on('conclude', receiverOnConclude);
      receiver$1.on('drain', receiverOnDrain);
      receiver$1.on('error', receiverOnError);
      receiver$1.on('message', receiverOnMessage);
      receiver$1.on('ping', receiverOnPing);
      receiver$1.on('pong', receiverOnPong);

      socket.setTimeout(0);
      socket.setNoDelay();

      if (head.length > 0) socket.unshift(head);

      socket.on('close', socketOnClose);
      socket.on('data', socketOnData);
      socket.on('end', socketOnEnd);
      socket.on('error', socketOnError);

      this.readyState = WebSocket$1.OPEN;
      this.emit('open');
    }

    /**
     * Emit the `'close'` event.
     *
     * @private
     */
    emitClose() {
      this.readyState = WebSocket$1.CLOSED;

      if (!this._socket) {
        this.emit('close', this._closeCode, this._closeMessage);
        return;
      }

      if (this._extensions[permessageDeflate.extensionName]) {
        this._extensions[permessageDeflate.extensionName].cleanup();
      }

      this._receiver.removeAllListeners();
      this.emit('close', this._closeCode, this._closeMessage);
    }

    /**
     * Start a closing handshake.
     *
     *          +----------+   +-----------+   +----------+
     *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
     *    |     +----------+   +-----------+   +----------+     |
     *          +----------+   +-----------+         |
     * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
     *          +----------+   +-----------+   |
     *    |           |                        |   +---+        |
     *                +------------------------+-->|fin| - - - -
     *    |         +---+                      |   +---+
     *     - - - - -|fin|<---------------------+
     *              +---+
     *
     * @param {Number} code Status code explaining why the connection is closing
     * @param {String} data A string explaining why the connection is closing
     * @public
     */
    close(code, data) {
      if (this.readyState === WebSocket$1.CLOSED) return;
      if (this.readyState === WebSocket$1.CONNECTING) {
        const msg = 'WebSocket was closed before the connection was established';
        return abortHandshake(this, this._req, msg);
      }

      if (this.readyState === WebSocket$1.CLOSING) {
        if (this._closeFrameSent && this._closeFrameReceived) this._socket.end();
        return;
      }

      this.readyState = WebSocket$1.CLOSING;
      this._sender.close(code, data, !this._isServer, (err) => {
        //
        // This error is handled by the `'error'` listener on the socket. We only
        // want to know if the close frame has been sent here.
        //
        if (err) return;

        this._closeFrameSent = true;

        if (this._socket.writable) {
          if (this._closeFrameReceived) this._socket.end();

          //
          // Ensure that the connection is closed even if the closing handshake
          // fails.
          //
          this._closeTimer = setTimeout(
            this._socket.destroy.bind(this._socket),
            closeTimeout
          );
        }
      });
    }

    /**
     * Send a ping.
     *
     * @param {*} data The data to send
     * @param {Boolean} mask Indicates whether or not to mask `data`
     * @param {Function} cb Callback which is executed when the ping is sent
     * @public
     */
    ping(data, mask, cb) {
      if (typeof data === 'function') {
        cb = data;
        data = mask = undefined;
      } else if (typeof mask === 'function') {
        cb = mask;
        mask = undefined;
      }

      if (this.readyState !== WebSocket$1.OPEN) {
        const err = new Error(
          `WebSocket is not open: readyState ${this.readyState} ` +
            `(${readyStates[this.readyState]})`
        );

        if (cb) return cb(err);
        throw err;
      }

      if (typeof data === 'number') data = data.toString();
      if (mask === undefined) mask = !this._isServer;
      this._sender.ping(data || constants.EMPTY_BUFFER, mask, cb);
    }

    /**
     * Send a pong.
     *
     * @param {*} data The data to send
     * @param {Boolean} mask Indicates whether or not to mask `data`
     * @param {Function} cb Callback which is executed when the pong is sent
     * @public
     */
    pong(data, mask, cb) {
      if (typeof data === 'function') {
        cb = data;
        data = mask = undefined;
      } else if (typeof mask === 'function') {
        cb = mask;
        mask = undefined;
      }

      if (this.readyState !== WebSocket$1.OPEN) {
        const err = new Error(
          `WebSocket is not open: readyState ${this.readyState} ` +
            `(${readyStates[this.readyState]})`
        );

        if (cb) return cb(err);
        throw err;
      }

      if (typeof data === 'number') data = data.toString();
      if (mask === undefined) mask = !this._isServer;
      this._sender.pong(data || constants.EMPTY_BUFFER, mask, cb);
    }

    /**
     * Send a data message.
     *
     * @param {*} data The message to send
     * @param {Object} options Options object
     * @param {Boolean} options.compress Specifies whether or not to compress `data`
     * @param {Boolean} options.binary Specifies whether `data` is binary or text
     * @param {Boolean} options.fin Specifies whether the fragment is the last one
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback which is executed when data is written out
     * @public
     */
    send(data, options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      if (this.readyState !== WebSocket$1.OPEN) {
        const err = new Error(
          `WebSocket is not open: readyState ${this.readyState} ` +
            `(${readyStates[this.readyState]})`
        );

        if (cb) return cb(err);
        throw err;
      }

      if (typeof data === 'number') data = data.toString();

      const opts = Object.assign(
        {
          binary: typeof data !== 'string',
          mask: !this._isServer,
          compress: true,
          fin: true
        },
        options
      );

      if (!this._extensions[permessageDeflate.extensionName]) {
        opts.compress = false;
      }

      this._sender.send(data || constants.EMPTY_BUFFER, opts, cb);
    }

    /**
     * Forcibly close the connection.
     *
     * @public
     */
    terminate() {
      if (this.readyState === WebSocket$1.CLOSED) return;
      if (this.readyState === WebSocket$1.CONNECTING) {
        const msg = 'WebSocket was closed before the connection was established';
        return abortHandshake(this, this._req, msg);
      }

      if (this._socket) {
        this.readyState = WebSocket$1.CLOSING;
        this._socket.destroy();
      }
    }
  }

  readyStates.forEach((readyState, i) => {
    WebSocket$1[readyState] = i;
  });

  //
  // Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
  // See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
  //
  ['open', 'error', 'close', 'message'].forEach((method) => {
    Object.defineProperty(WebSocket$1.prototype, `on${method}`, {
      /**
       * Return the listener of the event.
       *
       * @return {(Function|undefined)} The event listener or `undefined`
       * @public
       */
      get() {
        const listeners = this.listeners(method);
        for (var i = 0; i < listeners.length; i++) {
          if (listeners[i]._listener) return listeners[i]._listener;
        }

        return undefined;
      },
      /**
       * Add a listener for the event.
       *
       * @param {Function} listener The listener to add
       * @public
       */
      set(listener) {
        const listeners = this.listeners(method);
        for (var i = 0; i < listeners.length; i++) {
          //
          // Remove only the listeners added via `addEventListener`.
          //
          if (listeners[i]._listener) this.removeListener(method, listeners[i]);
        }
        this.addEventListener(method, listener);
      }
    });
  });

  WebSocket$1.prototype.addEventListener = eventTarget.addEventListener;
  WebSocket$1.prototype.removeEventListener = eventTarget.removeEventListener;

  var websocket = WebSocket$1;

  /**
   * Initialize a WebSocket client.
   *
   * @param {(String|url.Url|url.URL)} address The URL to which to connect
   * @param {String} protocols The subprotocols
   * @param {Object} options Connection options
   * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable permessage-deflate
   * @param {Number} options.handshakeTimeout Timeout in milliseconds for the handshake request
   * @param {Number} options.protocolVersion Value of the `Sec-WebSocket-Version` header
   * @param {String} options.origin Value of the `Origin` or `Sec-WebSocket-Origin` header
   * @param {Number} options.maxPayload The maximum allowed message size
   * @private
   */
  function initAsClient(address, protocols, options) {
    options = Object.assign(
      {
        protocolVersion: protocolVersions[1],
        perMessageDeflate: true,
        maxPayload: 100 * 1024 * 1024
      },
      options,
      {
        createConnection: undefined,
        socketPath: undefined,
        hostname: undefined,
        protocol: undefined,
        timeout: undefined,
        method: undefined,
        auth: undefined,
        host: undefined,
        path: undefined,
        port: undefined
      }
    );

    if (!protocolVersions.includes(options.protocolVersion)) {
      throw new RangeError(
        `Unsupported protocol version: ${options.protocolVersion} ` +
          `(supported versions: ${protocolVersions.join(', ')})`
      );
    }

    this._isServer = false;

    var parsedUrl;

    if (typeof address === 'object' && address.href !== undefined) {
      parsedUrl = address;
      this.url = address.href;
    } else {
      //
      // The WHATWG URL constructor is not available on Node.js < 6.13.0
      //
      parsedUrl = url$1.URL ? new url$1.URL(address) : url$1.parse(address);
      this.url = address;
    }

    const isUnixSocket = parsedUrl.protocol === 'ws+unix:';

    if (!parsedUrl.host && (!isUnixSocket || !parsedUrl.pathname)) {
      throw new Error(`Invalid URL: ${this.url}`);
    }

    const isSecure =
      parsedUrl.protocol === 'wss:' || parsedUrl.protocol === 'https:';
    const defaultPort = isSecure ? 443 : 80;
    const key = crypto.randomBytes(16).toString('base64');
    const httpObj = isSecure ? https : http;
    const path = parsedUrl.search
      ? `${parsedUrl.pathname || '/'}${parsedUrl.search}`
      : parsedUrl.pathname || '/';
    var perMessageDeflate;

    options.createConnection = isSecure ? tlsConnect : netConnect;
    options.defaultPort = options.defaultPort || defaultPort;
    options.port = parsedUrl.port || defaultPort;
    options.host = parsedUrl.hostname.startsWith('[')
      ? parsedUrl.hostname.slice(1, -1)
      : parsedUrl.hostname;
    options.headers = Object.assign(
      {
        'Sec-WebSocket-Version': options.protocolVersion,
        'Sec-WebSocket-Key': key,
        Connection: 'Upgrade',
        Upgrade: 'websocket'
      },
      options.headers
    );
    options.path = path;
    options.timeout = options.handshakeTimeout;

    if (options.perMessageDeflate) {
      perMessageDeflate = new permessageDeflate(
        options.perMessageDeflate !== true ? options.perMessageDeflate : {},
        false,
        options.maxPayload
      );
      options.headers['Sec-WebSocket-Extensions'] = extension.format({
        [permessageDeflate.extensionName]: perMessageDeflate.offer()
      });
    }
    if (protocols) {
      options.headers['Sec-WebSocket-Protocol'] = protocols;
    }
    if (options.origin) {
      if (options.protocolVersion < 13) {
        options.headers['Sec-WebSocket-Origin'] = options.origin;
      } else {
        options.headers.Origin = options.origin;
      }
    }
    if (parsedUrl.auth) {
      options.auth = parsedUrl.auth;
    } else if (parsedUrl.username || parsedUrl.password) {
      options.auth = `${parsedUrl.username}:${parsedUrl.password}`;
    }

    if (isUnixSocket) {
      const parts = path.split(':');

      options.socketPath = parts[0];
      options.path = parts[1];
    }

    var req = (this._req = httpObj.get(options));

    if (options.handshakeTimeout) {
      req.on('timeout', () => {
        abortHandshake(this, req, 'Opening handshake has timed out');
      });
    }

    req.on('error', (err) => {
      if (this._req.aborted) return;

      req = this._req = null;
      this.readyState = WebSocket$1.CLOSING;
      this.emit('error', err);
      this.emitClose();
    });

    req.on('response', (res) => {
      if (this.emit('unexpected-response', req, res)) return;

      abortHandshake(this, req, `Unexpected server response: ${res.statusCode}`);
    });

    req.on('upgrade', (res, socket, head) => {
      this.emit('upgrade', res);

      //
      // The user may have closed the connection from a listener of the `upgrade`
      // event.
      //
      if (this.readyState !== WebSocket$1.CONNECTING) return;

      req = this._req = null;

      const digest = crypto
        .createHash('sha1')
        .update(key + constants.GUID, 'binary')
        .digest('base64');

      if (res.headers['sec-websocket-accept'] !== digest) {
        abortHandshake(this, socket, 'Invalid Sec-WebSocket-Accept header');
        return;
      }

      const serverProt = res.headers['sec-websocket-protocol'];
      const protList = (protocols || '').split(/, */);
      var protError;

      if (!protocols && serverProt) {
        protError = 'Server sent a subprotocol but none was requested';
      } else if (protocols && !serverProt) {
        protError = 'Server sent no subprotocol';
      } else if (serverProt && !protList.includes(serverProt)) {
        protError = 'Server sent an invalid subprotocol';
      }

      if (protError) {
        abortHandshake(this, socket, protError);
        return;
      }

      if (serverProt) this.protocol = serverProt;

      if (perMessageDeflate) {
        try {
          const extensions = extension.parse(
            res.headers['sec-websocket-extensions']
          );

          if (extensions[permessageDeflate.extensionName]) {
            perMessageDeflate.accept(extensions[permessageDeflate.extensionName]);
            this._extensions[permessageDeflate.extensionName] = perMessageDeflate;
          }
        } catch (err) {
          abortHandshake(this, socket, 'Invalid Sec-WebSocket-Extensions header');
          return;
        }
      }

      this.setSocket(socket, head, options.maxPayload);
    });
  }

  /**
   * Create a `net.Socket` and initiate a connection.
   *
   * @param {Object} options Connection options
   * @return {net.Socket} The newly created socket used to start the connection
   * @private
   */
  function netConnect(options) {
    //
    // Override `options.path` only if `options` is a copy of the original options
    // object. This is always true on Node.js >= 8 but not on Node.js 6 where
    // `options.socketPath` might be `undefined` even if the `socketPath` option
    // was originally set.
    //
    if (options.protocolVersion) options.path = options.socketPath;
    return net.connect(options);
  }

  /**
   * Create a `tls.TLSSocket` and initiate a connection.
   *
   * @param {Object} options Connection options
   * @return {tls.TLSSocket} The newly created socket used to start the connection
   * @private
   */
  function tlsConnect(options) {
    options.path = undefined;
    options.servername = options.servername || options.host;
    return tls.connect(options);
  }

  /**
   * Abort the handshake and emit an error.
   *
   * @param {WebSocket} websocket The WebSocket instance
   * @param {(http.ClientRequest|net.Socket)} stream The request to abort or the
   *     socket to destroy
   * @param {String} message The error message
   * @private
   */
  function abortHandshake(websocket, stream, message) {
    websocket.readyState = WebSocket$1.CLOSING;

    const err = new Error(message);
    Error.captureStackTrace(err, abortHandshake);

    if (stream.setHeader) {
      stream.abort();
      stream.once('abort', websocket.emitClose.bind(websocket));
      websocket.emit('error', err);
    } else {
      stream.destroy(err);
      stream.once('error', websocket.emit.bind(websocket, 'error'));
      stream.once('close', websocket.emitClose.bind(websocket));
    }
  }

  /**
   * The listener of the `Receiver` `'conclude'` event.
   *
   * @param {Number} code The status code
   * @param {String} reason The reason for closing
   * @private
   */
  function receiverOnConclude(code, reason) {
    const websocket = this[kWebSocket];

    websocket._socket.removeListener('data', socketOnData);
    websocket._socket.resume();

    websocket._closeFrameReceived = true;
    websocket._closeMessage = reason;
    websocket._closeCode = code;

    if (code === 1005) websocket.close();
    else websocket.close(code, reason);
  }

  /**
   * The listener of the `Receiver` `'drain'` event.
   *
   * @private
   */
  function receiverOnDrain() {
    this[kWebSocket]._socket.resume();
  }

  /**
   * The listener of the `Receiver` `'error'` event.
   *
   * @param {(RangeError|Error)} err The emitted error
   * @private
   */
  function receiverOnError(err) {
    const websocket = this[kWebSocket];

    websocket._socket.removeListener('data', socketOnData);

    websocket.readyState = WebSocket$1.CLOSING;
    websocket._closeCode = err[constants.kStatusCode];
    websocket.emit('error', err);
    websocket._socket.destroy();
  }

  /**
   * The listener of the `Receiver` `'finish'` event.
   *
   * @private
   */
  function receiverOnFinish() {
    this[kWebSocket].emitClose();
  }

  /**
   * The listener of the `Receiver` `'message'` event.
   *
   * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The message
   * @private
   */
  function receiverOnMessage(data) {
    this[kWebSocket].emit('message', data);
  }

  /**
   * The listener of the `Receiver` `'ping'` event.
   *
   * @param {Buffer} data The data included in the ping frame
   * @private
   */
  function receiverOnPing(data) {
    const websocket = this[kWebSocket];

    websocket.pong(data, !websocket._isServer, constants.NOOP);
    websocket.emit('ping', data);
  }

  /**
   * The listener of the `Receiver` `'pong'` event.
   *
   * @param {Buffer} data The data included in the pong frame
   * @private
   */
  function receiverOnPong(data) {
    this[kWebSocket].emit('pong', data);
  }

  /**
   * The listener of the `net.Socket` `'close'` event.
   *
   * @private
   */
  function socketOnClose() {
    const websocket = this[kWebSocket];

    this.removeListener('close', socketOnClose);
    this.removeListener('end', socketOnEnd);

    websocket.readyState = WebSocket$1.CLOSING;

    //
    // The close frame might not have been received or the `'end'` event emitted,
    // for example, if the socket was destroyed due to an error. Ensure that the
    // `receiver` stream is closed after writing any remaining buffered data to
    // it. If the readable side of the socket is in flowing mode then there is no
    // buffered data as everything has been already written and `readable.read()`
    // will return `null`. If instead, the socket is paused, any possible buffered
    // data will be read as a single chunk and emitted synchronously in a single
    // `'data'` event.
    //
    websocket._socket.read();
    websocket._receiver.end();

    this.removeListener('data', socketOnData);
    this[kWebSocket] = undefined;

    clearTimeout(websocket._closeTimer);

    if (
      websocket._receiver._writableState.finished ||
      websocket._receiver._writableState.errorEmitted
    ) {
      websocket.emitClose();
    } else {
      websocket._receiver.on('error', receiverOnFinish);
      websocket._receiver.on('finish', receiverOnFinish);
    }
  }

  /**
   * The listener of the `net.Socket` `'data'` event.
   *
   * @param {Buffer} chunk A chunk of data
   * @private
   */
  function socketOnData(chunk) {
    if (!this[kWebSocket]._receiver.write(chunk)) {
      this.pause();
    }
  }

  /**
   * The listener of the `net.Socket` `'end'` event.
   *
   * @private
   */
  function socketOnEnd() {
    const websocket = this[kWebSocket];

    websocket.readyState = WebSocket$1.CLOSING;
    websocket._receiver.end();
    this.end();
  }

  /**
   * The listener of the `net.Socket` `'error'` event.
   *
   * @private
   */
  function socketOnError() {
    const websocket = this[kWebSocket];

    this.removeListener('error', socketOnError);
    this.on('error', constants.NOOP);

    if (websocket) {
      websocket.readyState = WebSocket$1.CLOSING;
      this.destroy();
    }
  }

  /**
   * Class representing a WebSocket server.
   *
   * @extends EventEmitter
   */
  class WebSocketServer extends events__default {
    /**
     * Create a `WebSocketServer` instance.
     *
     * @param {Object} options Configuration options
     * @param {String} options.host The hostname where to bind the server
     * @param {Number} options.port The port where to bind the server
     * @param {http.Server} options.server A pre-created HTTP/S server to use
     * @param {Function} options.verifyClient An hook to reject connections
     * @param {Function} options.handleProtocols An hook to handle protocols
     * @param {String} options.path Accept only connections matching this path
     * @param {Boolean} options.noServer Enable no server mode
     * @param {Boolean} options.clientTracking Specifies whether or not to track clients
     * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable permessage-deflate
     * @param {Number} options.maxPayload The maximum allowed message size
     * @param {Function} callback A listener for the `listening` event
     */
    constructor(options, callback) {
      super();

      options = Object.assign(
        {
          maxPayload: 100 * 1024 * 1024,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          verifyClient: null,
          noServer: false,
          backlog: null, // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null
        },
        options
      );

      if (options.port == null && !options.server && !options.noServer) {
        throw new TypeError(
          'One of the "port", "server", or "noServer" options must be specified'
        );
      }

      if (options.port != null) {
        this._server = http.createServer((req, res) => {
          const body = http.STATUS_CODES[426];

          res.writeHead(426, {
            'Content-Length': body.length,
            'Content-Type': 'text/plain'
          });
          res.end(body);
        });
        this._server.listen(
          options.port,
          options.host,
          options.backlog,
          callback
        );
      } else if (options.server) {
        this._server = options.server;
      }

      if (this._server) {
        this._removeListeners = addListeners(this._server, {
          listening: this.emit.bind(this, 'listening'),
          error: this.emit.bind(this, 'error'),
          upgrade: (req, socket, head) => {
            this.handleUpgrade(req, socket, head, (ws) => {
              this.emit('connection', ws, req);
            });
          }
        });
      }

      if (options.perMessageDeflate === true) options.perMessageDeflate = {};
      if (options.clientTracking) this.clients = new Set();
      this.options = options;
    }

    /**
     * Returns the bound address, the address family name, and port of the server
     * as reported by the operating system if listening on an IP socket.
     * If the server is listening on a pipe or UNIX domain socket, the name is
     * returned as a string.
     *
     * @return {(Object|String|null)} The address of the server
     * @public
     */
    address() {
      if (this.options.noServer) {
        throw new Error('The server is operating in "noServer" mode');
      }

      if (!this._server) return null;
      return this._server.address();
    }

    /**
     * Close the server.
     *
     * @param {Function} cb Callback
     * @public
     */
    close(cb) {
      if (cb) this.once('close', cb);

      //
      // Terminate all associated clients.
      //
      if (this.clients) {
        for (const client of this.clients) client.terminate();
      }

      const server = this._server;

      if (server) {
        this._removeListeners();
        this._removeListeners = this._server = null;

        //
        // Close the http server if it was internally created.
        //
        if (this.options.port != null) {
          server.close(() => this.emit('close'));
          return;
        }
      }

      process.nextTick(emitClose, this);
    }

    /**
     * See if a given request should be handled by this server instance.
     *
     * @param {http.IncomingMessage} req Request object to inspect
     * @return {Boolean} `true` if the request is valid, else `false`
     * @public
     */
    shouldHandle(req) {
      if (this.options.path) {
        const index = req.url.indexOf('?');
        const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

        if (pathname !== this.options.path) return false;
      }

      return true;
    }

    /**
     * Handle a HTTP Upgrade request.
     *
     * @param {http.IncomingMessage} req The request object
     * @param {net.Socket} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Function} cb Callback
     * @public
     */
    handleUpgrade(req, socket, head, cb) {
      socket.on('error', socketOnError$1);

      const version = +req.headers['sec-websocket-version'];
      const extensions = {};

      if (
        req.method !== 'GET' ||
        req.headers.upgrade.toLowerCase() !== 'websocket' ||
        !req.headers['sec-websocket-key'] ||
        (version !== 8 && version !== 13) ||
        !this.shouldHandle(req)
      ) {
        return abortHandshake$1(socket, 400);
      }

      if (this.options.perMessageDeflate) {
        const perMessageDeflate = new permessageDeflate(
          this.options.perMessageDeflate,
          true,
          this.options.maxPayload
        );

        try {
          const offers = extension.parse(req.headers['sec-websocket-extensions']);

          if (offers[permessageDeflate.extensionName]) {
            perMessageDeflate.accept(offers[permessageDeflate.extensionName]);
            extensions[permessageDeflate.extensionName] = perMessageDeflate;
          }
        } catch (err) {
          return abortHandshake$1(socket, 400);
        }
      }

      //
      // Optionally call external client verification handler.
      //
      if (this.options.verifyClient) {
        const info = {
          origin:
            req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
          secure: !!(req.connection.authorized || req.connection.encrypted),
          req
        };

        if (this.options.verifyClient.length === 2) {
          this.options.verifyClient(info, (verified, code, message, headers) => {
            if (!verified) {
              return abortHandshake$1(socket, code || 401, message, headers);
            }

            this.completeUpgrade(extensions, req, socket, head, cb);
          });
          return;
        }

        if (!this.options.verifyClient(info)) return abortHandshake$1(socket, 401);
      }

      this.completeUpgrade(extensions, req, socket, head, cb);
    }

    /**
     * Upgrade the connection to WebSocket.
     *
     * @param {Object} extensions The accepted extensions
     * @param {http.IncomingMessage} req The request object
     * @param {net.Socket} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Function} cb Callback
     * @private
     */
    completeUpgrade(extensions, req, socket, head, cb) {
      //
      // Destroy the socket if the client has already sent a FIN packet.
      //
      if (!socket.readable || !socket.writable) return socket.destroy();

      const key = crypto
        .createHash('sha1')
        .update(req.headers['sec-websocket-key'] + constants.GUID, 'binary')
        .digest('base64');

      const headers = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Accept: ${key}`
      ];

      const ws = new websocket(null);
      var protocol = req.headers['sec-websocket-protocol'];

      if (protocol) {
        protocol = protocol.trim().split(/ *, */);

        //
        // Optionally call external protocol selection handler.
        //
        if (this.options.handleProtocols) {
          protocol = this.options.handleProtocols(protocol, req);
        } else {
          protocol = protocol[0];
        }

        if (protocol) {
          headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
          ws.protocol = protocol;
        }
      }

      if (extensions[permessageDeflate.extensionName]) {
        const params = extensions[permessageDeflate.extensionName].params;
        const value = extension.format({
          [permessageDeflate.extensionName]: [params]
        });
        headers.push(`Sec-WebSocket-Extensions: ${value}`);
        ws._extensions = extensions;
      }

      //
      // Allow external modification/inspection of handshake headers.
      //
      this.emit('headers', headers, req);

      socket.write(headers.concat('\r\n').join('\r\n'));
      socket.removeListener('error', socketOnError$1);

      ws.setSocket(socket, head, this.options.maxPayload);

      if (this.clients) {
        this.clients.add(ws);
        ws.on('close', () => this.clients.delete(ws));
      }

      cb(ws);
    }
  }

  var websocketServer = WebSocketServer;

  /**
   * Add event listeners on an `EventEmitter` using a map of <event, listener>
   * pairs.
   *
   * @param {EventEmitter} server The event emitter
   * @param {Object.<String, Function>} map The listeners to add
   * @return {Function} A function that will remove the added listeners when called
   * @private
   */
  function addListeners(server, map) {
    for (const event of Object.keys(map)) server.on(event, map[event]);

    return function removeListeners() {
      for (const event of Object.keys(map)) {
        server.removeListener(event, map[event]);
      }
    };
  }

  /**
   * Emit a `'close'` event on an `EventEmitter`.
   *
   * @param {EventEmitter} server The event emitter
   * @private
   */
  function emitClose(server) {
    server.emit('close');
  }

  /**
   * Handle premature socket errors.
   *
   * @private
   */
  function socketOnError$1() {
    this.destroy();
  }

  /**
   * Close the connection when preconditions are not fulfilled.
   *
   * @param {net.Socket} socket The socket of the upgrade request
   * @param {Number} code The HTTP response status code
   * @param {String} [message] The HTTP response body
   * @param {Object} [headers] Additional HTTP response headers
   * @private
   */
  function abortHandshake$1(socket, code, message, headers) {
    if (socket.writable) {
      message = message || http.STATUS_CODES[code];
      headers = Object.assign(
        {
          Connection: 'close',
          'Content-type': 'text/html',
          'Content-Length': Buffer.byteLength(message)
        },
        headers
      );

      socket.write(
        `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
          Object.keys(headers)
            .map((h) => `${h}: ${headers[h]}`)
            .join('\r\n') +
          '\r\n\r\n' +
          message
      );
    }

    socket.removeListener('error', socketOnError$1);
    socket.destroy();
  }

  websocket.Server = websocketServer;
  websocket.Receiver = receiver;
  websocket.Sender = sender;

  var ws = websocket;

  /**
   * Module dependencies.
   */






  var debug$7 = src$3('engine.io-client:websocket');

  var BrowserWebSocket, NodeWebSocket;

  if (typeof WebSocket !== 'undefined') {
    BrowserWebSocket = WebSocket;
  } else if (typeof self !== 'undefined') {
    BrowserWebSocket = self.WebSocket || self.MozWebSocket;
  } else {
    try {
      NodeWebSocket = ws;
    } catch (e) { }
  }

  /**
   * Get either the `WebSocket` or `MozWebSocket` globals
   * in the browser or try to resolve WebSocket-compatible
   * interface exposed by `ws` for Node-like environment.
   */

  var WebSocketImpl = BrowserWebSocket || NodeWebSocket;

  /**
   * Module exports.
   */

  var websocket$1 = WS;

  /**
   * WebSocket transport constructor.
   *
   * @api {Object} connection options
   * @api public
   */

  function WS (opts) {
    var forceBase64 = (opts && opts.forceBase64);
    if (forceBase64) {
      this.supportsBinary = false;
    }
    this.perMessageDeflate = opts.perMessageDeflate;
    this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
    this.protocols = opts.protocols;
    if (!this.usingBrowserWebSocket) {
      WebSocketImpl = NodeWebSocket;
    }
    transport.call(this, opts);
  }

  /**
   * Inherits from Transport.
   */

  componentInherit(WS, transport);

  /**
   * Transport name.
   *
   * @api public
   */

  WS.prototype.name = 'websocket';

  /*
   * WebSockets support binary
   */

  WS.prototype.supportsBinary = true;

  /**
   * Opens socket.
   *
   * @api private
   */

  WS.prototype.doOpen = function () {
    if (!this.check()) {
      // let probe timeout
      return;
    }

    var uri = this.uri();
    var protocols = this.protocols;
    var opts = {
      agent: this.agent,
      perMessageDeflate: this.perMessageDeflate
    };

    // SSL options for Node.js client
    opts.pfx = this.pfx;
    opts.key = this.key;
    opts.passphrase = this.passphrase;
    opts.cert = this.cert;
    opts.ca = this.ca;
    opts.ciphers = this.ciphers;
    opts.rejectUnauthorized = this.rejectUnauthorized;
    if (this.extraHeaders) {
      opts.headers = this.extraHeaders;
    }
    if (this.localAddress) {
      opts.localAddress = this.localAddress;
    }

    try {
      this.ws =
        this.usingBrowserWebSocket && !this.isReactNative
          ? protocols
            ? new WebSocketImpl(uri, protocols)
            : new WebSocketImpl(uri)
          : new WebSocketImpl(uri, protocols, opts);
    } catch (err) {
      return this.emit('error', err);
    }

    if (this.ws.binaryType === undefined) {
      this.supportsBinary = false;
    }

    if (this.ws.supports && this.ws.supports.binary) {
      this.supportsBinary = true;
      this.ws.binaryType = 'nodebuffer';
    } else {
      this.ws.binaryType = 'arraybuffer';
    }

    this.addEventListeners();
  };

  /**
   * Adds event listeners to the socket
   *
   * @api private
   */

  WS.prototype.addEventListeners = function () {
    var self = this;

    this.ws.onopen = function () {
      self.onOpen();
    };
    this.ws.onclose = function () {
      self.onClose();
    };
    this.ws.onmessage = function (ev) {
      self.onData(ev.data);
    };
    this.ws.onerror = function (e) {
      self.onError('websocket error', e);
    };
  };

  /**
   * Writes data to socket.
   *
   * @param {Array} array of packets.
   * @api private
   */

  WS.prototype.write = function (packets) {
    var self = this;
    this.writable = false;

    // encodePacket efficient as it uses WS framing
    // no need for encodePayload
    var total = packets.length;
    for (var i = 0, l = total; i < l; i++) {
      (function (packet) {
        lib$2.encodePacket(packet, self.supportsBinary, function (data) {
          if (!self.usingBrowserWebSocket) {
            // always create a new object (GH-437)
            var opts = {};
            if (packet.options) {
              opts.compress = packet.options.compress;
            }

            if (self.perMessageDeflate) {
              var len = 'string' === typeof data ? Buffer.byteLength(data) : data.length;
              if (len < self.perMessageDeflate.threshold) {
                opts.compress = false;
              }
            }
          }

          // Sometimes the websocket has already been closed but the browser didn't
          // have a chance of informing us about it yet, in that case send will
          // throw an error
          try {
            if (self.usingBrowserWebSocket) {
              // TypeError is thrown when passing the second argument on Safari
              self.ws.send(data);
            } else {
              self.ws.send(data, opts);
            }
          } catch (e) {
            debug$7('websocket closed before onclose event');
          }

          --total || done();
        });
      })(packets[i]);
    }

    function done () {
      self.emit('flush');

      // fake drain
      // defer to next tick to allow Socket to clear writeBuffer
      setTimeout(function () {
        self.writable = true;
        self.emit('drain');
      }, 0);
    }
  };

  /**
   * Called upon close
   *
   * @api private
   */

  WS.prototype.onClose = function () {
    transport.prototype.onClose.call(this);
  };

  /**
   * Closes socket.
   *
   * @api private
   */

  WS.prototype.doClose = function () {
    if (typeof this.ws !== 'undefined') {
      this.ws.close();
    }
  };

  /**
   * Generates uri for connection.
   *
   * @api private
   */

  WS.prototype.uri = function () {
    var query = this.query || {};
    var schema = this.secure ? 'wss' : 'ws';
    var port = '';

    // avoid port if default for schema
    if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
      ('ws' === schema && Number(this.port) !== 80))) {
      port = ':' + this.port;
    }

    // append timestamp to URI
    if (this.timestampRequests) {
      query[this.timestampParam] = yeast_1();
    }

    // communicate binary support capabilities
    if (!this.supportsBinary) {
      query.b64 = 1;
    }

    query = parseqs.encode(query);

    // prepend ? to query
    if (query.length) {
      query = '?' + query;
    }

    var ipv6 = this.hostname.indexOf(':') !== -1;
    return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
  };

  /**
   * Feature detection for WebSocket.
   *
   * @return {Boolean} whether this transport is available.
   * @api public
   */

  WS.prototype.check = function () {
    return !!WebSocketImpl && !('__initialize' in WebSocketImpl && this.name === WS.prototype.name);
  };

  /**
   * Module dependencies
   */






  /**
   * Export transports.
   */

  var polling_1 = polling$1;
  var websocket_1 = websocket$1;

  /**
   * Polling transport polymorphic constructor.
   * Decides on xhr vs jsonp based on feature detection.
   *
   * @api private
   */

  function polling$1 (opts) {
    var xhr;
    var xd = false;
    var xs = false;
    var jsonp = false !== opts.jsonp;

    if (typeof location !== 'undefined') {
      var isSSL = 'https:' === location.protocol;
      var port = location.port;

      // some user agents have empty `location.port`
      if (!port) {
        port = isSSL ? 443 : 80;
      }

      xd = opts.hostname !== location.hostname || port !== opts.port;
      xs = opts.secure !== isSSL;
    }

    opts.xdomain = xd;
    opts.xscheme = xs;
    xhr = new XMLHttpRequest_1(opts);

    if ('open' in xhr && !opts.forceJSONP) {
      return new pollingXhr(opts);
    } else {
      if (!jsonp) throw new Error('JSONP disabled');
      return new pollingJsonp(opts);
    }
  }

  var transports = {
  	polling: polling_1,
  	websocket: websocket_1
  };

  var indexOf = [].indexOf;

  var indexof = function(arr, obj){
    if (indexOf) return arr.indexOf(obj);
    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] === obj) return i;
    }
    return -1;
  };

  /**
   * Module dependencies.
   */



  var debug$8 = src$3('engine.io-client:socket');





  /**
   * Module exports.
   */

  var socket = Socket;

  /**
   * Socket constructor.
   *
   * @param {String|Object} uri or options
   * @param {Object} options
   * @api public
   */

  function Socket (uri, opts) {
    if (!(this instanceof Socket)) return new Socket(uri, opts);

    opts = opts || {};

    if (uri && 'object' === typeof uri) {
      opts = uri;
      uri = null;
    }

    if (uri) {
      uri = parseuri(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
      opts.port = uri.port;
      if (uri.query) opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parseuri(opts.host).host;
    }

    this.secure = null != opts.secure ? opts.secure
      : (typeof location !== 'undefined' && 'https:' === location.protocol);

    if (opts.hostname && !opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = this.secure ? '443' : '80';
    }

    this.agent = opts.agent || false;
    this.hostname = opts.hostname ||
      (typeof location !== 'undefined' ? location.hostname : 'localhost');
    this.port = opts.port || (typeof location !== 'undefined' && location.port
        ? location.port
        : (this.secure ? 443 : 80));
    this.query = opts.query || {};
    if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
    this.upgrade = false !== opts.upgrade;
    this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
    this.forceJSONP = !!opts.forceJSONP;
    this.jsonp = false !== opts.jsonp;
    this.forceBase64 = !!opts.forceBase64;
    this.enablesXDR = !!opts.enablesXDR;
    this.timestampParam = opts.timestampParam || 't';
    this.timestampRequests = opts.timestampRequests;
    this.transports = opts.transports || ['polling', 'websocket'];
    this.transportOptions = opts.transportOptions || {};
    this.readyState = '';
    this.writeBuffer = [];
    this.prevBufferLen = 0;
    this.policyPort = opts.policyPort || 843;
    this.rememberUpgrade = opts.rememberUpgrade || false;
    this.binaryType = null;
    this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
    this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

    if (true === this.perMessageDeflate) this.perMessageDeflate = {};
    if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
      this.perMessageDeflate.threshold = 1024;
    }

    // SSL options for Node.js client
    this.pfx = opts.pfx || null;
    this.key = opts.key || null;
    this.passphrase = opts.passphrase || null;
    this.cert = opts.cert || null;
    this.ca = opts.ca || null;
    this.ciphers = opts.ciphers || null;
    this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
    this.forceNode = !!opts.forceNode;

    // detect ReactNative environment
    this.isReactNative = (typeof navigator !== 'undefined' && typeof navigator.product === 'string' && navigator.product.toLowerCase() === 'reactnative');

    // other options for Node.js or ReactNative client
    if (typeof self === 'undefined' || this.isReactNative) {
      if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
        this.extraHeaders = opts.extraHeaders;
      }

      if (opts.localAddress) {
        this.localAddress = opts.localAddress;
      }
    }

    // set on handshake
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;

    // set on heartbeat
    this.pingIntervalTimer = null;
    this.pingTimeoutTimer = null;

    this.open();
  }

  Socket.priorWebsocketSuccess = false;

  /**
   * Mix in `Emitter`.
   */

  componentEmitter(Socket.prototype);

  /**
   * Protocol version.
   *
   * @api public
   */

  Socket.protocol = lib$2.protocol; // this is an int

  /**
   * Expose deps for legacy compatibility
   * and standalone browser access.
   */

  Socket.Socket = Socket;
  Socket.Transport = transport;
  Socket.transports = transports;
  Socket.parser = lib$2;

  /**
   * Creates transport of the given type.
   *
   * @param {String} transport name
   * @return {Transport}
   * @api private
   */

  Socket.prototype.createTransport = function (name) {
    debug$8('creating transport "%s"', name);
    var query = clone(this.query);

    // append engine.io protocol identifier
    query.EIO = lib$2.protocol;

    // transport name
    query.transport = name;

    // per-transport options
    var options = this.transportOptions[name] || {};

    // session id if we already have one
    if (this.id) query.sid = this.id;

    var transport = new transports[name]({
      query: query,
      socket: this,
      agent: options.agent || this.agent,
      hostname: options.hostname || this.hostname,
      port: options.port || this.port,
      secure: options.secure || this.secure,
      path: options.path || this.path,
      forceJSONP: options.forceJSONP || this.forceJSONP,
      jsonp: options.jsonp || this.jsonp,
      forceBase64: options.forceBase64 || this.forceBase64,
      enablesXDR: options.enablesXDR || this.enablesXDR,
      timestampRequests: options.timestampRequests || this.timestampRequests,
      timestampParam: options.timestampParam || this.timestampParam,
      policyPort: options.policyPort || this.policyPort,
      pfx: options.pfx || this.pfx,
      key: options.key || this.key,
      passphrase: options.passphrase || this.passphrase,
      cert: options.cert || this.cert,
      ca: options.ca || this.ca,
      ciphers: options.ciphers || this.ciphers,
      rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
      perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
      extraHeaders: options.extraHeaders || this.extraHeaders,
      forceNode: options.forceNode || this.forceNode,
      localAddress: options.localAddress || this.localAddress,
      requestTimeout: options.requestTimeout || this.requestTimeout,
      protocols: options.protocols || void (0),
      isReactNative: this.isReactNative
    });

    return transport;
  };

  function clone (obj) {
    var o = {};
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = obj[i];
      }
    }
    return o;
  }

  /**
   * Initializes transport to use and starts probe.
   *
   * @api private
   */
  Socket.prototype.open = function () {
    var transport;
    if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
      transport = 'websocket';
    } else if (0 === this.transports.length) {
      // Emit error on next tick so it can be listened to
      var self = this;
      setTimeout(function () {
        self.emit('error', 'No transports available');
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }
    this.readyState = 'opening';

    // Retry with the next transport if the transport is disabled (jsonp: false)
    try {
      transport = this.createTransport(transport);
    } catch (e) {
      this.transports.shift();
      this.open();
      return;
    }

    transport.open();
    this.setTransport(transport);
  };

  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @api private
   */

  Socket.prototype.setTransport = function (transport) {
    debug$8('setting transport %s', transport.name);
    var self = this;

    if (this.transport) {
      debug$8('clearing existing transport %s', this.transport.name);
      this.transport.removeAllListeners();
    }

    // set up transport
    this.transport = transport;

    // set up transport listeners
    transport
    .on('drain', function () {
      self.onDrain();
    })
    .on('packet', function (packet) {
      self.onPacket(packet);
    })
    .on('error', function (e) {
      self.onError(e);
    })
    .on('close', function () {
      self.onClose('transport close');
    });
  };

  /**
   * Probes a transport.
   *
   * @param {String} transport name
   * @api private
   */

  Socket.prototype.probe = function (name) {
    debug$8('probing transport "%s"', name);
    var transport = this.createTransport(name, { probe: 1 });
    var failed = false;
    var self = this;

    Socket.priorWebsocketSuccess = false;

    function onTransportOpen () {
      if (self.onlyBinaryUpgrades) {
        var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
        failed = failed || upgradeLosesBinary;
      }
      if (failed) return;

      debug$8('probe transport "%s" opened', name);
      transport.send([{ type: 'ping', data: 'probe' }]);
      transport.once('packet', function (msg) {
        if (failed) return;
        if ('pong' === msg.type && 'probe' === msg.data) {
          debug$8('probe transport "%s" pong', name);
          self.upgrading = true;
          self.emit('upgrading', transport);
          if (!transport) return;
          Socket.priorWebsocketSuccess = 'websocket' === transport.name;

          debug$8('pausing current transport "%s"', self.transport.name);
          self.transport.pause(function () {
            if (failed) return;
            if ('closed' === self.readyState) return;
            debug$8('changing transport and sending upgrade packet');

            cleanup();

            self.setTransport(transport);
            transport.send([{ type: 'upgrade' }]);
            self.emit('upgrade', transport);
            transport = null;
            self.upgrading = false;
            self.flush();
          });
        } else {
          debug$8('probe transport "%s" failed', name);
          var err = new Error('probe error');
          err.transport = transport.name;
          self.emit('upgradeError', err);
        }
      });
    }

    function freezeTransport () {
      if (failed) return;

      // Any callback called by transport should be ignored since now
      failed = true;

      cleanup();

      transport.close();
      transport = null;
    }

    // Handle any error that happens while probing
    function onerror (err) {
      var error = new Error('probe error: ' + err);
      error.transport = transport.name;

      freezeTransport();

      debug$8('probe transport "%s" failed because of error: %s', name, err);

      self.emit('upgradeError', error);
    }

    function onTransportClose () {
      onerror('transport closed');
    }

    // When the socket is closed while we're probing
    function onclose () {
      onerror('socket closed');
    }

    // When the socket is upgraded while we're probing
    function onupgrade (to) {
      if (transport && to.name !== transport.name) {
        debug$8('"%s" works - aborting "%s"', to.name, transport.name);
        freezeTransport();
      }
    }

    // Remove all listeners on the transport and on self
    function cleanup () {
      transport.removeListener('open', onTransportOpen);
      transport.removeListener('error', onerror);
      transport.removeListener('close', onTransportClose);
      self.removeListener('close', onclose);
      self.removeListener('upgrading', onupgrade);
    }

    transport.once('open', onTransportOpen);
    transport.once('error', onerror);
    transport.once('close', onTransportClose);

    this.once('close', onclose);
    this.once('upgrading', onupgrade);

    transport.open();
  };

  /**
   * Called when connection is deemed open.
   *
   * @api public
   */

  Socket.prototype.onOpen = function () {
    debug$8('socket open');
    this.readyState = 'open';
    Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
    this.emit('open');
    this.flush();

    // we check for `readyState` in case an `open`
    // listener already closed the socket
    if ('open' === this.readyState && this.upgrade && this.transport.pause) {
      debug$8('starting upgrade probes');
      for (var i = 0, l = this.upgrades.length; i < l; i++) {
        this.probe(this.upgrades[i]);
      }
    }
  };

  /**
   * Handles a packet.
   *
   * @api private
   */

  Socket.prototype.onPacket = function (packet) {
    if ('opening' === this.readyState || 'open' === this.readyState ||
        'closing' === this.readyState) {
      debug$8('socket receive: type "%s", data "%s"', packet.type, packet.data);

      this.emit('packet', packet);

      // Socket is live - any packet counts
      this.emit('heartbeat');

      switch (packet.type) {
        case 'open':
          this.onHandshake(JSON.parse(packet.data));
          break;

        case 'pong':
          this.setPing();
          this.emit('pong');
          break;

        case 'error':
          var err = new Error('server error');
          err.code = packet.data;
          this.onError(err);
          break;

        case 'message':
          this.emit('data', packet.data);
          this.emit('message', packet.data);
          break;
      }
    } else {
      debug$8('packet received with socket readyState "%s"', this.readyState);
    }
  };

  /**
   * Called upon handshake completion.
   *
   * @param {Object} handshake obj
   * @api private
   */

  Socket.prototype.onHandshake = function (data) {
    this.emit('handshake', data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.onOpen();
    // In case open handler closes socket
    if ('closed' === this.readyState) return;
    this.setPing();

    // Prolong liveness of socket on heartbeat
    this.removeListener('heartbeat', this.onHeartbeat);
    this.on('heartbeat', this.onHeartbeat);
  };

  /**
   * Resets ping timeout.
   *
   * @api private
   */

  Socket.prototype.onHeartbeat = function (timeout) {
    clearTimeout(this.pingTimeoutTimer);
    var self = this;
    self.pingTimeoutTimer = setTimeout(function () {
      if ('closed' === self.readyState) return;
      self.onClose('ping timeout');
    }, timeout || (self.pingInterval + self.pingTimeout));
  };

  /**
   * Pings server every `this.pingInterval` and expects response
   * within `this.pingTimeout` or closes connection.
   *
   * @api private
   */

  Socket.prototype.setPing = function () {
    var self = this;
    clearTimeout(self.pingIntervalTimer);
    self.pingIntervalTimer = setTimeout(function () {
      debug$8('writing ping packet - expecting pong within %sms', self.pingTimeout);
      self.ping();
      self.onHeartbeat(self.pingTimeout);
    }, self.pingInterval);
  };

  /**
  * Sends a ping packet.
  *
  * @api private
  */

  Socket.prototype.ping = function () {
    var self = this;
    this.sendPacket('ping', function () {
      self.emit('ping');
    });
  };

  /**
   * Called on `drain` event
   *
   * @api private
   */

  Socket.prototype.onDrain = function () {
    this.writeBuffer.splice(0, this.prevBufferLen);

    // setting prevBufferLen = 0 is very important
    // for example, when upgrading, upgrade packet is sent over,
    // and a nonzero prevBufferLen could cause problems on `drain`
    this.prevBufferLen = 0;

    if (0 === this.writeBuffer.length) {
      this.emit('drain');
    } else {
      this.flush();
    }
  };

  /**
   * Flush write buffers.
   *
   * @api private
   */

  Socket.prototype.flush = function () {
    if ('closed' !== this.readyState && this.transport.writable &&
      !this.upgrading && this.writeBuffer.length) {
      debug$8('flushing %d packets in socket', this.writeBuffer.length);
      this.transport.send(this.writeBuffer);
      // keep track of current length of writeBuffer
      // splice writeBuffer and callbackBuffer on `drain`
      this.prevBufferLen = this.writeBuffer.length;
      this.emit('flush');
    }
  };

  /**
   * Sends a message.
   *
   * @param {String} message.
   * @param {Function} callback function.
   * @param {Object} options.
   * @return {Socket} for chaining.
   * @api public
   */

  Socket.prototype.write =
  Socket.prototype.send = function (msg, options, fn) {
    this.sendPacket('message', msg, options, fn);
    return this;
  };

  /**
   * Sends a packet.
   *
   * @param {String} packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} callback function.
   * @api private
   */

  Socket.prototype.sendPacket = function (type, data, options, fn) {
    if ('function' === typeof data) {
      fn = data;
      data = undefined;
    }

    if ('function' === typeof options) {
      fn = options;
      options = null;
    }

    if ('closing' === this.readyState || 'closed' === this.readyState) {
      return;
    }

    options = options || {};
    options.compress = false !== options.compress;

    var packet = {
      type: type,
      data: data,
      options: options
    };
    this.emit('packetCreate', packet);
    this.writeBuffer.push(packet);
    if (fn) this.once('flush', fn);
    this.flush();
  };

  /**
   * Closes the connection.
   *
   * @api private
   */

  Socket.prototype.close = function () {
    if ('opening' === this.readyState || 'open' === this.readyState) {
      this.readyState = 'closing';

      var self = this;

      if (this.writeBuffer.length) {
        this.once('drain', function () {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }

    function close () {
      self.onClose('forced close');
      debug$8('socket closing - telling transport to close');
      self.transport.close();
    }

    function cleanupAndClose () {
      self.removeListener('upgrade', cleanupAndClose);
      self.removeListener('upgradeError', cleanupAndClose);
      close();
    }

    function waitForUpgrade () {
      // wait for upgrade to finish since we can't send packets while pausing a transport
      self.once('upgrade', cleanupAndClose);
      self.once('upgradeError', cleanupAndClose);
    }

    return this;
  };

  /**
   * Called upon transport error
   *
   * @api private
   */

  Socket.prototype.onError = function (err) {
    debug$8('socket error %j', err);
    Socket.priorWebsocketSuccess = false;
    this.emit('error', err);
    this.onClose('transport error', err);
  };

  /**
   * Called upon transport close.
   *
   * @api private
   */

  Socket.prototype.onClose = function (reason, desc) {
    if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
      debug$8('socket close with reason: "%s"', reason);
      var self = this;

      // clear timers
      clearTimeout(this.pingIntervalTimer);
      clearTimeout(this.pingTimeoutTimer);

      // stop event from firing again for transport
      this.transport.removeAllListeners('close');

      // ensure transport won't stay open
      this.transport.close();

      // ignore further transport communication
      this.transport.removeAllListeners();

      // set ready state
      this.readyState = 'closed';

      // clear session id
      this.id = null;

      // emit close event
      this.emit('close', reason, desc);

      // clean buffers after, so users can still
      // grab the buffers on `close` event
      self.writeBuffer = [];
      self.prevBufferLen = 0;
    }
  };

  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} server upgrades
   * @api private
   *
   */

  Socket.prototype.filterUpgrades = function (upgrades) {
    var filteredUpgrades = [];
    for (var i = 0, j = upgrades.length; i < j; i++) {
      if (~indexof(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
    }
    return filteredUpgrades;
  };

  var lib$3 = socket;

  /**
   * Exports parser
   *
   * @api public
   *
   */
  var parser = lib$2;
  lib$3.parser = parser;

  var toArray_1 = toArray;

  function toArray(list, index) {
      var array = [];

      index = index || 0;

      for (var i = index || 0; i < list.length; i++) {
          array[i - index] = list[i];
      }

      return array
  }

  /**
   * Module exports.
   */

  var on_1 = on;

  /**
   * Helper for subscriptions.
   *
   * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
   * @param {String} event name
   * @param {Function} callback
   * @api public
   */

  function on (obj, ev, fn) {
    obj.on(ev, fn);
    return {
      destroy: function () {
        obj.removeListener(ev, fn);
      }
    };
  }

  /**
   * Slice reference.
   */

  var slice = [].slice;

  /**
   * Bind `obj` to `fn`.
   *
   * @param {Object} obj
   * @param {Function|String} fn or string
   * @return {Function}
   * @api public
   */

  var componentBind = function(obj, fn){
    if ('string' == typeof fn) fn = obj[fn];
    if ('function' != typeof fn) throw new Error('bind() requires a function');
    var args = slice.call(arguments, 2);
    return function(){
      return fn.apply(obj, args.concat(slice.call(arguments)));
    }
  };

  var socket$1 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */






  var debug = src$1('socket.io-client:socket');



  /**
   * Module exports.
   */

  module.exports = exports = Socket;

  /**
   * Internal events (blacklisted).
   * These events can't be emitted by the user.
   *
   * @api private
   */

  var events = {
    connect: 1,
    connect_error: 1,
    connect_timeout: 1,
    connecting: 1,
    disconnect: 1,
    error: 1,
    reconnect: 1,
    reconnect_attempt: 1,
    reconnect_failed: 1,
    reconnect_error: 1,
    reconnecting: 1,
    ping: 1,
    pong: 1
  };

  /**
   * Shortcut to `Emitter#emit`.
   */

  var emit = componentEmitter.prototype.emit;

  /**
   * `Socket` constructor.
   *
   * @api public
   */

  function Socket (io, nsp, opts) {
    this.io = io;
    this.nsp = nsp;
    this.json = this; // compat
    this.ids = 0;
    this.acks = {};
    this.receiveBuffer = [];
    this.sendBuffer = [];
    this.connected = false;
    this.disconnected = true;
    this.flags = {};
    if (opts && opts.query) {
      this.query = opts.query;
    }
    if (this.io.autoConnect) this.open();
  }

  /**
   * Mix in `Emitter`.
   */

  componentEmitter(Socket.prototype);

  /**
   * Subscribe to open, close and packet events
   *
   * @api private
   */

  Socket.prototype.subEvents = function () {
    if (this.subs) return;

    var io = this.io;
    this.subs = [
      on_1(io, 'open', componentBind(this, 'onopen')),
      on_1(io, 'packet', componentBind(this, 'onpacket')),
      on_1(io, 'close', componentBind(this, 'onclose'))
    ];
  };

  /**
   * "Opens" the socket.
   *
   * @api public
   */

  Socket.prototype.open =
  Socket.prototype.connect = function () {
    if (this.connected) return this;

    this.subEvents();
    this.io.open(); // ensure open
    if ('open' === this.io.readyState) this.onopen();
    this.emit('connecting');
    return this;
  };

  /**
   * Sends a `message` event.
   *
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.send = function () {
    var args = toArray_1(arguments);
    args.unshift('message');
    this.emit.apply(this, args);
    return this;
  };

  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @param {String} event name
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.emit = function (ev) {
    if (events.hasOwnProperty(ev)) {
      emit.apply(this, arguments);
      return this;
    }

    var args = toArray_1(arguments);
    var packet = {
      type: (this.flags.binary !== undefined ? this.flags.binary : hasBinary2(args)) ? socket_ioParser.BINARY_EVENT : socket_ioParser.EVENT,
      data: args
    };

    packet.options = {};
    packet.options.compress = !this.flags || false !== this.flags.compress;

    // event ack callback
    if ('function' === typeof args[args.length - 1]) {
      debug('emitting packet with ack id %d', this.ids);
      this.acks[this.ids] = args.pop();
      packet.id = this.ids++;
    }

    if (this.connected) {
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }

    this.flags = {};

    return this;
  };

  /**
   * Sends a packet.
   *
   * @param {Object} packet
   * @api private
   */

  Socket.prototype.packet = function (packet) {
    packet.nsp = this.nsp;
    this.io.packet(packet);
  };

  /**
   * Called upon engine `open`.
   *
   * @api private
   */

  Socket.prototype.onopen = function () {
    debug('transport is open - connecting');

    // write connect packet if necessary
    if ('/' !== this.nsp) {
      if (this.query) {
        var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
        debug('sending connect packet with query %s', query);
        this.packet({type: socket_ioParser.CONNECT, query: query});
      } else {
        this.packet({type: socket_ioParser.CONNECT});
      }
    }
  };

  /**
   * Called upon engine `close`.
   *
   * @param {String} reason
   * @api private
   */

  Socket.prototype.onclose = function (reason) {
    debug('close (%s)', reason);
    this.connected = false;
    this.disconnected = true;
    delete this.id;
    this.emit('disconnect', reason);
  };

  /**
   * Called with socket packet.
   *
   * @param {Object} packet
   * @api private
   */

  Socket.prototype.onpacket = function (packet) {
    var sameNamespace = packet.nsp === this.nsp;
    var rootNamespaceError = packet.type === socket_ioParser.ERROR && packet.nsp === '/';

    if (!sameNamespace && !rootNamespaceError) return;

    switch (packet.type) {
      case socket_ioParser.CONNECT:
        this.onconnect();
        break;

      case socket_ioParser.EVENT:
        this.onevent(packet);
        break;

      case socket_ioParser.BINARY_EVENT:
        this.onevent(packet);
        break;

      case socket_ioParser.ACK:
        this.onack(packet);
        break;

      case socket_ioParser.BINARY_ACK:
        this.onack(packet);
        break;

      case socket_ioParser.DISCONNECT:
        this.ondisconnect();
        break;

      case socket_ioParser.ERROR:
        this.emit('error', packet.data);
        break;
    }
  };

  /**
   * Called upon a server event.
   *
   * @param {Object} packet
   * @api private
   */

  Socket.prototype.onevent = function (packet) {
    var args = packet.data || [];
    debug('emitting event %j', args);

    if (null != packet.id) {
      debug('attaching ack callback to event');
      args.push(this.ack(packet.id));
    }

    if (this.connected) {
      emit.apply(this, args);
    } else {
      this.receiveBuffer.push(args);
    }
  };

  /**
   * Produces an ack callback to emit with an event.
   *
   * @api private
   */

  Socket.prototype.ack = function (id) {
    var self = this;
    var sent = false;
    return function () {
      // prevent double callbacks
      if (sent) return;
      sent = true;
      var args = toArray_1(arguments);
      debug('sending ack %j', args);

      self.packet({
        type: hasBinary2(args) ? socket_ioParser.BINARY_ACK : socket_ioParser.ACK,
        id: id,
        data: args
      });
    };
  };

  /**
   * Called upon a server acknowlegement.
   *
   * @param {Object} packet
   * @api private
   */

  Socket.prototype.onack = function (packet) {
    var ack = this.acks[packet.id];
    if ('function' === typeof ack) {
      debug('calling ack %s with %j', packet.id, packet.data);
      ack.apply(this, packet.data);
      delete this.acks[packet.id];
    } else {
      debug('bad ack %s', packet.id);
    }
  };

  /**
   * Called upon server connect.
   *
   * @api private
   */

  Socket.prototype.onconnect = function () {
    this.connected = true;
    this.disconnected = false;
    this.emit('connect');
    this.emitBuffered();
  };

  /**
   * Emit buffered events (received and emitted).
   *
   * @api private
   */

  Socket.prototype.emitBuffered = function () {
    var i;
    for (i = 0; i < this.receiveBuffer.length; i++) {
      emit.apply(this, this.receiveBuffer[i]);
    }
    this.receiveBuffer = [];

    for (i = 0; i < this.sendBuffer.length; i++) {
      this.packet(this.sendBuffer[i]);
    }
    this.sendBuffer = [];
  };

  /**
   * Called upon server disconnect.
   *
   * @api private
   */

  Socket.prototype.ondisconnect = function () {
    debug('server disconnect (%s)', this.nsp);
    this.destroy();
    this.onclose('io server disconnect');
  };

  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @api private.
   */

  Socket.prototype.destroy = function () {
    if (this.subs) {
      // clean subscriptions to avoid reconnections
      for (var i = 0; i < this.subs.length; i++) {
        this.subs[i].destroy();
      }
      this.subs = null;
    }

    this.io.destroy(this);
  };

  /**
   * Disconnects the socket manually.
   *
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.close =
  Socket.prototype.disconnect = function () {
    if (this.connected) {
      debug('performing disconnect (%s)', this.nsp);
      this.packet({ type: socket_ioParser.DISCONNECT });
    }

    // remove socket from pool
    this.destroy();

    if (this.connected) {
      // fire events
      this.onclose('io client disconnect');
    }
    return this;
  };

  /**
   * Sets the compress flag.
   *
   * @param {Boolean} if `true`, compresses the sending data
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.compress = function (compress) {
    this.flags.compress = compress;
    return this;
  };

  /**
   * Sets the binary flag
   *
   * @param {Boolean} whether the emitted data contains binary
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.binary = function (binary) {
    this.flags.binary = binary;
    return this;
  };
  });

  /**
   * Expose `Backoff`.
   */

  var backo2 = Backoff;

  /**
   * Initialize backoff timer with `opts`.
   *
   * - `min` initial timeout in milliseconds [100]
   * - `max` max timeout [10000]
   * - `jitter` [0]
   * - `factor` [2]
   *
   * @param {Object} opts
   * @api public
   */

  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }

  /**
   * Return the backoff duration.
   *
   * @return {Number}
   * @api public
   */

  Backoff.prototype.duration = function(){
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
      var rand =  Math.random();
      var deviation = Math.floor(rand * this.jitter * ms);
      ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
  };

  /**
   * Reset the number of attempts.
   *
   * @api public
   */

  Backoff.prototype.reset = function(){
    this.attempts = 0;
  };

  /**
   * Set the minimum duration
   *
   * @api public
   */

  Backoff.prototype.setMin = function(min){
    this.ms = min;
  };

  /**
   * Set the maximum duration
   *
   * @api public
   */

  Backoff.prototype.setMax = function(max){
    this.max = max;
  };

  /**
   * Set the jitter
   *
   * @api public
   */

  Backoff.prototype.setJitter = function(jitter){
    this.jitter = jitter;
  };

  /**
   * Module dependencies.
   */







  var debug$9 = src$1('socket.io-client:manager');



  /**
   * IE6+ hasOwnProperty
   */

  var has$3 = Object.prototype.hasOwnProperty;

  /**
   * Module exports
   */

  var manager = Manager;

  /**
   * `Manager` constructor.
   *
   * @param {String} engine instance or engine uri/opts
   * @param {Object} options
   * @api public
   */

  function Manager (uri, opts) {
    if (!(this instanceof Manager)) return new Manager(uri, opts);
    if (uri && ('object' === typeof uri)) {
      opts = uri;
      uri = undefined;
    }
    opts = opts || {};

    opts.path = opts.path || '/socket.io';
    this.nsps = {};
    this.subs = [];
    this.opts = opts;
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1000);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
    this.randomizationFactor(opts.randomizationFactor || 0.5);
    this.backoff = new backo2({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 20000 : opts.timeout);
    this.readyState = 'closed';
    this.uri = uri;
    this.connecting = [];
    this.lastPing = null;
    this.encoding = false;
    this.packetBuffer = [];
    var _parser = opts.parser || socket_ioParser;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this.autoConnect = opts.autoConnect !== false;
    if (this.autoConnect) this.open();
  }

  /**
   * Propagate given event to sockets and emit on `this`
   *
   * @api private
   */

  Manager.prototype.emitAll = function () {
    this.emit.apply(this, arguments);
    for (var nsp in this.nsps) {
      if (has$3.call(this.nsps, nsp)) {
        this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
      }
    }
  };

  /**
   * Update `socket.id` of all sockets
   *
   * @api private
   */

  Manager.prototype.updateSocketIds = function () {
    for (var nsp in this.nsps) {
      if (has$3.call(this.nsps, nsp)) {
        this.nsps[nsp].id = this.generateId(nsp);
      }
    }
  };

  /**
   * generate `socket.id` for the given `nsp`
   *
   * @param {String} nsp
   * @return {String}
   * @api private
   */

  Manager.prototype.generateId = function (nsp) {
    return (nsp === '/' ? '' : (nsp + '#')) + this.engine.id;
  };

  /**
   * Mix in `Emitter`.
   */

  componentEmitter(Manager.prototype);

  /**
   * Sets the `reconnection` config.
   *
   * @param {Boolean} true/false if it should automatically reconnect
   * @return {Manager} self or value
   * @api public
   */

  Manager.prototype.reconnection = function (v) {
    if (!arguments.length) return this._reconnection;
    this._reconnection = !!v;
    return this;
  };

  /**
   * Sets the reconnection attempts config.
   *
   * @param {Number} max reconnection attempts before giving up
   * @return {Manager} self or value
   * @api public
   */

  Manager.prototype.reconnectionAttempts = function (v) {
    if (!arguments.length) return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  };

  /**
   * Sets the delay between reconnections.
   *
   * @param {Number} delay
   * @return {Manager} self or value
   * @api public
   */

  Manager.prototype.reconnectionDelay = function (v) {
    if (!arguments.length) return this._reconnectionDelay;
    this._reconnectionDelay = v;
    this.backoff && this.backoff.setMin(v);
    return this;
  };

  Manager.prototype.randomizationFactor = function (v) {
    if (!arguments.length) return this._randomizationFactor;
    this._randomizationFactor = v;
    this.backoff && this.backoff.setJitter(v);
    return this;
  };

  /**
   * Sets the maximum delay between reconnections.
   *
   * @param {Number} delay
   * @return {Manager} self or value
   * @api public
   */

  Manager.prototype.reconnectionDelayMax = function (v) {
    if (!arguments.length) return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    this.backoff && this.backoff.setMax(v);
    return this;
  };

  /**
   * Sets the connection timeout. `false` to disable
   *
   * @return {Manager} self or value
   * @api public
   */

  Manager.prototype.timeout = function (v) {
    if (!arguments.length) return this._timeout;
    this._timeout = v;
    return this;
  };

  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @api private
   */

  Manager.prototype.maybeReconnectOnOpen = function () {
    // Only try to reconnect if it's the first time we're connecting
    if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
      // keeps reconnection from firing twice for the same reconnection loop
      this.reconnect();
    }
  };

  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} optional, callback
   * @return {Manager} self
   * @api public
   */

  Manager.prototype.open =
  Manager.prototype.connect = function (fn, opts) {
    debug$9('readyState %s', this.readyState);
    if (~this.readyState.indexOf('open')) return this;

    debug$9('opening %s', this.uri);
    this.engine = lib$3(this.uri, this.opts);
    var socket = this.engine;
    var self = this;
    this.readyState = 'opening';
    this.skipReconnect = false;

    // emit `open`
    var openSub = on_1(socket, 'open', function () {
      self.onopen();
      fn && fn();
    });

    // emit `connect_error`
    var errorSub = on_1(socket, 'error', function (data) {
      debug$9('connect_error');
      self.cleanup();
      self.readyState = 'closed';
      self.emitAll('connect_error', data);
      if (fn) {
        var err = new Error('Connection error');
        err.data = data;
        fn(err);
      } else {
        // Only do this if there is no fn to handle the error
        self.maybeReconnectOnOpen();
      }
    });

    // emit `connect_timeout`
    if (false !== this._timeout) {
      var timeout = this._timeout;
      debug$9('connect attempt will timeout after %d', timeout);

      // set timer
      var timer = setTimeout(function () {
        debug$9('connect attempt timed out after %d', timeout);
        openSub.destroy();
        socket.close();
        socket.emit('error', 'timeout');
        self.emitAll('connect_timeout', timeout);
      }, timeout);

      this.subs.push({
        destroy: function () {
          clearTimeout(timer);
        }
      });
    }

    this.subs.push(openSub);
    this.subs.push(errorSub);

    return this;
  };

  /**
   * Called upon transport open.
   *
   * @api private
   */

  Manager.prototype.onopen = function () {
    debug$9('open');

    // clear old subs
    this.cleanup();

    // mark as open
    this.readyState = 'open';
    this.emit('open');

    // add new subs
    var socket = this.engine;
    this.subs.push(on_1(socket, 'data', componentBind(this, 'ondata')));
    this.subs.push(on_1(socket, 'ping', componentBind(this, 'onping')));
    this.subs.push(on_1(socket, 'pong', componentBind(this, 'onpong')));
    this.subs.push(on_1(socket, 'error', componentBind(this, 'onerror')));
    this.subs.push(on_1(socket, 'close', componentBind(this, 'onclose')));
    this.subs.push(on_1(this.decoder, 'decoded', componentBind(this, 'ondecoded')));
  };

  /**
   * Called upon a ping.
   *
   * @api private
   */

  Manager.prototype.onping = function () {
    this.lastPing = new Date();
    this.emitAll('ping');
  };

  /**
   * Called upon a packet.
   *
   * @api private
   */

  Manager.prototype.onpong = function () {
    this.emitAll('pong', new Date() - this.lastPing);
  };

  /**
   * Called with data.
   *
   * @api private
   */

  Manager.prototype.ondata = function (data) {
    this.decoder.add(data);
  };

  /**
   * Called when parser fully decodes a packet.
   *
   * @api private
   */

  Manager.prototype.ondecoded = function (packet) {
    this.emit('packet', packet);
  };

  /**
   * Called upon socket error.
   *
   * @api private
   */

  Manager.prototype.onerror = function (err) {
    debug$9('error', err);
    this.emitAll('error', err);
  };

  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @api public
   */

  Manager.prototype.socket = function (nsp, opts) {
    var socket = this.nsps[nsp];
    if (!socket) {
      socket = new socket$1(this, nsp, opts);
      this.nsps[nsp] = socket;
      var self = this;
      socket.on('connecting', onConnecting);
      socket.on('connect', function () {
        socket.id = self.generateId(nsp);
      });

      if (this.autoConnect) {
        // manually call here since connecting event is fired before listening
        onConnecting();
      }
    }

    function onConnecting () {
      if (!~indexof(self.connecting, socket)) {
        self.connecting.push(socket);
      }
    }

    return socket;
  };

  /**
   * Called upon a socket close.
   *
   * @param {Socket} socket
   */

  Manager.prototype.destroy = function (socket) {
    var index = indexof(this.connecting, socket);
    if (~index) this.connecting.splice(index, 1);
    if (this.connecting.length) return;

    this.close();
  };

  /**
   * Writes a packet.
   *
   * @param {Object} packet
   * @api private
   */

  Manager.prototype.packet = function (packet) {
    debug$9('writing packet %j', packet);
    var self = this;
    if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

    if (!self.encoding) {
      // encode, then write to engine with result
      self.encoding = true;
      this.encoder.encode(packet, function (encodedPackets) {
        for (var i = 0; i < encodedPackets.length; i++) {
          self.engine.write(encodedPackets[i], packet.options);
        }
        self.encoding = false;
        self.processPacketQueue();
      });
    } else { // add packet to the queue
      self.packetBuffer.push(packet);
    }
  };

  /**
   * If packet buffer is non-empty, begins encoding the
   * next packet in line.
   *
   * @api private
   */

  Manager.prototype.processPacketQueue = function () {
    if (this.packetBuffer.length > 0 && !this.encoding) {
      var pack = this.packetBuffer.shift();
      this.packet(pack);
    }
  };

  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @api private
   */

  Manager.prototype.cleanup = function () {
    debug$9('cleanup');

    var subsLength = this.subs.length;
    for (var i = 0; i < subsLength; i++) {
      var sub = this.subs.shift();
      sub.destroy();
    }

    this.packetBuffer = [];
    this.encoding = false;
    this.lastPing = null;

    this.decoder.destroy();
  };

  /**
   * Close the current socket.
   *
   * @api private
   */

  Manager.prototype.close =
  Manager.prototype.disconnect = function () {
    debug$9('disconnect');
    this.skipReconnect = true;
    this.reconnecting = false;
    if ('opening' === this.readyState) {
      // `onclose` will not fire because
      // an open event never happened
      this.cleanup();
    }
    this.backoff.reset();
    this.readyState = 'closed';
    if (this.engine) this.engine.close();
  };

  /**
   * Called upon engine close.
   *
   * @api private
   */

  Manager.prototype.onclose = function (reason) {
    debug$9('onclose');

    this.cleanup();
    this.backoff.reset();
    this.readyState = 'closed';
    this.emit('close', reason);

    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  };

  /**
   * Attempt a reconnection.
   *
   * @api private
   */

  Manager.prototype.reconnect = function () {
    if (this.reconnecting || this.skipReconnect) return this;

    var self = this;

    if (this.backoff.attempts >= this._reconnectionAttempts) {
      debug$9('reconnect failed');
      this.backoff.reset();
      this.emitAll('reconnect_failed');
      this.reconnecting = false;
    } else {
      var delay = this.backoff.duration();
      debug$9('will wait %dms before reconnect attempt', delay);

      this.reconnecting = true;
      var timer = setTimeout(function () {
        if (self.skipReconnect) return;

        debug$9('attempting reconnect');
        self.emitAll('reconnect_attempt', self.backoff.attempts);
        self.emitAll('reconnecting', self.backoff.attempts);

        // check again for the case socket closed in above events
        if (self.skipReconnect) return;

        self.open(function (err) {
          if (err) {
            debug$9('reconnect attempt error');
            self.reconnecting = false;
            self.reconnect();
            self.emitAll('reconnect_error', err.data);
          } else {
            debug$9('reconnect success');
            self.onreconnect();
          }
        });
      }, delay);

      this.subs.push({
        destroy: function () {
          clearTimeout(timer);
        }
      });
    }
  };

  /**
   * Called upon successful reconnect.
   *
   * @api private
   */

  Manager.prototype.onreconnect = function () {
    var attempt = this.backoff.attempts;
    this.reconnecting = false;
    this.backoff.reset();
    this.updateSocketIds();
    this.emitAll('reconnect', attempt);
  };

  var lib$4 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */




  var debug = src$1('socket.io-client');

  /**
   * Module exports.
   */

  module.exports = exports = lookup;

  /**
   * Managers cache.
   */

  var cache = exports.managers = {};

  /**
   * Looks up an existing `Manager` for multiplexing.
   * If the user summons:
   *
   *   `io('http://localhost/a');`
   *   `io('http://localhost/b');`
   *
   * We reuse the existing instance based on same scheme/port/host,
   * and we initialize sockets for each namespace.
   *
   * @api public
   */

  function lookup (uri, opts) {
    if (typeof uri === 'object') {
      opts = uri;
      uri = undefined;
    }

    opts = opts || {};

    var parsed = url_1(uri);
    var source = parsed.source;
    var id = parsed.id;
    var path = parsed.path;
    var sameNamespace = cache[id] && path in cache[id].nsps;
    var newConnection = opts.forceNew || opts['force new connection'] ||
                        false === opts.multiplex || sameNamespace;

    var io;

    if (newConnection) {
      debug('ignoring socket cache for %s', source);
      io = manager(source, opts);
    } else {
      if (!cache[id]) {
        debug('new io instance for %s', source);
        cache[id] = manager(source, opts);
      }
      io = cache[id];
    }
    if (parsed.query && !opts.query) {
      opts.query = parsed.query;
    }
    return io.socket(parsed.path, opts);
  }

  /**
   * Protocol version.
   *
   * @api public
   */

  exports.protocol = socket_ioParser.protocol;

  /**
   * `connect`.
   *
   * @param {String} uri
   * @api public
   */

  exports.connect = lookup;

  /**
   * Expose constructors for standalone build.
   *
   * @api public
   */

  exports.Manager = manager;
  exports.Socket = socket$1;
  });
  var lib_1$1 = lib$4.managers;
  var lib_2$1 = lib$4.protocol;
  var lib_3$1 = lib$4.connect;
  var lib_4$1 = lib$4.Manager;
  var lib_5$1 = lib$4.Socket;

  let ui$1 = defaultConfig();

  if (process.env.$pleasure) {
    ui$1 = process.env.$pleasure.ui;
  }

  /*
   todo: implement socket.io-client
    extend EventEmitter with:
    `on('update', entryUpdated => console.log(entryUpdated))` or pleasureClient.users.on('update', 'id')` or
    `pleasureClient.users.on('create', entry => console.log(entry))` or
    `pleasureClient.users.on('delete', 'id', entry => console.log(entry))` or
    `pleasureClient.users.on('delete', entryDeleted => console.log(entryDeleted))`

   */

  class ReduxClient extends events.EventEmitter {
    constructor (apiURL) {
      super();
      const { protocol, host, pathname } = url$1.parse(apiURL);
      this._token = null;
      this._isConnected = false;
      this._host = `${ protocol }//${ host }`;
      this._path = `${ pathname }-socket`;
      this._socket = null;

      this._binds = {
        error: this._error.bind(this),
        connect: this._connect.bind(this),
        disconnect: this._disconnect.bind(this),
        create: this._proxySocket.bind(this, 'create'),
        update: this._proxySocket.bind(this, 'update'),
        delete: this._proxySocket.bind(this, 'delete'),
        '*': (ev, payload) => {
          this.emit(ev, payload);
        }
      };
      this.connect();
    }

    connect () {
      const auth = Object.assign({ forceNew: true, path: this._path }, this.token ? {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${ this.token }`
            }
          }
        }
      } : {});

      if (this._socket) {
        this._unwireSocket();
        this._socket.disconnect();
      }

      this._socket = lib$4(this._host, auth);
      this._socket.onevent = ReduxClient._onEvent(this._socket.onevent);
      this._wireSocket();
    }

    static _onEvent (event) {
      return function (packet) {
        const args = packet.data || [];
        event.call(this, packet);
        packet.data = ['*'].concat(args);
        event.call(this, packet);
      }
    }

    /**
     * Deeply scans and encodes complex objects to be sent via query params to the controller.
     *
     * - Converts regex values into { $regex, $options } for mongoDB purposes
     *
     * @param {Object} obj - The object to encode
     * @return {Object} - Encoded object
     *
     * @example
     *
     * console.log(PleasureClient.queryParamEncode({ email: /@gmail.com$/i }))
     * // { email: { $regex: '@gmail.com', $options: 'i' } }
     */
    static queryParamEncode (obj) {
      return mapValues_1(obj, o => {
        if (Array.isArray(o)) {
          return o
        }

        if (o instanceof RegExp) {
          return { $regex: o.source, $options: o.flags }
        }

        if (
          typeof o === 'object'
        ) {
          return PleasureClient.queryParamEncode(o)
        }

        return o
      })
    }

    _wiring (methods, on = true, altMethod) {
      methods.forEach(method => {
        this._socket[on ? 'on' : 'off'](method, altMethod || this._binds[method]);
      });
    }

    _unwireSocket () {
      this._wiring(Object.keys(this._binds), false);
    }

    _wireSocket () {
      this._wiring(Object.keys(this._binds));
    }

    _proxySocket (method, payload) {
      this.emit(method, payload);
    }

    _error (...args) {
      this.emit('error', ...args);
    }

    _connect () {
      this._isConnected = true;
      this.emit('connect');
    }

    _disconnect (err) {
      this._isConnected = false;
      this.emit('disconnect');
    }

    get token () {
      return this._token
    }

    set token (v) {
      this._token = v;
      this.connect();
      return v
    }
  }

  /**
   * Client for querying the API server.
   * @name pleasure/PleasureClient
   *
   * @see {@link pleasureClient} for a singleton instance of this class.
   *
   * @example
   *
   * ```js
   * // import { PleasureClient, getDriver } from 'pleasure'
   * // const { PleasureClient, getDriver } = require('pleasure')
   *
   * const myPleasureClient = new PleasureClient({ driver: getDriver({ baseURL: 'http://my-api-url', timeout: 3000 }) })
   *
   * myPleasureClient
   *   .list('entity')
   *   .then(entries => {
   *     console.log(entries)
   *   })
   * ```
   */
  class PleasureClient extends ReduxClient {
    /**
     * Initializes a client driver for the API server.
     * @constructor
     *
     * @param {Object} options - Options
     * @param {Object} [options.driver] - Driver to issue ajax requests to the API server. Defaults to {@link getDriver}.
     * @param {ClientConfig} [options.config] - Optional object to override local configuration. See {@link ClientConfig}.
     * @param {String} [options.accessToken] - Optional accessToken in case to start the driver with a session.
     * @param {String} [options.refreshToken] - Optional refreshToken in case to start the driver with a session.
     */
    constructor ({ accessToken, refreshToken, driver = getDriver(), config = ui$1 } = {}) {
      const { baseURL } = driver.defaults;
      super(baseURL);

      this._driver = driver;
      this._accessToken = accessToken;
      this._refreshToken = refreshToken;
      this._userProfile = null;
      this._cache = [];
      this.config = config;

      /**
       * Creates a manager for delegating magic access to entries or entities
       *
       * @param {Function} Binder - Function to be called
       * @return {Function} - The binder manager
       */
      const DelegatorManager = (Binder) => {
        const handlers = {};
        return (name, ...args) => {
          const id = objectHash_1({
            name,
            args
          });
          if (handlers[id]) {
            return handlers[id]
          }

          return handlers[id] = Binder(name, ...args)
        }
      };

      const EntryHandler = (entityName, id) => {
        const eventMapper = [];

        function eventCallback (cb, { entity: theEntity, entry }) {
          if (entityName !== theEntity) {
            return
          }
          castArray_1(entry).forEach((payload) => {
            if (payload._id === id) {
              cb(payload);
            }
          });
        }

        function findEventCallback (cb) {
          let bind;
          forEach_1(eventMapper, ({ cb: _cb, bind: _bind }) => {
            if (_cb === cb) {
              bind = _bind;
              return false
            }
          });

          if (!bind) {
            bind = eventCallback.bind(null, cb);
            eventMapper.push({ cb, bind });
          }

          return bind
        }

        const handler = {
          get (obj, prop) {
            if (/^(on|off|once|emit)$/.test(prop)) {
              return (event, cb) => {
                obj[prop](event, findEventCallback(cb));
              }
            }

            if (prop in obj) {
              return obj[prop].bind(obj, entityName, id)
            }
          },
          apply () {
            // console.log(`applying ${ entityName }`)
          }
        };

        return new Proxy(this, handler)
      };

      const EntityHandler = (entityName) => {
        const handler = {
          get (obj, prop) {
            if (prop in obj) {
              return obj[prop].bind(obj, entityName)
            }

            if (prop === 'toJSON') {
              return
            }

            // bind controllers
            return obj.controller.bind(obj, entityName, kebabCase_1(prop))
          }
        };

        return new Proxy(this, handler)
      };

      const EntityDelegator = DelegatorManager(EntityHandler);
      const EntryDelegator = DelegatorManager(EntryHandler);

      /*
      Initial handler
      this one takes all calls to pleasureClient[:entity]
       */
      const handler = {
        get (obj, prop) {
          const entityName = prop;

          if (typeof entityName === 'string' && !(entityName in obj)) {
            return new Proxy(() => {}, {
              get (obj, prop) {
                return EntityDelegator(entityName)[prop]
              },
              // called when calling .entity(id) > args[0] = id
              apply: function (target, thisArg, args) {
                return EntryDelegator(entityName, ...args)
              }
            })
          }

          return obj[prop]
        }
      };

      return new Proxy(this, handler)
    }

    async proxyCacheReq ({ id, req }) {
      let res;
      await bluebird_1.each(this._cache, async (CacheHook) => {
        res = await CacheHook.req({ id, req });
        if (typeof res !== 'undefined') {
          return false
        }
      });
      return res
    }

    async proxyCacheRes ({ id, req, res }) {
      await bluebird_1.each(this._cache, async (CacheHook) => {
        await CacheHook.res({ id, req, res });
      });

      return res
    }

    async driver (req = {}) {
      const id = objectHash_1(req);
      const cache = await this.proxyCacheReq({ id, req });

      if (typeof cache !== 'undefined') {
        return cache
      }

      const res = await this._driver(req);

      this
        .proxyCacheRes({ id, req, res })
        .catch(err => {
          console.log(`Proxy cache res error:`, err);
        });

      return res
    }

    /**
     * @typedef {Object} CacheResult
     * @property {String} id - A unique identifier for the parameters of the request.
     * @property {String} req - The request.
     * @property {Object} data - The data being transferred by the API server.
     */

    /**
     * @typedef {Object} CacheValidator
     * @property {String} id - A unique identifier for the parameters of the request.
     * @property {Object} req - The request.
     */

    /**
     * @typedef {Object} CacheHook
     * @property {Function} req - Function that is fired with a {@link CacheValidator} as the only parameter before
     * performing the operation. When this function returns any value, the driver would return the
     * returned value by the function instead of querying the API server.
     * @property {Function} res - Function that is fired with a {@link CacheResult} as the only parameter once a result has
     * been grabbed from the API server.
     */

    /**
     * Adds a {@link CacheHook} to the driver pipeline.
     * @param {CacheHook} cacheHook - The {@link CacheHook} to use.
     */
    cache (cacheHook) {
      this._cache.push(cacheHook);
    }

    _localLogout () {
      this.emit('logout', this.userProfile);

      this._accessToken = null;
      this._refreshToken = null;
      this._userProfile = null;
      this._refreshCredentials();
    }

    _refreshCredentials () {
      // for redux
      this.token = this._accessToken;

      if (!this._accessToken) {
        delete this._driver.defaults.headers.common['Authorization'];
        return
      }

      this.emit('login', this.userProfile);
      this._driver.defaults.headers.common['Authorization'] = `Bearer ${ this._accessToken }`;
    }

    get userProfile () {
      return this._userProfile
    }

    getSessionProfile () {
      return this._accessToken ? lib$1(this._accessToken) : null
    }

    /**
     * Obtaining accessToken and refreshToken.
     *
     * When called, any previous `accessToken` or `refreshToken` are cleared. The axios driver is used to hit the API server
     * with the given `credentials`.
     *
     * If succeed, the new received credentials are stored and used for authenticating further calls to the API server.
     *
     * @param {Object} credentials - Contains the user credentials that will be handled and validated by
     * the jwtAuthentication.loginMethod. See {@link ApiConfig}.
     * @param {Object} [params] - Params to add to the request (GET portion).
     *
     * @return {Promise<{accessToken, refreshToken}>} - Received accessToken and refreshToken
     *
     * @example
     *
     * import { pleasureClient } from 'pleasure'
     *
     * pleasureClient
     *   .login({ user: 'tin@devtin.io', password: 'mySuperStrongPassword123:)' })
     *   .then(({ accessToken, refreshToken }) => {
     *     console.log(`Authentication succeed with tokens >>>`, { accessToken, refreshToken })
     *     // maybe now the user could access protected routes
     *     // pleasureClient
     *     //   .list('users')
     *     //   .then(console.log)
     *   })
     */
    async login (credentials, params = {}) {
      this._localLogout();
      const { accessToken, refreshToken } = await this.driver({
        url: `${ this.config.api.authEndpoint }`,
        method: 'post',
        data: credentials,
        params
      });

      this._accessToken = accessToken;
      this._refreshToken = refreshToken;
      this._userProfile = lib$1(accessToken);
      this._refreshCredentials();

      return {
        accessToken,
        refreshToken
      }
    }

    /**
     * Cleans client credentials obtained by {@link PleasureClient#login}.
     */
    async logout () {
      // todo: hit and endpoint that blacklists the session
      await this._driver({
        url: `${ this.config.api.revokeEndpoint }`,
        method: 'post'
      });
      return this._localLogout()
    }

    /**
     * Creates `entry` into `entity`.
     *
     * @param {String} entity - The entity name.
     * @param {Object|Object[]} entry - The entry value. Alternatively, an array of objects to create multiple entries.
     * @param {Object} [params] - Params to add to the request (GET portion).
     * @return {Object|Object[]} - Resulted entry(s).
     * @throws {ApiError} -
     *
     * @example
     *
     * pleasureClient
     *   .create('product', {
     *     name: 'Gingerade Kombucha',
     *     price: 1.99,
     *     category: ['beverages', 'food', 'health', 'fitness'],
     *     stock: 12
     *   })
     *   .then(product => {
     *     console.log(product)
     *     // {
     *     //   id: '<someId>',
     *     //   name: 'Gingerade Kombucha',
     *     //   price: 1.99,
     *     //   category: ['beverages', 'food', 'health', 'fitness'],
     *     //   stock: 12
     *     // }
     *   })
     *
     * @example
     *
     * // Inserting multiple entries
     *
     * pleasureClient
     *   .create('product', [
     *     {
     *       name: 'Pomegranate Kombucha',
     *       price: 1.99,
     *       category: ['beverages', 'food', 'health', 'fitness'],
     *       stock: 8
     *     },
     *     {
     *       name: 'Cold Pressed Coconut Oil',
     *       price: 3.99,
     *       category: ['food'],
     *       stock: 12
     *     }
     *   ])
     *   .then(products => {
     *     assert.ok(Array.isArray(products))
     *     assert.equal(products.length, 2)
     *     console.log(products)
     *     // [
     *     //   {
     *     //     id: '<someId>',
     *     //     name: 'Pomegranate Kombucha',
     *     //     price: 1.99,
     *     //     category: ['beverages', 'food', 'health', 'fitness'],
     *     //     stock: 8
     *     //   },
     *     //   {
     *     //     id: '<someId>',
     *     //     name: 'Cold Pressed Coconut Oil',
     *     //     price: 3.99,
     *     //     category: ['food'],
     *     //     stock: 12
     *     //   }
     *     // ]
     *   })
     */
    create (entity, entry, params = {}) {
      if (!entity || !entry) {
        throw new Error(`Provide both entity and entry`)
      }

      return this.driver({
        url: `/${ entity }`,
        data: entry,
        method: 'post',
        params
      })
    }

    /**
     * Retrieves the Pleasure Entity Schema
     * @return {Object} - Pleasure Entity Schema
     */
    getEntities () {
      return this.driver({ url: this.config.api.entitiesUri })
    }

    /**
     * Reads entry `id` from `entity`. Optionally returns only the value found at `target`.
     *
     * @param {String} entity - The entity name.
     * @param {String} id - The entry id.
     * @param {String} [target] - Optionally return only the value at given target.
     * @param {Object} [params] - Params to add to the request (GET portion).
     * @return {*} - Matched entry.
     *
     * @example // Returning an entry
     *
     * pleasureClient
     *   .read('product', '<someId>')
     *   .then(product => {
     *     console.log(product)
     *     // {
     *     //   id: '<someId>',
     *     //   name: 'Gingerade Kombucha',
     *     //   price: 1.99,
     *     //   category: ['beverages', 'food', 'health', 'fitness'],
     *     //   stock: 12
     *     // }
     *   })
     *
     * @example // Returning a fragment of the entry
     *
     * pleasureClient
     *   .read('product', '<someId>', 'price')
     *   .then(price => {
     *     console.log(price)
     *     // 1.99
     *   })
     */
    read (entity, id, target, params = {}) {
      if (!entity || !id) {
        throw new Error(`Provide both entity and id`)
      }

      const endpoint = [entity, id, target].filter(p => !!p).join('/');
      const url = `/${ endpoint }`;
      return this.driver({
        url,
        params
      })
    }

    /**
     * Partially updates entry `id` at `entity` with the information found at `update`.
     *
     * @param {String} entity - The entity name.
     * @param {String} id - The id of the entry.
     * @param {Object} update - Fields to be updated.
     * @param {Object} [params] - Params to add to the request (GET portion).
     * @return {*} - The updated entry.
     *
     * @example
     *
     * pleasureClient
     *   .update('product', '<someId>', { stock: 14 })
     *   .then(product => {
     *     console.log(product)
     *     // {
     *     //   id: '<someId>',
     *     //   name: 'Gingerade Kombucha',
     *     //   price: 1.99,
     *     //   category: ['beverages', 'food', 'health', 'fitness'],
     *     //   stock: 14
     *     // }
     *   })
     */
    update (entity, id, update, params) {
      if (!entity || !id) {
        throw new Error(`Provide both entity and id`)
      }

      return this.driver({
        url: `/${ entity }/${ id }`,
        method: 'patch',
        data: update,
        params
      })
    }

    /**
     * Lists entries in an entity.
     *
     * @param {String} entity - The entity name.
     * @param {Object} [options]
     * @param {Object} [options.sort] - Object containing fields belonging to the entity, with a numeric value:
     * 1 for ascending, -1 for descending. ie: `{ sort: { name: 1 } }` would sort entries ascending by the 'name' field.
     * @param {String} [options.search] - Full text search in the entity. See {@link https://docs.mongodb.com/manual/text-search/}
     * @param {Number} [options.limit] - Amount of entries to return. See `collectionListLimit` and `collectionMaxListLimit` in {@link ApiConfig}
     * @param {Number} [options.skip=0] - Entries to skip
     * @param {Object} [params={}] - Params to add to the request (GET portion).
     *
     * @example
     *
     * pleasureClient
     *   .list('product')
     *   .then(products => {
     *     console.log(`${products.length} products found`)
     *   })
     */
    list (entity, options = {}, params = {}) {
      if (!entity) {
        throw new Error(`Provide an entity`)
      }

      return this.driver({
        url: `/${ entity }`,
        params: Object.assign({}, params, options)
      })
    }

    /**
     * Deletes entry id from entity.
     *
     * @param {String} entity - Entity from where to remove the entry.
     * @param {Object|String|String[]} id - The `id` of the entry to delete. It can be an `Array` of id's, if we want
     * to delete multiple entries at once. It can also be an `Object` containing a mongoDB query for more complex removal
     * of entries.
     * @param {Object} [params] - Params to add to the request (GET portion).
     * @return {Object|Object[]} - The deleted entry. For multiple entries, it will be an `Array` containing the
     * deleted entries.
     *
     * @example Deleting a single entry
     *
     * pleasureClient
     *   .list('product')
     *   .then(products => {
     *     return pleasureClient.delete('product', products[0]._id)
     *   })
     *   .then(deletedProduct => {
     *     console.log(`Product ${deletedProduct.name} has been deleted`).
     *   })
     *
     * @example Deleting multiple entries by id
     *
     * pleasureClient
     *   .list('product')
     *   .then(products => {
     *     return pleasureClient.delete('product', products.map(({ _id }) => _id))
     *   })
     *   .then(deletedProducts => {
     *     deletedProducts.forEach(({ name }) => console.log(`Product ${name} has been deleted`))
     *   })
     *
     * @example Deleting using mongoDB queries
     *
     * pleasureClient
     *   .delete('product', { name: /kombucha/ })
     *   .then(productsDeleted => {
     *     console.log(`${productsDeleted.length} kombuchas were deleted.`)
     *   })
     */
    delete (entity, id, params = {}) {
      let url = `/${ entity }`;

      // handle multiple ids
      if (typeof id === 'object') {
        Object.assign(params, { id: Array.isArray(id) ? castArray_1(id) : id });
        id = null;
      }

      if (id) {
        url += `/${ id }`;
      }

      return this.driver({
        url,
        method: 'delete',
        params: PleasureClient.queryParamEncode(params)
      })
    }

    /**
     * Pushes `push` value into the array found at `fieldPath`.
     *
     * @param {String} entity - The entity name.
     * @param {String} id - Id of the entry where to push the newEntry.
     * @param {String} fieldPath - Path to the field containing the Array where to push the value at `push`.
     * @param {String|Boolean|Number|Array|Object} push - Value to add to the array
     * @param {Boolean} [multiple=false] - If `push` is an array and `multiple` is set to `true`, the existing array found
     * at `fieldPath` will be concatenated with the given one.
     * @param {Object} [params] - Params to add to the request (GET portion).
     */
    push (entity, id, fieldPath, push, multiple = false, params = {}) {
      if (!entity || !id || !fieldPath || !push) {
        throw Error(`Provide all 'entity', 'id', 'fieldPath' and 'newEntry'.`)
      }
      return this.driver({
        url: `${ entity }/${ id }/${ fieldPath }`,
        method: 'post',
        data: { push, multiple },
        params
      })
    }

    controller (entity, controller, data = null, params) {
      if (!entity || !controller) {
        throw Error(`Provide both 'entity' and 'controller'.`)
      }

      const url = `${ entity }/${ controller }`;

      return this.driver({
        url,
        method: data !== null ? 'post' : 'get',
        data,
        params
      })
    }

    /**
     * Pulls `pull` out of the array found at `fieldPath` from the entry `id` in `entity`.
     *
     * @param {String} entity - The entity name
     * @param {String} id - id of the entry where to push
     * @param {String} fieldPath - path to the field containing the Array
     * @param {String|String[]} pull - id(s) or value(s) to remove from the array.
     * existing array with the given one
     * @param {Object} [params] - Params to add to the request (GET portion).
     *
     * @example
     *
     * // Given the following product
     * // const productInDb = {
     * //   id: '<someId>',
     * //   name: 'Kombucha',
     * //   price: 1.99,
     * //   categories: ['beverages', 'food', 'health', 'fitness']
     * // }
     *
     * pleasureClient
     *   .pull('product', '<someId>', 'categories', ['food', 'fitness'])
     *   .then(product => {
     *     console.log(product)
     *     // {
     *     //   id: '<someId>',
     *     //   name: 'Kombucha',
     *     //   price: 1.99,
     *     //   categories: ['beverages', 'health']
     *     // }
     *   })
     */
    pull (entity, id, fieldPath, pull, params = {}) {
      if (!entity || !id || !fieldPath || !pull) {
        throw Error(`Provide all 'entity', 'id', 'fieldPath' and 'pull'.`)
      }
      return this.driver({
        url: `${ entity }/${ id }/${ fieldPath }`,
        method: 'delete',
        params: Object.assign({}, params, {
          pull
        })
      })
    }
  }

  /**
   * Singleton instance of {@link PleasureClient}.
   * @type {PleasureClient}
   * @instance pleasureClient
   *
   * @example
   *
   * import { pleasureClient } from 'pleasure'
   *
   * pleasureClient
   *   .list('products')
   *   .then(products => {
   *     console.log(`${products.length} products found.`)
   *   })
   *   .catch(err => {
   *     console.log(`Something went wrong: ${err.message}`)
   *   })
   */

  const pleasureClient = new PleasureClient();

  exports.PleasureClient = PleasureClient;
  exports.default = pleasureClient;

  return exports;

}({}, http, https, url$1, assert, stream, tty, util$1, os, zlib, crypto, events, fs, child_process, net, tls, bufferutil, utf8Validate));
