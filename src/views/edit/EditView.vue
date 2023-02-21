<template>
  <div>
    <el-form :inline="true" class="search-form">
      <el-form-item>
        <span style="margin-right: 20px">{{ currentPrice }}/每半小时</span>
        <el-button type="primary" @click="editPrice()">修改价格</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { getPriceAPI, editPriceAPI } from "@/request/edit";
import { ElMessageBox, ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const EditPage = reactive({
      currentPrice: "0",
    });
    onMounted(() => {
      getPrice();
    });
    const getPrice = async () => {
      const res: any = await getPriceAPI();
      if ((res as any).success) {
        EditPage.currentPrice = (res.item.price / 100).toFixed(2);
      }
    };
    const editPrice = () => {
      //修改价格
      ElMessageBox.prompt("请输入价格/元", "价格修改", {
        confirmButtonText: "添加",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          if (value) {
            console.log(typeof Number(value), "!");
            value = String(Number(value) * 100);
            const res: any = await editPriceAPI(value);
            if (res.success) {
              getPrice();
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
      ...toRefs(EditPage),
      editPrice,
    };
  },
});
</script>

<style scoped>
.search-form {
  padding: 10px 0 0 10px;
}
</style>
