import axios from 'axios'
const baseUrl = '/api/auth'

const sendToken = async (token) => {
  const response = await axios.post(baseUrl, { token })
  return response.data
}

export default { sendToken }