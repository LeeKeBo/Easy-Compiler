/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 16:46:15
 * @LastEditTime: 2019-08-27 16:06:06
 * @LastEditors: Please set LastEditors
 */
var exec = require('child_process').exec;
var cuid = require('cuid');
var fs = require('fs');
var color = require('colors');

exports.stats = false;

exports.compilePython2 = function (envData, code, fn) {
    // var fileName = cuid.slug();
    var fileName = envData.option.fileName;
    var path = "./tempPy2";
    var pyFile = fileName + '.py';
    fs.writeFile(path + '/' + pyFile, code, function (err) {
        if (exports.stats) {
            if (err) {
                console.log("INFO: ".red + err);
                var out = {
                    error: "write file error!".red
                };
                fn(out);
            } else {
                var progNotFinished = true;
                var out = {};
                console.log("create " + pyFile + " successfully");
                var command = "python2 " + path + "/" + pyFile;
                var py2Pro = exec(command, function (error, stdout, stderr) {
                    if (error) {
                        out.error = stderr || "Time limited";
                        progNotFinished = false;
                        fn(out);
                    } else {
                        out.output = stdout;
                        progNotFinished = false;
                        fn(out);
                    }
                });
                if (envData.option.timeout) {
                    setTimeout(function () {
                        if (progNotFinished) {
                            var killCommand = "kill -s 9 " + py2Pro.pid;
                            exec(killCommand, function (error, stdout, stderr) {
                                if (exports.stats) {
                                    console.log('INFO: '.green + pyFile + ' was killed after ' + envData.option.timeout + 'ms');
                                }
                                out.timeout = true;
                            })
                        }
                    }, envData.option.timeout);
                }
            }

        }
    });
}

exports.compilePython2WithInput = function (envData, code, input, fn) {
    // var fileName = cuid.slug();
    var fileName = envData.option.fileName;
    var path = "./tempPy2";
    var pyFile = fileName + '.py';
    fs.writeFile(path + '/' + pyFile, code, function (err) {
        if (exports.stats) {
            if (err) {
                console.log("INFO: ".red + err);
                var out = {
                    error: "write file error!".red
                };
                fn(out);
            } else {
                fs.writeFile(path + '/' + fileName + '.txt', input, function (err) {
                    if (err) {
                        console.log("INFO: ".red + err);
                        var out = {
                            error: "write input file error".red
                        };
                        fn(out);
                    } else {
                        var progNotFinished = true;
                        var out = {};
                        console.log("create " + pyFile + " successfully");
                        var command = "python2 " + path + "/" + pyFile + "<" + path + '/' + fileName + ".txt";
                        var py2Pro = exec(command, function (error, stdout, stderr) {
                            if (error) {
                                out.error = stderr || "Time limited";
                                progNotFinished = false;
                                fn(out);
                            } else {
                                out.output = stdout;
                                progNotFinished = false;
                                fn(out);
                            }
                        });
                        if (envData.option.timeout) {
                            setTimeout(function () {
                                if (progNotFinished) {
                                    var killCommand = "kill -s 9 " + py2Pro.pid;
                                    exec(killCommand, function (error, stdout, stderr) {
                                        if (exports.stats) {
                                            console.log('INFO: '.green + pyFile + ' was killed after ' + envData.option.timeout + 'ms');
                                        }
                                        out.timeout = true
                                    })
                                }
                            }, envData.option.timeout);
                        }
                    }
                });
            }
        }
    });
}