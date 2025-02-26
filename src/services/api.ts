export  async function getWeatherData(city: string) {

    const apiKey = "c26a8312089d8db89bc9ad4b18ad40bc";

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    return (await fetch(apiWeatherURL)).json();
}