'use strict';

const app = require('./EggApp').getInstance();
const fs = require('fs');
const path = require('path');

/**
 * 检查接口路由
 */
function checkroute() {
    // {baseDir}/app目录下的router.js
    require('/home/ljw/mygithub/check_demo/app/router')(app);
    // {baseDir}/app/router目录下的router
    const list = fs.readdirSync('/home/ljw/mygithub/check_demo/app/router').filter(elem => path.extname(elem) === '.js');
    for (const elem of list) {
        require(path.join('/home/ljw/mygithub/check_demo/app/router', elem))(app);
    }
    _print();
}
/**
 * 输出到终端显示
 */
function _print() {
    const colorMapping = {
        GET: '\u001b[40;32mGET\u001b[0m',
        POST: '\u001b[40;34mPOST\u001b[0m',
        PUT: '\u001b[40;33mPUT\u001b[0m',
        DELETE: '\u001b[40;31mDELETE\u001b[0m',
        DEL: '\u001b[40;31mDELETE\u001b[0m',
        OPTION: '\u001b[40;36mOPTION\u001b[0m',
        HEAD: '\u001b[40;36mHEAD\u001b[0m',
        PATCH: '\u001b[40;36mPATCH\u001b[0m',
        CURD: '\u001b[40;36mCURD\u001b[0m'
    };
    for (const elem of app.route) {
        console.log(colorMapping[elem.method], `\u001b[32m ${elem.path}\u001b[0m`);
    }
}
checkroute();
