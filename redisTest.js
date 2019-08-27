/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 22:29:45
 * @LastEditTime: 2019-08-27 22:33:20
 * @LastEditors: Please set LastEditors
 */
const redis = require('redis')
const crypto = require('crypto')

var client = redis.createClient(6379, 'localhost');

var openid = "jiumi"
const hash = crypto.createHash('sha1');
hash.update(openid);
var sessionId = hash.digest('hex');

client.set(sessionId,openid);
client.get(sessionId,function(err,value){
    console.log(value);
})