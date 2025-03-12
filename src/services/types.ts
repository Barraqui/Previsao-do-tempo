
export interface WeatherResponse {
    name: string
    dt: number
    timezone: number
    main: {
        temp: string
        feels_like: string
        temp_max: string
        temp_min: string
        humidity: string
        pressure: string
    }

    weather: Array <{description: string, icon: string}>
    
    wind: {
        speed: string
    }

    sys: {
        country: string
    }
}


export interface TiposDados {
        cidade?: string
        temperatura?: number
        descricao?: string
        icone?: string
        senTermica?: number
        temperaturaMax?: number
        temperaturaMin?: number
        vento?: number
        umidade?: number
        pressao?: number
        urlMap?: string
        horas?: string
        pais?: string
        resultadoSemanaAtual?: number
        resultadoDiaAtual?: number
        iconCardsDia?: string[]
        iconCardsNoite?: string[]
        unidadeMedida: string
}