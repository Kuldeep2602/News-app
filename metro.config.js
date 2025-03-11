// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');


// const config = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts.push('cjs');
// module.exports = config;

const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = defaultConfig;
