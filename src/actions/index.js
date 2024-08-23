import {
	heroesFetched,
	heroesFetching,
	heroesFetchingError,
} from '../components/heroesList/HeroesSlice'

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
