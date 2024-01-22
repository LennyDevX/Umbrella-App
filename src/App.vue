<template>
  <v-app class="container">
    <v-main class="containerS">
      <Navbar />
      <router-view /> <!-- Añade este componente para usar Vue Router -->
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
// No necesitas importar el componente Weather aquí porque será renderizado por Vue Router
</script>

<style>

.container {
  margin: auto;
  width: 100%;
  height: 100%;
  

}
.containerS {
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: #adacacc4;
  color: white;
}
</style>