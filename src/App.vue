<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router';
import { reactive, ref } from 'vue';
import { getWeatherData } from './services/api';
import Card from '@/modules/layout/card/index.vue';
import '@/assets/main.css';


const input = ref();
const data = reactive({

  cidade: "Cidade",
  temperatura: 0,
  descricao: "",
  icone: "",
  senTermica: 0,
  temperaturaMax: 0,
  temperaturaMin: 0,
  vento: 0,
  umidade: 0,
  pressao: 0
});


const showWeatherData = async (city: string) => {

  const infoCidade = await getWeatherData(city);
  console.log(infoCidade);

  data.cidade = infoCidade.name;
  data.temperatura = parseInt(infoCidade.main.temp);
  data.descricao = infoCidade.weather[0].description;
  data.icone = (`http://openweathermap.org/img/wn/${infoCidade.weather[0].icon}.png`);
  data.senTermica = parseInt(infoCidade.main.feels_like);
  data.temperaturaMax = parseInt(infoCidade.main.temp_max);
  data.temperaturaMin = parseInt(infoCidade.main.temp_min);
  data.vento = parseInt(infoCidade.wind.speed);
  data.umidade = parseInt(infoCidade.main.humidity);
  data.pressao = parseInt(infoCidade.main.pressure);


};


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
          <i class="fa-solid fa-sun"></i>
          <h3>{{ data.temperatura + "&deg;C" }}</h3>
        </div>
      </div>
    </div>
    <div class="temp-container">
      <div class="select-temp">
        <h3>°C</h3>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    </div>
  </header>
  <div>

    <Card :types="data" />
  </div>

</template>