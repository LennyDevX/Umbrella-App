<template>
  <v-app-bar app color="black">
    <v-toolbar-items class="">
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    </v-toolbar-items>
    <v-toolbar-title>Umbrella ☂️ </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text>
        Explorar otras ciudades
      </v-btn>
      <v-btn text>
        Github
      </v-btn>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            v0.2
          </v-btn>
        </template>
        <v-list class="pa-0 mt-5">
          <v-list-item v-for="(item, index) in submenuItems" :key="index">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
    
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app class="right-drawer bg-black">
    <v-list>
      <v-list-item @click="drawer = false" v-for="item in items" :key="item.title">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    drawer: false,
    items: [
      { title: 'Explorar otras ciudades' },
      { title: 'Github' },
      { title: 'Bajo el capó' },
    ],
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
}
</script>

<style scoped>
.left-drawer {
  direction: rtl;
}
.right-drawer > .v-list {
  direction: ltr;
}
</style>