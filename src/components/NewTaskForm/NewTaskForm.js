import React, { useState } from "react"
import PropTypes from 'prop-types'
import "./NewTaskForm.css"

const NewTaskForm = ({ create }) => {
	const [task, setTask] = useState({ body: '' })

	const addNewTask = (e) => {
		e.preventDefault()
		if (task.body.trim() === '') return
		const newTask = { ...task, id: Date.now() }

		create(newTask)
		setTask({ body: '' })
	}

	return (
		<form
			onSubmit={addNewTask}>
			<input 
				className="new-task"
				value={task.body}
				onChange={e => setTask({ ...task, body: e.target.value })}
				type='text'
				placeholder='What needs to be done?' 
			/>
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