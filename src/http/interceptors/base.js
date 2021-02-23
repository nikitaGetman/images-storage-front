import { ERROR_STATUSES } from '@/constants/http'
import { toCamelCaseObject } from '@/utils/common'

export function baseResponseFormat(response) {
  return response && response.data ? toCamelCaseObject(response.data) : response || {}
}

export function baseResponseErrorFormat(error) {
  const { status } = error.response
  const { code } = error.response.data.error || {}

  const detailedError = toCamelCaseObject({
    status,
    code: Number(code) || ERROR_STATUSES.UNKNOWN,
    details: error.response.data
  })

  //   console.warn('[http service] interceptor error:', detailedError.status, error.response, error)
  return Promise.reject(detailedError)
}
