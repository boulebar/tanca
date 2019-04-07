<template>
  <v-dialog v-model="gameDialog" max-width="500px">
    <v-card>
      <v-card-title>
          <v-layout row justify-center>
          <h3>Record a played game</h3>
          </v-layout>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-autocomplete
            :items="users"
            :filter="customFilter"
            color="white"
            item-text="name"
            item-value="id"
            label="Player One"
            style="margin: 2px"
            v-model="playerOneId"
          ></v-autocomplete>
          <v-text-field
            label="Player one score"
            type="number"
            style="margin: 2px"
            v-model="playerOneScore"
          ></v-text-field>
        </v-layout>
        <v-layout row wrap>
          <v-autocomplete
            :items="users"
            :filter="customFilter"
            color="white"
            item-text="name"
            item-value="id"
            label="Player Two"
            style="margin: 2px"
            v-model="playerTwoId"
          ></v-autocomplete>
          <v-text-field
            label="Player two score"
            type="number"
            style="margin: 2px"
            v-model="playerTwoScore"
          ></v-text-field>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click="gameDialog=false">Close</v-btn>
        <v-spacer />
        <v-btn color="primary" flat @click="saveGame">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['visible'],
  data() {
    return {
      playerOneId: null,
      playerTwoId: null,
      playerOneScoreValue: null,
      playerTwoScoreValue: null
    }
  },
  computed: {
    ...mapState({
      users: state => state.users.all
    }),
    gameDialog: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('hide', value);
      }
    },
    playerOneScore: {
      get() {
        return this.playerOneScoreValue
      },
      set(value) {
        this.playerOneScoreValue = parseInt(value, 10)
      }
    },
    playerTwoScore: {
      get() {
        return this.playerTwoScoreValue
      },
      set(value) {
        this.playerTwoScoreValue = parseInt(value, 10)
      }
    }
  },
  methods: {
    ...mapActions({
      createGame: 'games/create',
    }),
    customFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()
      return textOne.indexOf(searchText) > -1
    },
    saveGame() {
      const self = this
      this.createGame({
        playerOneId: this.playerOneId,
        playerTwoId: this.playerTwoId,
        playerOneScore: this.playerOneScoreValue,
        playerTwoScore: this.playerTwoScoreValue
      }).then(() => {
        this.$emit('hide', false);
        self.playerOneId = null
        self.playerTwoId = null
        self.playerOneScoreValue = null
        self.playerTwoScoreValue = null
      })
    }
  }
}
</script>
