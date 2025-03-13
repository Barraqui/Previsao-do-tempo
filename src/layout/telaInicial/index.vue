<script setup lang="ts">
/*
 Criar uma pagina inicial para colocar a cidade que deseja e logo depois ela puxa os dados
 Arrumar alguns styles, como fonte, a distancia das divs, cores da pagina
*/
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { reactive, ref, watch } from 'vue';
import { getWeatherData } from '../../services/api';
import Card from '@/layout/card/index.vue';
import type { TiposDados } from '../../services/types';
// import { searcBtn } from "../telaPrevisaoTempo/index.vue";
const input = ref()
const router = useRouter();

function searcBntInicial() {
  //const cityNameInicial = input.value.trim();
  //showWeatherData(cityNameInicial);
  router.push("/previsaoTempo");
}

</script>

<template>
  <header>

  </header>

  <body>
    <div class="container">
      <div class="container-card">
        <div class="teste">
          <h1>Previsão do Tempo</h1>
        </div>
        <div class="text-card">
          <h2>Confira o clima de uma cidade:</h2>
          <input
            type="text"
            placeholder="Pesquisar por local"
          >
        </div>
        <button
          class="container-button"
          @click="searcBntInicial"
        >BUSCAR</button>
      </div>
    </div>
    <!-- <RouterLink
      to="/previsaoTempo"
      class="testando"
    >testandoooooo</RouterLink> -->
  </body>
</template>

<style>
@import "./index.css";
</style>