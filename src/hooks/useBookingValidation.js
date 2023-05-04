import { useState, useEffect } from 'react'

function useBookingValidation() {
	const [isValid, setIsValid] = useState(false)
	const [errors, setErrors] = useState({})

	useEffect(() => {
		setIsValid(Object.keys(errors).length === 0)
	}, [errors])

	const validate = ({ date, startTime, endTime }) => {
		const newErrors = {}

		if (!date) {
			newErrors.date = 'Выберите дату'
		}

		if (!startTime) {
			newErrors.startTime = 'Выберите время начала'
		}

		if (!endTime) {
			newErrors.endTime = 'Выберите время окончания'
		} else if (endTime <= startTime) {
			newErrors.endTime = 'Время окончания должно быть позже времени начала'
		}

		setErrors(newErrors)
	}

	return { isValid, errors, validate }
}

export default useBookingValidation
