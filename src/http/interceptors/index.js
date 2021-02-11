import { addRequestInterceptor, addResponseInterceptor } from '../client'
import { requestWithAuth, handleAuthError } from './auth'
import { baseResponseFormat, baseResponseErrorFormat } from './base'

export default function initializeHttpInterceptors() {
  addRequestInterceptor({ request: requestWithAuth })
  addResponseInterceptor({ error: handleAuthError })
  addResponseInterceptor({ response: baseResponseFormat, error: baseResponseErrorFormat })
}
