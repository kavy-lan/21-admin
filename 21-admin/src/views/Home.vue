<template>
  <div class="home">
    <el-container>
  <el-aside width="auto">
    <div class="logo"></div><el-menu
      default-active=""
      router
      :collapse="isCollapse"
      class="el-menu-admin"
       background-color="#F9F9F9"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu :index="item.path" v-for="item in dataList" :key='item.id'>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>

        <el-menu-item :index="val.path" v-for='val in item.children' :key='val.id'>
        <i class="el-icon-document"></i>
        <span slot="title">{{val.authName}}</span>
      </el-menu-item>

      </el-submenu>
  <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>

        <el-menu-item index="/roles">
        <i class="el-icon-document"></i>
        <span slot="title">角色列表</span>
      </el-menu-item>
 <el-menu-item index="/rights">
        <i class="el-icon-document"></i>
        <span slot="title">权限列表</span>
      </el-menu-item>
      </el-submenu> -->
    </el-menu></el-aside>
  <el-container>
    <el-header>
      <div class='myicon myicon-menu toggle-btn' @click='togglemenu'></div>
      <div class="system-title">电商后台管理系统</div>
      <div><span class='welcome'>您好，{{$store.getters.getterName}}</span><el-button type="warning" round @click='loginOut'>退出</el-button></div>

    </el-header>
    <el-main><router-view></router-view></el-main>
  </el-container>
</el-container>

  </div>
</template>
<script>
import {getMenuList, getUserList} from '@/api/index.js'
export default{
  data () {
    return {
      isCollapse: true,
      username: '',
      dataList: []
    }
  },
  created () {
    getMenuList()
      .then(res => {
        this.dataList = res.data
      })
  },
  mounted () {
    this.username = localStorage.getItem('username')
    getUserList()
      .then(res => console.log(res))
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    togglemenu () {
      this.isCollapse = !this.isCollapse
    },
    loginOut () {
      localStorage.removeItem('mytoken')
      this.$router.push({name: 'login'})
    }
  }

}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #F9F9F9;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #409EFF;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: white;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome, {
    color: white;
  }
}
</style>
