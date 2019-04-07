<template>
  <v-data-table
      :items="usersWithCalculatedScore"
      class="elevation-1"
      hide-actions
      hide-headers
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.ranking.toFixed(2) }}</td>
      </template>
    </v-data-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { calculateScore } from '../lib/elo'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      users: state => state.users.all,
      games: state => state.games.all
    }),
    usersWithCalculatedScore() {

      // Reset the score to base ranking for new calculation
      for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i];
        user.ranking = user.baseRanking
      }
      console.log('this.users', this.users)
      console.log('this.games', this.games)
      for (let i = 0; i < this.games.length; i++) {
        const game = this.games[i];
        const playerOne = this.users.find(u => u.id === game.playerOneId)
        const playerTwo = this.users.find(u => u.id === game.playerTwoId)
        if(playerOne && playerTwo) {
          const { p1Ranking, p2Ranking } = calculateScore(game.playerOneScore, game.playerTwoScore, playerOne.ranking, playerTwo.ranking)
          playerOne.ranking = p1Ranking
          playerTwo.ranking = p2Ranking
        } else {
          // debugger
        }
      }
      return this.users.slice().sort((a, b) => b.ranking - a.ranking)
    }
  }
}
</script>

