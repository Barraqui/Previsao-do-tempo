<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { TiposDados } from "@/services/types";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, } from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const props = defineProps<Props>();

const temperatura = ref(props.data.temperatura);
const temperaturasDias = ref<{ max: number; min: number; dia: number; semana: string }[]>([]);
const diasDaSemana = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."];

const gerarTemperaturasDias = () => {
    const quantidadeDias = 7;
    const temperaturas: { max: number; min: number; dia: number; semana: string }[] = [];

    if (props.data.resultadoDiaAtual !== undefined && props.data.resultadoSemanaAtual !== undefined && temperatura.value != undefined) {

        for (let i = 0; i < quantidadeDias; i++) {
            const calculandoDiasMes = (props.data.resultadoDiaAtual + 1) + i;
            const calculandoDiasSemana = ((props.data.resultadoSemanaAtual + i) + 1) % 7

            const maxTemperatura = Math.floor(temperatura.value + (Math.random() * 5));
            const minTemperatura = Math.floor(maxTemperatura - (Math.random() * 12));

            temperaturas.push({ max: maxTemperatura, min: minTemperatura, dia: calculandoDiasMes, semana: diasDaSemana[calculandoDiasSemana] });
        }
        return temperaturas
    }
    return [];
};

watch(() => props.data.temperatura, (newTemperatura) => {
    temperatura.value = newTemperatura;
    temperaturasDias.value = gerarTemperaturasDias();
});

type Props = {
    data: TiposDados
};

const dadosGraficos = computed(() => {
    return {
        labels: temperaturasDias.value.map(temperatura => temperatura.semana),
        datasets: [
            {
                label: "Temperatura Máxima",
                data: temperaturasDias.value.map(temperatura => temperatura.max),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 1,
            },
            {
                label: "Temperatura Mínima",
                data: temperaturasDias.value.map(temperatura => temperatura.min),
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgb(54, 162, 235)",
                borderWidth: 1,
            }
        ]
    }
})

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
};
</script>

<template>

    <body>
        <div class="container-main-info">
            <div class="container-info">
                <div class="container-climate">
                    <div class="time-climate">
                        <div class="climate">
                            <h1>{{ data.cidade }}, {{ data.pais }}</h1>
                            <h2>Clima atual</h2>
                        </div>
                        <div class="time-day">
                            <h2>Horário da previsão: {{ diasDaSemana[data.resultadoSemanaAtual ?? 0] }} {{ data.horas }}
                            </h2>
                        </div>
                    </div>
                    <div class="container-temp-info">
                        <div class="info-temp">
                            <div class="img-temp">
                                <img
                                    v-if="data.icone"
                                    :src="data.icone"
                                    :alt="data.descricao"
                                />
                            </div>
                            <div class="temp-number">
                                <span>{{ data.temperatura?.toFixed() }}</span>
                            </div>
                            <div class="unit-measurement">
                                <span>&deg;{{ data.unidadeMedida }}</span>
                            </div>
                        </div>
                        <div class="info-climate">
                            <p>{{ data.descricao }}</p>
                            <div class="thermal-sensation">
                                <p>sensação térmica</p>
                                <div class="sensation-temp-number">
                                    <span id="thermal">{{ data.senTermica?.toFixed() }}&deg;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-climate">
                    <div class="more-infos">
                        <div class="legen-info">
                            <i class="fa-solid fa-temperature-arrow-up"></i>
                            <div class="title-info">
                                <span>Temperatura max</span>
                                <div class="temp-valor">{{ data.temperaturaMax?.toFixed() }} &deg;{{
                                    data.unidadeMedida }}</div>
                            </div>
                        </div>
                        <div class="legen-info">
                            <i class="fa-solid fa-temperature-arrow-down"></i>
                            <div class="title-info">
                                <span>Temperatura min</span>
                                <div class="temp-valor">{{ data.temperaturaMin?.toFixed() }} &deg;{{ data.unidadeMedida
                                }}</div>
                            </div>
                        </div>
                        <div class="legen-info">
                            <i class="fa-solid fa-wind"></i>
                            <div class="title-info">
                                <span>Vento</span>
                                <div class="temp-valor">{{ data.vento }} Km/h</div>
                            </div>
                        </div>
                        <div class="legen-info">
                            <i class="fa-solid fa-droplet"></i>
                            <div class="title-info">
                                <span>Umidade</span>
                                <div class="temp-valor">{{ data.umidade }} %</div>
                            </div>
                        </div>
                        <div class="legen-info">
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                            <div class="title-info">
                                <span>Pressão</span>
                                <div class="temp-valor">{{ data.pressao }} mb</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-map">
                <iframe
                    loading="lazy"
                    allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                    :src="data.urlMap"
                >
                </iframe>
            </div>
        </div>
        <div class="container-day">
            <div
                v-for="(temperatura, index) in temperaturasDias"
                :key="index"
                class="card-temp-day"
            >

                <div class="day">
                    <span>{{ temperatura.dia }}</span>
                    <span>{{ temperatura.semana }}</span>
                </div>
                <div class="container-weather-day">
                    <div class="weather-day">
                        <img
                            v-if="data.iconCardsDia && data.iconCardsDia[index]"
                            :src="data.iconCardsDia[index]"
                            :alt="'Noite ' + temperatura.semana"
                        />
                        <span>{{ temperatura.max }}&deg;</span>
                    </div>
                    <div class="weather-day">
                        <img
                            v-if="data.iconCardsNoite && data.iconCardsNoite[index]"
                            :src="data.iconCardsNoite[index]"
                            :alt="data.descricao"
                        />
                        <span>{{ temperatura.min }}&deg;</span>
                    </div>
                </div>
            </div>
            <div class="container-graphic-design">
                <Bar
                    :data="dadosGraficos"
                    :options="chartOptions"
                />

            </div>
        </div>
    </body>
