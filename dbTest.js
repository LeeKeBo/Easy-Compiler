/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 18:16:25
 * @LastEditTime: 2019-08-27 17:23:11
 * @LastEditors: Please set LastEditors
 */
var mysql = require('mysql');

var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'toor',
    database:'compiler',
    port:3306
});

var insertCmd = "insert into user(openid,useTime) values(?,?);"
var openid = "9"

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
openid = "jiu"
// var findCmd = "select * from user where openid=? limit 1;";
// pool.getConnection(function(err,connection){
//     connection.query(findCmd,[openid],function(err,result){
//         console.log(result[0]['openid'])
//        // console.log(result['RowDataPacket'])
//         connection.release();
//     })
// })

var updateCmd = "update user set useTime=? where openid = ?;";
pool.getConnection(function(err,connection){
    connection.query(updateCmd,[1,openid],function(err,result){
        console.log(err)
        console.log(result.changedRows)
       // console.log(result['RowDataPacket'])
        connection.release();
    })
})




