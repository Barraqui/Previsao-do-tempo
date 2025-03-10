<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { getWeatherData } from "@/services/api";
import type { TiposDados, WeatherResponse } from "@/services/types";

const props = defineProps<Props>();

//gerar numeros aleatorios para 7 cards, os numeros vao ter que ser aleatorios com base na temperatura. Entao ela vai ser o limite maximo ou o limite vai ser a temperatura +5 (coisaAssim)
const temperatura = ref(props.data.temperatura);
const temperaturasDias = ref<{ max: number; min: number }[]>([]);

const gerarTemperaturasDias = () => {
    const quantidadeDias = 7;
    const temperaturas: { max: number; min: number }[] = [];

    for (let i = 0; i < quantidadeDias; i++) {
        const variacao = temperatura.value * 0.05;
        const maxTemperatura = Math.floor(Math.random() * (variacao * 2)) + (temperatura.value + 1);
        const minTemperatura = Math.floor(maxTemperatura - (temperatura.value * 0.34));
        temperaturas.push({ max: maxTemperatura, min: minTemperatura });
    }
    return temperaturas;
}

console.log(props.data.horas)
watch(() => props.data.temperatura, (newTemperatura) => {
    temperatura.value = newTemperatura;
    temperaturasDias.value = gerarTemperaturasDias();
})
console.log(temperaturasDias.value)

type Props = {
    data: TiposDados
};
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
            <div
                v-for="(temperatura, index) in temperaturasDias"
                :key="index"
                class="card-temp-day"
            >

                <div class="day">
                    <span>{{ 10 }}</span>
                    <span>{{ }}</span>
                </div>
                <div class="container-weather-day">
                    <div class="weather-day">
                        <img
                            v-if="data.icone"
                            :src="data.icone"
                            :alt="data.descricao"
                        />
                        <span>{{ temperatura.max }}&deg;</span>
                    </div>
                    <div class="weather-day">
                        <img
                            v-if="data.icone"
                            :src="data.icone"
                            :alt="data.descricao"
                        />
                        <span>{{ temperatura.min }}&deg;</span>
                    </div>
                </div>
            </div>

        </div>
    </body>
</template>
<style>
@import "./index.css";
</style>