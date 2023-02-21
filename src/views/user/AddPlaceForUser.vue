<template>
  <el-dialog v-model="visiable" title="授权场地" top="100px" width="70%">
    <el-form>
      <el-form-item label="场地:" prop="username">
        <div class="top">
          <el-select
            v-model="projectId"
            clearable
            width="400px"
            placeholder="请选择场地"
          >
            <el-option
              v-for="item in hasPlaceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-button
            type="primary"
            @click="addPlaceForUer(userId, projectId)"
            style="margin-left: 10px"
            >授予</el-button
          >
        </div>
      </el-form-item>
      已有场地：
      <el-table :data="placeList" border>
        <el-table-column prop="id" label="场地ID" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="price" label="价格/元" />
        <el-table-column prop="role" label="操作">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="DeletaPlace(scope.row)"
            >
              删除
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
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="visiable = false">完成</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { sharePlaceAPI, getPlacesByUserIdAPI } from "@/request/user";
import { getPlaceListAPI } from "@/request/place";
import { ElMessage } from "element-plus";
import { deletePlaceHook } from "@/hook/table";
export default defineComponent({
  setup() {
    const Form = reactive({
      projectId: "",
      visiable: false,
      userId: "",
      placeList: [],
      hasPlaceList: [],
    });
    const page = reactive({
      pageSize: 8, // 一页有多少条数据
      total: 0, // 总共有多少数据
      pageNum: 1, //当前页码
    });
    // 弹出对话框初始化函数
    const popInit = async (row: any) => {
      const { item: res } = (await getPlaceListAPI({
        pageSize: 1000,
        pageNum: 1,
      })) as any;
      Form.hasPlaceList = res.project;
      (Form.userId = row.id), (Form.visiable = true);
      getPlaceByUserId(Form.userId);
    };

    // 确认添加场地
    const addPlaceForUer = async (userId: string, projectId: string) => {
      const res = await sharePlaceAPI(projectId, userId);
      console.log(res);
      if ((res as any).success) {
        getPlaceByUserId(Form.userId);
        ElMessage.success("授予成功");
      }
      // Form.visiable = false;
    };
    // 获取用户绑定的场地信息
    const getPlaceByUserId = async (userId: string) => {
      const {
        item: res,
        item: { total: total },
      } = (await getPlacesByUserIdAPI(userId, page)) as any;
      // console.log(res);
      Form.placeList = (res as any).project.map((item: any) => {
        item.price = (item.price / 100).toFixed(2);
        return item;
      });
      page.total = total;
    };
    // 当前页改变时触发
    const currentChange = (num: number) => {
      console.log(num);
      page.pageNum = num;
      getPlaceByUserId(Form.userId);
    };
    // 删除场地
    const DeletaPlace = async (row: any) => {
      const res = await deletePlaceHook(row, Form.userId);
      if (res === undefined) {
        getPlaceByUserId(Form.userId);
      }
    };
    return {
      ...toRefs(page),
      ...toRefs(Form),
      popInit,
      addPlaceForUer,
      getPlaceByUserId,
      currentChange,
      DeletaPlace,
    };
  },
});
</script>

<style scoped>
.pagination {
  float: right;
  margin-top: 10px;
}
.el-dialog__footer {
  text-align: center !important;
}
.top {
  display: flex;
  align-items: center;
}
</style>
