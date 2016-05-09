'use strict'

const snakeCase = require('snake-case')

module.exports = (config) => {
  const omit = (object, keys) => (
    Object.keys(object).reduce((i, key) => {
      if (keys.indexOf(key) === -1) {
        i[key] = object[key]
      }
      return i
    }, {})
  )

  const reduce = (object, prefix) => {
    const toEnv = (index, prop) => {
      let key = snakeCase(prop).toUpperCase()
      if (prefix) {
        key = prefix + '_' + key
      }
      const value = object[prop]

      if (typeof value === 'object') {
        const reduced = reduce(value, key)
        return Object.assign(index, reduced)
      }

      index[key] = value
      return index
    }

    return Object.keys(object).reduce(toEnv, {})
  }

  const omits = [
    '_',
    'config',
    'configs'
  ]
  const omitted = omit(config, omits)
  return reduce(omitted)
}
