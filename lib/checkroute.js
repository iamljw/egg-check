'use strict';

const app = require('./EggApp').getInstance();
const fs = require('fs');
const path = require('path');

module.exports = {
    /**
     * 检查接口路由
     * @param {*} yargs ..
     */
    checkroute(yargs) {
        const { argv } = yargs.reset();
        argv._.shift();
        // 接口路由定义文件列表
        let routes = argv._.map(elem => `${elem}.js`);
        if (routes.length === 0) {
            // 如果未指定路由列表，则列出所有已创建路由列表
            routes = fs.readdirSync('app/router').filter(elem => path.extname(elem) === '.js');
        }
        // {baseDir}/app目录下的router.js
        require(path.join(process.cwd(), 'app/router'))(app);
        // {baseDir}/app/router目录下的router
        for (const elem of routes) {
            require(path.join(process.cwd(), 'app/router', elem))(app);
        }
        this._print();
    },
    /**
     * 输出到终端显示
     */
    _print() {
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
            console.log(colorMapping[elem.method], elem.path);
        }
    }
};
