# @iodigital/criticalcss

This node module makes it possible to generate critical css bundles from different pages in different viewports. It uses [GitHub - addyosmani/critical](https://github.com/addyosmani/critical) under the hood.


## Usage

### Install
```sh
npm install @iodigital/criticalcss
```

### Configuration
First add a configuration file in the root of your project, named `criticalcss.config.js`. This file should contain a `const config` for generating critical css and a `const pages` with the urls and dimensions for the viewport. Example configuration:

```js
const config = {
    rebase: (asset) => { // absolute assets path
        if (asset.pathname !== null && asset.pathname === asset.originUrl) {
            return asset.absolutePath;
        }
        return asset.url;
    },
    dimensions: [
        {"width": 320}, // height is optional
        {"width": 767, "height": 3000},
        {"width": 992},
        {"width": 1200},
        {"width": 1424}
    ],
    penthouse: {
        timeout: 60000,
        forceExclude: [
            ".footer__columns--wrapper>.footer__column:nth-of-type(4) img"
        ]
    }
}

const pages = {
    "domain": "https://site.com",
    "pages": [
        {
            "src": "/",
            "target": "app/design/frontend/THEMEPATH/THEMEPATH/web/css/cms-critical.css"
        },
        {
            "src": "/category/",
            "target": "app/design/frontend/THEMEPATH/THEMEPATH/web/css/category-critical.css"
        },
        {
            "src": "/some-product.html",
            "target": "app/design/frontend/THEMEPATH/THEMEPATH/web/css/product-critical.css"
        },
        {
            "src": "/checkout/#shipping",
            "target": "app/design/frontend/THEMEPATH/THEMEPATH/web/css/checkout-critical.css"
        }
    ]
}

module.exports = {
    config,
    pages
}
```

In the pages array, `src` is the page you want critical css from and `target` is the place to drop the newly generated critical css bundle.

Dimensions only require widths (this differs per project). The height will be chosen based on a set of most used resolutions:

```js
const standardViewports = [
    { width: 1920, height: 1080 },
    { width: 414, height: 896 },
    { width: 1536, height: 864 },
    { width: 1366, height: 768 },
    { width: 375, height: 667 },
    { width: 360, height: 640 },
];
```

If you want to explicitly use a set height, you may add it to the `dimensions` array like this (it will overwrite the default):

```js
    "dimensions": [
       ...
        { "width": 767, "height": 3000 },
      ...
    ]
```

### Running it

To use this package, you need to run: `npx @iodigital/criticalcss` in the command line.

#### Using environment variables

There are some environment variables that can be used while generating the criticalcss.

##### Available environment variables
- DOMAIN: When domain is set, this will be used to render criticalcss for.
- CRITICALCSS_CONFIG_FILE: You can alter the criticalcss configuration file that will be used. Can be useful when deploying to more than one environment or to support multiple themes.

##### How to use environment variables
```sh
export DOMAIN=https://www.google.com
npx @iodigital/criticalcss
```

or

```sh
DOMAIN=https://www.google.com npx @iodigital/criticalcss
```
