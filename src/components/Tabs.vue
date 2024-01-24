<template>
  <v-data-iterator
    :items="desserts"
    item-value="name"
  >
    <template v-slot:default="{ items, isExpanded, toggleExpand }">
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.raw.name"
          cols="12"
          sm="12"
          md="3"
        >
          <v-card class="custom-card border rounded-xl ma-5 pa-1 shadow">
            <v-card-title class="d-flex align-center">
              <v-icon
                :color="item.raw.color"
                start
                size="18"
              >{{ item.raw.icon }}</v-icon>

              <h4>{{ item.raw.name }}</h4>
            </v-card-title>

            <v-card-text >
              {{ item.raw.description }}
            </v-card-text>

            <div class="px-4">
              <v-switch
                :model-value="isExpanded(item)"
                :label="`${isExpanded(item) ? 'Hide' : 'Show'} benefits`"
                density="compact"
                inset
                @click="() => toggleExpand(item)"
              ></v-switch>
            </div>

            <v-divider></v-divider>

            <v-expand-transition>
              <div v-if="isExpanded(item)" >
                <v-list density="compact" :lines="false" class="rounded-xl custom-list">
                  <v-list-item v-for="(benefit, index) in item.raw.benefits" :key="index">
                    {{ benefit }}
                  </v-list-item>
                </v-list>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>
<script>
export default {
  data: () => ({
    desserts: [
      {
        name: "Vue.js",
        description: "A lightweight, flexible, and powerful JavaScript framework for building user interfaces. Vue is easy to learn and use, and can be used to build a wide variety of web applications.",
        icon: "mdi-vuejs",
        color: "#4FC08D",
        benefits: [
          " 🧩 Modular programming",
          "⚡ Reactive programming",
          " 🔄️ Code reuse",
          " 🌐 Server-side rendering"
        ],
      },
      {
        name: "Vuetify",
        description: "A component-based framework that provides a complete set of UI components for building Material Design-inspired web applications. Vuetify is easy to use and customize, and can help you create beautiful and responsive user interfaces.",
        icon: "mdi-vuetify",
        color: "#1867C0",
        benefits: [
          " 🧩 Material Design components",
          "⚡ Reactive programming",
          " 🔄️ Component reuse",
          "️ ⚙️ Design tools"
        ],
      },
      {
        name: "JavaScript",
        description: "The programming language of the web. JavaScript can be used to add interactivity to web pages, create animations, and build complex applications.",
        icon: "mdi-language-javascript",
        color: "#F7DF1E",
        benefits: [
          " 🪄 Dynamic programming",
          "⚡ Asynchronous programming",
          " 🔄️ Code reuse",
          "️ ⚙️ Development tools"
        ],
      },
      {
        name: "Vite",
        description: "A high-performance development tool that makes it faster and easier to build Vue.js applications. Vite includes a built-in development server, hot module replacement, and TypeScript support.",
        icon: "mdi-speedometer",
        color: "#646CFF",
        benefits: [
          " 🚀 Fast development",
          "⚡ Hot reload",
          " 😻 Easy to use",
          "️⚙️ Development tools"
        ],
      },
    ],
  }),
};

</script>

<style scoped>
.custom-card {
  background-color: transparent;
  transition: 1s;
  box-shadow: inset 0 0 0 1px #000000;
}
.custom-card:hover {
  background-color: rgba(0, 0, 0, 0.71);
  color: white;
  box-shadow: 3px 3px 5px rgba(148, 104, 14, 0.6);
  transform: scale(0.98);
  transition: 1s;
}

.custom-list {
  background-color: rgba(28, 27, 27, 0.212);
  transition: 1s;
  box-sizing: border-box;
  color: aliceblue;
}
.custom-list:hover {
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.6);
}
</style>