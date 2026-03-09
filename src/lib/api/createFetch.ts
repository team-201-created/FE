import { FetchArgs, FetchConfig, FetchInstance, FetchOptions } from './types'

export const createFetch = ({
  baseUrl,
  headers: defaultHeaders,
  interceptors,
}: FetchConfig): FetchInstance => {
  const baseFetch = async <T>(
    url: string,
    options: FetchOptions = {}
  ): Promise<T> => {
    const { params, ...restOptions } = options

    const query = params
      ? `?${new URLSearchParams(params as Record<string, string>)}`
      : ''
    let args: FetchArgs = {
      url: `${baseUrl}${url}${query}`,
      options: {
        ...restOptions,
        headers: {
          ...defaultHeaders, // 기본 헤더
          ...restOptions.headers, // 추가로 전달할 헤더 (Token)
        },
      },
    }

    if (interceptors?.request) {
      args = await interceptors.request(args)
    }

    let response = await fetch(args.url, args.options)

    if (interceptors?.response) {
      response = await interceptors.response(response, args)
    }

    return response.json()
  }

  // baseFetch에 메서드 바인딩 시키기
  return Object.assign(baseFetch, {
    get: <T>(url: string, opt?: FetchOptions) =>
      baseFetch<T>(url, { ...opt, method: 'GET' }),
    post: <T>(url: string, body?: unknown, opt?: FetchOptions) =>
      baseFetch<T>(url, { ...opt, method: 'POST', body: JSON.stringify(body) }),
    put: <T>(url: string, body?: unknown, opt?: FetchOptions) =>
      baseFetch<T>(url, { ...opt, method: 'PUT', body: JSON.stringify(body) }),
    patch: <T>(url: string, body?: unknown, opt?: FetchOptions) =>
      baseFetch<T>(url, {
        ...opt,
        method: 'PATCH',
        body: JSON.stringify(body),
      }),
    delete: <T>(url: string, opt?: FetchOptions) =>
      baseFetch<T>(url, { ...opt, method: 'DELETE' }),
  })
}
