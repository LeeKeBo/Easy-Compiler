/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 13:29:14
 * @LastEditTime: 2019-08-27 22:58:15
 * @LastEditors: Please set LastEditors
 */
const redis = require('redis')
const crypto = require('crypto')

var client = redis.createClient(6379, 'localhost');

exports.login = function (openid,session_key) {
    const hash = crypto.createHash('sha1');
    hash.update(openid+session_key);
    var sessionId = hash.digest('hex');
    client.set(sessionId, openid);
    client.expire(sessionId, 600);

    var res =  JSON.stringify({
        code: 1,
        sessionId:sessionId
    })
    return JSON.parse(res);
}

exports.isLogin = function (sessionId,callback) {
    client.get(sessionId, function (err, value) {
        if (err) {
            console.log(err.message);
            callback(-1)
        } else if(value){
            client.expire(sessionId,600)
            callback(1)
        }else{
            callback(-1)
        }
    })
}

exports.getOpenid = function(sessionId,callback){
    client.get(sessionId,function(err,value){
        if(err){
            console.log(err.message);
            callback(null)
        }else if(value){
            // console.log(value)
            callback(value)
        }else{
            callback(null)
        }
    })
}



