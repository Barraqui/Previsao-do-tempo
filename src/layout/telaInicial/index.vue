<script setup lang="ts">

import { useRouter } from 'vue-router';
import { ref } from 'vue';

const input = ref();
const router = useRouter();

function searcBntInicial() {
  router.push(`/previsaoTempo/${input.value}`);
}

</script>

<template>

  <body>
    <div class="container-card-start">
      <div class="container-card">
        <div class="teste">
          <h1>Previsão do Tempo</h1>
        </div>
        <div class="text-card">
          <h2>Confira o clima de uma cidade:</h2>
          <input
            type="text"
            placeholder="Pesquisar por local"
            v-model="input"
          >
        </div>
        <button
          class="container-button"
          @click="searcBntInicial"
        >BUSCAR</button>
      </div>
    </div>
  </body>

</template>

<style scoped>
@import "./index.css";
</style>