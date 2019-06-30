<template>
  <div class="roles">
        <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>

  </el-breadcrumb>
  <el-button type='primary' plain>添加角色</el-button>

 <el-table
    :data="userList"
    row-key="id"
    border
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="scope">
<el-row v-for='(firstChildrenItem,index) in scope.row.children' :key="index">
  <el-col :span='4'><el-tag closable @close='handleClose(scope.row,scope.row.id,firstChildrenItem.id)'>{{firstChildrenItem.authName}}</el-tag> <i class="el-icon-arrow-right"></i></el-col>
  <el-col :span='20'>
    <el-row v-for="(secondChildrenItem,index) in firstChildrenItem.children" :key='index'>
      <el-col :span='4'>
        <el-tag type='success' closable @close='handleClose(scope.row,scope.row.id,secondChildrenItem.id)'>
{{secondChildrenItem.authName}}
        </el-tag>
        <i class="el-icon-arrow-right" ></i>
      </el-col>
      <el-col :span="20" >
        <el-tag type='warning' v-for="thirdChildrenItem in secondChildrenItem.children" :key='thirdChildrenItem.id' closable @close='handleClose(scope.row,scope.row.id,thirdChildrenItem.id)'>
{{thirdChildrenItem.authName}}
        </el-tag>

      </el-col>
    </el-row>
  </el-col>
</el-row>
<el-row>
  <el-col :span='24' v-if="scope.row.children.length===0"><span style="color:red">请添加权限</span></el-col>
</el-row>
      </template>
    </el-table-column>
     <el-table-column
      type="index"
      >
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称"
      >
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="描述"
      >
    </el-table-column>
    <el-table-column

      label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size='small' plain icon='el-icon-edit' ></el-button>
        <el-button type="error" size='small' plain  icon='el-icon-delete' ></el-button>
        <el-button type="warning" size='small' plain  icon='el-icon-check'></el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import {getRoleList, deleteRoleRight} from '@/api/index.js'
export default {
  data () {
    return {

      userList: [],
      childrenList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      getRoleList()
        .then(res => {
          this.userList = res.data
          // console.log(JSON.stringify(res.data))
          // for (let i = 0; i < this.userList.length; i++) {
          //   delete (this.userList[i]['children'])
          // }
        })
    },
    handleClose (row, rloeID, rightID) {
      deleteRoleRight(rloeID, rightID)
        .then(res => {
          if (res.meta === 200) {
            row.children = res.data
            this.$message.success(res.meta.msg)
          } else {
            this.$message.error(res.meta.msg)
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tag{
  margin: 5px 5px 0 5px
}
</style>
