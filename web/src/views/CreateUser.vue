<template>
  <v-layout

      align-center
      column
    >
    <h1>This is a page for creating a user</h1>

    <v-form v-model="valid">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
    </v-form>

    <v-btn
      :loading="loading"
      :disabled="loading || !valid"
      color="blue-grey"
      class="white--text"
      @click="saveUser"
    >
      Upload
      <v-icon right dark>cloud_upload</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      valid: false,
      loading: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    ...mapActions({
      createUser: 'users/create',
    }),
    saveUser() {
      this.loading = true
      const self = this
      this.createUser({name: this.name, email: this.name, ranking: 1000}).then(() => {
        self.$router.go(-1)
      })
    }
  },
}
</script>

