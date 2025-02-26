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
                    <h2>{{ props.types.horas ?? '00:00' }}</h2>
                </div>
            </div>
            <div class="container-temp-info">
                <div class="info-temp">
                    <div class="img-temp">
                        <img
                            v-if="props.types.icone"
                            :src="props.types.icone"
                            :alt="props.types.descricao"
                        />
                    </div>
                    <div class="temp-number">
                        <span>{{ props.types.temperatura }}</span>
                    </div>
                    <div class="unit-measurement">
                        <span>&deg;C</span>
                    </div>
                </div>
                <div class="info-climate">
                    <p>{{ props.types.descricao ?? "descrição" }}</p>
                    <div class="thermal-sensation">
                        <p>sensação térmica</p>
                        <div class="sensation-temp-number">
                            <span id="thermal">{{ props.types.senTermica }}&deg;</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </body>
</template>