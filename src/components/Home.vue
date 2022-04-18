<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3 mt-5">
          Welcome to Home Page <br>

          <v-btn>
            <RouterLink class="link" to="/users">Users</RouterLink>
          </v-btn>

        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: rgb(17, 17, 17);
}
</style>