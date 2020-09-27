import axios from 'axios'

const instance = axios.create({
   baseURL: "https://spacebounties.herokuapp.com/",
   withCredentials: true,
})

export default instance