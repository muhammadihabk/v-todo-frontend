import MainLayout from "layouts/MainLayout.vue";
import IndexPage from "pages/IndexPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: IndexPage },
      { path: "/signup", component: () => import("pages/Signup.vue") },
      { path: "/signin", component: () => import("pages/Signin.vue") },
      { path: "/signout", component: () => import("pages/Signout.vue") },
      {
        path: "/todos",
        component: () => import("pages/Todos.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
