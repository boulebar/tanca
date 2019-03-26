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
            v-model="player_one_id"
          ></v-autocomplete>
          <v-text-field
            label="Player one score"
            type="number"
            style="margin: 2px"
            v-model="player_one_score"
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
            v-model="player_two_id"
          ></v-autocomplete>
          <v-text-field
            label="Player two score"
            type="number"
            style="margin: 2px"
            v-model="player_two_score"
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
      player_one_id: null,
      player_two_id: null,
      player_one_score_value: null,
      player_two_score_value: null
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
    player_one_score: {
      get() {
        return this.player_one_score_value
      },
      set(value) {
        this.player_one_score_value = parseInt(value, 10)
      }
    },
    player_two_score: {
      get() {
        return this.player_two_score_value
      },
      set(value) {
        this.player_two_score_value = parseInt(value, 10)
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
        player_one_id: this.player_one_id,
        player_two_id: this.player_two_id,
        player_one_score: this.player_one_score_value,
        player_two_score: this.player_two_score_value
      }).then(() => {
        this.$emit('hide', false);
        self.player_one_id = null
        self.player_two_id = null
        self.player_one_score_value = null
        self.player_two_score_value = null
      })
    }
  }
}
</script>
