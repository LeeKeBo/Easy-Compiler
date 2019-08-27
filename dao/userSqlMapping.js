/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 11:22:56
 * @LastEditTime: 2019-08-27 22:41:14
 * @LastEditors: Please set LastEditors
 */
module.exports = {
	user : {
		insert: 'insert into user(openid, useTime,C,C++,java,python2,python3) values(?,?,0,0,0,0,0);',
		update: 'update user set useTime=?,?=?  where openid=?;',
		delete: 'delete from user where openid=?;',
		queryByOpenid: 'select useTime from user where openid=?;',
		queryTypeById: 'select useTime,? from user where openid=?;'
	}
}