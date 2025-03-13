<script setup lang="ts">
import TelaInicial from "@/layout/telaInicial/index.vue";
import PrevisaoTempo from "@/layout/telaPrevisaoTempo/index.vue"
</script>

<template>
    <main class="mainCountainer">
        <div>
            <TelaInicial />
        </div>
    </main>
</template>

<style>
.mainContainer {
    display: flex;
    width: 100%;
    flex-direction: column;
}
</style>