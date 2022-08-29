require('dotenv').config()
const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')


const app = express()
app.use(cors())  
app.use(express.json());

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
app.post('/geoOptions', (req, res) => {

    const geoApiOptions = {
        method: 'GET',
        url: `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${req.body.inputValue}`,
        headers: {
            'X-RapidAPI-Key': process.env.GEO_API_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };

    axios.request(geoApiOptions).then((response) => {
        res.json(response.data.data)
    }).catch((err) => {
        console.error(err)
    })
})

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
app.get('/currentWeather', (req, res) => {

    const weatherApiOptions = {
        method: 'GET',
        url: `${WEATHER_API_URL}/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
    };

    axios.request(weatherApiOptions).then((response) => {
        
        res.json(response.data)
    }).catch((err) => {
        console.error(err)
    })
})

app.get('/weatherPrediction', (req, res) => {

    const forecastApiOptions = {
        method: 'GET',
        url: `${WEATHER_API_URL}/forecast?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
    };

    axios.request(forecastApiOptions).then((response) => {
        res.json(response.data)
    }).catch((err) => {
        console.error(err)
    })
})

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))