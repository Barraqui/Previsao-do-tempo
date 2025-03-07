<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { getWeatherData } from "@/services/api";
import type { TiposDados, WeatherResponse } from "@/services/types";

const props = defineProps<Props>();
// const dataAtual = new Date();
// const obterDiasSemana = computed(() => {
//     const diasDaSemana = [
//         "Dom.",
//         "Seg.",
//         "Ter.",
//         "Qua.",
//         "Qui.",
//         "Sex.",
//         "Sáb."
//     ];
//     return diasDaSemana[dataAtual.getDay()];
// });

// const obterDia = computed(() => {
//     return dataAtual.getDate();
// })
type Props = {
    data: TiposDados
}

</script>

<template>

    <body>
        <div class="container">
            <div class="container-info">
                <div class="container-climate">
                    <div class="time-climate">
                        <div class="climate">
                            <h1>{{ data.cidade }}, {{ data.pais }}</h1>
                            <h2>Clima atual</h2>
                        </div>
                        <div class="time-day">
                            <h2>Horário da previsão: {{ data.horas }}</h2>
                        </div>
                    </div>
                    <div class="container-temp-info">
                        <div class="info-temp">
                            <div class="img-temp">
                                <img
                                    v-if="data.icone"
                                    :src="data.icone"
                                    :alt="data.descricao"
                                />
                            </div>
                            <div class="temp-number">
                                <span>{{ data.temperatura }}</span>
                            </div>
                            <div class="unit-measurement">
                                <span>&deg;C</span>
                            </div>
                        </div>
                        <div class="info-climate">
                            <p>{{ data.descricao }}</p>
                            <div class="thermal-sensation">
                                <p>sensação térmica</p>
                                <div class="sensation-temp-number">
                                    <span id="thermal">{{ data.senTermica }}&deg;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-climate">
                    <div class="more-infos">
                        <div class="legen-info">
                            <i class="fa-solid fa-temperature-arrow-up"></i>
                            <div class="title-info">
                                <span>Temperatura max</span>
                                <div class="temp-valor">{{ data.temperaturaMax }} &deg;C</div>
                            </div>
                        </div>
                        <div class="legen-info">
                            <i class="fa-solid fa-temperature-arrow-down"></i>
                            <div class="title-info">
                                <span>Temperatura min</span>
                                <div class="temp-valor">{{ data.temperaturaMin }} &deg;C</div>
                            </div>
                        </div>
                        <div class="legen-info">
                            <i class="fa-solid fa-wind"></i>
                            <div class="title-info">
                                <span>Vento</span>
                                <div class="temp-valor">{{ data.vento }} Km/h</div>
                            </div>
                        </div>
                        <div class="legen-info">
                            <i class="fa-solid fa-droplet"></i>
                            <div class="title-info">
                                <span>Umidade</span>
                                <div class="temp-valor">{{ data.umidade }} %</div>
                            </div>
                        </div>
                        <div class="legen-info">
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                            <div class="title-info">
                                <span>Pressão</span>
                                <div class="temp-valor">{{ data.pressao }} mb</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-map">
                <iframe
                    loading="lazy"
                    allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                    :src="data.urlMap"
                >
                </iframe>
            </div>
        </div>
        <div class="container-day">
            <div class="card-temp-day">

                <div class="day">
                    <span>{{ }}</span>
                    <span>qui</span>
                </div>
                <div class="container-weather-day">
                    <div class="weather-day">
                        <img
                            v-if="data.icone"
                            :src="data.icone"
                            :alt="data.descricao"
                        />
                        <span>{{ data.temperatura ? data.temperatura - 10 : '' }}&deg;</span>
                    </div>
                    <div class="weather-day">
                        <img
                            v-if="data.icone"
                            :src="data.icone"
                            :alt="data.descricao"
                        />
                        <span>35&deg;</span>
                    </div>
                </div>
            </div>

        </div>
    </body>
</template>
<style>
@import "./index.css";
</style>