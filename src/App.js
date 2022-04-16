import './App.css';

import { useEffect } from 'react';
import { useState } from 'react';

function App() {
	const [response, setResponse] = useState('');

	useEffect(() => {
		fetch('/covid-19?startCreateDt=20200309&endCreateDt=20200315&pageNo=1&numOfRows=10')
			.then((response) => response.json())
			.then((response) => setResponse(response));
	}, []);

	console.log('after useEffect? ', response);

	return <div className='mainText'>코로나 확진 상태</div>;
}

export default App;
