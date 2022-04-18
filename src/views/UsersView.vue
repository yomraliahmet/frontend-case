<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import Users from "../components/Users.vue";

</script>

<template>
  <div class="users">
    <h1>Welcome to <span class="text-danger">Users</span></h1>

    <br>
    <br>    
    <Users />
  </div>
</template>

<style>
  .users {
    margin: 55px 15px 0px 15px;
    text-align: center;
  }

  .text-danger {
    color: rgb(187, 0, 0);
  } 
</style>
