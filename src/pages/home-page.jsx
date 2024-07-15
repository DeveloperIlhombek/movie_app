import ErrorBoundary from '../components/error-boundary/error-boundary.jsx'
import Hero from '../components/hero/hero.jsx'
import RowMovies from '../components/row-movies/row-movies.jsx'

const HomePage = () => {
	return (
		<>
			<ErrorBoundary>
				<Hero />
			</ErrorBoundary>
			<ErrorBoundary>
				<RowMovies />
			</ErrorBoundary>
		</>
	)
}

export default HomePage
