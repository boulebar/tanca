<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <side-menu />
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Tanca</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import SideMenu from "./components/SideMenu"

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
    }
  },
  components: {
    'side-menu': SideMenu
  },
  created () {
    this.$store.dispatch('load')
  }
}
</script>



  // <div id="app">
  //   <div id="nav">
  //     <router-link to="/">Scoreboard</router-link> |
  //     <router-link to="/about">About</router-link>
  //   </div>
  //   <router-view/>
  // </div>
