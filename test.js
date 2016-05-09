const test = require('tap').test
const rc2env = require('.')

test('converts an object', t => {
  const mock = {
    url: 'https://tlvince.com'
  }

  const expected = {
    URL: 'https://tlvince.com'
  }

  t.same(rc2env(mock), expected)
  t.end()
})

test('handles nested properties', t => {
  const mock = {
    app: {
      prop: 'hello'
    }
  }

  const expected = {
    APP_PROP: 'hello'
  }

  t.same(rc2env(mock), expected)
  t.end()
})

test('omits rc metadata', t => {
  const mock = {
    _: [],
    configs: ['/some/path/to/.apprc'],
    config: '/some/path/to/.apprc'
  }

  const expected = {}
  t.same(rc2env(mock), expected)
  t.end()
})
