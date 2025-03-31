import { createRouter, createWebHistory } from "vue-router";

import authGuard from "@/middleware/authMiddleware"; // Importar el middleware
import auth from "@/router/auth";

import Home from "../views/Home.vue"; // Importa tu componente de vista
import Error404 from "../views/errors/404.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true, // Indica que esta ruta requiere autenticación
    },
  },
  // Agrega más rutas según sea necesario
];

const routeNotFound = [
  {
    path: "/:catchAll(.*)", // Ruta comodín para manejar rutas no definidas
    name: "NotFound",
    component: Error404,
  },
];

let allRoutes = routes.concat(auth, routeNotFound);

// Crea la instancia de Vue Router

const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes,
});

// Usar el middleware autenticación
router.beforeEach(authGuard);

export default router;
