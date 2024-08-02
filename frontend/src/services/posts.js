import axios from 'axios'
const baseUrl = '/api/posts'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getByUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/user/${userId}`)
  return response.data
}

const createNew = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
} 

const update = async (id, newEntry) => {
  const response = await axios.put(`${baseUrl}/${id}`, newEntry)
  return response.data
}

export default { getAll, getById, createNew, remove, update, setToken, getByUser }