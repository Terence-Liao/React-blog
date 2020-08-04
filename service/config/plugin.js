'use strict';

/** @type Egg.EggPlugin */



/*module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};*/

exports.cors = {
    enable: true,
    package: 'egg-cors'
}


exports.mysql = {
    enable: true,
    package: 'egg-mysql'
}


exports.origin = {
    enable: true,
    package: 'egg-origin'
}
