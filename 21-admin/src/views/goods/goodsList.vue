<template>
  <div class="goodslist">
    <el-button type='paimary'  plain @click='jumpto'>添加商品</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    jumpto () {
      this.$router.push({name: 'goodsadd'})
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
