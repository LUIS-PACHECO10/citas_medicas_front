<template>
    <div v-if="authenticated && !$vuetify.display.mobile">
        <v-navigation-drawer 
        :rail="rail"
        permanent
        @click="rail = false"
      >
      <nav-items></nav-items>
      </v-navigation-drawer>
    </div>
</template>

<script>
import { mapGetters} from "vuex";
import NavItems from "./menu/NavItems.vue";

 export default { 
    name:'NavigationDrawerL',
    components:{NavItems},
    data: () => ({
      rail:false,
      visible:false,
    }), 
    computed: {
    ...mapGetters({ 
      authenticated: "auth/authenticated",
    })
   },
  }
</script>