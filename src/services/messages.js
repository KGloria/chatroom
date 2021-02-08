import axios from 'axios'
const baseURL = 'http://localhost:3001/api/messages'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const config = {
        headers: { Authorization: token },
      }

    const request = axios.post(baseURL, newObject, config)
    return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create }