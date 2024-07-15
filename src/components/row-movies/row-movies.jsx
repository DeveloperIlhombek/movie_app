import React, { useEffect, useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useLocation } from 'react-router-dom'
import useMovieService from '../../services/movie-service'
import Error from '../error/error'
import MovieInfo from '../movie-info/movie-info'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import Spinner from '../spinner/spinner'
import './row-movies.scss'

const RowMovies = () => {
	const [open, setOpen] = useState(false)
	const [movies, setMovies] = useState([])
	const [movieId, setMovieId] = useState(null)
	const [page, setPage] = useState(1)
	const [newItemLoading, setNewItemLoading] = useState(false)
	const { getTrendingMovie, error, loading } = useMovieService()

	const { pathname } = useLocation()
	console.log(pathname)

	useEffect(() => {
		getMovies(page)
	}, [])

	const onClose = () => setOpen(false)
	const onOpen = id => {
		setMovieId(id)
		setOpen(true)
	}

	const getMovies = async page => {
		setNewItemLoading(true)
		try {
			const res = await getTrendingMovie(page)
			setMovies(movies => [...movies, ...res])
		} catch (e) {
			console.error(e)
		} finally {
			setNewItemLoading(false)
		}
	}

	const getMoreMovie = () => {
		setPage(page => {
			const nextPage = page + 1
			getMovies(nextPage)
			return nextPage
		})
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading) ? (
		<Content movies={movies} onOpen={onOpen} />
	) : null

	return (
		<div className='app__rowmovie'>
			<div className='app__rowmovie-top'>
				<div className='app__rowmovie-top__title'>
					<img src='/tranding.svg' alt='tranding' />
					<h1>{pathname === '/popular' ? 'Popular' : 'Trending'}</h1>
				</div>
				<div className='hr' />
				<a href='#'>See more</a>
			</div>
			{errorContent}
			{loadingContent}
			{content}

			<div className='app__rowmovie_loadmore'>
				<button
					className='btn btn__secondary'
					onClick={getMoreMovie}
					disabled={newItemLoading}
				>
					Load more
				</button>
			</div>

			<Modal open={open} onClose={onClose}>
				<MovieInfo movieId={movieId} />
			</Modal>
		</div>
	)
}
export default RowMovies

const Content = ({ movies, onOpen }) => {
	return (
		<div className='app__rowmovie-lists'>
			{movies.map(movie => (
				<RowMoviesItem key={movie.id} movie={movie} onOpen={onOpen} />
			))}
		</div>
	)
}
