import React from "react"
import PropTypes from 'prop-types'
import TaskItem from "../TaskItem"

import './TaskList.css'

const TaskList = ({update, remove, tasks}) => {
	return (
		<ul className='task-list'>
			{tasks.map((task) =>
				<TaskItem update={update} remove={remove} task={task} key={task.id} />
			)}
		</ul>
	)
}

TaskList.defaultProps = {
	tasks: [],
}

TaskList.propTypes = {
	update: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
	tasks: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			body: PropTypes.string.isRequired,
			completed: PropTypes.bool.isRequired,
			createdAt: PropTypes.string.isRequired,
		})
	).isRequired,
}

export default TaskList