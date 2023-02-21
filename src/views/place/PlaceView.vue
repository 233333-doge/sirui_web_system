<template>
  <div style="width: 90%">
    <el-form :inline="true" class="search-form">
      <!-- <el-form-item label="子用户名">
        <el-input
          v-model="selected_data.nickName"
          placeholder="请输入用户昵称"
        />
      </el-form-item>

      <el-form-item label="用户角色">
        <el-select v-model="selected_data.role" class="m-2" size="large">
          <el-option :key="0" label="全部" :value="0" />
          <el-option
            v-for="item in role_with_auth_list"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item> -->

      <el-form-item>
        <!-- <el-button type="primary" @click="onSearchUser()">查询</el-button> -->
        <el-button type="primary" @click="addPlace()">添加场地</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="placeList" border>
      <el-table-column prop="projectId" label="场地ID" />
      <!-- <el-table-column prop="createDate" label="创建日期" /> -->
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="price" label="价格/元" />
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="DeletePlace(scope.row)"
          >
            删除场地
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="EditPrice(scope.row)"
          >
            修改价格
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="EditName(scope.row)"
          >
            修改名称
          </el-button>
        </template>
      </el-table-column>
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
  <!-- 添加场地的弹出窗-->
  <el-dialog v-model="addShow" title="添加场地">
    <el-form :model="addPlaceData">
      <el-form-item label="场地ID:" label-width="120px" prop="id">
        <el-input
          v-model="addPlaceData.id"
          autocomplete="off"
          placeholder="请输入场地ID"
        />
      </el-form-item>
      <el-form-item label="名称:" label-width="120px" prop="name">
        <el-input
          v-model="addPlaceData.name"
          autocomplete="off"
          placeholder="请输入场地名称"
        />
      </el-form-item>
      <el-form-item label="价格(元/小时):" label-width="120px" prop="price">
        <el-input
          v-model="addPlaceData.price"
          autocomplete="off"
          placeholder="请输入价格"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addShow = false">取消</el-button>
        <el-button type="primary" @click="addPlaceCommit">添加</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
// import { getGoodsList } from '@/request/api';
import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
// import { GoodsPages, IGoods } from "@/type/goods";
import {
  getPlaceListAPI,
  addPlaceAPI,
  deletePlaceAPI,
  editPriceAPI,
  editNameAPI,
} from "@/request/place";
import { ElMessageBox, ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    // 添加场地弹窗显示控制
    const addShow = ref(false);
    //  添加场地表单
    const addPlaceData = reactive({
      createBy: "",
      projectId: "",
      name: "",
      price: "",
    });
    const PlaceList = reactive({
      placeList: [],
    });
    const page = reactive({
      pageSize: 8, // 一页有多少条数据
      total: 0, // 总共有多少数据
      pageNum: 1, //当前页码
    });
    // 获取全部商品数据, 因为多个地方使用,所以封装为方法
    const getPlaceList = async () => {
      const res = await getPlaceListAPI(page);

      PlaceList.placeList = (res as any).item.project.map((item: any) => {
        // item.createDate = item.createDate.slice(0, 16);
        item.price = (item.price / 100).toFixed(2);
        return item;
      });
      page.total = (res as any).item.total;
    };

    onMounted(() => {
      // p_getGoodsList()  // 获取全部商品数据
      getPlaceList();
    });

    // 当前页改变时触发
    const currentChange = (num: number) => {
      console.log(num);
      page.pageNum = num;
      getPlaceList();
    };

    // 添加场地
    const addPlace = () => {
      addShow.value = true;
    };
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
    // 确认添加场地
    const addPlaceCommit = async () => {
      const tempPrice = +addPlaceData.price * 100;
      if (tempPrice <= 0 || tempPrice > 100000) {
        ElMessage.error("价格不合理");
        return;
      }
      if (!addPlaceData.createBy) {
        addPlaceData.createBy = JSON.parse(
          localStorage.getItem("user") as any
        ).id;
      }
      const res = await addPlaceAPI(addPlaceData);
      if ((res as any).success) {
        getPlaceList();
        ElMessage.success("添加成功");
        addShow.value = false;
      }
    };
    // 删除场地
    const DeletePlace = (row: any) => {
      ElMessageBox.confirm("是否删除该场地?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deletePlaceAPI(row.projectId);
          if ((res as any).success) {
            getPlaceList();
            ElMessage({
              type: "success",
              message: "删除成功",
            });
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "删除取消",
          });
        });
    };
    // 修改场地价格
    const EditPrice = (row: any) => {
      ElMessageBox.prompt("请输入价格/元", "价格修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          if (value) {
            value = String(Number(value) * 100);
            if (+value <= 0 || +value > 100000) {
              ElMessage.error("价格不合理");
              return;
            }
            const res: any = await editPriceAPI(row.projectId, value);
            if (res.success) {
              getPlaceList();
              ElMessage({
                type: "success",
                message: `修改成功`,
              });
            }
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "修改取消",
          });
        });
    };
    // 修改场地名称
    const EditName = (row: any) => {
      ElMessageBox.prompt("请输入场地名称", "名称修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          if (value) {
            const res: any = await editNameAPI(row.projectId, value);
            if (res.success) {
              getPlaceList();
              ElMessage({
                type: "success",
                message: `修改成功`,
              });
            }
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "修改取消",
          });
        });
    };
    return {
      ...toRefs(page),
      ...toRefs(PlaceList),
      currentChange,
      getdate,
      addPlaceData,
      addShow,
      addPlace,
      addPlaceCommit,
      DeletePlace,
      EditPrice,
      EditName,
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
