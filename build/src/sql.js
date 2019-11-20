"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("./is");
function upsert(tableName, columnsOrDatas, datas) {
    const id = datas.shift();
    let columns;
    if (is_1.isObject(columnsOrDatas)) {
        columns = Object.keys(columnsOrDatas).join(',');
        datas = Object.values(columnsOrDatas);
    }
    else {
        columns = columnsOrDatas;
    }
    const insertKeys = columns.split(',').map((k) => '`' + k + '`').join(',');
    const questionMarks = columns.split(',').map((x) => '?').join(',');
    const updateKeys = columns.split(',');
    updateKeys.shift();
    const updateQueries = updateKeys.map((k) => '`' + k + '`' + '=?').join(',');
    const sql = `insert into \`${tableName}
    \` (${insertKeys}) values (${questionMarks}) on duplicate key update ${updateQueries};`;
    const values = [id, ...datas, ...datas];
    return [sql, values];
}
exports.upsert = upsert;
