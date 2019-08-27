/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 11:26:05
 * @LastEditTime: 2019-08-27 23:31:11
 * @LastEditors: Please set LastEditors
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./userSqlMapping')

var pool = mysql.createPool($conf.mysql);

// console.log($sql);
// console.log($conf);


var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};



module.exports = {
    add: function (openid, callback) {
        pool.getConnection(function (err, connection) {
            // console.log($sql.user)
            connection.query($sql.user.insert, [openid, 0], function (err, result) {
                console.log(result);
                if (result) {
                    console.log("jiumi")
                    result = {
                        code: 200,
                        msg: '增加成功'
                    };
                }
                connection.release();
                callback(result)
            })
        });
    },
    findByOpenid: function (openid, callback) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.user.queryByOpenid, [openid], function (err, result) {
                // console.log(result)
                connection.release();
                callback(result);
            })
        })
    },
    update: function (params, callback) {
        pool.getConnection(function (err, connection) {
            var cmd = 'update user set useTime='+params.newUseTime+','+params.type+'='+params.newNum+' where openid=\"'+params.openid+'\";';
            connection.query(cmd, function (err, result) {
                connection.release();
                callback(result);
            })
        })
    },
    findTypeByOpenid: function (params, callback) {
        pool.getConnection(function (err, connection) {
            var cmd = 'select useTime,' + params.type + ' from user where openid=\"' + params.openid + '\";';
            connection.query(cmd,function (err, result) {
                connection.release();
                callback(result);
            })
        })
    }
}