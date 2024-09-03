const fs = require('fs');
const appRoot = process.cwd();

// Most used viewports, widths and heights
const standardViewports = [
    { width: 2560, height: 1440 },
    { width: 1920, height: 1080 },
    { width: 1680, height: 1050 },
    { width: 1280, height: 1024 },
    { width: 1600, height: 900 },
    { width: 1440, height: 900 },
    { width: 414, height: 896 },
    { width: 1536, height: 864 },
    { width: 1366, height: 768 },
    { width: 1280, height: 720 },
    { width: 375, height: 667 },
    { width: 360, height: 640 },
];

const getClosestHeight = (target) =>
    standardViewports.reduce((acc, obj) =>
        Math.abs(target - obj?.width) < Math.abs(target - acc?.width) ? obj : acc
    );

module.exports = {
    getClosestHeight
}
