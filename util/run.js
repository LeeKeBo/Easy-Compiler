/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 23:35:51
 * @LastEditTime: 2019-08-28 00:27:41
 * @LastEditors: Please set LastEditors
 */
var compiler = require('../compileFun/compiler');
var redisStore = require('../dao/redisFun');
var userDao = require('../dao/userDao');
var fileDao = require('../dao/fileDao')
var moment = require('moment')

var option = {
    stats: true
};
compiler.init(option);

exports.run = function (req, res) {
    var code = req.body.code; //code
    var input = req.body.input; //input
    var inputRadio = req.body.inputRadio; //hasInput?
    var type = req.body.type; //type
    var sessionId = req.headers['sessionid']
    var filename = Math.random().toString(36).slice(-8);//生成随机名
    // console.log(sessionId)
    redisStore.getOpenid(sessionId, function (openid) {
        if (openid == null) {
            res.send("请尝试重新登录");
        } else {
            var tempType = type;
            if (tempType == 'C++')
                tempType = "Cpp";
            userDao.findTypeByOpenid({
                type: tempType,
                openid: openid
            }, function (result) {
                if(result[0]){
                    userDao.update({
                        newUseTime: ++result[0].useTime,
                        type: tempType,
                        newNum: ++result[0][tempType],
                        openid: openid
                    }, function (result) {
                        if (result.changedRows == 1) {
                            console.log("yes");
                        }
                    })
                }
            })

            var data = moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString()
            fileDao.addFile({
                time: data,
                filename: filename,
                openid: openid,
                type: tempType,
                className:req.body.className
            }, function (result) {})

            if (inputRadio) {
                var envData = {
                    option: {
                        timeout: 4000,
                        className: req.body.className,
                        fileName: filename
                    }
                };
                if (type === 'C' || type === 'C++') {
                    compiler.compileCppWithInput(envData, code, input, function (data) {
                        if (data.timeout === true) {
                            res.send("Time limited");
                        } else if (data.error) {
                            res.send(data.error);
                        } else {
                            res.send(data.output);
                        }
                    })
                } else if (type === 'java') {
                    compiler.compileJavaWithInput(envData, code, input, function (data) {
                        if (data.timeout === true) {
                            res.send("Time limited");
                        } else if (data.error) {
                            res.send(data.error);
                        } else {
                            res.send(data.output);
                        }
                    })
                } else if (type === 'python2') {
                    compiler.compilePy2WithInput(envData, code, input, function (data) {
                        if (data.timeout === true) {
                            res.send("Time limited");
                        } else if (data.error) {
                            res.send(data.error);
                        } else {
                            res.send(data.output);
                        }
                    })
                } else if (type === 'python3') {
                    compiler.compilePy3WithInput(envData, code, input, function (data) {
                        if (data.timeout === true) {
                            res.send("Time limited");
                        } else if (data.error) {
                            res.send(data.error);
                        } else {
                            res.send(data.output);
                        }
                    })
                } else {
                    res.send("暂不支持");
                }
            } else {
                var envData = {
                    option: {
                        timeout: 3000,
                        className: req.body.className,
                        fileName: filename
                    }
                };
                if (type === 'C' || type === 'C++') {
                    compiler.compileCpp(envData, code, function (data) {

                        if (data.timeout === true) {
                            res.send("Time limited");
                        } else if (data.error) {
                            res.send(data.error);
                        } else {
                            res.send(data.output);
                        }
                        return;
                    });
                } else if (type === 'java') {
                    compiler.compileJava(envData, code, function (data) {
                        if (data.timeout === true) {
                            res.send("Time limited");
                        } else if (data.error) {
                            res.send(data.error);
                        } else {
                            res.send(data.output);
                        }
                        return;
                    })
                } else if (type === 'python2') {
                    compiler.compilePy2(envData, code, function (data) {
                        if (data.timeout === true) {
                            res.send("Time limited");
                        } else if (data.error) {
                            res.send(data.error);
                        } else {
                            res.send(data.output);
                        }
                        return;
                    })
                } else if (type === 'python3') {
                    compiler.compilePy3(envData, code, function (data) {
                        if (data.timeout === true) {
                            res.send("Time limited");
                        } else if (data.error) {
                            res.send(data.error);
                        } else {
                            res.send(data.output);
                        }
                        return;
                    })
                } else {
                    res.send("暂不支持");
                }
            }
        }
    })
}