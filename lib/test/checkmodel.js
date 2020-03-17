'use strict';

const app = require('./EggApp').getInstance();

function _parse(filepath) {
    // 取得模型数据
    const tabledata = require(filepath)(app);
    const fields = [];
    // 数据统一化处理
    for (const key in tabledata.fields) {
        const elem = tabledata.fields[key];
        // type类型为Array或Function，若为Function则需要执行获得返回值
        const fieldType = elem.type instanceof Array ? elem.type : elem.type();
        let allowNull = elem.allowNull;
        if (elem.primaryKey) {
            allowNull = false;
        } else if (elem.allowNull === undefined) {
            allowNull = true;
        }
        fields.push({ ...elem, ...{
            type: fieldType[0], // 对应数据库类型
            allowNull, // 允许null
            fieldName: elem.field ? elem.field : key, // 数据库字段名
            fieldComment: elem.comment, // 数据库字段注释
            length: fieldType[1], // 字符串长度或整数部分长度
            decimal: fieldType[2] // 小数部分长度
        } });
    }
    return {
        tableMetadata: {
            tableName: tabledata.tableName,
            tableComment: tabledata.options ? tabledata.options.comment : null
        },
        fields
    };
}

function _print(tabledata) {
    const columns = ['字段名', '注释', '类型', '长度', '小数点', '非空', '主键', '自增'];
    console.log('\u001b[42;30m DONE \u001b[40;32m Checked successfully in 19987ms\u001b[0m');
    let output = `\u001b[35m${tabledata.tableMetadata.tableName} ${tabledata.tableMetadata.tableComment}\u001b[0m\n`.padStart(71);
    output += '┌'.padEnd(15, '─');
    output += '┬'.padEnd(15, '─').repeat(columns.length - 1);
    output += '┐\n';
    for (const elem of columns) output += '│' + elem.padEnd(14 - elem.length);
    output += '│\n';
    output += '├'.padEnd(15, '─');
    output += '┼'.padEnd(15, '─').repeat(columns.length - 1);
    output += '┤\n';
    for (const [index, elem] of tabledata.fields.entries()) {
        let { type, fieldName, fieldComment, allowNull, length, decimal, primaryKey, autoIncrement } = elem;
        // 注释保留7位
        fieldComment = fieldComment.substr(0, 7);
        output += '│' + fieldName.padEnd(14);
        output += '│' + fieldComment.padEnd(14 - fieldComment.split(/[^\u4e00-\u9fa5]+/).join('').length);
        output += '│' + type.padEnd(14);
        output += '│' + length.toString().padEnd(14);
        output += '│' + decimal.toString().padEnd(14);
        output += !allowNull ? '│' + '✔'.padEnd(14) : '│' + '✖'.padEnd(14);
        output += primaryKey ? '│' + '✔'.padEnd(14) : '│' + '✖'.padEnd(14);
        output += autoIncrement ? '│' + '✔'.padEnd(14) : '│' + '✖'.padEnd(14);
        output += '│';
        output += index === (tabledata.fields.length - 1) ? '\n└'.padEnd(16, '─') : '\n├'.padEnd(16, '─');
        output += index === (tabledata.fields.length - 1) ? '┴'.padEnd(15, '─').repeat(columns.length - 1) : '┼'.padEnd(15, '─').repeat(columns.length - 1);
        output += index === (tabledata.fields.length - 1) ? '┘\n' : '┤\n';
    }
    console.log(output);
}

const tabledata = _parse('./test');
_print(tabledata);
