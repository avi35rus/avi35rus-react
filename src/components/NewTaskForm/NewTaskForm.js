import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

const NewTaskForm = ({ create }) => {
	const [task, setTask] = useState({ body: '' })
	const [minutes, setMinutes] = useState('')
	const [seconds, setSeconds] = useState('')

	const addNewTask = (e) => {
		e.preventDefault()
		const parsedMinutes = minutes === '' ? 0 : parseInt(minutes, 10) * 60
		const parsedSeconds = seconds === '' ? 0 : parseInt(seconds, 10)

		if (task.body.trim() === '') return
		if (parsedMinutes === '') return
		const newTask = {
			...task,
			id: Date.now(),
			deadlineInSec: parsedMinutes + parsedSeconds,
		}

		create(newTask)
		setTask({ body: '' })
		setMinutes('')
		setSeconds('')
	}

	return (
		<form className="new-task-form" onSubmit={addNewTask}>
			<input
				className="new-task"
				value={task.body}
				onChange={(e) => setTask({ ...task, body: e.target.value })}
				type="text"
				placeholder="What needs to be done?"
			/>
			<input
				className="new-task-form__timer"
				value={minutes}
				onChange={(e) => setMinutes(e.target.value)}
				type="number"
				placeholder="Min"
			/>
			<input
				className="new-task-form__timer"
				value={seconds}
				onChange={(e) => setSeconds(e.target.value)}
				type="number"
				placeholder="Sec"
			/>
			<button type="submit" style={{ display: 'none' }}></button>
		</form>
	)
}

NewTaskForm.defaultProps = {
	create: () => {},
}

NewTaskForm.propTypes = {
	create: PropTypes.func.isRequired,
}

export default NewTaskForm
