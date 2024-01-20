<template>
  <v-app class="container">
    <v-main class="containerS">
      <Navbar />
      <Weather />
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Weather from './components/Weather.vue';
</script>

<style>

.container {
  margin: auto;
  width: 100%;
  height: 100%;

}
.containerS {
  background-color:rgba(88, 182, 240, 0.662)
}
</style>