module.exports = {
    staticFileGlobs: [
      './**.css',
      './**.html',
      './images/**.*'
    ],
    stripPrefix: '/',
    verbose: true,
    runtimeCaching: [{
      urlPattern: /this\\.is\\.a\\.regex/,
      handler: 'networkFirst'
    }],
    "skipWaiting": true,
    "cacheId": 'version2'
  };