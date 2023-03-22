const routes = [
  {
    path: "/",
    children: [
      { path: "", component: () => import("pages/PaginaLogin.vue") },
      {
        path: "/registro",
        component: () => import("pages/RegisterPagina.vue"),
      },
    ],
  },

  {
    path: "/paginahome",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PaginaHome.vue") },
      {
        path: "/paginaalunos",
        component: () => import("pages/PaginaAlunos.vue"),
      },
      {
        path: "/adicionar",
        component: () => import("pages/AdcionarAlunos.vue"),
      },
      {
        path: "/adicionarMod",
        component: () => import("pages/AdcionarModulos.vue"),
      },
      {
        path: "/editar/:id",
        component: () => import("pages/EditarAlunos.vue"),
      },
      {
        path: "/paginamodulos/:id",
        component: () => import("pages/PaginaModulos.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
