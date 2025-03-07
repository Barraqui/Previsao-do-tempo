import type { WeatherResponse } from "./types";

export  async function getWeatherData(city: string) : Promise<WeatherResponse> {

    const apiKeyMap = import.meta.env.VITE_APIKEYWEATHER;

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyMap}&lang=pt_br`
    
    return (await fetch(apiWeatherURL)).json();
}