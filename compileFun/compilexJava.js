/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-09 00:18:56
 * @LastEditTime: 2019-08-26 22:52:33
 * @LastEditors: Please set LastEditors
 */
var cuid = require('cuid');
var colors = require('colors');
var fs = require('fs');
var exec = require('child_process').exec;
// var spawn = require('child_process')

exports.stats = false;

exports.compileJava = function (envData, code, fn) {
    // var fileName = cuid.slug();
    var fileName = Math.random().toString(36).slice(-8);
    var className = envData.option.className;
    var path = "./tempJava/" + fileName;
    var javaFile = className + '.java';
    var exist = fs.existsSync(path);
    if (!exist) {
        fs.mkdirSync(path);
    }
    fs.writeFile(path + '/' + javaFile, code, function (err) { //write file
        if (exports.stats) {
            if (err) {
                console.log('INFO: '.green + 'write file error'.red); //error
            } else {
                console.log('INFO:'.green + ' create ' + javaFile + ' successfully');
                var command = 'javac ' + path + '/' + javaFile;
                exec(command, function (error, stdout, stderr) { //compile the java file
                    if (error) { //error
                        if (exports.stats) {
                            console.log('INFO: '.green + javaFile + ' contained an error while compiling');
                        }
                        var out = {
                            error: stderr
                        };
                        fn(out);
                    } else {
                        progNotFinished = true;
                        var out = {};
                        var command2 = 'cd ' + path + ' && java ' + className;
                        var javaPro = exec(command2, function (error, stdout, stderr) { //run the java pro
                            if (error) { //error
                                if (exports.stats) {
                                    console.log('INFO: '.green + javaFile + ' contained an error while compiling');
                                }
                                out.error = stderr || "Time limited";
                                progNotFinished = false;
                                fn(out);
                            } else {
                                if (exports.stats) {
                                    console.log('INFO: '.green + javaFile + ' successfully compiled and executed !');
                                }
                                out.output = stdout;
                                progNotFinished = false;
                                fn(out);
                            }
                        }) //run the java file
                        if (envData.option.timeout) {
                            timeCommand = 'kill -s 9 ' + javaPro.pid; //kill the javaPro used pid
                            setTimeout(function () {
                                exec(timeCommand, function (error, stdout, stderr) { //time limited
                                    if (progNotFinished) {
                                        progNotFinished = false; // programme finished
                                        if (exports.stats) {
                                            console.log('INFO: '.green + javaFile + ' was killed after ' + envData.option.timeout + 'ms');
                                        }
                                        out.timeout = true;
                                    }
                                }) // exec kill
                            }, envData.option.timeout) //setTimeout
                        }

                    }
                }) //compile the java file
            }
        }
    }) //write file
} //compileJava

exports.compileJavaWithInput = function (envData, code, input, fn) {
    // var fileName = cuid.slug();
    var fileName = Math.random().toString(36).slice(-8);
    var className = envData.option.className;
    var path = "./tempJava/" + fileName;
    var javaFile = className + '.java';
    var exist = fs.existsSync(path);
    if (!exist) {
        fs.mkdirSync(path);
    }
    fs.writeFile(path + '/' + javaFile, code, function (err) { //write file
        if (exports.stats) {
            if (err) {
                console.log('INFO: '.green + 'write file error'.red); //error
            } else {
                console.log('INFO:'.green + ' create ' + javaFile + ' successfully');
                var command = 'javac ' + path + '/' + javaFile;
                exec(command, function (error, stdout, stderr) { //compile the java file
                    if (error) { //error
                        if (exports.stats) {
                            console.log('INFO: '.green + javaFile + ' contained an error while compiling');
                        }
                        var out = {
                            error: stderr
                        };
                        fn(out);
                    } else {
                        fs.writeFileSync(path + '/input.txt', input);

                        progNotFinished = true;
                        var out = {};
                        var command2 = 'cd ' + path + ' && java ' + className + '<input.txt';
                        var javaPro = exec(command2, function (error, stdout, stderr) { //run the java pro
                            if (error) { //error
                                if (exports.stats) {
                                    console.log('INFO: '.green + javaFile + ' contained an error while compiling');
                                }
                                out.error = stderr || "Time limited";
                                progNotFinished = false;
                                fn(out);
                            } else {
                                if (exports.stats) {
                                    console.log('INFO: '.green + javaFile + ' successfully compiled and executed !');
                                }
                                out.output = stdout;
                                progNotFinished = false;
                                fn(out);
                            }
                        }) //run the java file
                        if (envData.option.timeout) {
                            timeCommand = 'kill -s 9 ' + javaPro.pid; //kill the javaPro used pid
                            setTimeout(function () {
                                exec(timeCommand, function (error, stdout, stderr) { //time limited
                                    if (progNotFinished) {
                                        progNotFinished = false; // programme finished
                                        if (exports.stats) {
                                            console.log('INFO: '.green + javaFile + ' was killed after ' + envData.option.timeout + 'ms');
                                        }
                                        out.timeout = true;
                                    }
                                }) // exec kill
                            }, envData.option.timeout) //setTimeout
                        }

                    }
                }) //compile the java file
            }
        }
    }) //write file


} //compilerJavaWithInput