<template>
    <v-footer color="black" class="footer" padless>
        <v-card class="flex-container" flat tile color="black">
            <v-card-text class="white--text text-center">
                <strong>Umbrella App</strong> by <a href="https://github.com/LennyDevX" class="white--text no-underline">LennyDevX</a>. &copy; All rights reserved.
                <div class="icons">
                    <v-btn icon small color="white" href="https://vuejs.org" target="_blank"><v-icon small>mdi-vuejs</v-icon></v-btn>
                    <v-btn icon small color="white" href="https://vuetifyjs.com" target="_blank"><v-icon small>mdi-vuetify</v-icon></v-btn>
                    <v-btn icon small color="white" href="https://vitejs.dev" target="_blank"><v-icon small>mdi-speedometer</v-icon></v-btn>
                    <v-btn icon small color="white" href="https://github.com" target="_blank"><v-icon small>mdi-github</v-icon></v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    name: 'FooterComponent',
}
</script>

<style scoped>
.footer {
    width: 100%;
    height: 100px;
    justify-content: center;
}

.flex-container {

    display: flex;

    align-items: center;
    flex-direction: column;
    width: 100%;
}

.icons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    transition: 1s;
    &:hover {
        transform: scale(1.04);
        transition: 1s;

    }
}

.icons a {
    margin: 0 auto;
    &:hover {
        transform: scale(1.1);
        transition: 1s;

    }
}

.no-underline {
    text-decoration: none;
}

.text-center {
    text-align: center;
}
</style>