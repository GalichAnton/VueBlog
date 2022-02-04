import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import GlobalFeed from "@/views/GlobalFeed.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "GlobalFeed",
    component: GlobalFeed,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
