<template>
    <div>
        <v-card class="custom-card mx-4 my-4 pa-4 rounded-lg d-flex flex-column">
            <v-row no-gutters>
                <v-col cols="12" md="8" class="d-flex flex-column justify-space-between">
                    <div>
                        <v-card-title class="headline white--text">Umbrella</v-card-title>
                    </div>
                    <v-card-text class="body-1 flex-grow-1">
                        <!-- Texto de la tarjeta -->
                        Umbrella is more than just a simple weather app; it’s your personal companion for all weather-related needs. With its intuitive and user-friendly design, Umbrella strives to provide the most accurate and up-to-date information on real-time weather conditions. Whether you’re planning your day or preparing for a trip, Umbrella ensures you’re always one step ahead of the weather.

                        Built with the powerful Vue.js ecosystem, Umbrella leverages the reactivity, reusable components, and Vue.js’s ability to handle large-scale applications. This results in a high-performance application that is both robust and scalable.
    
                        Moreover, Umbrella utilizes data from Tomorrow.io, one of the most reliable and accurate weather data providers available. This means you can trust the information provided by Umbrella, knowing it’s based on scientific data and advanced weather models.
                        <v-card-subtitle class="subtitle-1 white--text">
                            <i>Powered by Tomorrow.io & Vue Ecosystem</i>
                        </v-card-subtitle>
                    </v-card-text>
                </v-col>
                <v-col cols="12" md="4">
                    <v-img class="custom-img" src="/umbrella2.png" aspect-ratio="1" contain></v-img>
                </v-col>
            </v-row>
        </v-card>

        <v-card class="custom-card mx-4 my-4 pa-4 rounded-lg d-flex flex-column">
            <v-row no-gutters>
                <v-col cols="12" md="4">
                    <v-img class="custom-img" src="/umbrella3.png" aspect-ratio="0" contain></v-img>
                </v-col>
                <v-col cols="12" md="8" class="d-flex flex-column justify-space-between">
                    <div>
                        <v-card-title class="headline white--text">Open-Source</v-card-title>
                    </div>
                    <v-card-text class="body-1 flex-grow-1">
                        <!-- Texto de la tarjeta -->
                        Umbrella is an open-source weather application that invites developers and weather enthusiasts alike to contribute and help make it even better. As a personal weather companion, Umbrella is designed with an intuitive and user-friendly interface, striving to provide the most accurate and up-to-date real-time weather information. Whether you’re planning your day or preparing for a trip, Umbrella ensures you’re always one step ahead of the weather.

                        Built on the powerful Vue.js ecosystem, Umbrella leverages the reactivity, reusable components, and Vue.js’s ability to handle large-scale applications. This results in a high-performance, robust, and scalable application. Furthermore, Umbrella utilizes data from Tomorrow.io, one of the most reliable and accurate weather data providers available. This ensures that the information provided by Umbrella is based on scientific data and advanced weather models.
    
                        As an open-source project, we invite developers to contribute to Umbrella. Whether it’s improving the interface, adding new features, or enhancing the existing ones, your contributions can help make Umbrella a more comprehensive and user-friendly application. Join us in our mission to make Umbrella the go-to weather app for everyone. Your contributions can make a real difference!
                    </v-card-text>
                    
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
export default {
    // tu código de script aquí
}
</script>

<style scoped>
.headline {
    font-size: 2.6em;
    display: flex;
    justify-content: center;
    font-weight: bold;
    background-image: linear-gradient(
        to right,
        #2a87f1c9,
        #270d8f86,
        #d33105e7
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.v-card-subtitle {
    font-size: 0.7em;
    margin: 10px;
    display: flex;
    justify-content: left;
    font-weight: bold;
} 

.body-1 {
    font-size: 1em;
    line-height: 1.5em;
    color: #333;
}

.v-card {
    border-radius: 25px;
    background-color: transparent;
    box-shadow: #270d8f86 0px 0px 0px 0px;
}


.custom-img {
    width: 300px;

    margin: auto;

}

.custom-card {
    background-color: rgba(69, 98, 97, 0);
}

</style>