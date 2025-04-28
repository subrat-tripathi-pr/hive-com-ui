// https://angular.io/guide/build#proxying-to-a-backend-server

const PROXY_CONFIG = {
  '/users/**': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    // onProxyReq: (proxyReq, req, res) => {
    //   const cookieMap = {
    //     SID: '',
    //   };
    //   let cookie = '';
    //   for (const key of Object.keys(cookieMap)) {
    //     cookie += `${key}=${cookieMap[key]}; `;
    //   }
    //   proxyReq.setHeader('cookie', cookie);
    // },
  },
  '/api/**': {
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/user/**': {
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/contacts**': {
    target: 'http://localhost:8081',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/contacts/**': {
    target: 'http://localhost:8081',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
};

module.exports = PROXY_CONFIG;
