<template>
  <div id="app">
    <router-link to="/App2">App2</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    //Mock接口get请求
    // this.$http.get("/api/get").then(res=>{
    //   console.log(res);
    // })
    //Mock接口post请求
    // this.$http.post("/api/post",{
    //   name:"苹果",
    //   price:20,
    //   img:"",
    //   count:300
    // }).then(res=>{
    //   console.log(res)
    // })
    //Mock接口请求地址返回不同商品id给后端，后端通过id返回不同的数据，比如1返回去mock数据可以截取到1返回数据，2返回相同的数据
    //但返回id不一样,所以假设返回不同数据，Mock就写一个函数就行，具体看mocklx.js理解
    // this.$http.get("/api/getgoods/2").then(res=>{
    //   console.log(res)
    // })
  }
};
</script>

<style>
</style>
