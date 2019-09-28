/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-08 14:37:53
 * @LastEditTime: 2019-07-08 14:37:53
 * @LastEditors: your name
 */
var cppModule = require('./compilexCpp');
var javaModule = require('./compilexJava');
var py2Module = require('./compilexPython2');
var py3Module = require('./compilexPython3')
var fs = require('fs');

exports.stats = false;

exports.init = function(option){
    if(option){
        if(option.stats === true){
            console.log('Statistics for compilex is on'.green);
            exports.stats = true;
        }
    }
    fs.exists('./tempC',function(exists){
        if(!exists){
            if(exports.stats){
                console.log('INFO: '.cyan + 'temp dir created for stoting temp files'.cyan);
            }
            fs.mkdirSync('./tempC');
        }
    });
    fs.exists('./tempJava',function(exists){
        if(!exists){
            if(exports.stats){
                console.log('INFO: '.cyan + 'temp dir created for stoting temp files'.cyan);
            }
            fs.mkdirSync('./tempJava');
        }
    });
    fs.exists('./tempPy2',function(exists){
        if(!exists){
            if(exports.stats){
                console.log('INFO: '.cyan + 'temp dir created for stoting temp files'.cyan);
            }
            fs.mkdirSync('./tempPy2');
        }
    });
    fs.exists('./tempPy3',function(exists){
        if(!exists){
            if(exports.stats){
                console.log('INFO: '.cyan + 'temp dir created for stoting temp files'.cyan);
            }
            fs.mkdirSync('./tempPy3');
        }
    });
}

exports.compileCpp = function(envData, code , fn){
    if(exports.stats)
        cppModule.stats = true;
    cppModule.compileCpp(envData,code,fn);
}

exports.compileCppWithInput = function(envData,code, input, fn){
    if(exports.stats)
        cppModule.stats = true;
    cppModule.compileCppWithInput(envData,code,input,fn);
}

exports.compileJava = function(envData,code,fn){
    if(exports.stats)
        javaModule.stats = true;
    javaModule.compileJava(envData,code,fn);
}

exports.compileJavaWithInput = function(envData,code,input,fn){
    if(exports.stats)
        javaModule.stats = true;
    javaModule.compileJavaWithInput(envData,code,input,fn);
}

exports.compilePy2 = function(envData,code,fn){
    if(exports.stats)
        py2Module.stats = true;
    py2Module.compilePython2(envData,code,fn);
}


exports.compilePy2WithInput = function(envData,code,input,fn){
    if(exports.stats)
        py2Module.stats = true;
    py2Module.compilePython2WithInput(envData,code,input,fn);
}

exports.compilePy3 = function(envData,code,fn){
    if(exports.stats)
        py3Module.stats = true;
    py3Module.compilePython3(envData,code,fn);
}


exports.compilePy3WithInput = function(envData,code,input,fn){
    if(exports.stats)
        py3Module.stats = true;
    py3Module.compilePython3WithInput(envData,code,input,fn);
}

