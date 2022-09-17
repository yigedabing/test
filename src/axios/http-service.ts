import { UUID } from '@/utils'
import type { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { AxiosError } from 'axios'

export interface IDataWithError<T> {
  data: T
  code: number
  msg: string
}

class HttpService {
  private http!: AxiosInstance
  private baseURL = import.meta.env.VITE_baseURL
  private timeout = 3 * 60 * 1000

  constructor() {
    this.http = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
    })

    this.addInterceptors(this.http)
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.handleErrorWrapper<T>(this.http.get(url, config))
  }

  post<T>(url: string, param: unknown, config?: AxiosRequestConfig) {
    return this.handleErrorWrapper<T>(this.http.post(url, param, config))
  }

  postDownload<T>(url: string, param: unknown) {
    return this.handleErrorWrapper<T>(this.http.post(url, param, { responseType: 'arraybuffer' }))
  }

  put<T>(url: string, param: unknown, config?: AxiosRequestConfig) {
    return this.handleErrorWrapper<T>(this.http.put(url, param, config))
  }

  delete<T>(url: string, param?: unknown, config?: AxiosRequestConfig) {
    // 请求参数放在url后面进行拼接时，用params对象接收；请求参数放在body体里面，用data对象接收。
    return this.handleErrorWrapper<T>(this.http.delete(url, { data: param, params: param, ...config }))
  }

  private addInterceptors(http: AxiosInstance) {
    // 一、请求拦截器
    http.interceptors.request.use((config) => {
      config.headers = {
        ...config.headers,
        'Access-Token': UUID(),
      }
      // 验证请求状态码
      config.validateStatus = (status) => {
        return status >= 200 && status < 400
      }

      return config
    })

    // 二、响应拦截器
    http.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  private async handleErrorWrapper<T>(p: AxiosPromise): Promise<IDataWithError<T>> {
    return p
      .then((response) => {
        return response.data
      })
      .catch((error: AxiosError) => {
        return {
          msg: error.message || error.name,
          ...error.toJSON(),
        }
      })
  }
}

export const httpService = new HttpService()
