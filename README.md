# Easy Compiler's backend
 an online compiler with node.js
 the frontend rep: [easy compiler frontend](https://github.com/boboceng/cppp)
 it run with weapp, a platform by wechat,tencent.
+ before run:
   + install node.js and npm
   + run `npm install` ,if have something else need to install, use npm to install 
   + I have delete the conf dir , you should make it by yourself:
      + `mkdir conf` 
      + `vim db.js`:
        + ```javascript
            module.exports = {
                mysql:{
                    host:'127.0.0.1'(use your own address),
                    user:$yourdbUserName,
                    password:$yourPassword,
                    database:'compiler',
                    port:3306(use your own port)
                }
            }
          ```
     + create the database compiler
        + `create database compiler`
        + `use compiler`
        + create the tables like below:
        
user table:

| Field | Type | Null | Key | Default | Extra |
| :---: | :--: | :--: | :-: | :-----: | :---: |
| openid | varchar(30) | NO |  | NULL |  |
| useTime | int(11) | NO |  | NULL |  | 
| C | int(11) | NO |  | 0 |  | 
| Cpp | int(11) | NO |  | 0 |  | 
| java | int(11) | NO |  | 0 |  | 
| python2 | int(11) | NO |  | 0 |  | 
| python3 | int(11) | NO |  | 0 |  | 

userinfo table:

| Field | Type | Null | Key | Default | Extra |
| :---: | :--: | :--: | :-: | :-----: | :---: |
| openid | varchar(30) | NO |  | NULL |  |
| username | varchar(50) | YES |  | NULL |  |

file table:

| Field | Type | Null | Key | Default | Extra |
| :---: | :--: | :--: | :-: | :-----: | :---: |
| id | int(11) | NO | PRI | NULL | auto_increment|
| openid | varchar(30) | NO |  | NULL |  |
| time | varchar(20) | NO |  | NULL |  |
| path | varchar(128) | NO |  | NULL |  |
| type | varchar(8) | NO |  | NULL |  |
| filename | varchar(30) | YES |  | hello file |  |




+ run:
   + `npm start` 

