<script setup lang="ts">

import { RouterView, useRoute } from 'vue-router';
import { reactive, ref, watch } from 'vue';
import { getWeatherData } from '../../services/api';
import Card from '@/layout/card/index.vue';
import type { TiposDados } from '../../services/types';

const route = useRoute();
console.log(route.params)

const apiKeyMaps = import.meta.env.VITE_APIKEYMAPS;
const input = ref();
const temperaturaSelect = ref("celsius");

const data = reactive<TiposDados>({
    cidade: "Cidade",
    temperatura: 0,
    descricao: "Descrição",
    icone: "",
    senTermica: 0,
    temperaturaMax: 0,
    temperaturaMin: 0,
    vento: 0,
    umidade: 0,
    pressao: 0,
    urlMap: "",
    horas: "00:00",
    pais: "País",
    resultadoDiaAtual: 0,
    resultadoSemanaAtual: 0,
    iconCardsDia: [],
    iconCardsNoite: [],
    unidadeMedida: "C"
});

const showWeatherData = async (city: string) => {

    const infoCidade = await getWeatherData(city);
    console.log(infoCidade);

    const calculandoHoras = (infoCidade.dt + infoCidade.timezone + 10800) * 1000;
    const resultadoDataHoras = new Date(calculandoHoras);
    const horasString = resultadoDataHoras.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    watch(temperaturaSelect, (newValue) => {
        if (newValue === "celsius") {
            data.temperatura = parseInt(infoCidade.main.temp);
            data.temperaturaMax = parseInt(infoCidade.main.temp_max);
            data.temperaturaMin = parseInt(infoCidade.main.temp_min);
            data.senTermica = parseInt(infoCidade.main.feels_like);
            data.unidadeMedida = "C"
        } else {
            data.unidadeMedida = "F"
            data.temperatura = parseFloat(infoCidade.main.temp) * 1.8 + 32;
            data.temperaturaMax = parseFloat(infoCidade.main.temp_max) * 1.8 + 32;
            data.temperaturaMin = parseFloat(infoCidade.main.temp_min) * 1.8 + 32;
            data.senTermica = parseFloat(infoCidade.main.feels_like) * 1.8 + 32
        }
    })

    data.resultadoSemanaAtual = resultadoDataHoras.getDay();
    data.resultadoDiaAtual = resultadoDataHoras.getDate();
    data.cidade = infoCidade.name;
    data.temperatura = parseInt(infoCidade.main.temp);
    data.descricao = infoCidade.weather[0].description;
    data.icone = `http://openweathermap.org/img/wn/${infoCidade.weather[0].icon}.png`;
    data.senTermica = parseInt(infoCidade.main.feels_like);
    data.temperaturaMax = parseInt(infoCidade.main.temp_max);
    data.temperaturaMin = parseInt(infoCidade.main.temp_min);
    data.vento = parseInt(infoCidade.wind.speed);
    data.umidade = parseInt(infoCidade.main.humidity);
    data.pressao = parseInt(infoCidade.main.pressure);
    data.urlMap = `https://www.google.com/maps/embed/v1/place?key=${apiKeyMaps}&q=${infoCidade.name}+${infoCidade.sys.country}`;
    data.pais = infoCidade.sys.country;
    data.horas = horasString;

    const iconDia = ["01d", "02d", "03d", "04d", "09d", "10d", "11d", "50d"];
    const iconNoite = ["01n", "02n", "03n", "04n", "09n", "10n", "11n", "50n"];

    if (data.temperatura <= 0) {
        iconDia.push("13d");
        iconNoite.push("13n")

    };

    for (let i = 0; i < 7; i++) {
        const randomIconeDia = iconDia[Math.floor(Math.random() * iconDia.length)];
        const randomIconeNoite = iconNoite[Math.floor(Math.random() * iconNoite.length)];
        data.iconCardsDia?.push(`http://openweathermap.org/img/wn/${randomIconeDia}.png`);
        data.iconCardsNoite?.push(`http://openweathermap.org/img/wn/${randomIconeNoite}.png`);
    };
};

showWeatherData(route.params.cidade);

function searcBtn() {
    const cityName = input.value.trim();
    showWeatherData(cityName);
};
</script>

<template>
    <header>
        <div class="search-city">
            <div class="search">
                <div class="input-container">
                    <input
                        type="text"
                        placeholder="Pesquisar por local"
                        v-model="input"
                    />
                </div>
                <button @click="searcBtn">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            <div class="city-container">
                <div class="city">
                    <i class="fa-solid fa-house"></i>
                    <h4>{{ data.cidade ?? "Cidade" }}</h4>
                    <img
                        class="iconeCard"
                        v-if="data.icone"
                        :src="data.icone"
                        :alt="data.descricao"
                    />
                    <h3>{{ data.temperatura?.toFixed() + "&deg;" }}{{ data.unidadeMedida }}</h3>
                </div>
            </div>
        </div>
        <!-- <RouterLink to="/telaInicial">TELA</RouterLink> router link -->
        <div class="temp-container">
            <div class="select-temp">
                <select
                    name="Temperatura"
                    id="temperaturaSelect"
                    v-model="temperaturaSelect"
                >
                    <option value="celsius">°C</option>
                    <option value="fahrenheit">°F</option>
                </select>
            </div>
        </div>
    </header>
    <div>

        <Card :data="data" />
    </div>
    <div id="main">
        <RouterView />
    </div>
</template>

<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #1c1c44;
}

.search-city {
    display: flex;
    align-items: center;
    gap: 25px;
}

.search {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    padding-left: 130px;

}

.input-container {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 5px 10px;
}

.input-container input {
    border: none;
    outline: none;
    padding: 5px;
    width: 100%;
    border-radius: 5px;
}

.search button {
    height: 30px;
    width: 30px;
    cursor: pointer;
    background-color: #1c1c44;
    border: none;
}

.search button i {
    color: var(--cor);
}

.city-container {
    margin: 0px;
}

.city {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 15px;
    height: 25px;
    color: var(--cor);
}

.city i {
    padding-left: 5px;
    padding-right: 5px;
}

.city img {
    width: 30px;
}

.temp-container {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 5px 10px;
    margin: 10px;
    color: var(--cor);
    height: 25px;
}

.select-temp {
    display: flex;
    align-items: center;
    height: 100%;
}

select {
    color: var(--cor);
    font-size: 18px;
    background-color: #1c1c44;
    border: none;
    cursor: pointer;
}
</style>