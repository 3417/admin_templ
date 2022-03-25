<template>
  <div>
    <h2>Home</h2>
    <el-button @click="getData">请求</el-button>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {},
  methods:{
    getData(){
      this.$request.post('https://yapi.dooffe.com/mock/269/customer/manager/list',{name:1}).then(res=>{})
    }
  }
};
</script>
<style lang='scss' scoped>
</style>