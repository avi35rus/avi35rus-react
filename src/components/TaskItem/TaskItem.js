import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './TaskItem.css'

const TaskItem = ({ update, remove, task }) => {
	const [isChecked, setIsChecked] = useState(task.completed || false)
	const [isEditing, setIsEditing] = useState()
	const [editedTaskBody, setEditedTaskBody] = useState(task.body)
	const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(task.id), { addSuffix: true }))

	const [taskTimer, setTaskTimer] = useState(() => {
		const savedTime = localStorage.getItem(`task_${task.id}_timer`)
		return savedTime ? parseInt(savedTime, 10) : 0
	})

	const [isTimerRunning, setIsTimerRunning] = useState(false)
	const [isTimerStopping, setIsTimerStopping] = useState(false)

	const updateLocalStorageTime = (newTime) => {
		localStorage.setItem(`task_${task.id}_timer`, newTime.toString())
	}

	useEffect(() => {
		const timePassedInterval = setInterval(() => {
			isTimerRunning &&
				setTaskTimer((prevTimer) => {
					const newTimer = prevTimer + 1
					updateLocalStorageTime(newTimer)
					return newTimer
				})
		}, 1000)

		if (taskTimer == task.totalTimeInSec && !isTimerStopping && !isChecked) {
			setIsTimerRunning(false)
			setIsTimerStopping(true)
			clearInterval(timePassedInterval)
		}

		return () => clearInterval(timePassedInterval)
	}, [isTimerRunning, taskTimer])

	useEffect(() => {
		const timeAgoInterval = setInterval(() => {
			setTimeAgo(formatDistanceToNow(new Date(task.id), { addSuffix: true }))
		}, 60000)

		return () => clearInterval(timeAgoInterval)
	}, [task.id])

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked)
		update({ ...task, completed: !isChecked })
		if (!isChecked && isTimerRunning) {
			setIsTimerRunning(!isTimerRunning)
		}
	}

	const listItemClassName = isChecked ? 'completed' : ''

	const handleEditClick = () => {
		setIsEditing(true)
	}

	const handleSaveEdit = (e) => {
		e.preventDefault()
		if (editedTaskBody.trim() === '') {
			return
		}
		update({ ...task, body: editedTaskBody })
		setIsEditing(false)
	}

	const formatTime = (seconds) => {
		const hours = Math.floor(seconds / 3600)
		const minutes = Math.floor((seconds % 3600) / 60)
		const remainingSeconds = seconds % 60

		if (hours > 0) {
			return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
				.toString()
				.padStart(2, '0')}`
		} else {
			return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
		}
	}

	const toggleTimer = () => {
		if (!isChecked) {
			setIsTimerRunning(!isTimerRunning)
		}
	}

	return (
		<li className={isEditing ? 'editing' : listItemClassName}>
			<div className="view">
				<input className="toggle" type="checkbox" onChange={handleCheckboxChange} checked={isChecked}></input>
				<label>
					<span className="title">{task.body}</span>
					<span className="description">
						<button className={`icon ${isTimerRunning ? 'icon-pause' : 'icon-play'}`} onClick={toggleTimer}></button>
						{formatTime(taskTimer)} / {formatTime(task.totalTimeInSec)}
					</span>
					<span className="description">created {timeAgo}</span>
				</label>
				<button className="icon icon-edit" onClick={handleEditClick}></button>
				<button className="icon icon-destroy" onClick={() => remove(task)}></button>
			</div>

			{isEditing ? (
				<form onSubmit={handleSaveEdit}>
					<input
						className="edit"
						value={editedTaskBody}
						type="text"
						onChange={(e) => setEditedTaskBody(e.target.value)}
					/>
				</form>
			) : null}
		</li>
	)
}

TaskItem.defaultProps = {
	update: () => {},
	remove: () => {},
}

TaskItem.propTypes = {
	update: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
	task: PropTypes.shape({
		id: PropTypes.number.isRequired,
		body: PropTypes.string.isRequired,
		totalTimeInSec: PropTypes.number.isRequired,
	}).isRequired,
}

export default TaskItem
