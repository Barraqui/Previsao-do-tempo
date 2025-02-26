<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router';
import { reactive, ref } from 'vue';
import { getWeatherData } from './services/api';
import Card from '@/modules/layout/card/index.vue';
import type { Props } from './services/types';
import '@/assets/main.css';

const props = defineProps<Props>();

const input = ref();
const data = reactive({

  cidade: "Nome da cidade",
  temperatura: 0
});


const showWeatherData = async (city: string) => {

  const resposta = await getWeatherData(city);
  console.log(resposta)

  data.cidade = resposta.name;
  data.temperatura = parseInt(resposta.main.temp)
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
          <button @click="searcBtn">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div class="city-container">
        <div class="city">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="white"
            viewBox="0 0 256 256"
          >
            <path
              d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"
            ></path>
          </svg>
          <h4>Mudo</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="yellow"
            viewBox="0 0 256 256"
          >
            <path
              d="M120,40V32a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-8-8A8,8,0,0,0,50.34,61.66Zm0,116.68-8,8a8,8,0,0,0,11.32,11.32l8-8a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l8-8a8,8,0,0,0-11.32-11.32l-8,8A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l8,8a8,8,0,0,0,11.32-11.32ZM40,120H32a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm88,88a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,128,208Zm96-88h-8a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Z"
            ></path>
          </svg>
          <h3>temperatura</h3>
        </div>
      </div>
    </div>
    <div class="temp-container">
      <div class="select-temp">
        <h3>°C</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="white"
          viewBox="0 0 256 256"
        >
          <path
            d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
          ></path>
        </svg>
      </div>
    </div>
  </header>
  <div>

    <Card :types="data" />
  </div>

</template>