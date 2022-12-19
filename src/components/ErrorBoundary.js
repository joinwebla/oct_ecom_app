import React from 'react';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false
		}
	}

	static getDerivedStateFromError(error) {
		return {
			hasError: true
		}
	}

	componentDidCatch() {
		// to report errors to the sentry
	}


	render() {
		if (this.state.hasError) {
			return (
				<h1>Something went wrong here!</h1>
			)
		}

		return (
			<>
				{this.props.children}
			</>
		)
	}
}

export default ErrorBoundary;