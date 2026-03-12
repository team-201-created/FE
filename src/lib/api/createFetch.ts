import { FetchArgs, FetchConfig, FetchInstance, FetchOptions } from './types'

/** null/undefined 제외, 나머지는 문자열로 변환해 쿼리 파라미터로 사용 */
function toQueryString(
  params: Record<string, string | number | undefined | null>
): string {
  const record: Record<string, string> = {}
  for (const [k, v] of Object.entries(params)) {
    if (v != null) record[k] = String(v)
  }
  if (Object.keys(record).length === 0) return ''
  return `?${new URLSearchParams(record)}`
}

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

    const query = params ? toQueryString(params) : ''
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
