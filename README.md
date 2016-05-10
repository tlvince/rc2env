# rc2env

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]
[![License][license-image]][license-url]

[travis-url]: https://travis-ci.org/tlvince/rc2env
[travis-image]: https://img.shields.io/travis/tlvince/rc2env.svg
[npm-url]: https://www.npmjs.com/package/rc2env
[npm-image]: https://img.shields.io/npm/v/rc2env.svg
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/rc2env.svg

> Convert rc's config object to env vars

```js
const config = {
  app: {
    prop: 'foo',
    camelCase: 'bar',
  },
  bar: 'baz'
}
rc2env(config)
//=>
{
  APP_PROP: 'foo',
  APP_CAMEL_CASE: 'bar',
  BAR: 'baz'
}
```

## Installation

```shell
npm install --save rc2env
```

## Usage

`rc2env(<object>[, string])`

This is meant to be used with [rc][], so:

```js
const rc = require('rc')
const rc2env = require('rc2env')

const defaults = {
  app: {
    prop: 'foo'
  },
  bar: 'baz'
}

const config = rc('app', defaults)
const envConfig = rc2env(config)
//=>
{
  APP_PROP: 'foo',
  BAR: 'baz'
}
```

Optionally, pass in a string (`appname`) to form rc-like nested env properties:

```js
const config = {
  foo: 'foo',
  bar: {
    baz: 'baz',
    preserveCase: 'yes'
  }
}
const envConfig = rc2env(config, 'app')
//=>
{
  app_foo: 'foo',
  app_bar__baz: 'baz',
  app_bar__preserveCase: 'yes'
}
```

[rc]: https://github.com/dominictarr/rc

## Author

© 2016 Tom Vincent <git@tlvince.com> (https://tlvince.com)

## License

Released under the [MIT license](http://tlvince.mit-license.org).
