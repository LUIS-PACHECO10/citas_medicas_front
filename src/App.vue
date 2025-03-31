<template>
 
    <v-layout>
     <app-bar></app-bar>
      <NavigationDrawerL></NavigationDrawerL>
       <footer-app />
        <v-main>
          <v-container>
          <router-view> </router-view> 
        </v-container>
        </v-main> 
    </v-layout> 
</template>

<script>
import AppBar from '@/template/partials/AppBar.vue'; 
import NavigationDrawerL from '@/template/partials/NavigationDrawerL.vue'; 
import footerApp from '@/template/partials/Footer.vue';
  export default {
    components:{  
      AppBar,
      NavigationDrawerL,
      footerApp
    },
    data: () => ({   
    }),
    props: {
      source: String
    },
    created(){

    }
  }
</script>