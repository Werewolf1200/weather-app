import axios from "axios";
import chalk from "chalk";

const API_KEY = "6852c0d482136b98d9f15d4a5380de21";

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
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(chalk.red(error));
    }
}

function getData() {
    let city = process.argv[2];
    console.log(city)
    if (!city) {
        console.log(chalk.red("Ingresa el nombre de la ciudad"));
        console.log(chalk.red("Ejecuta el siguiente comando node app.js [nombre ciudad]"));
    };

    getWeather(city);
}

getData();
