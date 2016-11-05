# split-by-name-webpack2-plugin

[soundcloud/split-by-name-webpack-plugin](https://github.com/soundcloud/split-by-name-webpack-plugin) fork
that works with webpack2. It allows you to split bundle into multiple chunks based on location of the modules. Node.js 6+.

## Installation

```sh
npm install split-by-name-webpack2-plugin --save-dev
```

## Usage

Given

```
node_modules/...
src/index.js
```

> (where `src/index.js` is referencing some of the modules in `node_modules`) 

and `webpack.config.js`

```js
var SplitByNamePlugin = require('split-by-name-webpack2-plugin')

module.exports = {
  entry: {
    index: 'src/index.js'
  },
  output: {
    path: __dirname + '/build',
    filename: "[name].js"
  },
  plugins: [
    new SplitByNamePlugin({
      buckets: [{
        name: 'vendor',
        regex: /\/node_modules\//
      }]
    })
  ]
}
```

`webpack` (tested on `webpack@2.1.0-beta.20`) will produce

```
build/{vendor,index}.js
```

> (where `build/vendor.js` contains `require(...)`d `node_modules/...`) 

## Legal

Original copyright (c) 2014 SoundCloud, Nick Fisher (MIT).  
This fork is licensed under the same MIT license. 
