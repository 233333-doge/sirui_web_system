<template>
  <div style="width: 90%">
    <!-- <el-form :inline="true" :model="selected_data" class="search-form">
      <el-form-item label="商品名称">
        <el-input v-model="selected_data.title" placeholder="请输入商品名称" />
      </el-form-item>

      <el-form-item label="商品详情">
        <el-input
          v-model="selected_data.introduce"
          placeholder="请输入商品详情"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearchGoods()">查询</el-button>
      </el-form-item>
    </el-form> -->

    <el-table :data="orderList" border>
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="price" label="价格/元" />
      <el-table-column prop="createDate" label="创建日期" />
      <el-table-column prop="teamA" label="主队" />
      <el-table-column prop="teamB" label="客队" />
      <el-table-column prop="startTime" label="比赛开始时间" />
      <el-table-column prop="stopTime" label="比赛结束时间" />
      <el-table-column prop="projectId" label="场地编号" />
    </el-table>

    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="currentChange"
    />
  </div>
</template>

<script lang="ts">
// import { getGoodsList } from '@/request/api';
import { defineComponent, onMounted, reactive, toRefs } from "vue";
// import { GoodsPages, IGoods } from "@/type/goods";
import { getOrderListAPI } from "@/request/order";
export default defineComponent({
  setup() {
    const OrderList = reactive({
      orderList: [],
    });
    const page = reactive({
      pageSize: 8, // 一页有多少条数据
      total: 0, // 总共有多少数据
      pageNum: 1, //当前页码
    });
    // 获取全部商品数据, 因为多个地方使用,所以封装为方法
    const getOrderList = async () => {
      const res = await getOrderListAPI(page);

      OrderList.orderList = (res as any).item.order.map((item: any) => {
        console.log(item, "asdf");
        return {
          id: item.id,
          price: (item.total / 100).toFixed(2),
          createDate: item.createDate.slice(0, 16),
          teamA: item.teamA,
          teamB: item.teamB,
          startTime: getdate(item.startTime).slice(0, 16),
          stopTime: getdate(item.stopTime).slice(0, 16),
          projectId: item.projectId,
        };
      });
      page.total = (res as any).item.total;
    };

    onMounted(() => {
      // p_getGoodsList()  // 获取全部商品数据
      getOrderList();
    });

    // 当前页改变时触发
    const currentChange = (num: number) => {
      console.log(num);
      page.pageNum = num;
      getOrderList();
    };

    // // 当单页数量改变时触发
    // const sizeChange = (page_size: number) => {
    //   //
    // };
    // 时间格式转换
    const getdate = (date: any) => {
      var now = new Date(date * 1000),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return (
        y +
        "-" +
        (m < 10 ? "0" + m : m) +
        "-" +
        (d < 10 ? "0" + d : d) +
        " " +
        now.toTimeString().substr(0, 8)
      );
    };
    return {
      ...toRefs(page),
      ...toRefs(OrderList),
      currentChange,
      getdate,
    };
  },
});
</script>

<style scoped>
.search-form {
  padding: 10px 0 0 10px;
}
.pagination {
  float: right;
  margin-top: 20px;
}
</style>
