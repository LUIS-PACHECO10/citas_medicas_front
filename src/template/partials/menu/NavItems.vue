<template>
  <div>
    <v-list-item
      :prepend-avatar="'public/isotipo.png'"
      :title="user?.username"
      nav
    >
    </v-list-item>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <template v-for="(option, index) in menuOptions" :key="index">
        <template v-if="option.menu" :value="option.text">
          <v-list-group :value="option.text">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="option.text"
                :prepend-icon="option.icon"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="subMenu in option.menu"
              :prepend-icon="subMenu?.icon"
              :title="subMenu.text"
              @click="goTo(subMenu.routeName, subMenu.params)"
            />
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item
            :prepend-icon="option.icon"
            :title="option.text"
            @click="goTo(option.routeName, option.params)"
          >
          </v-list-item>
          {{ option.menu }}
        </template>
      </template>
      <v-divider></v-divider>

      <v-list-item
        prepend-icon="mdi-logout"
        title="Cerrar sesión"
        @click="signOut"
      >
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { options } from "./options";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NavItems",
  data() {
    return {
      display: [],
      drawer: false,
      group: null,
      menuOptions: [],
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    goTo(routeName, params = []) {
      this.$router.push({ name: routeName, params: params });
    },
    ...mapActions({
      signOutAction: "auth/signOut",
    }),
    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: "LogIn",
        });
      });
    },
  },
  mounted() {
    this.menuOptions = options;
  },
};
</script>
