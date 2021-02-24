var express = require('express');
var router = express.Router();



// 引入mongoose
const mongoose = require('mongoose');

// 引入goos的mode
const GoodsModel = require('../model/goods');


// 创建数据路连接
mongoose.connect('mongodb://127.0.0.1:27017/itmall',{ useUnifiedTopology: true,useNewUrlParser: true });

// 监听数据库连接状态
mongoose.connection.on('connected',function () { 
    console.log('数据库连接成功');
 })

 mongoose.connection.on('error',function () { 
    console.log('数据库error');
 })

 mongoose.connection.on('disconnected',function () { 
    console.log('数据库连接失败');
 })

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource for goods');
});



// 一键新增默认数据

router.get('/defaultInsert', function (req, res, next) { 
    // res.send('this place insert default goods to Mongodb')
    /**
     * 这里执行增加默认数据的逻辑
     * 
    */
   let defaultList = [];
   for (var i=1;i<=100;i++) {
       let item = {productId: new mongoose.Types.ObjectId,productName: 'goods'+ i,productType:'type'+i,checked:'1',salePrice:(Math.random()*10000).toFixed(2),productNum:100}
    //    console.log(Math.random().toFixed(0)*10,'Math.random()*10');
       defaultList.push(item)
    // defaultList.push((Math.random()*10000).toFixed(2));
   }
   GoodsModel.insertMany(defaultList,(err,doc)=>{
        if (err){
            console.log('err');
            return;
        }
        res.json({
            status: 0,
            msg:'default数据添加成功!',
            result: {}
        });
   });
 });

 // 查询所有的商品
 router.get('/getAllGoods', (req, res, next) =>{
     GoodsModel.find({},(err,doc)=>{
         if (err) {
             console.log(err);
             return;
         }
         res.json({
             status: 0,
             mag: '',
             result: {
                 count: doc.length,
                 list: doc
             }
         });
     })
 });

 // 按照salePrice查询商品，并按着价格的高度去排序,并排序
 router.get('/getGoodsByPrice',(req, res, next)=>{
     let startPrice = req.query.startPrice;
     let endPrice = req.query.endPrice;
     let sort = {salePrice:req.query.sort};
     let pageSize = parseInt(req.query.pageSize);
     let page = parseInt(req.query.page);
     let skipPage = (page - 1)*pageSize;
     let query = {salePrice: {$gte: startPrice, $lte: endPrice}};
     console.log(skipPage,pageSize);
     GoodsModel.find(query).skip(skipPage).limit(pageSize).sort(sort).exec((err,doc)=>{
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: 0,
            msg: '查询成功',
            result: {
                count: doc.length,
                list: doc
            }
        })
     })
     
 });

 // admin管理添加商品insertGoods
 router.post('/insertGoods',(req, res, next)=>{
    // 通过req获取新增的数据
    let insertData = {productName: "MacBook Pro 2021",productNum: 100,productType: "数码科技",salePrice:13999}
    GoodsModel.create(insertData,(err,doc)=> {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: 0,
            msg: '新增成功',
            result:{
                count: doc.length
            }
        })
    });
 })

 // 根据商品名称查找productId
 router.get('/getIdByGoodsName', (req, res, next) =>{
    GoodsModel.find({},(err,doc)=>{
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: 0,
            mag: '',
            result: {
                count: doc.length,
                list: doc
            }
        });
    })
});



module.exports = router;
