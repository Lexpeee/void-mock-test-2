import endpoints from '@/helpers/endpoints'
import axios from 'axios'
import { find, forEach, includes, isNil, replace, size, words } from 'lodash'
import { useEffect, useState } from 'react'

const BASE_URL = "https://6396aee2a68e43e41808fa18.mockapi.io/api"


const instance = axios.create({
  baseURL: BASE_URL
})

const useApi = (
  endpointName: string, 
  asyncReturn?: boolean
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState(null)

  /** Initially checks if endpoint is valid upon usage */
  useEffect(()=> {
    if (!endpointName) {
      console.error("Endpoint name is not provided")
    }
  }, [endpointName])
  
  const fetch = async (
    options?:{
      params?: any,
      queries?: any,
      data?: any,
      headers?: any
    }) => {
      setIsLoading(true)
    try {
      const endpoint = find(endpoints, (endpoint) => endpoint?.name === endpointName)
      const endpointRegex = /:[A-z]*/gmi
      const urlParams = words(endpoint?.url, endpointRegex)

      if (isNil(endpoint)) {
        setError("Invalid endpoint")
        return
      }

      // Checks number of params valid for this endpoint
      if (size(options?.params) !== size(urlParams)) {
        setError(`Expected ${size(urlParams)} parameters but got ${size(options?.params)} for '${endpointName}' endpoint`)
        return
      }

      // Checks if given parameters are correct
      forEach(options?.params, (value, key) => {
        if (!includes(`:${urlParams}`, key)) {
          setError(`Invalid param for '${key}' param`)
        }
      })

      // Replaces url's params to it's corresponding value
      let newUrl = endpoint?.url
      forEach(urlParams, param => {
        const paramKey = replace(param, ':', '')
        newUrl = replace(newUrl, param, options?.params?.[paramKey])
      })
      
      // Appends queries when populated
      if (size(options?.queries)) {
        newUrl = `${newUrl}?`
        forEach(options?.queries, (val, key) => {
          const index = Object.keys(options?.queries).indexOf(key)
          newUrl += `${index > 0 ? '&' :''}${key}=${val}`
        })
      }

      const { data: requestData } = await instance({
        method: endpoint?.request,
        url: newUrl,
        data: options?.data || null,
        headers: options?.headers
      })

      if (asyncReturn) {
        return requestData
      }
      
      setData(requestData)
      return
    } catch (err) {
      setError(err?.response?.data?.error)
      console.error(err)
    } finally { 
      if (error) {
        console.error(`useApi error: ${error}`)
      }
      setIsLoading(false)
    }
  }
  
  return {
    fetch,
    isLoading, 
    error,
    data
  }
}

export default useApi