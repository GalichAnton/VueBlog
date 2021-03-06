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
  {
    path: "/feed",
    name: "yourFeed",
    component: GlobalFeed,
  },
  {
    path: "/tags/:slug",
    name: "tag",
    component: GlobalFeed,
  },
  {
    path: "/articles/new",
    name: "createArticle",
    component: GlobalFeed,
  },
  {
    path: "/articles/:slug",
    name: "article",
    component: GlobalFeed,
  },
  {
    path: "/articles/:slug/edit",
    name: "editArticle",
    component: GlobalFeed,
  },
  {
    path: "/settings",
    name: "settings",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug",
    name: "userProfile",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug/favorites",
    name: "userProfileFavorites",
    component: GlobalFeed,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
