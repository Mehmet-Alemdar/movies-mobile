import axios from "axios"

const baseUrl = "http://10.0.2.2:5000"

export const signInApi = async (path, body) => {
  try {
    const { data } = await axios.post(`${baseUrl}/${path}`, body)
    return data
  } catch (error) {
    return {message: 'sign in error', error}
  }
}

export const signUpApi = async (body) => {
  try {
    const { data } = await axios.post(`${baseUrl}/signup`, body)
    return data
  } catch (error) {
    return {message: 'sign up error', error}
  }
}