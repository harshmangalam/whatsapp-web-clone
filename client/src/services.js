import axios from 'axios'
const ENDPOINT = 'https://whatsappme.herokuapp.com/api'

export const fetchUsers = async () => {
  try {
    const res = await axios.get(`${ENDPOINT}/users`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}


