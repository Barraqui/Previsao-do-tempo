<script setup lang="ts">
import { reactive, ref } from "vue";
import "./index.css"
import type { Props } from "@/services/types";
import { getMapWeather } from "@/services/api";

const props = defineProps<Props>();
// const cidadeName = props.types.cidade
// const apikeymaps = import.meta.env.VITE_APIKEYMAPS;
// const urlMap = `https://www.google.com/maps/embed/v1/place?key=${apikeymaps}&q=${cidadeName}`

// const showMap = async (city: string) => {

//     const infoCidade = await getMapWeather(city);
//     console.log(infoCidade);

//     const urlMap = `https://www.google.com/maps/embed/v1/place?key=${apikeymaps}&q=${infoCidade.name}`


// };

</script>

<template>

    <body>
        <div class="container">
            <div class="container-info">
                <div class="container-climate">
                    <div class="time-climate">
                        <div class="climate">
                            <h1>{{ props.types.cidade ?? 'Cidade' }}</h1>
                            <h2>Clima atual</h2>
                        </div>
                        <div class="time-day">
                            <h2>{{ props.types.time ?? '00:00' }}</h2>
                        </div>
                    </div>
                    <div class="container-temp-info">
                        <div class="info-temp">
                            <div class="img-temp">
                                <img
                                    v-if="props.types.icone"
                                    :src="props.types.icone"
                                    :alt="props.types.descricao"
                                />
                            </div>
                            <div class="temp-number">
                                <span>{{ props.types.temperatura }}</span>
                            </div>
                            <div class="unit-measurement">
                                <span>&deg;C</span>
                            </div>
                        </div>
                        <div class="info-climate">
                            <p>{{ props.types.descricao ?? "descrição" }}</p>
                            <div class="thermal-sensation">
                                <p>sensação térmica</p>
                                <div class="sensation-temp-number">
                                    <span id="thermal">{{ props.types.senTermica }}&deg;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-climate">
                    <div class="more_infos">
                        <div class="legen_info">
                            <i class="fa-solid fa-temperature-arrow-up"></i>
                            <div class="title_info">
                                <span>Temperatura max</span>
                                <div class="temp_valor">{{ props.types.temperaturaMax }} &deg;C</div>
                            </div>
                        </div>
                        <div class="legen_info">
                            <i class="fa-solid fa-temperature-arrow-down"></i>
                            <div class="title_info">
                                <span>Temperatura min</span>
                                <div class="temp_valor">{{ props.types.temperaturaMin }} &deg;C</div>
                            </div>
                        </div>
                        <div class="legen_info">
                            <i class="fa-solid fa-wind"></i>
                            <div class="title_info">
                                <span>Vento</span>
                                <div class="temp_valor">{{ props.types.vento }} Km/h</div>
                            </div>
                        </div>
                        <div class="legen_info">
                            <i class="fa-solid fa-droplet"></i>
                            <div class="title_info">
                                <span>Umidade</span>
                                <div class="temp_valor">{{ props.types.umidade }} %</div>
                            </div>
                        </div>
                        <div class="legen_info">
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                            <div class="title_info">
                                <span>Pressão</span>
                                <div class="temp_valor">{{ props.types.pressao }} mb</div>
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
                    :src="props.types.urlMap"
                >
                </iframe>
            </div>
        </div>
        <div class="more-infos-day">
            <h1>oi</h1>
        </div>
    </body>
</template>