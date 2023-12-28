const axios = require('axios');



const getOpenWeatherMapData = async (city, country) => {
  const apiKey = '54c670aef2e4dc50697c989f76b1a370';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: `${city},${country}`,
        appid: apiKey,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching OpenWeatherMap API: ${error.message}`);
  }
};




const getAirQualityDataByZipCode = async (zipCode) => {
  try {
    const apiUrl = `https://www.airnowapi.org/aq/observation/zipCode/current/?format=text/csv&zipCode=${zipCode}&distance=25&API_KEY=4DF01500-C3FD-4056-A022-0B6BBE1124E1`;

    const response = await axios.get(apiUrl);

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching air quality data by zip code: ${error.message}`);
  }
};


const getUVIndexData = async (latitude, longitude) => {
  const apiUrl = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`;
  const apiKey = 'openuv-16cmrsrlprip02a-io';

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'x-access-token': apiKey,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching UV Index API: ${error.message}`);
  }
};


module.exports = {
    getAirQualityDataByZipCode,
    getOpenWeatherMapData,
    getUVIndexData,
};
