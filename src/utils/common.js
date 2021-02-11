import _isPlainObject from 'is-plain-object'
import _isEqual from 'lodash.isequal'

export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isPlainObject(value) {
  return _isPlainObject(value)
}

export function isEqual(value, other) {
  return _isEqual(value, other)
}

export function toCamelCaseString(str) {
  return str ? str.replace(/_([a-z])/g, g => g[1].toUpperCase()) : str
}

export function toCamelCaseObject(object) {
  if (object === null || typeof object !== 'object' || object instanceof Date) {
    return object
  }

  if (Array.isArray(object)) {
    return object.map(toCamelCaseObject)
  }

  return Object.entries(object).reduce((o, [key, value]) => {
    const newObject = { ...o }
    const newValue = toCamelCaseObject(value)
    const newKey = toCamelCaseString(key)
    newObject[newKey] = newValue
    return newObject
  }, {})
}
