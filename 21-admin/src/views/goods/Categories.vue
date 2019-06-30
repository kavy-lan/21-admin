<template>
  <div class="categories">
   <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>商品分类</el-breadcrumb-item>

  </el-breadcrumb>
  <el-button type='primary' plain @click='addFormVisible=true'>添加分类</el-button>
    <tree-grid
    class="mt-15 mb-15"
      :treeStructure="true"

      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>
    <el-dialog title="添加分类" :visible.sync="addFormVisible">
  <el-form :model="addForm"  ref='addRef' :rules='myrules' >
    <el-form-item label="分类名称" :label-width="formLabelWidth" prop='cat_name'>
      <el-input v-model="addForm.username" autocomplete="off" ></el-input>
    </el-form-item>
 <el-form-item label="父级名称" :label-width="formLabelWidth" >

   <el-cascader
    :options="options"
    props='defaultProps'
    v-model="selectedOptions"
    @change="handleChange">
  </el-cascader>

    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitadd">确 定</el-button>
  </div>
</el-dialog>
    <el-pagination
  class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"

      :page-sizes="[10, 20, 30]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import TreeGrid from '@/components/Treegrid/Treegrid'
import {getCategories} from '@/api'
export default {
  components: {
    TreeGrid
  },
  data () {
    return {
      dataSource: [],
      pagesize: 10,
      currentpage: 1,
      addFormVisible: false,
      formLabelWidth: '150px',
      defaultProps: [],
      options: {},
      selectedOptions: [],
      addForm: {cat_pid: '', cat_name: '', cat_level: ''},
      total: 0,
      myrules: {
        cat_name: [{required: true, message: '请输入分类名称', trigger: 'blur'}]
      },
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }]
    }
  },
  created () {
    getCategories(1)
      .then(res => {
        this.dataSource = res.data
        console.log(JSON.stringify(res.data))
        // for (let i = 0; i < this.dataSource.length; i++) {
        //   // delete (this.dataSource[i]['children'])
        //   this.dataSource[i].id = i
        // }
      })
  },
  methods: {
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      this.currentpage = val
      this.initList()
    },
    submitadd () {

    },
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
