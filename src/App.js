/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';

import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function App() {
	const [response, setResponse] = useState('');

	useEffect(async () => {
		async function fetchData() {
			await axios({
				method: 'GET',
				url: `/parse?searchDate=2022-04-16`,
			}).then((response) => setResponse(response));
		}
		fetchData();
	}, []);

	console.log('after useEffect? ', response);

	return <div className='mainText'>코로나 확진 상태</div>;
}

export default App;
