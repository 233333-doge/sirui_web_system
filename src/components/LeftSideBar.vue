<template>
  <el-menu
    background-color="#fff"
    class="el-menu-vertical-demo"
    :default-active="active_menu"
    style="width: 220px; height: calc(100vh - 61px)"
    router
  >
    <!--   router开启路由模式, 通过下面的index进行路由跳转 -->
    <el-menu-item :index="item.path" v-for="item in menus" :key="item.path">
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  props: ["menu_list"],
  setup(props) {
    let menus = ref(props.menu_list);
    const route = useRoute(); // 活跃状态的路由
    return {
      menus,
      active_menu: route.path,
    };
  },
});
</script>

<style scoped>
.el-menu-item:hover {
  background-color: #fdf4e8;
}
</style>
