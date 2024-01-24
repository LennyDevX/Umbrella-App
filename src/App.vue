<template>
  <v-app class="container">
    <v-main class="containerS">
      <Navbar />
      <CardComponent :cards="cards" />

      <router-view />

    </v-main>
      <footer-component />

  </v-app>

</template>

<script setup>
import FooterComponent from '../src/components/Footer.vue';
import Navbar from '../src/components/Navbar.vue';
import CardComponent from '../src/components/Card.vue';

const cards = [
  { id: 1, title: 'Weather Hub', icon: 'mdi-weather-cloudy', text: 'Explore weather insights for your local forecast and cities worldwide. Get involved in app development to shape the future of weather information.', buttonText: 'Start Exploring', route: '/' },
  { id: 2, title: 'Your Local Forecast', icon: 'mdi-weather-sunny', text: 'Tap to instantly access real-time weather details for your current location, powered by the accurate and efficient Tomorrow API.', buttonText: 'View Now', route: '/weather' },
  { id: 3, title: 'Explore other cities', icon: 'mdi-city', text: 'Search for weather conditions in thousands of cities worldwide. Uncover detailed forecasts, temperature trends, and more to plan your adventures or satisfy your curiosity.', buttonText: 'Discover Cities', route: '/city' },
  { id: 4, title: 'Under the Umbrella', icon: 'mdi-memory', text: 'Dive into the innovative technology behind Umbrella is weather insights. Learn how Tomorrow.io is powerful APIs can seamlessly integrate weather data into your own projects.', buttonText: 'Explore the Tech', route: '/tabs' },
];
</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
.container {
  margin: auto;
  width: 100%;
  height: 100%;

}
.containerS {
  font-family: 'Lato', sans-serif;
  font-weight: bold;
  margin: auto;
  width: 100%;
  background-image: linear-gradient(to right, #eec6f96c, #a8dbf679, #fef7c180, #f9e6e694);
  color: white;

  height: 100%;
}
</style>
