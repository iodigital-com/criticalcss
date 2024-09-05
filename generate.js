#!/usr/bin/env node

const criticalcssConfigFile = process.env.CRITICALCSS_CONFIG_FILE || 'criticalcss.config';
const { config, pages } = require('../../' + criticalcssConfigFile);
const baseConfig = require('./config.default.js');
const critical = require('critical');
const { getClosestHeight } = require('./helpers');

if (!config) {
    console.warn('WARNING: Project configuration missing, falling back to default configuration');
}

// Disables warnings.
process.setMaxListeners(0);

// No pages configured, so stop.
if (!pages.pages) {
    throw new Error('Error: You need to provide pages as configuration (e.g. pages: [{"src": "https://www.site.com/", "target": "app/design/frontend/*company*/theme/web/css/cms-critical.css"}])');
    return;
}

const domain = process.env.DOMAIN || pages?.domain;
if (!domain) {
    throw new Error('Error: You need to provide a domain to target');
    return;
}

// The dimensions you want critical css from.
let dimensions = config?.dimensions || [];
dimensions = dimensions?.map((dimension) => ({
    width: dimension?.width,
    height: dimension?.height ?? getClosestHeight(dimension?.width)?.height,
}));

const defaultConfig = {
    ...baseConfig,
    ...config,
    dimensions: dimensions
}

console.log('Starting to create critical css bundles...');
function processPage() {
    const page = pages.pages.shift();
    if (page) {
        console.log(' > ' + domain + page.src);
        const pageConfig = {
            src: domain + page.src,
            css: page.css,
            target: {
                css: page.target,
            }
        };

        critical.generate({
            ...defaultConfig,
            ...pageConfig
        }).then(result => {
            console.log('   ... has been generated');
            processPage();
        });
    }
}
processPage();
