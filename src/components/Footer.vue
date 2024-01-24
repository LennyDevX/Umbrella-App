<template>
    <v-footer class="custom-footer" padless>
            <v-card-text class="white--text text-center">
                <strong>Umbrella App</strong> by <a href="https://github.com/LennyDevX" class="white--text no-underline">LennyDevX</a>. &copy; All rights reserved.
                <div class="icons">
                    <a href="https://vuejs.org" target="_blank"><v-icon class="white--text">mdi-vuejs</v-icon></a>
                    <a href="https://vuetifyjs.com" target="_blank"><v-icon class="white--text">mdi-vuetify</v-icon></a>
                    <a href="https://vitejs.dev" target="_blank"><v-icon class="white--text">mdi-speedometer</v-icon></a>
                    <a href="https://github.com" target="_blank"><v-icon class="white--text">mdi-github</v-icon></a>
                </div>
            </v-card-text>
    </v-footer>
</template>

<script>
export default {
    name: 'FooterComponent',
}
</script>

<style scoped>

.custom-footer {
    background-color: rgba(0, 0, 0, 0.53);
    color: aliceblue;
    display: flex;
    border-radius: 7px;
}

.icons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.icons a {
    margin: 0 6px;
    transition: transform 0.3s ease-in-out;
    color: aliceblue;
}

.icons a:hover {
    transform: scale(1.3);
}

.no-underline {
    text-decoration: none;
    color: aquamarine;
}

.text-center {
    text-align: center;
}
</style>