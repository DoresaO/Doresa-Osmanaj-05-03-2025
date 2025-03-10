import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginPage from "@/views/Login.vue";
import StudentsPage from "@/views/StudentsPage.vue";
import ArchivePage from "@/views/ArchivePage.vue";
import HelpPage from "@/views/HelpPage.vue";
import NotFound from "@/views/NotFound.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/students",
    name: "students",
    component: StudentsPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/archive",
    name: "archive",
    component: ArchivePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/help",
    name: "help",
    component: HelpPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path:"*", 
    component: NotFound
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("restoreSession");
  const isAuthenticated = store.getters.isAuthenticated;

  if (
    to.matched.some((router) => router.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
