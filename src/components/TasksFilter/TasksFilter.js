import React from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

const TasksFilter = ( {filter, onFilterChange} ) => {

	const handleFilterClick = (newFilter) => {
		onFilterChange(newFilter)
	}

	const getButtonClass = (f) => (filter === f ? 'selected' : '')

	const filters = ['all', 'active', 'completed']

	return (
		<ul className='filters'>
			{filters.map(f => {
				const label = f.charAt(0).toUpperCase() + f.slice(1)
				
				return (
					<li key={f}>
						<button 
							type='button' 
							className={getButtonClass(f)}
							onClick={() => handleFilterClick(f)}>
								{label}
						</button>
					</li>
				)
			})}
		</ul>
	)
}

TasksFilter.defaultProps = {
	filter: 'all',
}

TasksFilter.propTypes = {
	filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
	onFilterChange: PropTypes.func.isRequired,
}

export default TasksFilter