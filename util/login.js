/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 00:29:03
 * @LastEditTime: 2019-08-28 00:33:41
 * @LastEditors: Please set LastEditors
 */
var userDao = require('../dao/userDao');
var redisStore = require('../dao/redisFun');
var request = require('request')

exports.login = function(req,res){
    var code = req.body.code;
    var option = {
        grant_type: 'authorization_code',
        appid: 'wxb696e1ed00f7a82f',
        secret: '2366a7f871bee89a271483e3d57f7535',
        js_code: code
    }
    var url = 'https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&appid=wxb696e1ed00f7a82f&secret=2366a7f871bee89a271483e3d57f7535&js_code=' +
        code;
    request.get({
        url: url,
        json: true
    }, function (err, response, data) {
        if (response.statusCode === 200) {
            userDao.findByOpenid(data.openid, function (user) {
                if (JSON.stringify(user) == "[]") {
                    userDao.add(data.openid, function (result) {
                        var loginStatu = redisStore.login(data.openid, data.session_key);
                        if (loginStatu.code == 1) {
                            res.json({
                                code: 1,
                                sessionId: loginStatu.sessionId
                            })
                        } else {
                            res.json({
                                code: -1
                            })
                        }
                    });
                } else {
                    console.log('用户已存在')
                    var loginStatu = redisStore.login(data.openid, data.session_key);
                    if (loginStatu.code == 1) {
                        res.json({
                            code: 1,
                            sessionId: loginStatu.sessionId
                        })
                    } else {
                        res.json({
                            code: -1
                        })
                    }
                }
            });
            // userDao.insert(data.openid)
        } else {
            console.log("[error]", err)
            res.json(err)
        }

    })
}