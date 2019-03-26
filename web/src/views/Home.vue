<template>
  <v-layout
      justify-center
    >
    <v-flex text-xs-center>
      <scoreboard />
    </v-flex>
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="primary"
      style="bottom: 30px;"
      @click="gameDialog=true"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <new-game-dialog :visible="gameDialog" @hide="hideDialog" />
  </v-layout>
</template>

<script>
// @ is an alias to /src
import Scoreboard from "../components/Scoreboard"
import NewGameDialog from "../components/NewGameDialog"

export default {
  name: 'home',
  data() {
    return {
      gameDialog: false
    }
  },
  components: {
    'scoreboard': Scoreboard,
    'new-game-dialog': NewGameDialog
  },
  methods: {
    hideDialog() {
      this.gameDialog = false
    }
  }
}
</script>