</template>
<style scoped>
body {
    background-color: var(--color2);
    color: var(--cor);
}

.container-main-info {
    display: flex;
    justify-content: space-between;
    padding: 50px;
    margin-left: 80px;
    margin-right: 80px;
}

.container-info {
    width: 45%;
    height: 100%;
    border: var(--border);
    border-radius: var(--border-radius);
}

.container-climate {
    display: flex;
    flex-direction: column;
    width: 100%;
    cursor: pointer;
    background-color: var(--containerBackground);
}

.time-climate {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 10px;
}

.climate {
    font-size: 15px;
}

.time-day {
    font-size: 10px;
}

.container-temp-info {
    display: flex;
    align-items: center;
}

.info-temp {
    display: flex;
    align-items: center;
}

.img-temp {
    margin-right: 10px;
}

.temp-number {
    font-size: 35px;
}

.unit-measurement {
    font-size: 25px;
}

.info-climate {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 15px;
    margin-left: 30px;
}

.thermal-sensation {
    display: flex;
    align-items: center;
}

.sensation-temp-number {
    margin-left: 15px;
}

.more-infos {
    display: flex;
    justify-content: space-between;
    margin: 10px;
}

.legen-info {
    display: flex;
    align-items: center;
}

.legen-info i {
    margin-right: 15px;
    height: 20px;
}

.container-map {
    width: 50%;
}

.container-map iframe {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: var(--border);
}

.container-day {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 50px;
    margin-left: 80px;
    margin-right: 80px;
    gap: 50px;
}

.card-temp-day {
    width: 150px;
    height: 150px;
    background-color: var(--containerBackground);
    border-radius: var(--border-radius);
    border: var(--border);
}

.day {
    display: flex;
    justify-content: space-between;
}

.day span {
    margin: 5px;
    font-size: 18px;
}

.container-weather-day {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 15px;
}

.weather-day {
    font-size: 24px;
}

.container-graphic-design {
    width: 100%;
    height: 300px;
    border-radius: var(--border-radius);
    border: var(--border);
    background-color: var(--containerBackground);
}
</style>