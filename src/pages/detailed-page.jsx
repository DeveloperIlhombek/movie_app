import { useParams } from 'react-router-dom'
import DetailedMovie from '../components/detailed-movie/detailed-movie'

const DetailedPage = () => {
	const { movieId } = useParams()

	return (
		<div>
			<DetailedMovie />
		</div>
	)
}

export default DetailedPage
