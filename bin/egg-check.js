#!/usr/bin/env node

'use strict';

const { checkmodel } = require('../lib/checkmodel');
const { checkroute } = require('../lib/checkroute');

require('yargs')
    .command('model', '数据库表模型概览', checkmodel)
    .command('route', '检查接口路由', checkroute)
    .help('h')
    .alias('h', 'help')
    .argv;
/**
 * generate default configuration & plugin
 * @param {*} yargs ..
 */
// function init(yargs) {
//     yargs.reset()
//         .help('h')
//         .alias('h', 'help')
//         .argv;
//     command.buildInit();
// }
// /**
//  * generate models
//  * @param {*} yargs ..
//  */
// function model(yargs) {
//     const argv = yargs.reset()
//         .option('f', {
//             alias: 'force',
//             describe: 'if force is specified, it will overwrite existing files.',
//             type: 'boolean',
//             default: false
//         })
//         .help('h')
//         .alias('h', 'help')
//         .argv;
//     command.buildModel(argv);
// }
// /**
//  * generate models
//  * @param {*} yargs ..
//  */
// function install(yargs) {
//     const argv = yargs.reset()
//         .option('s', {
//             alias: 'save',
//             describe: 'Saving dependencies information to package.json.',
//             type: 'boolean',
//             default: false
//         })
//         .option('', {
//             alias: 'save-dev',
//             describe: 'Saving devDependencies information to package.json.',
//             type: 'boolean',
//             default: false
//         })
//         .help('h')
//         .alias('h', 'help')
//         .argv;
//     command.install(argv);
// }
