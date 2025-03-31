import store from '@/store'; // Importa el store

// Middleware para verificar autenticación
export default function authGuard(to, from, next) {
     
  if (to.meta.requiresAuth && !store.getters['auth/authenticated']) {
    // Redirigir al inicio si no está autenticado
    next({ name: 'LogIn' });
  } else {
    // Continuar la navegación
    next();
  }
}
