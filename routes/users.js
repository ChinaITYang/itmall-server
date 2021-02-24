var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// 引入mongoose
const mongoose = require('mongoose');


const utilsFun = require('../utils/util');
//
const UserModel = require('../model/users');
router.get('/setDataForUser', function(req, res, next) {
  let defaultList = [];
   
   for (var i=1;i<=100;i++) {
    let sexValue = parseInt(  Math.random()*10);
      let sex = '男';
      if (sexValue == 0||sexValue%2 == 0) {
        sex = '女';
      } else {
        sex = '男';
      }
       let item = {userId: new mongoose.Types.ObjectId,userName: utilsFun.getRandomName(),pwd:'123456',sex: sex,age: parseInt(  Math.random()*100)+parseInt(  Math.random()*10)};
       defaultList.push(item);
   }
  UserModel.insertMany(defaultList,(err,doc)=>{
      if (err){
          console.log('err');
          return;
      }
      res.json({
          status: 0,
          msg:'defaultUserData数据添加成功!',
          result: {}
      });
  });
})


// 查询所有的商品
router.get('/getAllUsers', (req, res, next) =>{
  UserModel.find({},(err,doc)=>{
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


// 登录接口
router.post('/login', (req, res, next) =>{
  let param = {
    userName: req.body.userName,
    pwd: req.body.pwd,
  }
  UserModel.findOne(param,(err,doc)=>{
      if (err) {
          console.log(err);
          return;
      }
      if (doc) {
        // 设置coookie
        res.cookie("userId",doc.userId,{path:"/",maxAge:1000*60*60});
        // 设置session
        res.session.user = doc;
      }
      res.json({
          status: 0,
          mag: '',
          result: {
              userName: doc.userName
          }
      });
  })
});

module.exports = router;
