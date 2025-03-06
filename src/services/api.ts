export  async function getWeatherData(city: string) {

    const apiKeyMap = import.meta.env.VITE_APIKEYWEATHER;

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyMap}&lang=pt_br`
    
    return (await fetch(apiWeatherURL)).json();
}

// export async function getTimeZone(lat:number, long:number, timeStamp: number) {

//     const apiKeyTimeZone = import.meta.env.VITE_APIKEYTIMEZONE

//     const timezoneUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${long}&timestamp=${timeStamp}&key=${apiKeyTimeZone}`;
    
//     return (await fetch(timezoneUrl)).json();
// }