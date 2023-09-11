import React, { useState } from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

const App = () => {
	const [tasks, setTasks] = useState([])
	const [filter, setFilter] = useState('all')

	const createTask = (newTask) => {
		setTasks([...tasks, newTask])
	}

	const removeTask = (removedTask) => {
		setTasks(tasks.filter((task) => task.id !== removedTask.id))
	}

	const updateTask = (updatedTask) => {
		setTasks(tasks.map((task) =>
			task.id === updatedTask.id ? updatedTask : task
		))
	}

	const handleFilterChange = (newFilter) => {
		setFilter(newFilter)
	}

	const clearCompletedTasks = () => {
		setTasks(tasks.filter(task => !task.completed))
	}

	const filteredTasks = tasks.filter(task => {
		return (
			filter === 'all' || 
			(filter === 'active' && !task.completed) || 
			(filter === 'completed' && task.completed)
		)
	})

	const countTasks = tasks.filter(task => !task.completed).length

	return (
		<div className='App'>
			<NewTaskForm create={createTask}/>
			<TaskList 
				update={updateTask} 
				remove={removeTask} 
				tasks={filteredTasks}/>
			<Footer 
				filter={filter} 
				onFilterChange={handleFilterChange} 
				countTasks={countTasks}
				clearCompletedTasks={clearCompletedTasks}/>
		</div>
	)
}

App.defaultProps = {
	tasks: [],
	filter: 'all',
}

App.propTypes = {
	tasks: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			body: PropTypes.string.isRequired,
			completed: PropTypes.bool.isRequired,
			createdAt: PropTypes.string.isRequired,
		})
	).isRequired,

	filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
}

export default App