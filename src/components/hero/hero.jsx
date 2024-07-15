import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useMovieService from '../../services/movie-service'
import Error from '../error/error.jsx'
import Spinner from '../spinner/spinner.jsx'
import './hero.scss'

const Hero = () => {
	const [movie, setMovie] = useState(null)

	const { getRandomMovie, error, loading } = useMovieService()

	useEffect(() => {
		UpdateMovie()
	}, [])

	const UpdateMovie = async () => {
		const res = await getRandomMovie()
		setMovie(res)
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading || !movie) ? (
		<Content movie={movie} />
	) : null

	return (
		<div className='hero'>
			<div className='hero-info'>
				<h2>FIND MOVIES</h2>
				<h1>TV shows and more</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
					sapiente sit placeat minus dolorum, magnam, tempora quas neque quasi,
					sequi odit doloremque velit saepe autem facilis! Laudantium
					consequatur accusantium mollitia.
				</p>
				<div>
					<button className='btn btn__secondary' onClick={UpdateMovie}>
						RANDOM MOVIE
					</button>
				</div>
			</div>
			<div className='hero__movie'>
				{errorContent}
				{loadingContent}
				{content}
			</div>
		</div>
	)
}

export default Hero

const Content = ({ movie }) => {
	const navigate = useNavigate()
	return (
		<div>
			<img src={movie.backdrop_path} alt='img' />
			<div className='hero__movie-descr'>
				<h2>{movie.name}</h2>
				<p>
					{movie.description && movie.description.length > 180
						? `${movie.description.slice(0, 180)}...`
						: movie.description}
				</p>
				<div>
					<button
						className='btn btn__primary'
						onClick={() => navigate(`movie/${movie.id}`)}
					>
						DETAILS
					</button>
				</div>
			</div>
		</div>
	)
}
