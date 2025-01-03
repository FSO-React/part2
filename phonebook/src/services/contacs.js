import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(url)
}

const getOne = (id) => {
  return axios.get(`${url}/${id}`)
}

const create = (newContact) => {
  return axios.post(url, newContact)
}

const update = (id, newContact) => {
  return axios.put(`${url}/${id}`, newContact)
}

const remove = (id) => {
  return axios.delete(`${url}/${id}`)
}

export default { 
  getAll,
  getOne,
  create, 
  update,
  remove,
}