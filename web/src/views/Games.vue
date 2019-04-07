<template>
  <v-layout
      justify-center
    >
    <v-data-table
      :headers="headers"
      :items="games"
      class="elevation-1"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.item.playerOne && props.item.playerOne.name }} - {{ props.item.playerTwo && props.item.playerTwo.name }}</td>
        <td>{{ props.item.playerOneScore}} - {{ props.item.playerTwoScore}}</td>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  data() {
    return {
      headers: [
        { text: 'Players', sort: false },
        { text: 'Score' }
      ]
    }
  },
  computed: {
    ...mapState({
      games: state => state.games.all.map(game => {
        game.playerOne = state.users.all.find(u => u.id === game.playerOneId)
        game.playerTwo = state.users.all.find(u => u.id === game.playerTwoId)
        return game
      })
    })
  }
}
</script>
