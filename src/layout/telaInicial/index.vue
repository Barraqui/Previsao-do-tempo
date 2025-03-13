<script setup lang="ts">
/*
 Criar uma pagina inicial para colocar a cidade que deseja e logo depois ela puxa os dados
 Arrumar alguns styles, como fonte, a distancia das divs, cores da pagina
*/
import { RouterLink, RouterView } from 'vue-router';
import { reactive, ref, watch } from 'vue';
import { getWeatherData } from '../../services/api';
import Card from '@/layout/card/index.vue';
import type { TiposDados } from '../../services/types';



</script>

<template>
  <header>

  </header>

  <body>
    <div class="">
      <h1>testandoooooo</h1>
      <a href="/previsaoTempo">testandoooooo</a>
    </div>
    <RouterLink
      to="/previsaoTempo"
      class="testando"
    >testandoooooo</RouterLink>
  </body>
</template>

<style>
body {
  color: white;

}

.testando {
  color: blue;
}

a {
  color: red;
}
</style>