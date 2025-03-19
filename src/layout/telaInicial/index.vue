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
      <div class="container-card-color">


        <div class="container-card">
          <div class="text-title">
            <h1>Previsão do Tempo</h1>
          </div>
          <div class="text-card">
            <div class="text-container">
              <i class="fa-solid fa-location-dot"></i>
              <h2>Confira o clima de uma cidade:</h2>
            </div>
            <input
              type="text"
              placeholder="Informar o nome da cidade"
              v-model="input"
            >
          </div>
          <button
            class="container-button"
            @click="searcBntInicial"
          >BUSCAR</button>
        </div>
      </div>
    </div>
  </body>

</template>

<style scoped>
body {
  background-color: var(--color2);
  color: var(--cor);
}

.container-card-start {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container-card-color {
  background-color: var(--color3);
  border: var(--border);
  border-radius: var(--border-radius);
}

.container-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  height: 250px;
  gap: 5px;
  background-color: var(--containerBackground);
  border-radius: var(--border-radius);
}

.text-title {
  padding: 15px;
  font-size: 18px;
}

.text-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding-bottom: 10px;
}

.text-card input {
  margin-top: 10px;
  width: 100%;
  height: 30px;
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 5px;
}

.container-button {
  height: 40px;
  width: 80%;
  border-radius: var(--border-radius);
  border: var(--border);
}

.text-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.text-container i {
  font-size: 22px;
}
</style>