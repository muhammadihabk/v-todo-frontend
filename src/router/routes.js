import MainLayout from "layouts/MainLayout.vue";
import IndexPage from "pages/IndexPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: IndexPage },
      { path: "/signup", component: () => import("pages/Signup.vue") },
      { path: "/todos", component: () => import("pages/Todos.vue") },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
