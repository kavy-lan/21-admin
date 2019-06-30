<template>
  <div class='login'>
    <el-form ref="form" :model="loginform" class="container" :rules="myrules">
      <el-form-item>
        <div>
          <img src="../assets/avatar.jpg" alt="" class='avatar'>
        </div>
      </el-form-item>
  <el-form-item prop="username" >
    <el-input placeholder="请输入用户名" v-model="loginform.username" prefix-icon="myicon myicon-user" ></el-input>
  </el-form-item>
  <el-form-item prop="password" >
    <el-input placeholder="请输入密码" v-model="loginform.password" show-password  prefix-icon="myicon myicon-key"></el-input>
  </el-form-item>
  <el-button type="primary" class="login-btn" @click='handleLogin("form")'>登录</el-button>
    </el-form>
  </div>
</template>
<script>
// import axios from 'axios'
import {handleLogin} from '@/api/index.js'
export default{
  data () {
    return {
      loginform: {
        username: 'admin',
        password: '123456'
      },
      myrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin (formName) {
      // axios.post('http://localhost:8888/api/private/v1/login', (this.loginform))
      //   .then(res => {
      //     console.log(res)
      //     if (res.data.meta.status === 200) {
      //       this.$router.push({name: 'home'})
      //     }
      //   })
      this.$refs[formName].validate((isOk) => {
        if (isOk) {
          handleLogin(this.loginform)
            .then(res => {
              console.log(res)
              if (res.meta.status === 200) {
                this.$router.push({name: 'home'})
                localStorage.setItem('mytoken', res.data.token)
                // localStorage.setItem('username', res.data.username)
                this.$store.commit('setName', res.data.username)
              }
            })
        } else {
          this.$message({
            message: '校验失败',
            type: 'warning'
          })
          return false
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
