'use strict';

const fs = require('fs');
const path = require('path');

// Egg.Application
class EggApp {
    constructor() {
        this.DataTypes = {
            STRING: len => ['varchar', len || '255', '0'],
            TEXT: () => ['text', '0', '0'],
            INTEGER: len => ['int', len || '11', '0'],
            BIGINT: len => ['bigint', len || '20', '0'],
            DECIMAL: (int, decimal) => ['decimal', int || '65', decimal || '0'],
            DATE: () => ['datetime', '0', '0'],
            BOOLEAN: () => ['tinyint', '4', '0']
        };
        this.Sequelize = {
            DataTypes: this.DataTypes,
            ...this.DataTypes
        };
        this.model = {
            define: (tableName, fields, options) => {
                return {
                    tableName,
                    fields,
                    options,
                    belongsTo: (m, n) => [m, n],
                    hasMany: (m, n) => [m, n],
                    hasOne: (m, n) => [m, n]
                };
            }
        };
        this.config = {};
        this.controller = {};
        // 初始化控制器
        this.initCtrl();
        this.route = [];
        this.methods = {
            resources: (...args) => this.pushRoute(args, 'CURD'),
            get: (...args) => this.pushRoute(args, 'GET'),
            post: (...args) => this.pushRoute(args, 'POST'),
            put: (...args) => this.pushRoute(args, 'PUT'),
            delete: (...args) => this.pushRoute(args, 'DELETE'),
            del: (...args) => this.pushRoute(args, 'DELETE'),
            head: (...args) => this.pushRoute(args, 'HEAD'),
            options: (...args) => this.pushRoute(args, 'OPTIONS'),
            patch: (...args) => this.pushRoute(args, 'PATCH'),
            redirect: (...args) => this.pushRoute(args, 'REDIRECT')
        };
        this.router = {
            namespace: prefix => {
                return {
                    ...this.methods
                };
            },
            ...this.methods
        };
    }
    /**
     * 存放接口路径
     * @param {Array} args Router定义参数
     * @param {string} method 请求方式
     */
    pushRoute(args, method) {
        args.reverse();
        this.route.push({
            method,
            path: args.find(elem => typeof elem === 'string'),
            ctrl: args[0]
        });
    }
    /**
     * 初始化控制器
     */
    initCtrl() {
        const list = fs.readdirSync('/home/ljw/mygithub/check_demo/app/controller').filter(elem => path.extname(elem) === '.js');
        for (const ctrl of list) {
            const Class = require(path.join('/home/ljw/mygithub/check_demo/app/controller', ctrl));
            let camelcaseName = ctrl.split('.')[0].split(/\_/).map(elem => elem.charAt(0).toLocaleUpperCase().concat(elem.substr(1))).join('');
            camelcaseName = camelcaseName.charAt(0).toLocaleLowerCase().concat(camelcaseName.substr(1));
            this.controller[camelcaseName] = new Class({ app: this });
        }
    }
}

module.exports = {
    EggApp,
    getInstance: () => {
        if (!global[Symbol.for('app')]) {
            global[Symbol.for('app')] = new EggApp();
        }
        return global[Symbol.for('app')];
    }
};
