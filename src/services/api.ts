export  async function getWeatherData(city: string) {

    const apiKey = import.meta.env.VITE_APIKEYWEATHER;

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    
    return (await fetch(apiWeatherURL)).json();
}