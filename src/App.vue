<script setup lang="ts">
/*
 Criar uma pagina inicial para colocar a cidade que deseja e logo depois ela puxa os dados
 Criar as infos aleatorias de temperatura, onde vai puxar os icones dependendo da temperatura
 Arrumar alguns styles, como fonte, a distancia das divs, cores da pagina
*/
import { RouterLink, RouterView } from 'vue-router';
import { reactive, ref, type Reactive } from 'vue';
import { getWeatherData } from './services/api';
import Card from '@/modules/layout/card/index.vue';
import type { TiposDados } from './services/types';

const apiKeyMaps = import.meta.env.VITE_APIKEYMAPS;
const input = ref();

const data: Reactive<TiposDados> = reactive({
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
  pais: "País"
});

const showWeatherData = async (city: string) => {

  const infoCidade = await getWeatherData(city);
  console.log(infoCidade);

  const calculandoHoras = (infoCidade.dt + infoCidade.timezone + 10800) * 1000;
  const resultadoDataHoras = new Date(calculandoHoras)
  const horasString = resultadoDataHoras.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  console.log(resultadoDataHoras)

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

    <Card :data="data" />
  </div>

</template>

<style>
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

.temp-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px 10px;
  color: var(--cor);
  height: 25px;
}

.select-temp {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>