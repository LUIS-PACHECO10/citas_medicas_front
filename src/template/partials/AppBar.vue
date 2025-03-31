<template>
  <div v-if="authenticated">
    <v-app-bar color="#AB47BC" prominent>
      <v-app-bar-nav-icon
        v-if="$vuetify.display.mobile"
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title> Citas Medicas - Reina Madre</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon="mdi-logout" variant="text" @click="signOut"></v-btn>

      <template v-if="$vuetify.display.mobile">
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      v-if="$vuetify.display.mobile"
      v-model="drawer"
      :location="!$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
    >
      <nav-items></nav-items>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavItems from "@/template/partials/menu/NavItems.vue";

export default {
  name: "AppBar",
  components: { NavItems },
  data() {
    return {
      display: [],
      drawer: false,
      group: null,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
    }),
  },
  methods: {
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
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
