import axios, { AxiosRequestConfig } from 'axios'
import { GET, POST } from '../../common/types/api'
import auth0 from '../auth0/auth0'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000', // TODO
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json'
})

const buildHeaders = () => ({ headers: { Authorization: auth0.getIdToken() } })

export function apiGet<T extends keyof GET>(path: T, config?: AxiosRequestConfig) {
  return axiosInstance.get<GET[T]['res']>(path, { ...config, ...buildHeaders() })
}

export function apiPost<T extends keyof POST>(
  path: T,
  data?: POST[T]['req']['body'],
  config?: AxiosRequestConfig
) {
  return axiosInstance.post<POST[T]['res']>(path, data, { ...config, ...buildHeaders() })
}
