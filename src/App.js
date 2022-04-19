/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';

import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import * as dayjs from 'dayjs';

function App() {
	const [response, setResponse] = useState('');
	const [date, setDate] = useState(dayjs().subtract(1, 'day').format('YYYY-MM-DD'));

	useEffect(async () => {
		const searchDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

		await axios({
			method: 'GET',
			url: `/parse?searchDate=${searchDate}`,
		}).then((res) => {
			setResponse(res);
			setDate(searchDate);
		});
	}, []);

	const handleChange = async (e) => {
		const searchDate = e.target.value;

		console.log('in handleChange() date: ', searchDate);
		await axios({
			method: 'GET',
			url: `/parse?searchDate=${searchDate}`,
		}).then((res) => {
			setResponse(res);
			setDate(searchDate);
		});
		console.log('in handleChange() response : ', response);
	};

	const deathCount = response?.data?.payload?.deathCount.toLocaleString();
	const decideCount = response?.data?.payload?.decideCount.toLocaleString();
	const errMessage = !response?.data?.payload ? response?.data?.message : null;

	return (
		<div className='textframe'>
			<div className='mainText'>코로나 19 감염 현황 조회</div>
			<br />
			<label>
				검색 날짜:
				<input
					onChange={(e) => {
						handleChange(e);
					}}
					type='date'
					value={date}
				/>
			</label>
			<div className='smallText'>
				<br></br> {errMessage}
			</div>
			<br />
			<div>사망자 수 : {deathCount ?? '-'} 명</div>
			<div>확진자 수 : {decideCount ?? '-'} 명</div>
		</div>
	);
}

export default App;
