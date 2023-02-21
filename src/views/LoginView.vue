<template>
  <div class="login">
    <div class="form-cls">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="70px"
      >
        <img class="logo" src="@/assets/logo.png" alt="" />
        <h2>直播小程序——后台管理</h2>
        <el-form-item label="用户名:" prop="username">
          <el-input
            v-model="ruleForm.username"
            type="text"
            autocomplete="off"
            placeholder="请输入用户名"
          />
        </el-form-item>

        <el-form-item label="密码:" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="submitForm(ruleFormRef)"
            >登录</el-button
          >
          <el-button class="login-btn" @click="resetForm(ruleFormRef)"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { LoginData } from "@/type/login";
import { FormInstance } from "element-plus";
import { defineComponent, reactive, ref, toRefs } from "vue";
import { login } from "@/request/api";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const data = reactive(new LoginData());

    const router = useRouter(); //-->$router

    // 表单输入规则
    const rules = {
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
    };

    // 登录
    const ruleFormRef = ref<FormInstance>();

    // 重置
    const resetForm = () => {
      data.ruleForm.username = "";
      data.ruleForm.password = "";
    };

    const submitForm = (formEl: FormInstance | undefined) => {
      // 对表单内容进行验证
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          console.log(valid, "validvalid");
          const res: any = await login(data.ruleForm);
          // 保存信息
          localStorage.setItem("token", res.item.token);
          localStorage.setItem("user", JSON.stringify(res.item.user));
          router.push("/");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    return {
      ...toRefs(data),
      rules,
      resetForm,
      submitForm,
      ruleFormRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/bg.jpg");
}

.form-cls {
  padding: 50px;
  width: 30vw;
  margin: 0 auto;
  background-color: white;
  position: relative;
  top: 150px;
  border-radius: 4px;
  text-align: center;
  .logo {
    width: 10vw;
    margin: auto;
  }
  h2 {
    padding-bottom: 3vh;
  }
}

.login-btn {
  width: 48%;
  margin-top: 3vh;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
