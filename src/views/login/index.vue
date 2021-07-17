<template>
  <div class="login">
    <div class="box">
      <span>使用账号 登录官网</span>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="user">
          <el-input type="text" v-model="ruleForm.user" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button type="success" @click="register()">注册</el-button>
          <el-button @click="()=>{this.$router.go(-1)}">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { setStore,removeStore,getStore } from "@/utils/storage";
import path from 'assets/js/path';

export default {
  data() {
    let validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: "",
        pass: ""
      },
      rules: {
        user: [{ validator: validateUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      },
      cart: [],

    };
  },
  mounted () {
    // 缓存当前购物车中的数据
    this.loginAddCart()
  },
  methods: {
    loginAddCart(){
      let cartArr = []
      let localCart = JSON.parse(getStore('buyCart')).carList
      if(localCart && localCart.length){
        localCart.forEach((item)=>{
        cartArr.push({
          userId : getStore('id'),
          productId : item.productId,
          productNum : item.productNum
        })
      })
      }
      this.cart = cartArr
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let res = await this.$axios.post(path.login, {
              username: this.ruleForm.user
            });
            if (res.data.code === 200) {
              let { username, id, token } = res.data;
              // 数据持久化
              setStore("token", token);
              setStore('id',id)
              setStore('username',username)

              if(this.cart && this.cart.length){
                this.cart.forEach(async (item)=>{
                  let res = await this.$axios.post(path.cartList,item)
                  if(res.data.success === true){
                    // 
                  }
                })
                removeStore('buyCart')
              }
            }
            // 页面重定向
            this.$router.push({
              name: "home"
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    register () {
      alert('注册成功')
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  overflow: visible;
  background: #ededed;
  .box {
    width: 450px;
    border: 1px solid #dadada;
    border-radius: 10px;
    position: absolute;
    top: 200px;
    left: 50%;
    padding: 50px 50px 50px 10px;
    margin-left: -225px;
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 10px 20px -10px rgba(0, 0, 0, 0.04);
    text-align: center;
    form {
      margin-top: 30px;
    }
    span {
      color: #333;
      font-weight: 400;
    }
  }
}
</style>