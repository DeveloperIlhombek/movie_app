import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useMovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import './movie-info.scss'

const MovieInfo = ({ movieId }) => {
	const [movie, setMovie] = useState(null)
	const { getDetailedMovie, loading, error, clearError } = useMovieService()

	useEffect(() => {
		clearError()
		updateMovie()
	}, [movieId])

	const updateMovie = async () => {
		try {
			const res = await getDetailedMovie(movieId)
			setMovie(res)
		} catch (error) {
			console.error(error)
		}
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content =
		!(error || loading) && movie ? <Content movie={movie} /> : null

	return (
		<div className='movieinfo'>
			{loadingContent}
			{errorContent}
			{content}
		</div>
	)
}

export default MovieInfo

const Content = ({ movie }) => {
	const navigate = useNavigate()
	return (
		<div>
			<img src={movie.backdrop_path} alt='img' />
			<div className='hero__movie-descr'>
				<h2>{movie.name}</h2>
				<p>{movie.description}</p>
				<button
					className='btn btn__details'
					onClick={() => navigate(`/movie/${movie.id}`)}
				>
					Details
				</button>
			</div>
		</div>
	)
}
