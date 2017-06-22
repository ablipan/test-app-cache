# test-app-cache

> Test app cache.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Appcache

### Webpack config

```js
// require plugin
var OfflinePlugin = require('offline-plugin')

// add to webpack's plugins

new OfflinePlugin({
 ServiceWorker: false,
 AppCache: {
   events: true,
   disableInstall: true
 },
 //autoUpdate: 1000 * 10
})
```

### modify entry file

``` js
import Vue from 'vue'
import App from './App.vue'
import './main.css'

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}

function init() {
  new Vue({
    el: '#app',
    render: h => h(App)
  })
}

var appCache = window.applicationCache

// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {

  function handleCacheError(e) {
    alert('Error: Cache failed to update!')
    init()
  }

  // Fired after the first cache of the manifest.
  appCache.addEventListener('cached', function() {
    console.log('cached')
    init()
  }, false)

  // Checking for an update. Always the first event fired in the sequence.
  appCache.addEventListener('checking', function() {
    console.log('checking')
  }, false)

  // An update was found. The browser is fetching resources.
  appCache.addEventListener('downloading', function() {
   console.log('downloading')
 }, false)

  // The manifest returns 404 or 410, the download failed,
  // or the manifest changed while the download was in progress.
  appCache.addEventListener('error', handleCacheError, false)

  // Fired after the first download of the manifest.
  appCache.addEventListener('noupdate', function() {
   console.log('noupdate')
   init()
 }, false)

  // Fired if the manifest file returns a 404 or 410.
  // This results in the application cache being deleted.
  appCache.addEventListener('obsolete', function() {
   console.log('obsolete')
  }, false)

  // Fired for each resource listed in the manifest as it is being fetched.
  appCache.addEventListener('progress', function() {
    console.log('progress')
  }, false)

  // Fired when the manifest resources have been newly redownloaded.
  appCache.addEventListener('updateready', function() {
    console.log('updateready')
  }, false)

}, false)
