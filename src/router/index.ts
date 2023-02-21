import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: "orderslist",
    children: [
      {
        path: "orderslist",
        name: "orderslist",
        meta: {
          isShowRole: ["ROLE_SUB", "ROLE_ADMIN"], // 是否需要被展示出来
          title: "订单列表",
        },
        component: () => import("../views/orderslist/OrdersList.vue"),
      },
      {
        path: "user",
        name: "UserView",
        meta: {
          isShowRole: ["ROLE_ADMIN"],
          title: "子用户列表",
        },
        component: () => import("../views/user/UserView.vue"),
      },
      // {
      //   path: "role",
      //   name: "RoleView",
      //   meta: {
      //     isShowRole: ["ROLE_SUB", "ROLE_ADMIN"],
      //     title: "角色列表",
      //   },
      //   component: () => import("../views/role/RoleView.vue"),
      // },
      {
        path: "place",
        name: "PlaceView",
        meta: {
          isShowRole: ["ROLE_ADMIN", "ROLE_SUB"],
          title: "场地列表",
        },
        component: () => import("../views/place/PlaceView.vue"),
      },
      {
        path: "edit",
        name: "EditView",
        meta: {
          // isShowRole: ["ROLE_ADMIN"],
          title: "价格管理",
        },
        component: () => import("../views/edit/EditView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "LoginView",
    meta: {
      isShowRole: ["ROLE_SUB", "ROLE_ADMIN"], // 是否需要被展示出来
      title: "登录界面",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem("token");
  console.log(token);
  if (to.path === "/login") {
    next;
  } else if (!token) {
    next("/login");
  } else if (to.path !== "/login") {
    const user = localStorage.getItem("user") as any;
    console.log(user);
    if (!user) return;
    const role = JSON.parse(user).role;
    console.log(role);
    if (!(to.meta.isShowRole as any).includes(role)) {
      return;
    }
  }
  next();
});

export default router;
