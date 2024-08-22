export const fetchHeroes = request => dispatch => {
	dispatch(heroesFetching())
	request('http://localhost:3001/heroes')
		.then(data => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()))
}

export const fetchingFilters = request => dispatch => {
	dispatch(filtersFetching())
	request('http://localhost:3001/filters')
		.then(data => dispatch(filtersFetched(data)))
		.catch(() => filtersError())
}

export const heroesFetching = () => {
	return {
		type: 'HEROES_FETCHING',
	}
}

export const heroesFetched = heroes => {
	return {
		type: 'HEROES_FETCHED',
		payload: heroes,
	}
}

export const heroesFetchingError = () => {
	return {
		type: 'HEROES_FETCHING_ERROR',
	}
}

export const createNewHero = hero => {
	return {
		type: 'CREATE_NEW_HERO',
		payload: hero,
	}
}

export const filtersFetching = () => {
	return {
		type: 'FILTERS_FETCHING',
	}
}

export const filtersFetched = filters => {
	return {
		type: 'FILTERS_FETCHED',
		payload: filters,
	}
}

export const filtersError = () => {
	return {
		type: 'FILTERS_ERROR',
	}
}

export const activeFilterChanged = filter => {
	return {
		type: 'ACTIVE_FILTER_CHANGED',
		payload: filter,
	}
}

// export const activeFilterChanged = filter => dispatch => {
// 	setTimeout(() => {
// 		dispatch({
// 			type: 'ACTIVE_FILTER_CHANGED',
// 			payload: filter,
// 		})
// 	}, 1000)
// }

export const createNewHeroError = () => {
	return {
		target: 'CREATE_NEW_HERO_ERROR',
	}
}

export const deleteHero = hero => {
	return {
		type: 'DELETE_HERO',
		payload: hero,
	}
}

export const deleteHeroError = () => {
	return {
		type: 'DELETE_HERO_ERROR',
	}
}
