import SecureLS from "secure-ls";

// Configurar secure-ls con almacenamiento en sessionStorage
const bucket = new SecureLS({
  encodingType: "aes",
  storage: window.sessionStorage,
});

//estado
const state = {
  token: null, // Token del usuario
  user: null, // Información del usuario
};

//mutaciones
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    bucket.set("token", token); // Persistir token
  },
  SET_USER(state, user) {
    state.user = user;
    bucket.set("user", user); // Persistir información del usuario
  },
  clearAuth(state) {
    state.token = null;
    state.user = null;
    bucket.clear(); // Limpiar toda la información almacenada
  },
  loadAuthState(state) {
    state.token = bucket.get("token") || null;
    state.user = bucket.get("user") || null;
  },
};

//Actions
const actions = {
  async signIn({ commit, dispatch }, credentials) {
    // let response = await axios.post("signin", { ...credentials, platform: 'IEL' });
    // let response = await axios.post(`${process.env.VUE_APP_BASE_SERVER}/auth/login`, credentials);
    // commit('SET_TOKEN', credentials);
    commit("SET_USER", credentials);
    return dispatch("attempt", "token");
  },

  async attempt({ commit, state }, token) {
    if (token) {
      commit("SET_TOKEN", token);
    }
    try {
      /*
      let response = await axios.get(`${process.env.VUE_APP_API_SERVER}/info`, {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      }); */
    } catch (error) {
      commit("SET_TOKEN", null);
      commit("SET_USER", null);
    }
  },
  signOut({ commit }) {
    commit("clearAuth");
    localStorage.clear();
  },
};

//getters
const getters = {
  authenticated: (state) => !!state.token,
  user: (state) => state.user,
};

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
