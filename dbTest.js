/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 18:16:25
 * @LastEditTime: 2019-08-30 09:58:48
 * @LastEditors: Please set LastEditors
 */
var mysql = require('mysql');

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'toor',
    database: 'compiler',
    port: 3306
});

// var insertCmd = "insert into user(openid,useTime) values(?,?);"
// var openid = "9"

// pool.getConnection(function (err, connection) {
//    if(err){
//        throw err;
//    }
//    else{
//     console.log(openid)
//     connection.query(insertCmd, [openid,0], function (err, result) {
//         console.log(result);
//         if (result) {
//             console.log("jiumi")
//             result = {
//                 code: 200,
//                 msg: '增加成功'
//             };
//         }
//     })
//     console.log(openid)
//     connection.release();
//    }
// });
openid = "jiumi1"
var findCmd = "select time from c where openid=\'"+openid+"\';";
pool.getConnection(function(err,connection){
    connection.query(findCmd,function(err,result){
        console.log(result)
        var resultList = []
        for(var i = 0;i<result.length;i++){
            resultList.push(result[i].time);
        }
        console.log(typeof(resultList));
        
       // console.log(result['RowDataPacket'])
        connection.release();
    })
})

// var updateCmd = "update user set useTime=? where openid = ?;";
// pool.getConnection(function (err, connection) {
//     connection.query(updateCmd, [1, openid], function (err, result) {
//         console.log(err)
//         console.log(result.changedRows)
//         // console.log(result['RowDataPacket'])
//         connection.release();
//     })
// })

// pool.getConnection(function (err, connection) {
//     // console.log($sql.user)
//     var openid = "jiumi1", time = "1904923", path = "fds/fs";
//     for (var i = 0; i < 10; i++) {
//         var addCmd = "insert into c(openid, time,path) values(\'" +
//             openid  + "\',\'" + time + i + "\',\'" + path + i + "\');";

//         console.log(addCmd)

//         connection.query(addCmd, function (err, result) {
//             console.log(result);
//             if (result) {
//                 console.log("jiumi")
//                 result = {
//                     code: 200,
//                     msg: '增加成功'
//                 };
//             }
//             // callback(result)
//         })
//     }
//     connection.release();
        
// });

// var date = Date.now();
// console.log(date);

// moment = require('moment')

// console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString())