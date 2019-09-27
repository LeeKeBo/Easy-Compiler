var fileDao = require('../dao/fileDao')
var redisStore = require('../dao/redisFun')
var fs = require('fs')
var path = require('path')

exports.getFileList = function (req, res) {
    var sessionId = req.headers['sessionid'];
    var type = req.query.type;
    var hasType = req.query.hasType
    if (type == "C++")
        type = "Cpp";

    redisStore.getOpenid(sessionId, function (openid) {
        if (openid == null) {
            res.status(404).send("请尝试重新登录");
        }
        else {
            if (hasType === "false") {
                fileDao.findAllFileList(openid, function (result) {
                    var resultList = []
                    for (var i = 0; i < result.length; i++) {
                        resultList.unshift(result[i]);
                    }
                    res.json(resultList)
                })
            } else {
                fileDao.findFileList(openid, type, function (result) {
                    var resultList = []
                    for (var i = 0; i < result.length; i++) {
                        resultList.unshift(result[i]);
                    }
                    res.json(resultList)
                })
            }
        }
    })
}

exports.getFile = function (req, res) {
    var type = req.query.type, time = req.query.time, sessionId = req.headers['sessionid'];
    redisStore.getOpenid(sessionId, function (openid) {
        if (openid == null) {
            res.status(404).send("请尝试重新登录");
        }
        else {
            fileDao.findFilePath(openid, type, time, function (result) {
                var filePath = "../" + result[0].path;
                fs.readFile(path.join(__dirname, filePath), function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(404).send("文件读取失误");
                    } else {
                        var pickerIndex = 0;
                        if (type == "Cpp") {
                            type = "C++"
                            pickerIndex = 1;
                        } else if (type == "java") {
                            pickerIndex = 2;
                        } else if (type == "python2") {
                            pickerIndex = 3;
                        } else if (type == "python3") {
                            pickerIndex = 4;
                        }
                        res.json({
                            code: data.toString(),
                            type: type,
                            pickerIndex: pickerIndex
                        })
                    }
                });


            })
        }
    })

}
