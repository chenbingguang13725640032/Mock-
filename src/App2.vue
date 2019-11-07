<template>
  <div>
    <h1 class="title">品牌列表</h1>
    <div style="height:30px;">
      <el-col :span="6" style="margin-right:10px;">
        <el-input
          placeholder="添加商品"
          size="mini"
          maxlength="5"
          minlength="2"
          autofocus
          v-model="ip1"
        >
          <template slot="prepend">品牌名称</template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="mini" @click="pushlist">添加</el-button>
      </el-col>
    </div>
    <hr />
    <template>
      <el-table :data="goodslist" size="mini" border>
        <el-table-column prop="id" lable="Id"></el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">
            <span>{{scope.row.time | dataFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="removelist(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "App2",
  data() {
    return {
      goodslist: [],
      ip1: ""
    };
  },
  mounted() {
    this.$http
      .get("/api/goodslist")
      .then(res => {
        if (JSON.parse(localStorage.getItem("list"))) {
          this.goodslist = JSON.parse(localStorage.getItem("list"));
          this.$message.success("本地列表渲染完毕！");
          return;
        }
        this.goodslist = res.data.data;
        this.$message.success("列表渲染完毕！");
      })
      .catch(err => {
        this.$message.error("获取列表参数失败！");
      });
  },
  methods: {
    pushlist() {
      var obj = {
        id: "",
        time: new Date(),
        name: this.ip1
      };
      this.$http.post("/api/goodsinfo", obj).then(res => {
        this.goodslist.push(obj);
        var arr = JSON.parse(localStorage.getItem("list")) || [];
        arr.push(obj);
        localStorage.setItem("list", JSON.stringify(arr));
        console.log(res);
      });
    },
    removelist(id) {
      this.$http.get("/api/removelist/" + id).then(res => {
        this.goodslist.splice(id, 1);
        localStorage.setItem("list", JSON.stringify(this.goodslist));
        this.$message.success("删除成功！");
      });
    }
  },
  filters: {
    dataFormat: function(data) {
      var time = new Date(data);
      var n = time.getFullYear();
      var y = time.getMonth() + 1;
      var r = time.getDate();

      var s = time.getHours();
      var f = time.getMinutes();
      var m = time.getSeconds();
      return `${n}-${y}-${r} ${s}:${f}:${m}`;
    }
  }
};
</script>

<style>
.title {
  text-align: center;
  font-size: 30px;
}
</style>