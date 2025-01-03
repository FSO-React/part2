import axios from 'axios'
const url = 'https://api.openweathermap.org'
console.log(process.env.REACT_APP_OPEN_WEATHER_API)
const apiKey = process.env.REACT_APP_OPEN_WEATHER_API
// const apiKey = "e5710c05e869ef15617939fa4f3bed5b"

const getAll = () => {
  return axios.get(`${url}/...`)
}

const getOne = ({ lat, lon, capital }) => {
  if (!apiKey) {
    console.error('API key is missing. Check your .env.local configuration.');
    return;
  }
  // return axios.get(`${url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
  return axios.get(`${url}/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
}

export default { 
  getAll,
  getOne,
}