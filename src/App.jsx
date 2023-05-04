import React, { useState, useEffect } from 'react'
import useBookingFormValidation from './hooks/useBookingValidation'
import './App.scss'

const floors = Array.from({ length: 25 }, (_, i) => i + 3)
const rooms = Array.from({ length: 10 }, (_, i) => i + 1)

const App = () => {
	const [building, setBuilding] = useState('А')
	const [floor, setFloor] = useState(3)
	const [room, setRoom] = useState(1)
	const [date, setDate] = useState('')
	const [startTime, setStartTime] = useState('')
	const [endTime, setEndTime] = useState('')
	const [comment, setComment] = useState('')

	const { isValid, errors, validate } = useBookingFormValidation()
	useEffect(() => {
		validate({
			date,
			startTime,
			endTime,
		})
	}, [date, startTime, endTime])

	const handleBuildingChange = event => {
		setBuilding(event.target.value)
		setFloor(3)
		setRoom(1)
	}

	const handleFloorChange = event => {
		setFloor(parseInt(event.target.value))
		setRoom(1)
	}

	const handleRoomChange = event => {
		setRoom(parseInt(event.target.value))
	}

	const handleSubmit = event => {
		event.preventDefault()
		if (isValid && window.confirm(`Вы уверены, что хотите отправить форму?`)) {
			console.log({
				building,
				floor,
				room,
				date,
				startTime,
				endTime,
				comment,
			})
		}
	}

	const handleClear = () => {
		setBuilding('А')
		setFloor(3)
		setRoom(1)
		setDate('')
		setStartTime('')
		setEndTime('')
		setComment('')
	}

	return (
		<div className='App'>
			<form className='form' onSubmit={handleSubmit}>
				<div>
					<label htmlFor='building'>Выберите здание:</label>
					<select
						id='building'
						value={building}
						onChange={handleBuildingChange}
					>
						<option value='А'>А</option>
						<option value='Б'>Б</option>
					</select>
				</div>
				<div>
					<label htmlFor='floor'>Выберите этаж:</label>
					<select id='floor' value={floor} onChange={handleFloorChange}>
						{floors.map(floor => (
							<option key={floor} value={floor}>
								{floor} этаж
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor='room'>Выберите переговорку:</label>
					<select id='room' value={room} onChange={handleRoomChange}>
						{rooms.map(room => (
							<option key={room} value={room}>
								{room} комната
							</option>
						))}
					</select>
				</div>
				<div className='time'>
					<div>
						<label>
							Выберите дату:
							<input
								type='date'
								id='date'
								value={date}
								onChange={event => setDate(event.target.value)}
							/>
						</label>
						{errors.date && <span className='error'>{errors.date}</span>}
					</div>
					<div>
						<label>
							Начало:
							<input
								type='time'
								id='time'
								value={startTime}
								onChange={event => setStartTime(event.target.value)}
							/>
						</label>
						{errors.startTime && (
							<span className='error'>{errors.startTime}</span>
						)}
					</div>
					<div>
						<label>
							Конец:
							<input
								type='time'
								id='time'
								value={endTime}
								onChange={event => setEndTime(event.target.value)}
							/>
						</label>
						{errors.endTime && <span className='error'>{errors.endTime}</span>}
					</div>
				</div>
				<div>
					<label htmlFor='comment'>Комментарий:</label>
					<textarea
						id='comment'
						value={comment}
						onChange={event => setComment(event.target.value)}
					/>
				</div>
				<div className='buttons'>
					<button
						style={
							isValid
								? { backgroundColor: '#354bf8' }
								: { backgroundColor: '#5f89ec' }
						}
						type='submit'
					>
						Отправить
					</button>
					<button type='button' onClick={handleClear}>
						Очистить
					</button>
				</div>
			</form>
		</div>
	)
}

export default App
