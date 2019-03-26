<template>
  <v-data-table
      :items="users"
      class="elevation-1"
      hide-actions
      hide-headers
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.ranking }}</td>
      </template>
    </v-data-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      users: state => state.users.all
    })
  }
}
</script>

