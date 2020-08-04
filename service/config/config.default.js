/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    mysql:{
      //database configuration
      client:{
        //host
        host: 'localhost',
        //port
        port: '3306',
        //username
        user: 'root',
        //passowrd
        password: '123456',
        //database
        database: 'react_blog'
      },
      // load into app,default is open
      app: true,
      //load into agent, default is close
      agent: false
    }
  };

  config.security = {
    csrf:{
      enable: false
    },
    domainWhiteList: ['*']
  };


  config.origin = {
    whiteList: ['http://localhost:3000','http://localhost:8888'],
  }
  config.cors = {
    origin: 'http://localhost:3000',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATH,OPTIONS'
  };


  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_672315226';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };



  return {
    ...config,
    ...userConfig,
  };

};
