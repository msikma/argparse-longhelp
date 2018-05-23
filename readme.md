Small helper function for [argparse](https://www.npmjs.com/package/argparse) to add extra help text.

This makes use of argparse internals, but the project's code is stable enough and is unlikely to change in a way that would break this.

### Example

```js
const parser = new ArgumentParser({
  version: '1.0.0',
  addHelp: true,
  description: 'Regular description',
  epilog: 'Copyright'
})
addLongHelp(parser, 'A long explanation')
```

### Copyright

MIT license.