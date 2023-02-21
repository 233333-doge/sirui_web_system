<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    background-color="#fff1"
    text-color="#e89015"
    active-text-color="#e89015"
  >
    <div class="logo" index="0">
      <img src="@/assets/logo.png" alt="" style="width: 7vw" />
      <h2>直播小程序后台</h2>
    </div>
    <div class="flex-grow" />
    <span style="line-height: 58px; margin-right: 10px">
      <el-popconfirm
        title="确定要退出?"
        confirmButtonText="退出"
        cancelButtonText="取消"
        @confirm="handleExit"
      >
        <template #reference>
          <el-button type="primary" link> 退出登录 </el-button>
        </template>
      </el-popconfirm>
    </span>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";

export default defineComponent({
  setup() {
    const handleExit = () => {
      localStorage.removeItem("token");
      router.push("/login");
    };
    return {
      handleExit,
    };
  },
});
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.logo {
  display: flex;
  align-items: center;
  color: #e89015;
}
</style>
