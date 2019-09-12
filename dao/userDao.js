/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 11:26:05
 * @LastEditTime: 2019-08-30 10:16:18
 * @LastEditors: Please set LastEditors
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./userSqlMapping')

var pool = mysql.createPool($conf.mysql);

// console.log($sql);
// console.log($conf);



module.exports = {
    add: function (openid, callback) {
        pool.getConnection(function (err, connection) {
            // console.log($sql.user)
            var addCmd = "insert into user(openid, useTime,C,Cpp,java,python2,python3) values(\'"
                + openid + "\'," + "0,0,0,0,0,0);"
            connection.query(addCmd, function (err, result) {
                if (err) {
                    connection.release();
                    callback(null)
                }
                if (result) {
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
                if (err) {
                    connection.release();
                    callback(null)
                }
                connection.release();
                callback(result);
            })
        })
    },
    update: function (params, callback) {
        pool.getConnection(function (err, connection) {
            var cmd = 'update user set useTime=' + params.newUseTime + ',' + params.type + '=' + params.newNum + ' where openid=\"' + params.openid + '\";';
            connection.query(cmd, function (err, result) {
                if (err) {
                    connection.release();
                    callback(null)
                }
                connection.release();
                callback(result);
            })
        })
    },
    findTypeByOpenid: function (params, callback) {
        pool.getConnection(function (err, connection) {
            var cmd = 'select useTime,' + params.type + ' from user where openid=\"' + params.openid + '\";';
            connection.query(cmd, function (err, result) {
                if (err) {
                    callback(null)
                }
                connection.release();
                callback(result);
            })
        })
    },
    getUseTime: function (openid, callback) {
        pool.getConnection(function (err, connection) {
            var cmd = "select useTime,C,Cpp,java,python2,python3 from user where openid=\'" + openid + "\';";
            connection.query(cmd, function (err, result) {
                if (err) {
                    connection.release();
                    callback(null)
                }
                connection.release();
                callback(result);
            })
        })
    },
    storeUserInfo: function (openid, username, callback) {
        pool.getConnection(function (err, connection) {
            var insertCmd = "insert into userinfo(openid,username) value(\'" + openid + "\',\'" + username + "\');";
            connection.query(insertCmd, function (err, result) {
                if (err) {
                    connection.release();
                    console.log(err)
                    callback(null)
                } else {
                    connection.release();
                    callback(result)
                }
            })
        })
    },
    findUserInfo: function (openid, callback) {
        pool.getConnection(function (err, connection) {
            var cmd = "select username from userinfo where openid=\'" + openid + "\';";
            connection.query(cmd, function (err, result) {
                if (err) {
                    connection.release();
                    console.log(err)
                    callback(null)
                }
                connection.release();
                callback(result);
            })
        })
    },
    updateUserInfo: function (openid, username, callback) {
        pool.getConnection(function (err, connection) {
            var cmd = "update userinfo set username=\'" + username + "\' where openid=\'" + openid + "\';";
            connection.query(cmd, function (err, result) {
                if (err) {
                    connection.release();
                    console.log(err)
                    callback(null)
                }
                connection.release();
                callback(result);
            })
        })
    }
}