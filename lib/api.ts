import axiosClient from './axios-client'
import { AxiosRequestConfig } from 'axios'
import { ApiError } from './axios-client'

export async function request<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axiosClient.request<T>(config)
    return response.data
  } catch (error) {
    throw error as ApiError
  }
}

export const api = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'GET', url }),

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => request<T>({ ...config, method: 'POST', url, data }),

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => request<T>({ ...config, method: 'PUT', url, data }),

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => request<T>({ ...config, method: 'PATCH', url, data }),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'DELETE', url }),
}
