import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../header/header'
import Spinner from '../spinner/spinner.jsx'

const NotFoundPage = lazy(() => import('../../pages/not-found-page.jsx'))
const Popular = lazy(() => import('../../pages/popular.jsx'))
const Tranding = lazy(() => import('../../pages/tranding.jsx'))
const HomePage = lazy(() => import('../../pages/home-page.jsx'))
const DetailedPage = lazy(() => import('../../pages/detailed-page.jsx'))

const App = () => {
	return (
		<div className='app'>
			<Header />
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/tranding' element={<Tranding />} />
					<Route path='/popular' element={<Popular />} />
					<Route path='/movie/:movieId' element={<DetailedPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</div>
	)
}
export default App
