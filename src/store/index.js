import { createStore } from "vuex";
import auth from "./modules/auth"; 
import cancellableRequest from './modules/cancellableRequest';

const store =  createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
      auth, 
      cancellableRequest
    },
  });

  // Cargar estado de autenticación desde sessionStorage al inicializar
store.commit('auth/loadAuthState');

export default store
