<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>


<template>
  <div>
    <v-toolbar dark prominent>
      <nav>
        <RouterLink class="link" to="/">Home</RouterLink>
        <RouterLink class="link" to="/users">Users</RouterLink>
      </nav>
    </v-toolbar>

    <div>
      <!-- <RouterView /> -->
      <router-view v-slot="{ Component }">
        <transition  name="slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

    </div>
  </div>
</template>

<style scoped>
.link{
  text-decoration: none;
  font-size: 20px;
  color: rgb(17, 17, 17);
  margin: 4px;
}
.link.active{
  color: rgb(163, 0, 0);
}

.slide-enter{
   opacity: 0;
}
.slide-enter-active{
 animation: slide-in .4s ease-out forwards;
 transition: opacity .2s;
}
.slide-leave{
  
}
.slide-leave-active{
 animation: slide-out .2s ease-out forwards;
 transition: opacity .2s;
 opacity: 0;
}

@keyframes slide-in {
  from{
    transform: translateY(20px);
    opacity: 0;
  }
  to{
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes slide-out {
  from{
    transform: translateY(0px);
    opacity: 1;
  }
  to{
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>