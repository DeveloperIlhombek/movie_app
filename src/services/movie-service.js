import useHttp from '../hooks/use-http'

const useMovieService = () => {
	const { request, loading, error, clearError } = useHttp()
	const _apiBase = 'https://api.themoviedb.org/3/movie'
	const _apiLng = 'language=en-US'
	const _apiKey = 'api_key=9fe6e19d8ef0a299f0267207e3587204'
	const _apiImg = 'https://image.tmdb.org/t/p/original/'
	const _apiPage = 1

	const getPopularMovies = async () => {
		return request(`${_apiBase}/popular?${_apiLng}&page=1&${_apiKey}`)
	}
	const getTrendingMovie = async (page = _apiPage) => {
		const response = await request(
			`${_apiBase}/top_rated?${_apiLng}&page=${page}&${_apiKey}`
		)
		const movies = response.results
		return movies && movies.map(movie => _transformMovie(movie))
	}
	const getDetailedMovie = async id => {
		const movie = await request(`${_apiBase}/${id}?${_apiLng}&${_apiKey}`)
		return _transformMovie(movie)
	}
	const getRandomMovie = async () => {
		const res = await getPopularMovies()
		const movie = res.results[Math.floor(Math.random() * res.results.length)]
		return _transformMovie(movie)
	}

	const _transformMovie = movie => {
		return {
			name: movie.original_title,
			description: movie.overview,
			backdrop_path: `${_apiImg}${movie.backdrop_path}`,
			poster_path: `${_apiImg}${movie.poster_path}`,
			id: movie.id,
			release_date: movie.release_date,
			title: movie.title,
			vote_average: movie.vote_average,
		}
	}
	return {
		getTrendingMovie,
		getDetailedMovie,
		getRandomMovie,
		clearError,
		loading,
		error,
	}
}
export default useMovieService
