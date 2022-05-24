import React from 'react';
import Slides from '../components/Slides';

const Home = () => {
	return (
		<div>
			<Slides homeSlides={true} isNavigated={true} />
		</div>
	);
};

export default Home;
