export  async function getWeatherData(city: string) {

    const apiKey = import.meta.env.VITE_APIKEYWEATHER;

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    
    return (await fetch(apiWeatherURL)).json();
}


// export async function getMapWeather(city:string) {
//     const apikeymaps = import.meta.env.VITE_APIKEYMAPS;

//     const apiMapURL = `https://www.google.com/maps/embed/v1/place?key=${apikeymaps}&q=${city}`

//     return(await fetch(apiMapURL)).json();
// }
// export async function mapWeather(city:string) {
//     const apiTime = `https://worldtimeapi.org/api/timezone/${props.types.cidade}/${}`
//     return((await fetch(apiTime)).json);
// }