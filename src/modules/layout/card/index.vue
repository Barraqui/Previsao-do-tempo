<script setup lang="ts">
import { reactive, ref } from "vue";
import "./index.css"
import { getWeatherData } from "@/services/api";
import type { Props } from "@/services/types";

const props = defineProps<Props>();

</script>

<template>

    <body>
        <div class="container">
            <div class="time-climate">
                <div class="climate">
                    <h1>{{ props.types.cidade ?? 'Cidade' }}</h1>
                    <h2>Clima atual</h2>
                </div>
                <div class="time-day">
                    <h2>11:40</h2>
                </div>
            </div>
            <div class="container-temp-info">
                <div class="info-temp">
                    <div class="img-temp">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="80"
                            height="80"
                            fill="yellow"
                            viewBox="0 0 256 256"
                        >
                            <path
                                d="M120,40V32a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-8-8A8,8,0,0,0,50.34,61.66Zm0,116.68-8,8a8,8,0,0,0,11.32,11.32l8-8a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l8-8a8,8,0,0,0-11.32-11.32l-8,8A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l8,8a8,8,0,0,0,11.32-11.32ZM40,120H32a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm88,88a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,128,208Zm96-88h-8a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Z"
                            ></path>
                        </svg>
                    </div>
                    <div class="temp-number">
                        <span>{{ props.types.temperatura }}</span>
                    </div>
                    <div class="unit-measurement">
                        <span>&deg;C</span>
                    </div>
                </div>
                <div class="info-climate">
                    <p id="description">Parcialmente ensolarado</p>
                    <div class="thermal-sensation">
                        <p>sensação térmica</p>
                        <div class="sensation-temp-number">
                            <span id="thermal">32&deg;</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </body>
</template>