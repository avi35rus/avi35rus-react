import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './TaskItem.css'

const TaskItem = ({ update, remove, task }) => {
	const [isChecked, setIsChecked] = useState(task.completed || false)
	const [isEditing, setIsEditing] = useState()
	const [editedTaskBody, setEditedTaskBody] = useState(task.body)
	const [timeAgo, setTimeAgo] = useState(
		formatDistanceToNow(new Date(task.id), { addSuffix: true })
		)

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeAgo(formatDistanceToNow(new Date(task.id), { addSuffix: true }))
		}, 60000)
		
		return () => {
			clearInterval(intervalId)
		}
	}, [task.id])

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked)
		update({ ...task, completed: !isChecked })
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

	return (
		<li className={isEditing ? 'editing' : listItemClassName}>
			<div className='view'>
				<input 
					className='toggle' 
					type='checkbox' 
					onChange={handleCheckboxChange}
					checked={isChecked}>
				</input>
				<label>
					<span className='description'>
						{task.body}
					</span>
					<span className='created'>
						created {timeAgo} 
					</span>
				</label>
				<button 
					onClick={handleEditClick}
					className="icon icon-edit">
				</button>
				<button 
					className="icon icon-destroy"
					onClick={() => remove(task)}>
				</button>	
			</div>

			{isEditing ? (
				<form
					onSubmit={handleSaveEdit}>
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
		completed: PropTypes.bool.isRequired,
		createdAt: PropTypes.string.isRequired,
	}).isRequired,
}

export default TaskItem