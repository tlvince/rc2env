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

test('converts keys to UPPER_SNAKE_CASE', t => {
  const mock = {
    foo: 'foo',
    barBar: 'bar',
    'baz-baz': 'baz'
  }
  const expected = {
    FOO: 'foo',
    BAR_BAR: 'bar',
    BAZ_BAZ: 'baz'
  }
  t.same(rc2env(mock), expected)
  t.end()
})

test('optionally outputs in rc nested form', t => {
  const mock = {
    foo: 'foo',
    bar: {
      baz: 'baz'
    }
  }
  const expected = {
    app_foo: 'foo',
    app_bar__baz: 'baz'
  }
  t.same(rc2env(mock, 'app'), expected)
  t.end()
})

test('should preserve case in rc nested form', t => {
  const mock = {
    foo: {
      barBaz: 'foo'
    }
  }
  const expected = {
    app_foo__barBaz: 'foo'
  }
  t.same(rc2env(mock, 'app'), expected)
  t.end()
})
