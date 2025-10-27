import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Main from "@/components/layout/Main.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
