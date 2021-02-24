//goods商品列表的model

const mongoose = require('mongoose');


// 创建商品类型
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const goodsSchema = new Schema({
    productId: ObjectId,
    productName: String,
    productType: String,
    checked: String,
    salePrice: Number,
    productNum: Number
})


module.exports = mongoose.model('goods',goodsSchema,'goods');