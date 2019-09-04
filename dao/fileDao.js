var mysql = require('mysql');
var $conf = require('../conf/db');

var pool = mysql.createPool($conf.mysql)

module.exports = {
    addFile: function (params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(false)
            }
            else {
                var path = "";
                if (params.type == 'C' || params.type == 'Cpp')
                    path = "tempC/" + params.filename + ".cpp";
                else if (params.type == 'java')
                    path = "tempJava/" + params.filename + "/"+params.className+".java";
                else if (params.type == 'python2')
                    path = "tempPy2/" + params.filename + ".py";
                else if (params.type == 'python3')
                    path = "tempPy3/" + params.filename + ".py";

                var addCmd = "insert into file (openid,time,path,type) value(\'" + params.openid + "\',\'"
                    + params.time + "\',\'" + path + "\',\'" + params.type + "\');";
                connection.query(addCmd, function (err, result) {
                    if (err) {
                        console.log(err);
                        callback(false)
                    }
                    else {
                        callback(true)
                    }
                })
            }
        })
    },
    findFileList: function (openid, type, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(null)
            }
            else {
                var findCmd = "select time,type from file where openid=\'" + openid + "\' and type=\'"
                    + type + "\';"
                connection.query(findCmd, function (err, result) {
                    connection.release();
                    callback(result)
                })
            }
        })
    },
    findAllFileList: function (openid, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(null)
            }
            else {
                var findCmd = "select time,type from file where openid=\'" + openid + "\';"
                connection.query(findCmd, function (err, result) {
                    if(err){
                        callback(null)
                    }
                    connection.release();
                    callback(result)
                })
            }
        })
    },
    findFilePath: function (openid, type, time, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(null)
            }
            else {
                var findCmd = "select path from file where openid=\'" + openid + "\' and time=\'"
                    + time + "\' and type=\'" + type + "\';";
                connection.query(findCmd, function (err, result) {
                    connection.release();
                    callback(result)
                })
            }
        })
    },
    clearFile:function(openid,callback){
        pool.getConnection(function(err,connection){
            if(err){
                callback(null)
            }else{
                var cleanCmd = "delete from file where openid=\'"+openid+"\';";
                connection.query(cleanCmd,function(err,result){
                    connection.release();
                    callback(result)
                })
            }
        })
    }
}