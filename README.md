[![Build Status](https://travis-ci.com/style-tools/async.svg?branch=master)](https://travis-ci.com/style-tools/async) [![Version](https://img.shields.io/github/release/style-tools/async.svg)](https://github.com/style-tools/async/releases) [![npm version](https://badge.fury.io/js/%40style.tools%2Fasync.svg)](http://badge.fury.io/js/%40style.tools%2Fasync) [![Latest Stable Version](https://poser.pugx.org/styletools/async/v/stable.png)](https://packagist.org/packages/styletools/async) [![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=b2ZvT0RMQnBYaFFDVU1GdDhxZUJqaUhmNFF6MDQrQXdxNGJVTTFnWmppcz0tLTdKRHlqREF3bFNmd3I4QUt2K3NBeVE9PQ==--9075fa5f8c9e95d7cc02b659d01ed31f588feb12)](https://www.browserstack.com/automate/public-build/b2ZvT0RMQnBYaFFDVU1GdDhxZUJqaUhmNFF6MDQrQXdxNGJVTTFnWmppcz0tLTdKRHlqREF3bFNmd3I4QUt2K3NBeVE9PQ==--9075fa5f8c9e95d7cc02b659d01ed31f588feb12)

# Async CSS and Script Loader

A lightweight asynchronous CSS and Javascript loader.

```javascript
$async(
   [/*stylesheets or scripts*/],	// string, object or an array of strings or objects
   {/*options*/},			// object
   [/*capture*/],			// string, object or an array of strings or objects 
   {/*capture options*/}		// object
).then(function() { /* ready */ });	
```

#### Documentation is available on [docs.style.tools/async](https://docs.style.tools/async).

### Features

1. Dependency, responsive and timed download and/or render/exec.
2. [in-view](https://github.com/camwiegert/in-view) (element in view) based loading.
3. `requestAnimationFrame` and `requestIdleCallback` (smooth rendering/exec based on CPU)
4. Chainable and events.
5. `localStorage` or [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) based loading (much faster, see [css-art.com](https://css-art.com))
6. Async injected stylesheet and script capture via `MutationObserver` or DOM insert method rewriting.
7. Fallback via `try {} catch` and `<noscript rel="css">`.
8. Google Closure Compiler with Advanced Optimizations based script compression (IIFE).
9. HTML data-attribute `data-c` based JSON config to enable Content-Security-Policy (CSP) with page-based config.
10. [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance) timings for debugging and optimization.

### Install via npm

```bash
npm install @style.tools/async --save
```

### Install via PHP Composer

```bash
composer require styletools/async
```

The script is optimized to achieve the minimum size possible for above the fold optimization.

<details/>
  <summary>Show script sizes of async loader modules</summary>

```text
async-core.js Size: 2.04 kb (2089 bytes) Gzip: 0.99 kb (1012 bytes).
event-emitter.js Size: 0.47 kb (482 bytes) Gzip: 0.24 kb (245 bytes).
debug.js Size: 0.13 kb (130 bytes) Gzip: 0.13 kb (135 bytes).
css-loader.js Size: 1.07 kb (1094 bytes) Gzip: 0.63 kb (646 bytes).
js-loader.js Size: 1.83 kb (1876 bytes) Gzip: 1.01 kb (1032 bytes).
inline-js.js Size: 0.38 kb (390 bytes) Gzip: 0.27 kb (278 bytes).
rebase.js Size: 0.12 kb (124 bytes) Gzip: 0.12 kb (124 bytes).
regex.js Size: 0.14 kb (142 bytes) Gzip: 0.14 kb (144 bytes).
vendor.js Size: 0.18 kb (187 bytes) Gzip: 0.17 kb (169 bytes).
api.js Size: 0.25 kb (256 bytes) Gzip: 0.18 kb (187 bytes).
dependency.js Size: 0.71 kb (727 bytes) Gzip: 0.41 kb (418 bytes).
timing.js Size: 0.71 kb (726 bytes) Gzip: 0.41 kb (415 bytes).
inview.js Size: 0.92 kb (944 bytes) Gzip: 0.55 kb (566 bytes).
responsive.js Size: 0.26 kb (267 bytes) Gzip: 0.20 kb (201 bytes).
cache.js Size: 1.35 kb (1381 bytes) Gzip: 0.76 kb (776 bytes).
cache-css.js Size: 0.32 kb (325 bytes) Gzip: 0.24 kb (242 bytes).
cache-js.js Size: 0.05 kb (55 bytes) Gzip: 0.07 kb (71 bytes).
localstorage.js Size: 0.43 kb (438 bytes) Gzip: 0.28 kb (284 bytes).
cache-api.js Size: 0.62 kb (632 bytes) Gzip: 0.34 kb (353 bytes).
xhr.js Size: 0.83 kb (849 bytes) Gzip: 0.49 kb (503 bytes).
cache-update.js Size: 0.15 kb (152 bytes) Gzip: 0.13 kb (134 bytes).
capture.js Size: 1.23 kb (1259 bytes) Gzip: 0.71 kb (723 bytes).
capture-observer.js Size: 0.26 kb (263 bytes) Gzip: 0.20 kb (208 bytes).
capture-insert.js Size: 0.34 kb (348 bytes) Gzip: 0.22 kb (224 bytes).
capture-css.js Size: 0.14 kb (141 bytes) Gzip: 0.13 kb (131 bytes).
capture-js.js Size: 0.07 kb (69 bytes) Gzip: 0.08 kb (87 bytes).
attr-config.js Size: 0.29 kb (293 bytes) Gzip: 0.22 kb (229 bytes).
```
</details>

---

## Browser tests [<img align="right" src="https://style.tools/browserstack.png">](https://www.browserstack.com/)

[<img align="right" src="https://www.browserstack.com/automate/badge.svg?badge_key=b2ZvT0RMQnBYaFFDVU1GdDhxZUJqaUhmNFF6MDQrQXdxNGJVTTFnWmppcz0tLTdKRHlqREF3bFNmd3I4QUt2K3NBeVE9PQ==--9075fa5f8c9e95d7cc02b659d01ed31f588feb12">](https://www.browserstack.com/automate/public-build/b2ZvT0RMQnBYaFFDVU1GdDhxZUJqaUhmNFF6MDQrQXdxNGJVTTFnWmppcz0tLTdKRHlqREF3bFNmd3I4QUt2K3NBeVE9PQ==--9075fa5f8c9e95d7cc02b659d01ed31f588feb12)

Under construction...

Browser tests provided by [BrowserStack](https://www.browserstack.com/).

