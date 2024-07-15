import PropTypes from 'prop-types'
import React from 'react'
import Error from '../error/error'

class ErrorBoundary extends React.Component {
	state = { error: false }

	static getDerivedStateFromError(error) {
		return { error: true }
	}

	componentDidCatch(error, info) {
		// Xato haqida qo'shimcha ma'lumotlarni olish
		console.error('ErrorBoundary caught an error', error, info)
	}

	render() {
		if (this.state.error) {
			return <Error />
		}

		return this.props.children
	}
}
ErrorBoundary.PropTypes = {
	children: PropTypes.element,
}

export default ErrorBoundary
