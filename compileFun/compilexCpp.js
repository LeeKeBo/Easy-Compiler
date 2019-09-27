/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-08 14:37:53
 * @LastEditTime: 2019-08-27 16:06:42
 * @LastEditors: Please set LastEditors
 */
var exec = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');
var colors = require('colors')

exports.stats = false;

exports.compileCpp = function (envData, code, fn) {
    // var fileName = cuid.slug();
    // var fileName = Math.random().toString(36).slice(-8);
    var fileName = envData.option.fileName;
    path = './tempC/';

    fs.writeFile(path + fileName + '.cpp', code, function (err) {
        if (exports.stats) {
            if (err) {
                console.log('ERROR'.red + err)
                var out = {
                    error: err
                }
                fn(out)
            }
            else {
                console.log('INFO:'.green + fileName + '.cpp created');

                command = "g++ " + path + fileName + '.cpp -o' + path + fileName + '.out';
                exec(command, function (error, stdout, stderr) {
                    if (error) {
                        if (exports.stats)
                            console.log('INFO:'.green + fileName + '.cpp contained an error while compling');

                        var out = {
                            error: stderr
                        };
                        fn(out);
                    } else {

                        var valPro = exec("valgrind " + path + fileName + ".out", function (error, stdout, stderr) {
                            if (error) {
                                var out = {
                                    error: erorr
                                }
                                fn(out);
                            }
                            else if (!stderr.match("All heap blocks were freed -- no leaks are possible")) {
                                var out = {
                                    error: "分配空间未完全释放，请检查代码"
                            }
                                fn(out);
                            }
                            else {
                                var progNotFinished = true;
                                var out = {};
                                var cPro = exec(path + fileName + '.out', function (error, stdout, stderr) { //执行.out文件
                                    if (error) { //error
                                        if (error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1) {
                                            out.error = 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.'
                                            progNotFinished = false;
                                            fn(out);
                                        } else {
                                            if (exports.stats) {
                                                console.log('INFO: '.green + fileName + '.cpp contained an error while executing');
                                            }
                                            out.error = stderr || "Time limited";
                                            progNotFinished = false;
                                            fn(out);
                                        }
                                    } else { //successfully
                                        if (exports.stats) {
                                            console.log('INFO: '.green + fileName + '.cpp successfully compiled and executed !');
                                        }
                                        out.output = stdout;
                                        progNotFinished = false;
                                        fn(out);
                                    }

                                }) //exec the fileName.out
                                if (envData.option.timeout) { //kill the time limited file
                                    timeCommand = "kill -s 9 " + cPro.pid;
                                    setTimeout(function () {
                                        exec(timeCommand, function (error, stdout, stderr) {
                                            if (progNotFinished) {
                                                progNotFinished = false; // programme finished
                                                if (exports.stats) {
                                                    console.log('INFO: '.green + fileName + '.out was killed after ' + envData.option.timeout + 'ms');
                                                }
                                                out.timeout = true;
                                            }
                                        }) // exec
                                    }, envData.option.timeout) //setTimeout
                                }
                            }
                        })

                        setTimeout(function(){
                            exec("kill -s 9" +valPro.pid,function(error,stdout,stderr){
                                console.log(valPro.pid)
                                var out = {
                                    timeout: true
                                }
                                fn(out);
                            })
                        },3000);
                    }

                }) //exec the compiler command.red

            }
        } //exports.stats
    }) //writeFile


} //compileCpp

exports.compileCppWithInput = function (envData, code, input, fn) {
    // var fileName = cuid.slug();
    var fileName = envData.option.fileName;
    path = './tempC/';
    fs.writeFile(path + fileName + '.cpp', code, function (err) { //write the file
        if (err) //err
            console.log('ERROR:'.red + err);
        else {
            console.log('INFO: '.green + fileName + '.cpp created');
            command = 'g++ ' + path + fileName + '.cpp -o ' + path + fileName + '.out';
            exec(command, function (error, stdout, stderr) { //compile the cpp file
                if (error) { //error
                    if (exports.stats) {
                        console.log('INFO: '.green + fileName + '.cpp contained an error while compiling');
                    }
                    var out = {
                        error: stderr
                    };
                    fn(out);
                } else {

                    var inputfile = fileName + 'input.txt';
                    if(input){
                        fs.writeFileSync(path + inputfile, input);
                    }

                    var valPro = exec("valgrind " + path + fileName + ".out"+ ' < ' + path + inputfile, function (error, stdout, stderr) {
                        if (error) {
                            var out = {
                                error: erorr
                            }
                            fn(out);
                        }
                        else if (!stderr.match("All heap blocks were freed -- no leaks are possible")) {
                            var out = {
                                error: "分配空间未完全释放，请检查代码"
                            }
                            fn(out);
                        }
                        else {
                            if (input) { //has input
                                progNotFinished = true;
                                var out = {};

                               
                                var cPro = exec(path + fileName + '.out' + ' < ' + path + inputfile, function (error, stdout, stderr) { //exec the .out file
                                    if (error) { //error
                                        if (error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1) {
                                            out.error = 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.'
                                            progNotFinished = false;
                                            fn(out);
                                        } else {
                                            if (exports.stats) {
                                                console.log('INFO: '.green + fileName + '.cpp contained an error while executing');
                                            }
                                            out.error = stderr || "Time limited";
                                            progNotFinished = false;
                                            fn(out);
                                        }
                                    } else { //successfully
                                        if (exports.stats) {
                                            console.log('INFO: '.green + fileName + '.cpp successfully compiled and executed !');
                                        }
                                        out.output = stdout;
                                        progNotFinished = false;
                                        fn(out);
                                    }
                                })

                                if (envData.option.timeout) { //kill the time limited file
                                    timeCommand = "kill -s 9 " + cPro.pid;
                                    setTimeout(function () {
                                        exec(timeCommand, function (error, stdout, stderr) {
                                            if (progNotFinished) {
                                                progNotFinished = false;
                                                if (exports.stats) {
                                                    console.log('INFO: '.green + fileName + '.out was killed after ' + envData.option.timeout + 'ms');
                                                }
                                                out.timeout = true;
                                            }
                                        }) // exec
                                    }, envData.option.timeout) //setTimeout
                                }

                            } else //no input file
                            {
                                if (exports.stats) {
                                    console.log('INFO: '.green + 'Input mission for ' + fileName + '.cpp');
                                }
                                var out = {
                                    error: 'Input Missing'
                                };
                                fn(out);
                                progNotFinished = false;
                            }
                        }
                    });
                    setTimeout(function(){
                        exec("kill -s 9" +valPro.pid,function(error,stdout,stderr){
                            console.log(valPro.pid)
                            var out = {
                                timeout: true
                            }
                            fn(out);
                        })
                    },3000);
                }
            })
        }
    }) //writeFile

} //compileCppWithInput