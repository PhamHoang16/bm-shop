import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL
  , isServer = typeof window === 'undefined'

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(async config => {
  if (isServer) {

    const {cookies} = (await import('next/headers'))
      , token = cookies().get('accessToken')?.value
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  } else {

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  }
  return config
})

export default api