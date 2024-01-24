<template>
    <v-row justify="center">
        <v-col cols="12" sm="6" md="4" lg="3" v-for="card in cards" :key="card.id">
            <router-link :to="card.route">
                <v-card max-width="300px" class="mx-auto  custom-card">
                    <v-card-title>
                        <v-icon left>{{ card.icon }}</v-icon> <!-- Icono agregado aquí -->
                        {{ card.title }}
                    </v-card-title>
                    <v-card-text>
                        {{ card.text }}
                    </v-card-text>
                </v-card>
            </router-link>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'CardComponent',
    props: {
        cards: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
a{
    text-decoration: none;
}

.custom-card {
    margin: 25px;
    text-decoration: none;
    background-color: transparent;
    border-radius: 20px; /* Esquinas redondeadas */
    color: rgb(0, 0, 0);
    transition: 1s;
    box-sizing: border-box;
    &:hover {
        box-shadow: 4px 4px 4px rgba(107, 17, 224, 0.457); /* Sombra inicial */
        transform: scale(0.98);
        transition: 1s;
    }
}
</style>