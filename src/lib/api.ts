import axios, { isAxiosError, type AxiosRequestConfig } from 'axios'

function getApiBaseUrl() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  if (!apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is not set')
  }

  return apiBaseUrl.replace(/\/$/, '')
}

export const api = axios.create({
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  config.baseURL = getApiBaseUrl()
  return config
})

type ApiRequestConfig = AxiosRequestConfig & {
  token?: string | null
}

export async function apiFetch<T>(path: string, config: ApiRequestConfig = {}) {
  const { token, headers, ...rest } = config

  try {
    const response = await api.request<T>({
      url: path,
      ...rest,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    })

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      const data = error.response?.data
      const body =
        typeof data === 'string'
          ? data
          : data
            ? JSON.stringify(data)
            : error.message

      throw new Error(body)
    }

    throw error
  }
}
