import React from 'react'
import PropTypes from 'prop-types'
import TasksFilter from '../TasksFilter'

import './Footer.css'

const Footer = ({filter, onFilterChange, countTasks, clearCompletedTasks}) => {
	return (
		<footer className='footer'>
			<span className='todo-count'>
				{countTasks} items left
			</span>

			<TasksFilter filter={filter} onFilterChange={onFilterChange} />

			<button 
				type='button' 
				className='clear-completed'
				onClick={clearCompletedTasks}>
					Clear completed
			</button>
		</footer>
	)
}

Footer.defaultProps = {
	filter: 'all',
}


Footer.propTypes = {
	filter: PropTypes.oneOf(['all', 'active', 'completed']),
	onFilterChange: PropTypes.func.isRequired,
	countTasks: PropTypes.number.isRequired,
	clearCompletedTasks: PropTypes.func.isRequired,
}

export default Footer

