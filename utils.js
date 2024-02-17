import axios from 'axios'

const Utils = {
  async axiosPost (url, params) {
    const response = await axios.post(url, null, { params })
    return response
  }
}

export default Utils
