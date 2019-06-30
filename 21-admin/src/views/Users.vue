<template>
  <div class="users">
    <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">用户列表</a></el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
<div>
   <el-input placeholder="请输入内容" v-model="searchInfo" class="search-input" @keydown.enter.native="searchUser" >

    <el-button slot="append" icon="el-icon-search" @click='searchUser'></el-button>

  </el-input>
  <el-button type="primary" plain @click="handleAdd">添加用户</el-button>
</div>
<!-- 列表展示 -->
<el-table
    ref="singleTable"
    class="mb-15 mt-15"
    border

    :data="userList"
    highlight-current-row

    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="username"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      property="email"
      label="邮箱"
      width="120">
    </el-table-column>
    <el-table-column
      property="mobile"
      label="电话">
    </el-table-column>
    <el-table-column

      label="切换状态">
      <template slot-scope="scope"><el-switch
  v-model="scope.row.mg_state"
  @change="handleChange(scope.row)"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch></template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size='small' plain icon='el-icon-edit' @click='handleEdit(scope.row)'></el-button>
        <el-button type="error" size='small' plain  icon='el-icon-delete' @click='handleDelete(scope.row)'></el-button>
        <el-button type="warning" size='small' plain  icon='el-icon-check' @click='handleGrant(scope.row)'></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页操作 -->
  <el-pagination
  class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"

      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
<!-- 添加操作 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
  <el-form :model="addForm" :rules='myrules' ref='addRef'>
    <el-form-item label="用户名" :label-width="formLabelWidth" prop='username'>
      <el-input v-model="addForm.username" autocomplete="off"></el-input>
    </el-form-item>
   <el-form-item label="密码" :label-width="formLabelWidth"  prop='password'>
      <el-input v-model="addForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
      <el-input v-model="addForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth" prop='mobile'>
      <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitAdd('addRef')">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑操作 -->
<el-dialog title="编辑用户" :visible.sync="editFormVisible">
  <el-form :model="editForm" :rules='myrules' ref='editRef'>
    <el-form-item label="用户名" :label-width="formLabelWidth" prop='username'>
      <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
    </el-form-item>

    <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
      <el-input v-model="editForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth" prop='mobile'>
      <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitEdit">确 定</el-button>
  </div>
</el-dialog>
<!-- 添加角色 -->
<el-dialog title="分配角色" :visible.sync="grantFormVisible">
  <el-form :model="grantForm"  ref='grantRef'>
    <el-form-item label="当前的用户" :label-width="formLabelWidth">
      <el-input v-model="grantForm.username" autocomplete="off" disabled></el-input>
    </el-form-item>
 <el-form-item label="请选择角色" :label-width="formLabelWidth" >
      <el-select v-model="grantForm.rid" placeholder="请选择">
    <el-option
      v-for="(item,index) in roleList"
      :key="index"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitGrant">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import {getUserList, deleteUser, addUser, toggleState, editUser, getRoleList, grant} from '@/api'
export default {
  data () {
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      // eslint-disable-next-line
      let myreg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
      if (myreg.test(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式错误'))
      }
    }
    return {
      searchInfo: '',
      value2: '',
      userList: [],
      total: 0,
      pagesize: 2,
      currentpage: 1,

      dialogFormVisible: false,
      editFormVisible: false,
      grantFormVisible: false,
      roleList: [],
      addForm: {username: '', password: '', email: '', mobile: ''},
      editForm: {username: '', email: '', id: '', mobile: ''},
      grantForm: {username: '', rid: '', id: ''},
      formLabelWidth: '150px',
      myrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    handleSizeChange (val) {
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      this.currentpage = val
      this.initList()
    },
    initList () {
      getUserList({query: this.searchInfo, pagenum: this.currentpage, pagesize: this.pagesize})
        .then(res => {
          if (res.meta.status === 200) {
            console.log(res)
            this.userList = res.data.users
            this.total = res.data.total
          }
        })
    },
    searchUser () {
      this.initList()
      this.searchInfo = ''
    },
    handleDelete (row) {
      deleteUser(row.id)
        .then(res => {
          if (res.meta.status === 200) {
            this.$message({
              message: res.meta.msg,
              type: 'success'
            })
            this.initList()
          }
        })
    },
    handleAdd () {
      this.dialogFormVisible = true
    },
    submitAdd (addRef) {
      this.$refs[addRef].validate((valide) => {
        if (valide) {
          addUser(this.addForm)
            .then(res => {
              if (res.meta.status === 201) {
                this.$message({
                  message: res.meta.msg,
                  type: 'success'
                })
                this.initList()
                this.addForm.username = ''
                this.addForm.password = ''
                this.addForm.email = ''
                this.addForm.mobile = ''
                this.dialogFormVisible = false
              }
            })
        } else {
          this.$message({
            message: '表单检验未通过',
            type: 'success'
          })
        }
      })
    },
    handleChange (row) {
      let obj = {
        uId: row.id,
        type: row.mg_state
      }
      toggleState(obj)
        .then(res => {
          if (res.meta.status === 200) {
            this.$message({
              message: res.meta.msg,
              type: 'success'
            })
          }
        })
    },
    handleEdit (row) {
      this.editFormVisible = true
      console.log(row)
      this.editForm.username = row.username
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
      this.editForm.id = row.id
    },
    submitEdit () {
      editUser(this.editForm)
        .then(res => {
          if (res.meta.status === 200) {
            // console.log(res)
            this.editFormVisible = false
            this.initList()
            this.$message({
              message: res.meta.msg,
              type: 'success'
            })
          }
        })
    },
    handleGrant (row) {
      this.grantFormVisible = true
      this.grantForm.username = row.username
      this.grantForm.id = row.id
      this.grantForm.rid = row.role_name
      getRoleList()
        .then(res => {
          this.roleList = res.data
        })
    },
    submitGrant () {
      if (this.grantForm.rid === 'string') {
        this.$message({
          message: '请重新分配',
          type: 'wraning'
        })
        return false
      }
      grant(this.grantForm)
        .then(res => {
          if (res.meta.status === 200) {
            this.grantFormVisible = false
            this.$message({
              message: res.meta.msg,
              type: 'success'
            })
            this.initList()
          }
        })
    }
  },
  created () {
    this.initList()
  }
}
</script>
<style lang="scss" scoped>
.search-input{
  width: 330px;
}
</style>
