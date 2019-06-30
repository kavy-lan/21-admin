<template>
  <div class="add-goods">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">用户列表</a></el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-steps :active="active" finish-status="success">
  <el-step title="步骤 1"></el-step>
  <el-step title="步骤 2"></el-step>
  <el-step title="步骤 3"></el-step>
   <el-step title="步骤 4"></el-step>
  <el-step title="步骤 5"></el-step>
</el-steps>
<el-tabs tab-position="left" style="height:auto;" @tab-click='handleClick'>
    <el-tab-pane label="基本信息">
      <h3 class="title">{{ msg }}</h3>
    <div class="amap-wrapper">
      <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
    </div>
    </el-tab-pane>
    <el-tab-pane label="商品参数">

    <chart :options='option'></chart>

    </el-tab-pane>
    <el-tab-pane label="商品属性">3</el-tab-pane>
    <el-tab-pane label="商品图片">
      <el-upload
      :headers='myheader'
      multiple
  class="upload-demo"
  action="http://localhost:8888/api/private/v1/upload/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"

  :on-success='handleSuccess'
  :before-upload='handleBeforeUpload'
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">不超过500kb</div>
</el-upload>
    </el-tab-pane>
    <el-tab-pane label="商品内容">
      <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
        </quill-editor>
    </el-tab-pane>
  </el-tabs>

  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '欢迎来到高德地图',
      active: 0,
      fileList: [],
      content: null,
      editorOption: {
      },
      myheader: {
        Authorization: localStorage.getItem('mytoken')
      },
      option: {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }

    }
  },
  methods: {
    next () {
      if (this.active++ > 2) this.active = 0
    },
    handleClick (obj) {
      this.active = obj.index
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleSuccess (response, file, fileList) {
      if (response.meta.status === 200) {
        this.$message.success('上传成功')
      }
    },
    handleBeforeUpload (file) {
      if (file.size > 512000) {
        this.$message.error('图片大小不能大于500kb')
      }
    },
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  }
}

</script>
<style lang="scss" scoped>

.add-goods {
  .el-tabs {
    height: 400px;
  }
}
.quill-editor {
  height: 400px;
  .ql-container {
    height: 300px;
  }
}
.amap-wrapper {
  width: 500px;
  height: 500px;
}
</style>
