//goods商品列表的model

const mongoose = require('mongoose');


// 创建商品类型
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new Schema({
    userId: ObjectId,
    userName: String,
    pwd: String,
    sex: String,
    age: Number
})


module.exports = mongoose.model('users',userSchema,'users');