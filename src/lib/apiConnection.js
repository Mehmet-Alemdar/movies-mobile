import axios from "axios"

const baseUrl = "https://movies-backend-5xm9.onrender.com"

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

export const fetchMovies = async({ token }) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/movie`, {
      key: "value",
      headers: { Authorization: 'Bearer ' + token }
    })
    return data
  } catch(error) {
    return {message: 'fetch movies error', error}
  }
}

export const fetchUsers = async({ token }) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/user`, {
      key: "value",
      headers: { Authorization: `Bearer ${token}` }
    })
    return data
  } catch (error) {
    return {message: 'fetch users error', error}
  }
}

export const fetchUser = async({ token, id }) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/user/${id}`, {
      key: "value",
      headers: { Authorization: `Bearer ${token}` }
    })
    return data
  } catch (error) {
    return {message: 'fetch user error', error}
  }
}

export const updateUser = async({ token, id, body }) => {
  try {
    const { data } = await axios.patch(`${baseUrl}/api/user/update/${id}`,
    {
      "name": body.name,
      "surname": body.surname,
    },
    {
      key: "value",
      headers: { Authorization: `Bearer ${token}`}
    })
    return data
  } catch (error) {
    return {message: 'update user error', error}
  }
}