import axios from "axios";
import chalk from "chalk";

const API_KEY = "6852c0d482136b98d9f15d4a5380de21";

function displayWeather(city, weatherData) {
    console.log(chalk.yellow(`\nInformación del Clima: ${city}`));
    console.log(chalk.cyan("Descripcion: "), weatherData.weather[0].description);
    console.log(chalk.cyan("Temperatura: "), `${weatherData.main.temp} °C`);
    console.log(chalk.cyan("Humedad: "), `${weatherData.main.humidity} %`);
    console.log(chalk.cyan("Velocidad del Viento: "), `${weatherData.wind.speed} m/s`);
}

function handleError(err) {
    console.log(chalk.red("Error: "), err.message);
    process.exit(1);
}

async function getWeather(city) {
    try {
        let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

        const response = await axios.get(endpoint, {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric"
            }
        });
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log(chalk.red(error));
        throw new Error('No es posible obtener Datos')
    }
}

function getData() {
    let city = process.argv[2];
    console.log(city)
    if (!city) {
        console.log(chalk.red("Ingresa el nombre de la ciudad"));
        console.log(chalk.red("Ejecuta el siguiente comando node app.js [nombre ciudad]"));
    }

    getWeather(city)
        .then((weatherData) => displayWeather(city, weatherData))
        .catch(handleError)
}

getData();
