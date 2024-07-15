import { useCallback, useState } from 'react'
const useHttp = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const request = useCallback(
		async (
			url,
			method = 'GET',
			body = null,
			headers = { 'Content-Type': 'application/json' }
		) => {
			setLoading(true)
			setError(null)
			try {
				const response = await fetch(url, { method, body, headers })
				if (!response.ok) {
					throw new Error(`Could not fetch ${url}, status: ${response.status}`)
				}
				const data = await response.json()
				setLoading(false)
				return data
			} catch (error) {
				setLoading(false)
				setError(error.message)
				throw error
			}
		},
		[]
	)

	const clearError = useCallback(() => setError(null), [])

	return { loading, error, request, clearError }
}

export default useHttp
