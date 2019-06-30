<template>
  <div class="rights">
     <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-table
    ref="singleTable"
    class="mb-15 mt-15"
    border

    :data="rightsList"
    highlight-current-row

    style="width: 100%">
    <el-table-column
      type="index"
      >
    </el-table-column>
    <el-table-column
      property="authName"
      label="权限名称"
      >
    </el-table-column>
    <el-table-column
      property="path"
      label="路径"
      >
    </el-table-column>
    <el-table-column

      label="层级">
      <template slot-scope="scope">
        <el-tag>{{scope.row.level | fmtlevel}}</el-tag>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>
<script>
import {rightsList} from '@/api/index.js'
export default {
  data () {
    return {
      rightsList: []
    }
  },
  filters: {
    fmtlevel (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else {
        return '三级'
      }
    }
  },
  created () {
    rightsList('list')
      .then(res => {
        console.log(res)
        this.rightsList = res.data
      })
  }
}
</script>
<style lang="scss" scoped>
.rights{
  color: red
}
</style>
