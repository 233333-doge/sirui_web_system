<template>
  <div style="width: 90%">
    <!-- <el-form :inline="true" :model="selected_data" class="search-form"> -->
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
        <el-button type="primary" @click="addUser()">添加子用户</el-button>
      </el-form-item>
    </el-form>
    
    <el-table :data="UserData.userData" border>
      <el-table-column prop="id" label="编号" width="200" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="role" label="用户角色" />
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="EditUser(scope.row)"
          >
            修改密码
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="DeleteUser(scope.row)"
          >
            删除子用户
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="SharePlace(scope.row)"
          >
            授权场地
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

  <!-- 添加用户的弹出窗-->
  <el-dialog v-model="addShow" title="添加子用户">
    <el-form
      :model="addUserData"
      :rules="addUserRules"
      ref="ruleFormAddUserRef"
    >
      <el-form-item label="用户名:" label-width="120px" prop="username">
        <el-input
          v-model="addUserData.username"
          autocomplete="off"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item label="密码:" label-width="120px" prop="password">
        <el-input
          v-model="addUserData.password"
          autocomplete="off"
          placeholder="请输入密码"
          type="password"
        />
      </el-form-item>
      <el-form-item label="再次输入密码:" label-width="120px" prop="password">
        <el-input
          v-model="addUserData.password2"
          autocomplete="off"
          placeholder="请再次输入密码"
          type="password"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addShow = false">取消</el-button>
        <el-button type="primary" @click="addUserCommit(ruleFormAddUserRef)"
          >创建</el-button
        >
      </span>
    </template>
  </el-dialog>

  <!-- 修改子用户密码弹出框 -->
  <el-dialog v-model="editShow" title="修改用户">
    <el-form
      :model="editUserData"
      :rules="addUserRules"
      ref="ruleFormEditUserRef"
    >
      <el-form-item label="用户名:" label-width="120px">
        {{ editUserData.username }}
      </el-form-item>
      <el-form-item label="密码:" label-width="120px" prop="password">
        <el-input
          v-model="editUserData.password"
          autocomplete="off"
          placeholder="请输入密码"
          type="password"
        />
      </el-form-item>
      <el-form-item label="再次输入密码:" label-width="120px" prop="password">
        <el-input
          v-model="editUserData.password2"
          autocomplete="off"
          placeholder="请再次输入密码"
          type="password"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editShow = false">取消</el-button>
        <el-button type="primary" @click="editUserCommit(ruleFormEditUserRef)"
          >确认修改</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- 授权场地弹出框 -->
  <AddPlaceForUser ref="AddPlaceForUserRef"></AddPlaceForUser>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
// import {getRoleList, getUserList} from "@/request/api";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  addUserAPI,
  getUserListAPI,
  editUserAPI,
  deleteUserAPI,
} from "@/request/user";
import { FormInstance } from "element-plus";
import AddPlaceForUser from "./AddPlaceForUser.vue";
export default defineComponent({
  components: {
    AddPlaceForUser,
  },
  setup() {
    // 添加子用户表单数据
    const editUserData = reactive({
      id: 0,
      username: "",
      password: "",
      password2: "",
    });
    // 添加子用户显示控制
    const editShow = ref(false);
    // 修改表单实例
    const ruleFormEditUserRef = ref<FormInstance>();
    // 添加表单实例
    const ruleFormAddUserRef = ref<FormInstance>();
    //  用户列表数据
    const UserData = reactive({
      userData: [],
    });
    // 分页数据
    const page = reactive({
      pageSize: 8, // 一页有多少条数据
      total: 0, // 总共有多少数据
      pageNum: 1, //当前页码
    });
    // 添加子用户显示控制
    const addShow = ref(false);
    // 添加子用户表单数据
    const addUserData = reactive({
      username: "",
      password: "",
      password2: "",
    });
    // 给子用户授权场地的ref
    const AddPlaceForUserRef = ref("");
    onMounted(() => {
      // 获取子用户列表
      getUserList();
    });
    const addUser = () => {
      addShow.value = true;
    };
    // 确认创建子用户
    const addUserCommit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          if (addUserData.password === addUserData.password2) {
            const res = await addUserAPI(addUserData);
            if ((res as any).success) {
              getUserList();
              ElMessage.success("创建成功");
              addShow.value = false;
            } else {
              ElMessage.success((res as any).errMsg);
            }
          } else {
            ElMessage.error("两次密码不一致");
            return;
          }
        }
      });
    };
    // 获取用户列表
    const getUserList = async () => {
      const res = await getUserListAPI(page);
      if ((res as any).success) {
        page.total;
        UserData.userData = (res as any).item.user.map((item: any) => {
          item.createDate = item.createDate.slice(0, 16);
          return item;
        });
        console.log(UserData, "UserData");
      } else {
        ElMessage.error((res as any).errMsg);
      }
    };
    // 当前页改变时触发
    const currentChange = (num: number) => {
      console.log(num);
      page.pageNum = num;
      getUserList();
    };
    //
    const EditUser = (row: any) => {
      console.log(row);
      editUserData.username = row.username;
      editUserData.id = row.id;
      console.log(editUserData, "editUserData");
      editShow.value = true;
    };
    // 修改子用户密码
    const editUserCommit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          if (editUserData.password === editUserData.password2) {
            const res = await editUserAPI(editUserData.id, editUserData);
            if ((res as any).success) {
              getUserList();
              ElMessage.success("修改成功");
              editShow.value = false;
            } else {
              ElMessage.success((res as any).errMsg);
            }
          } else {
            ElMessage.error("两次密码不一致");
            return;
          }
        }
      });
    };
    // 删除子用户
    const DeleteUser = (row: any) => {
      ElMessageBox.confirm("是否删除该用户?", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteUserAPI(row.id);
          if ((res as any).success) {
            getUserList();
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
    // 分享场地点击事件
    const SharePlace = (row: any) => {
      (AddPlaceForUserRef.value as any).popInit(row);
    };
    // 添加子用户表单规则
    const addUserRules = {
      username: [
        {
          required: true, //是否必须字段
          message: "请输入用户名", // 触发的提示信息
          trigger: "blur", // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
          min: 3, // 最小字符书
          max: 15, // 最大字符数
          message: "用户名长度需要在3-15个字符之间", // 触发的提示信息
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true, //是否必须字段
          message: "请输入密码", // 触发的提示信息
          trigger: "blur", // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
          min: 6, // 最小字符书
          max: 20, // 最大字符数
          message: "密码长度需要在6-20个字符之间", // 触发的提示信息
          trigger: "blur",
        },
      ],
      password2: [
        {
          required: true, //是否必须字段
          message: "请输入密码", // 触发的提示信息
          trigger: "blur", // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
          min: 6, // 最小字符书
          max: 20, // 最大字符数
          message: "密码长度需要在6-20个字符之间", // 触发的提示信息
          trigger: "blur",
        },
      ],
    };
    return {
      addUserData,
      addShow,
      UserData,
      addUser,
      addUserCommit,
      ...toRefs(page),
      getUserList,
      currentChange,
      addUserRules,
      ruleFormAddUserRef,
      EditUser,
      editUserData,
      editShow,
      ruleFormEditUserRef,
      editUserCommit,
      DeleteUser,
      AddPlaceForUserRef,
      SharePlace,
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
