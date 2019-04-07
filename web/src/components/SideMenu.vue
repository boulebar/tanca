<template>
  <v-list dense>
    <v-list-tile to="/">
      <v-list-tile-action>
        <v-icon>home</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Scoreboard</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile to="/users">
      <v-list-tile-action>
        <v-icon>contact_mail</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Create user</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile to="/games">
      <v-list-tile-action>
        <v-icon>games</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Games</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
