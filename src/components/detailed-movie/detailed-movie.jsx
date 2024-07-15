import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useMovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import './detailed-movie.scss'

const DetailedMovie = () => {
	const { movieId } = useParams()
	const [movie, setMovie] = useState(null)
	const { getDetailedMovie, loading, error, clearError } = useMovieService()

	const updateMovie = async () => {
		clearError()
		try {
			const res = await getDetailedMovie(movieId)
			setMovie(res)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		updateMovie()
	}, [movieId])

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content =
		!(error || loading) && movie ? <Content movie={movie} /> : null

	return (
		<div>
			{errorContent}
			{loadingContent}
			{content}
		</div>
	)
}

export default DetailedMovie

const Content = ({ movie }) => {
	return (
		<div className='detailedmovie'>
			<div className='detailedmovie__image'>
				<img src={movie.poster_path} alt={movie.title} />
			</div>

			<div className='detailedmovie__descr'>
				<h1>{movie.title}</h1>
				<p>{movie.description}</p>
				<div className='detailedmovie__descr__info'>
					<img src='/date.svg' alt='date' />
					<p>{movie.release_date}</p>
					<div className='dot' />
					<p>{movie.vote_average?.toFixed(1)}</p>
					<img src='/star.svg' alt='star' />
				</div>
				<button
					className='btn btn__secondary'
					style={{ width: '200px', marginTop: '100px' }}
				>
					<Link to='/'>Back to Home</Link>
				</button>
			</div>
		</div>
	)
}
