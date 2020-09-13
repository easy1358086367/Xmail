const path = require('path');
// const fs = require('fs');

// const bodyParser = require('body-parser')
// const cors = require('cors')
// const jwt = require('jsonwebtoken')

// const carListJson = require('./db/cartList.json')

function resolve(dir) {
  return path.join(__dirname, dir);
}

// //数据分页
// function pagination(data, page, number) {
//   let result = []
//   const start = (page - 1) * number
//   const end = page * number
//   result = data.slice(start, end)
//   return result
// }
// // 数组对象排序规则
// function sortBy(type, bool) {
//   return (a, b) => {
//     return bool ? a[type] - b[type] : b[type] - a[type]
//   }
// }
// //价格过滤
// function pirceFilter(data, gt, lte) {
//   let result = []
//   result = data.filter((item) => item.salePrice >= gt && item.salePrice <= lte)
//   return result
// }

module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views',resolve('src/views'))
  },
  // devServer: {
  //   before(app, serve) {
  //     app.use(cors())
  //       .use(bodyParser.json())
  //       .use(bodyParser.urlencoded({ extended: false }))

  //     app
  //       // 首页商品
  //       .get('/api/goods/home', (req, res) => {
  //         fs.readFile('./db/home.json', "utf8", (err, data) => {
  //           if (!err) {
  //             res.json(JSON.parse(data))
  //           }
  //         })
  //       })
  //       // 全部商品及周边
  //       .get('/api/goods/allGoods', (req, res) => {
  //         const page = parseInt(req.query.page)//当前页
  //         const size = parseInt(req.query.size)//每页的显示数量
  //         const sort = parseInt(req.query.sort)//排序
  //         const priceGt = parseInt(req.query.priceGt)//价格区间--小
  //         const priceLte = parseInt(req.query.priceLte)//价格区间--大
  //         const cid = req.query.cid//商品编号
  //         let newData = []


  //         fs.readFile('./db/allGoods.json', 'utf8', (err, data) => {
  //           let { result } = JSON.parse(data)
  //           let allData = result.data//总商品详情-->[]

  //           if (cid == '1184') {
  //             // 品牌周边
  //             allData = allData.filter((item) => item.productName.match(RegExp(/Smartisan/i)))
  //           }

  //           if (sort === 1) {
  //             // 升序
  //             allData.sort(sortBy('salePrice', true))
  //           } else if (sort === -1) {
  //             // 降序
  //             allData.sort(sortBy('salePrice', false))
  //           }

  //           if (priceGt && priceLte) {
  //             // 价格过滤
  //             allData = pirceFilter(allData, priceGt, priceLte)
  //           }

  //           //分页显示
  //           newData = pagination(allData, page, size)


  //           res.json({
  //             data: newData,
  //             total: allData.length
  //           })

  //         })



  //       })
  //       // 商品详情
  //       .get('/api/goods/goodsDetail', (req, res) => {
  //         let id = req.query.productId
  //         fs.readFile('./db/goodsDetail.json', (err, data) => {
  //           if (!err) {
  //             let { result } = JSON.parse(data)
  //             let newData = result.find((item) => item.productId == id)
  //             res.json(newData)
  //           } else {
  //             res.send('err')
  //           }
  //         })
  //       })
  //       // 登录
  //       .post('/api/login', (req, res) => {
  //         let username = req.body.username
  //         res.json({
  //           // 进行加密的方法
  //           // sing(加密对象,加密规则,)
  //           token: jwt.sign({ username: username }, 'abcd', {
  //             expiresIn: '3000s'//过期时间
  //           }),
  //           username,
  //           state: 1,
  //           file: '',
  //           code: 200,
  //           id: 66



  //         })
  //       })
  //       // 用户状态验证
  //       .post('/api/validata', (req, res) => {
  //         let token = req.headers.authorization
  //         // 验证token合法性
  //         jwt.verify(token, 'abcd', (err, decode) => {
  //           if (err) {
  //             res.json({
  //               msg: '当前用户未登录'
  //             })
  //           } else {
  //             res.json({
  //               token: jwt.sign({ username: decode.username }, 'abcd', {
  //                 expiresIn: '3000s'//过期时间
  //               }),
  //               msg: '已登录',
  //               username: decode.username,
  //               state: 1,
  //               file: '',
  //               code: 200,
  //               id: 66

  //             })
  //           }
  //         })
  //       })
  //       // 添加购物车
  //       .post('/api/addCart',(req,res)=>{
  //         // 提取信息
  //         let {userId,productId,productNum} = req.body

  //         fs.readFile('./db/allGoods.json',(err,data)=>{
  //           // 获取全部商品信息
  //           let {result} = JSON.parse(data)
  //           // 判断用户是否登录
  //           if (productId && userId) {
  //             // 获取用户的购物车数组
  //             let {carList} = carListJson.result.find((item)=>item.id == userId)
  //             // 在全部商品中找到对应的商品
  //             let newData = result.data.find((item)=>item.productId == productId)
  //             // 标识用户是否购买了相同商品
  //             let flag = true
  //             // 处理相同商品
  //             carList.forEach((item)=>{
  //               if (item.productId == productId) {
  //                 if(item.productNum >= 1){
  //                   flag = false
  //                   item.productNum += parseInt(productNum)
  //                 }
  //               }
  //             })
  //             if(!carList.length || flag){
  //               newData.productNum = parseInt(productNum)
  //               carList.push(newData)
  //             }
              
  //             // 序列化
  //             fs.writeFile('./db/cartList.json',JSON.stringify(carListJson),(err,data)=>{
  //               if (!err) {
  //                 res.json({
  //                   code : 200,
  //                   message : 'success',
  //                   result : 1,
  //                   success : true,
  //                   timestamp : 1571296313981
  //                 })
  //               }
  //             })

  //           }
  //         })
  //       })
  //       // 获取用户的购物车
  //       .post('/api/cartList',(req,res)=>{
  //         let {userId} = req.body
  //         fs.readFile('./db/cartList.json',(err,data)=>{
  //           let {result} = JSON.parse(data)
  //           let newData = result.find((item)=>item.id == userId)
  //           res.json({
  //             code : 200,
  //             carList : newData,
  //             success : true,
  //             message : 'success'
  //           })
  //         })
  //       })





  //   }
  // }
};